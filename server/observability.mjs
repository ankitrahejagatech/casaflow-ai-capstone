import { randomUUID } from 'node:crypto';
import { init, initDataset, initLogger } from 'braintrust';
import { scoresFor } from './evaluator.mjs';

export const PROJECT_URL = 'https://www.braintrust.dev/app/Ankit%27s%20Evaluation%20Projects/p/CasaFlowAI';

// Never collect transport headers or keys. Also scrub accidental credentials
// in free-text input, provider diagnostics, and model output before logging.
export function redact(value, depth = 0) {
  if (depth > 40) return '[depth limit]';
  if (typeof value === 'string') return value
    .replace(/\bsk-[A-Za-z0-9_-]{12,}\b/g, '[REDACTED]')
    .replace(/Bearer\s+[A-Za-z0-9_.-]+/gi, 'Bearer [REDACTED]');
  if (Array.isArray(value)) return value.map(v => redact(v, depth + 1));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value)
    .filter(([key]) => !/^(api.?key|authorization|headers|token|secret|password)$/i.test(key))
    .map(([key, item]) => [key, redact(item, depth + 1)]));
  return value;
}

export function usageMetrics(usage = {}) {
  const prompt = usage.input_tokens ?? usage.prompt_tokens;
  const completion = usage.output_tokens ?? usage.completion_tokens;
  const metrics = {};
  if (Number.isFinite(prompt)) metrics.prompt_tokens = prompt;
  if (Number.isFinite(completion)) metrics.completion_tokens = completion;
  if (Number.isFinite(prompt) && Number.isFinite(completion)) metrics.tokens = prompt + completion;
  if (Number.isFinite(usage.cache_read_input_tokens)) metrics.prompt_cached_tokens = usage.cache_read_input_tokens;
  if (Number.isFinite(usage.cache_creation_input_tokens)) metrics.prompt_cache_creation_tokens = usage.cache_creation_input_tokens;
  return metrics;
}

export class Observability {
  constructor(evaluator, { apiKey = process.env.BRAINTRUST_API_KEY, project = process.env.BRAINTRUST_PROJECT || 'CasaFlowAI', version = 'local', sdk = { init, initDataset, initLogger } } = {}) {
    this.evaluator = evaluator;
    this.enabled = Boolean(apiKey);
    this.project = project;
    this.version = version;
    this.sdk = sdk;
    this.options = { apiKey, debugLogLevel: false };
    this.runs = new Map();
    this.experiments = new Map();
    this.logger = this.enabled ? sdk.initLogger({ ...this.options, projectName: project, setCurrent: false }) : null;
  }

  async ready() {
    if (!this.enabled) return false;
    await this.logger.id;
    return true;
  }

  async startExperiment(owner, models) {
    const name = 'CasaFlowAI-20-cases-' + new Date().toISOString().replace(/[:.]/g, '-') + '-' + randomUUID().slice(0, 6);
    const dataset = this.sdk.initDataset(this.project, { ...this.options, dataset: 'CasaFlowAI synthetic transitions (20 cases)', useOutput: false });
    for (const request of this.evaluator.requests) {
      const label = this.evaluator.labels.find(l => l.request_id === request.request_id);
      dataset.insert({ id: request.request_id, input: this.evaluator.context(request.request_id), expected: label, metadata: { synthetic: true, request_id: request.request_id } });
    }
    await dataset.flush();
    const experiment = this.sdk.init(this.project, {
      ...this.options, experiment: name, dataset, setCurrent: false, isPublic: false,
      description: 'Fresh model calls from the deployed CasaFlowAI product. Server-side scoring reuses the prototype evaluator. Expected labels are never sent to the model.',
      metadata: { synthetic: true, version: this.version, models: redact(models), source: 'live-browser-benchmark' },
    });
    await experiment.id;
    const id = randomUUID();
    const url = PROJECT_URL + '/experiments/' + encodeURIComponent(name);
    this.experiments.set(id, { owner, experiment, name, url, cases: new Set(), results: [], created: Date.now() });
    return { id, url, name };
  }

