import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Reuse the prototype's actual context builder, parser, citation validator and
// evaluator. No copied label rules, mock model outputs, or browser boot code.
export function loadEvaluator(htmlPath) {
  const html = readFileSync(htmlPath, 'utf8');
  const start = html.indexOf('    const DEFAULT_WORKER_MODEL =');
  const end = html.indexOf('    const groundingSafetySelfTests =');
  if (start < 0 || end <= start) throw new Error('Application evaluator boundary missing');
  const sandbox = {
    localStorage: { getItem: () => null },
    window: { CasaFlowModelStore: { fingerprint: () => 'server' } },
  };
  vm.runInNewContext(html.slice(start, end) + `
    globalThis.evaluator = {
      requests: transitionRequests,
      labels: transitionLabels,
      context: requestId => buildAgentCaseContext(transitionRequests.find(r => r.request_id === requestId)),
      evaluate: (requestId, state) => {
        const request = transitionRequests.find(r => r.request_id === requestId);
        if (!request) throw new Error('Unknown benchmark case');
        const result = evaluateTransitionRun(request, state);
        const parsed = parseLabeledAgentOutput(state.text || '');
        const warnings = parsed.ok ? outputQualityWarnings(parsed.values, request, citationReviewForOutput(parsed.values, request)) : ['Invalid output format'];
        return {...result, contractValid: parsed.ok && !warnings.length, contractWarnings: warnings};
      },
      metrics: calculateTransitionMetrics,
      selfTests: () => ({
        contract: runTransitionContractSelfTests(),
        isolation: runEvaluatorIsolationSelfTests(),
      }),
    };
  `, sandbox, { timeout: 10000 });
  return sandbox.evaluator;
}

export function scoresFor(result, state) {
  return {
    valid_grounded_output: Number(result.valid),
    deterministic_contract: Number(result.valid && result.contractValid),
    exact_label_match: Number(result.valid && result.exactMatch),
    blocker_classification: Number(result.valid && result.blockerCheckPass),
    ...(result.groundTruthHasBlocker
      ? { blocker_recall: Number(result.valid && result.predictedHasBlocker) }
      : { false_pause_rate: Number(!(result.valid && result.actualBoundary === 'Allowed' && result.actualRecommendation === 'Proceed')) }),
    reviewer_completed: Number(state.reviewerStatus === 'complete'),
  };
}
