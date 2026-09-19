// This source is inlined into both standalone prototypes by scripts/sync-observability.mjs.
// Model keys never enter this object or its requests.
window.CasaFlowObservability = (() => {
  let configPromise;
  let currentExperiment = null;
  const status = (message, url, label) => {
    const node = document.getElementById('braintrust-status');
    if (!node) return;
    node.replaceChildren(document.createTextNode(message));
    if (url) {
      const link = document.createElement('a');
      link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.textContent = ' ' + label;
      node.append(link);
    }
  };
  async function ready() {
    if (!configPromise) configPromise = (async () => {
      if (!/^https?:$/.test(location.protocol)) { status('Open the Railway demo to record traces in Braintrust.'); return { enabled: false }; }
      try {
        const response = await fetch('/api/observability/config', { signal: AbortSignal.timeout(15000) });
        if (!response.ok) { status('Open the Railway demo to record traces in Braintrust.'); return { enabled: false }; }
        const config = await response.json();
        status(config.enabled ? 'Braintrust connected. New runs record model calls and evaluation results.' : 'Braintrust is not configured on this host.', config.projectUrl, 'Open Braintrust');
        return config;
      } catch {
        status('Braintrust is unavailable on this host. Model runs still work.');
        return { enabled: false };
      }
    })();
    return configPromise;
  }
  async function post(path, body) {
    const config = await ready();
    if (!config.enabled) return null;
    const response = await fetch('/api/observability/' + path, {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-casaflow-session': config.token },
      body: JSON.stringify(body), signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error('Telemetry could not be confirmed');
    return response.json();
  }
  async function safe(action) {
    try { return await action(); } catch {
      if (currentExperiment) currentExperiment.incomplete = true;
      status('Braintrust upload was not confirmed. This run may have an incomplete trace; model results remain available here.');
      return null;
    }
  }
  return Object.freeze({
    ready,
    start: async (request, input, models, experimentId) => safe(async () => {
      const result = await post('runs', { requestId: request.request_id, input, models, experimentId });
      if (result) status('Recording ' + request.request_id + ' in Braintrust.', result.url, 'View trace');
      return result;
    }),
    call: async (trace, call) => {
      if (!trace) return;
      const result = await safe(() => post('runs/' + trace.id + '/calls', call));
      if (!result) trace.incomplete = true;
    },
    finish: async (trace, state) => {
      if (!trace) return;
      const result = await safe(() => post('runs/' + trace.id + '/finish', { state }));
      if (result && !trace.incomplete) status('Latest run recorded in Braintrust.', result.url, 'View trace');
    },
    startExperiment: async models => {
      currentExperiment = await safe(() => post('experiments', { models }));
      if (currentExperiment) status('Recording a fresh 20-case evaluation.', currentExperiment.url, 'View experiment');
      return currentExperiment;
    },
    finishExperiment: async experiment => {
      if (!experiment) return;
      const result = await safe(() => post('experiments/' + experiment.id + '/finish', {}));
      if (result) {
        const warning = experiment.incomplete ? 'Some trace uploads were not confirmed. ' : '';
        status(`${warning}${result.completedCases}/20 cases scored in Braintrust. Blocker recall ${Math.round(result.metrics.blockerRecall * 100)}%; false pauses ${Math.round(result.metrics.falsePauseRate * 100)}%; exact labels ${Math.round(result.metrics.exactAccuracy * 100)}%.`, result.url, 'View experiment');
        const link = document.getElementById('braintrust-experiment');
        if (link) { link.href = result.url; link.hidden = false; }
      }
      currentExperiment = null;
    },
  });
})();
window.CasaFlowObservability.ready();