  async startRun(owner, body) {
    const request = this.evaluator.requests.find(r => r.request_id === body.requestId);
    const operational = typeof body.requestId === 'string' && /^OPS-[A-Z0-9-]{1,64}$/.test(body.requestId);
    if (!request && (!operational || body.experimentId)) throw Object.assign(new Error('Unknown case'), { status: 400 });
    const batch = body.experimentId ? this.experiments.get(body.experimentId) : null;
    if (body.experimentId && (!batch || batch.owner !== owner || batch.finished || batch.cases.has(body.requestId))) {
      throw Object.assign(new Error('Invalid experiment or repeated case'), { status: 400 });
    }
    if (this.runs.size > 200) throw Object.assign(new Error('Too many retained runs'), { status: 429 });
    const parent = batch ? batch.experiment : this.logger;
    const input = batch ? this.evaluator.context(body.requestId) : redact(body.input);
    const label = batch ? this.evaluator.labels.find(l => l.request_id === body.requestId) : null;
    const span = parent.startSpan({ name: `CasaFlowAI ${body.requestId}`, type: batch ? 'eval' : 'task', event: {
      input, ...(label ? { expected: label, datasetRecordId: body.requestId } : {}),
      metadata: { request_id: body.requestId, synthetic: true, source: batch ? 'benchmark' : 'live-product', version: this.version, models: redact(body.models) },
    } });
    const id = randomUUID();
    this.runs.set(id, { owner, span, parent, batch, requestId: body.requestId, finished: false, events: new Set(), created: Date.now() });
    if (batch) batch.cases.add(body.requestId);
    await parent.flush();
    return { id, url: await span.permalink() };
  }

  ownedRun(owner, id) {
    const run = this.runs.get(id);
    if (!run || run.owner !== owner) throw Object.assign(new Error('Unknown run'), { status: 404 });
    return run;
  }

  async addCall(owner, id, call) {
    const run = this.ownedRun(owner, id);
    if (run.finished) throw Object.assign(new Error('Run already ended'), { status: 409 });
    if (!['worker', 'reviewer'].includes(call.role) || typeof call.id !== 'string') throw Object.assign(new Error('Invalid model span'), { status: 400 });
    if (run.events.has(call.id)) return { duplicate: true };
    if (run.events.size >= 8) throw Object.assign(new Error('Span limit reached'), { status: 429 });
    const now = Date.now() / 1000;
    const start = Number.isFinite(call.start) && Math.abs(now - call.start) < 600 ? call.start : now;
    const end = Number.isFinite(call.end) && call.end >= start && call.end <= now + 5 ? call.end : now;
    const child = run.span.startSpan({ name: `${call.role} ${run.events.size + 1}`, type: 'llm', startTime: start, event: {
      input: redact(call.input), output: redact(call.output),
      ...(call.error ? { error: redact(String(call.error)) } : {}),
      metadata: { model: redact(String(call.model || '')), provider: redact(String(call.provider || '')), role: call.role },
      metrics: usageMetrics(call.usage),
    } });
    child.end({ endTime: end });
    run.events.add(call.id);
    await run.parent.flush();
    return { recorded: true };
  }

  async finishRun(owner, id, body) {
    const run = this.ownedRun(owner, id);
    if (run.finished) return run.receipt;
    const state = redact({
      status: body.state?.status, text: body.state?.text || '',
      reviewerStatus: body.state?.reviewerStatus, reviewerVerdict: body.state?.reviewerVerdict,
      reviewerReason: body.state?.reviewerReason, reviewerRawText: body.state?.reviewerRawText,
      workerValidationReason: body.state?.workerValidationReason,
      workerFormatRepairApplied: body.state?.workerFormatRepairApplied,
      workerContractRepairApplied: body.state?.workerContractRepairApplied,
    });
    let result;
    if (run.batch) {
      result = this.evaluator.evaluate(run.requestId, state);
      const scores = scoresFor(result, state);
      const scoring = run.span.startSpan({ name: 'Deterministic evaluation', type: 'score', event: { input: state.text, output: result, scores } });
      scoring.end();
      run.span.log({ scores, metadata: { evaluation: result } });
      run.batch.results.push(result);
    }
    run.span.log({ output: state, ...(state.status === 'error' ? { error: state.text } : {}), metadata: { model_call_count: run.events.size } });
    run.span.end();
    await run.parent.flush();
    run.finished = true;
    run.receipt = { recorded: true, url: await run.span.permalink(), ...(result ? { evaluation: result } : {}) };
    return run.receipt;
  }

  async finishExperiment(owner, id) {
    const batch = this.experiments.get(id);
    if (!batch || batch.owner !== owner) throw Object.assign(new Error('Unknown experiment'), { status: 404 });
    if (batch.finished) return batch.receipt;
    await batch.experiment.flush();
    batch.finished = true;
    batch.receipt = { url: batch.url, name: batch.name, metrics: this.evaluator.metrics(batch.results), completedCases: batch.results.length };
    return batch.receipt;
  }

  cleanup() {
    for (const [id, run] of this.runs) {
      if (Date.now() - run.created > 60 * 60 * 1000) {
        if (!run.finished) { run.span.log({ error: 'Browser run interrupted or abandoned' }); run.span.end(); }
        this.runs.delete(id);
      }
    }
    for (const [id, batch] of this.experiments) if (Date.now() - batch.created > 4 * 60 * 60 * 1000) this.experiments.delete(id);
  }
}
