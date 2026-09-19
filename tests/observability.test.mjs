import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { loadEvaluator, scoresFor } from '../server/evaluator.mjs';
import { Observability, redact, usageMetrics } from '../server/observability.mjs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const evaluator = loadEvaluator(new URL('../index.html', import.meta.url));
function mockSdk() {
  const roots = [], rows = [];
  const span = (args) => ({ args, children: [], logs: [], id: 'span-id',
    startSpan(child) { const s = span(child); this.children.push(s); return s; },
    log(event) { this.logs.push(event); }, end() {}, async permalink() { return 'https://www.braintrust.dev/test-trace'; },
  });
  const parent = { id: Promise.resolve('object-id'), startSpan(args) { const s = span(args); roots.push(s); return s; }, async flush() {} };
  return { roots, rows, initLogger: () => parent, init: () => parent, initDataset: () => ({ insert: row => rows.push(row), async flush() {} }) };
}

test('standalone entry points stay identical and all inline JavaScript parses', () => {
  assert.equal(html, readFileSync(new URL('../PF AI PM Capstone Project/agentic-ai-capstone-develop-companion-v0.3/index.html', import.meta.url), 'utf8'));
  for (const [, script] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(script);
});
test('all 20 case contexts exclude evaluator ground truth', () => {
  assert.equal(evaluator.requests.length, 20);
  assert.deepEqual(JSON.parse(JSON.stringify(evaluator.selfTests())), { contract: [], isolation: [] });
  for (const r of evaluator.requests) assert.doesNotMatch(JSON.stringify(evaluator.context(r.request_id)), /"(?:expected_recommendation|ground_truth_has_blocker|expected_boundary_result)"\s*:/);
});
test('failed inference cannot receive a passing score', () => {
  const state = { status: 'error', text: 'Provider unavailable', reviewerStatus: 'error' };
  const blocker = scoresFor(evaluator.evaluate('TR-002', state), state);
  const safe = scoresFor(evaluator.evaluate('TR-001', state), state);
  assert.equal(blocker.blocker_recall, 0);
  assert.equal(safe.false_pause_rate, 1);
  assert.equal(safe.valid_grounded_output, 0);
  assert.equal(blocker.exact_label_match, 0);
});
test('transport credentials and accidental keys are scrubbed recursively', () => {
  const value = redact({ headers: { authorization: 'SECRET' }, apiKey: 'SECRET', nested: [{ text: 'sk-ant-abcdefghijklmnopqrstuvwxyz and Bearer abcdef' }] });
  assert.deepEqual(value, { nested: [{ text: '[REDACTED] and Bearer [REDACTED]' }] });
  assert.deepEqual(usageMetrics({ input_tokens: 12, output_tokens: 3 }), { prompt_tokens: 12, completion_tokens: 3, tokens: 15 });
});
test('a failed trace upload does not throw or disappear from the final experiment status', async () => {
  const status = { text: '', replaceChildren(node) { this.text = node.text; }, append() {} };
  const link = {};
  const sandbox = {
    window: {}, location: { protocol: 'https:' }, AbortSignal,
    document: {
      getElementById: id => id === 'braintrust-status' ? status : link,
      createTextNode: text => ({ text }), createElement: () => ({}),
    },
    fetch: async path => {
      if (path.endsWith('/calls')) throw new Error('Network disconnected');
      const body = path.endsWith('/config') ? { enabled: true, token: 'session' }
        : path.endsWith('/finish') ? { completedCases: 20, metrics: { blockerRecall: 1, falsePauseRate: 0, exactAccuracy: 1 } }
        : { id: 'test-id', url: 'https://www.braintrust.dev/test' };
      return { ok: true, json: async () => body };
    },
  };
  vm.runInNewContext(readFileSync(new URL('../server/client-snippet.js', import.meta.url), 'utf8'), sandbox);
  const obs = sandbox.window.CasaFlowObservability;
  const experiment = await obs.startExperiment({});
  const trace = await obs.start({ request_id: 'TR-001' }, {}, {}, experiment.id);
  await obs.call(trace, {});
  await obs.finish(trace, { status: 'success' });
  await obs.finishExperiment(experiment);
  assert.match(status.text, /Some trace uploads were not confirmed/);
  assert.match(status.text, /20\/20 cases scored/);
});
test('live model calls attach to their own run; duplicates and cross-session writes are rejected', async () => {
  const sdk = mockSdk();
  const obs = new Observability(evaluator, { sdk, apiKey: 'unit-test-placeholder' });
  const run = await obs.startRun('session-a', { requestId: 'OPS-A012-001', input: { update: 'Start plumbing' } });
  const call = { id: 'call-1', role: 'worker', model: 'test-model', input: 'input', output: 'output', usage: { input_tokens: 12, output_tokens: 3 } };
  await assert.rejects(obs.addCall('session-b', run.id, call), /Unknown run/);
  await obs.addCall('session-a', run.id, call);
  await obs.addCall('session-a', run.id, call);
  assert.equal(sdk.roots[0].children.length, 1);
  assert.equal(sdk.roots[0].children[0].args.type, 'llm');
  assert.equal(sdk.roots[0].children[0].args.event.metrics.tokens, 15);
  assert.equal('expected' in sdk.roots[0].args.event, false);
  assert.equal(sdk.roots[0].args.event.input.update, 'Start plumbing');
});
test('experiments preserve separate inputs and expected labels and count incomplete runs conservatively', async () => {
  const sdk = mockSdk();
  const obs = new Observability(evaluator, { sdk, apiKey: 'unit-test-placeholder' });
  const batch = await obs.startExperiment('session-a', { worker: 'test-model' });
  await assert.rejects(obs.startRun('session-a', { requestId: 'OPS-A012-001', experimentId: batch.id }), /Unknown case/);
  assert.equal(sdk.rows.length, 20);
  assert.equal(sdk.rows[0].expected.expected_recommendation, 'Proceed');
  assert.equal(sdk.rows[0].input.expected_recommendation, undefined);
  const run = await obs.startRun('session-a', { requestId: 'TR-001', experimentId: batch.id, input: { expected_recommendation: 'tampered' } });
  assert.equal(sdk.roots[0].args.event.input.expected_recommendation, undefined);
  await assert.rejects(obs.startRun('session-a', { requestId: 'TR-001', experimentId: batch.id }), /repeated case/);
  await obs.finishRun('session-a', run.id, { state: { status: 'error', text: 'Unavailable' } });
  await obs.finishRun('session-a', run.id, { state: { status: 'success', text: 'Changed' } });
  const done = await obs.finishExperiment('session-a', batch.id);
  assert.equal(done.completedCases, 1);
  assert.equal(done.metrics.completed, false);
  assert.equal(done.metrics.targetMet, false);
  assert.equal(sdk.roots[0].logs[0].scores.false_pause_rate, 1);
});
