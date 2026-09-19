# Braintrust observability and evaluation

The [Railway demo](https://illustrious-exploration-production-ec63.up.railway.app/) records synthetic model runs in the private [CasaFlowAI Braintrust project](https://www.braintrust.dev/app/Ankit%27s%20Evaluation%20Projects/p/CasaFlowAI). The dashboard requires workspace access. Publishing this link does not grant access or reveal the API key.

## Use it

1. Open the Railway demo. In **CasaFlowAI SiteOps → Decision quality**, confirm **Braintrust connected**.
2. Run a contractor update or an individual synthetic case. The status area supplies **View trace** when recording succeeds.
3. Select **Run all 20 cases**. This makes fresh worker and reviewer calls, saves a versioned synthetic dataset, and creates a private Braintrust experiment. Keep the tab open until all cases finish.
4. Open **View experiment** to compare inputs, expected labels, model outputs, scores, token usage, and timing. The first five cases also populate the product's primary evaluation cards; human verdicts remain manual.

Model credentials remain visitor-supplied in the existing browser settings. Braintrust does not supply the model inference for these runs.

## Recorded data and scores

Each run contains its synthetic project context, worker and reviewer request bodies and responses, model identifiers, start/end timing, provider token usage, repairs, and errors. Transport headers and model/API keys are excluded; accidental credential patterns in text are scrubbed before logging. Only synthetic demo inputs belong in this public prototype.

The server reuses the prototype's parser, citation validator, context builder, and evaluator. Expected labels are stored separately and are never included in the model's case context. Only the 20 canonical benchmark cases receive benchmark scores; operational board updates are traces, not labeled benchmark examples.

| Score | Meaning |
|---|---|
| `valid_grounded_output` | Output parses and passes the existing grounding checks. |
| `deterministic_contract` | Grounding and the additional output-contract checks pass. |
| `exact_label_match` | Boundary, recommendation, and subtype all match. |
| `blocker_classification` | Blocker-versus-safe decision is correct. |
| `blocker_recall` | Correct non-Proceed result, scored only on the 10 blocker cases. |
| `false_pause_rate` | Failure to return a valid Allowed + Proceed, scored only on the 10 safe cases; lower is better. |
| `reviewer_completed` | Independent reviewer completed; this is not a human approval or quality verdict. |

Inference errors and invalid outputs count conservatively. Partial experiments are not a full-suite pass. Braintrust recording failures display an incomplete-trace notice and do not prevent the existing model workflow from completing.

## Run and deploy

The optional Node.js server adds recording to the single-file prototype. Opening `index.html` directly, or using GitHub Pages, still runs the prototype but cannot use the server's Braintrust secret.

```sh
npm ci
npm test
npm start
```

Set these variables in the server environment or Railway service variables:

- `BRAINTRUST_API_KEY`: a private Braintrust key; never put its value in code, a commit, the browser, or documentation.
- `BRAINTRUST_PROJECT`: `CasaFlowAI`.
- `PORT`: optional locally; Railway supplies it.

The Node server reads environment variables directly; it does not automatically load `.env`. `.env.example` documents variable names only. The Railway Dockerfile installs the pinned SDK and serves only the application and recording endpoints. `/healthz` reports the HTML version and whether recording is configured, without disclosing credentials.

Railway currently deploys through the CLI rather than GitHub automatic deployment. A repository merge alone does not update the running service. Deploy this repository's root to the existing service with `railway up` after selecting the correct project, environment, and service.

`server/client-snippet.js` is inlined into both HTML entry points with `node scripts/sync-observability.mjs`; keep the files synchronized. The evaluator's extraction boundaries are tested at server startup and in `npm test`.

## Prototype limits

The recording endpoint has same-origin checks, short-lived session ownership, body limits, and per-session/IP/global budgets. It has no production user authentication. Submitted telemetry is therefore demo evidence, not an authenticated audit log. Run state is held in memory: use one replica and avoid restarting or redeploying during a benchmark. Sessions expire after four hours; reload before beginning another session. Rotate the approved 90-day key in Railway before it expires.

This integration does not change the locked prompts, decision policies, model choices, or contractor approval rules. It does not authorize production data or autonomous construction decisions.
