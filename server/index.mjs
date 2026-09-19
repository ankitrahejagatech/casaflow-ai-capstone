import http from 'node:http';
import { readFileSync } from 'node:fs';
import { randomBytes, createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { loadEvaluator } from './evaluator.mjs';
import { Observability, PROJECT_URL } from './observability.mjs';

const htmlPath = fileURLToPath(new URL('../index.html', import.meta.url));
const html = readFileSync(htmlPath);
const version = createHash('sha256').update(html).digest('hex').slice(0, 12);
const evaluator = loadEvaluator(htmlPath);
const failures = Object.values(evaluator.selfTests()).flat();
if (failures.length) throw new Error('Evaluator self-tests failed');
const obs = new Observability(evaluator, { version });
const sessions = new Map();
const budgets = new Map();
let globalDay = '', globalEvents = 0;

function reply(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
  res.end(JSON.stringify(body));
}
function fail(message, status) { throw Object.assign(new Error(message), { status }); }
function budget(req) {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== globalDay) { globalDay = today; globalEvents = 0; budgets.clear(); }
  if (++globalEvents > 5000) fail('Daily demo telemetry limit reached', 429);
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0];
  const entry = budgets.get(ip) || { since: Date.now(), count: 0 };
  if (Date.now() - entry.since > 3600000) { entry.since = Date.now(); entry.count = 0; }
  if (++entry.count > 1000) fail('Demo telemetry rate limit reached', 429);
  budgets.set(ip, entry);
}
async function bodyOf(req) {
  if (!String(req.headers['content-type']).startsWith('application/json')) fail('JSON required', 415);
  let size = 0;
  const chunks = [];
  for await (const part of req) {
    size += part.length;
    if (size > 768 * 1024) fail('Request too large', 413);
    chunks.push(part);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { fail('Invalid JSON', 400); }
}
function authorizedSession(req) {
  const host = req.headers.host;
  let origin;
  try { origin = new URL(req.headers.origin).host; } catch { fail('Same-origin requests required', 403); }
  if (origin !== host) fail('Origin mismatch', 403);
  const token = req.headers['x-casaflow-session'];
  const session = sessions.get(token);
  if (!session || session.expires < Date.now()) fail('Telemetry session expired; reload the app', 401);
  return { token, session };
}

const server = http.createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if ((req.method === 'GET' || req.method === 'HEAD') && (pathname === '/' || pathname === '/index.html')) {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', 'referrer-policy': 'strict-origin-when-cross-origin', 'x-frame-options': 'SAMEORIGIN' });
      res.end(req.method === 'HEAD' ? undefined : html); return;
    }
    if (req.method === 'GET' && pathname === '/healthz') { reply(res, 200, { ok: true, version, observabilityConfigured: obs.enabled }); return; }
    if (!pathname.startsWith('/api/observability/')) { reply(res, 404, { error: 'Not found' }); return; }
    budget(req);
    if (req.method === 'GET' && pathname === '/api/observability/config') {
      if (!obs.enabled) { reply(res, 200, { enabled: false, version }); return; }
      await obs.ready();
      if (sessions.size >= 300) fail('Demo session limit reached', 429);
      const token = randomBytes(24).toString('base64url');
      sessions.set(token, { expires: Date.now() + 4 * 3600000, experiments: 0, runs: 0 });
      reply(res, 200, { enabled: true, token, projectUrl: PROJECT_URL, version }); return;
    }
    if (req.method !== 'POST' || !obs.enabled) { reply(res, 405, { error: 'Not available' }); return; }
    const { token, session } = authorizedSession(req);
    const body = await bodyOf(req);
    if (pathname === '/api/observability/experiments') {
      if (++session.experiments > 5) fail('Demo experiment limit reached', 429);
      reply(res, 200, await obs.startExperiment(token, body.models)); return;
    }
    if (pathname === '/api/observability/runs') {
      if (++session.runs > 120) fail('Demo run limit reached', 429);
      reply(res, 200, await obs.startRun(token, body)); return;
    }
    const runMatch = pathname.match(/^\/api\/observability\/runs\/([\w-]+)\/(calls|finish)$/);
    if (runMatch) {
      reply(res, 200, runMatch[2] === 'calls' ? await obs.addCall(token, runMatch[1], body) : await obs.finishRun(token, runMatch[1], body)); return;
    }
    const experimentMatch = pathname.match(/^\/api\/observability\/experiments\/([\w-]+)\/finish$/);
    if (experimentMatch) { reply(res, 200, await obs.finishExperiment(token, experimentMatch[1])); return; }
    reply(res, 404, { error: 'Not found' });
  } catch (error) {
    // Provider/SDK errors may contain credentials or trace payloads; never echo them.
    reply(res, error.status || 503, { error: error.status ? error.message : 'Braintrust is unavailable. The model workflow can continue; telemetry was not confirmed.' });
  }
});
setInterval(() => {
  for (const [token, session] of sessions) if (session.expires < Date.now()) sessions.delete(token);
  obs.cleanup();
}, 60000).unref();
server.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log(`CasaFlowAI ${version} listening; Braintrust ${obs.enabled ? 'configured' : 'disabled'}`));
