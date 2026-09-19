# Braintrust verification — September 19, 2026

These are fresh model calls from the [live Railway product](https://illustrious-exploration-production-ec63.up.railway.app/), using `claude-haiku-4-5` for the worker and `claude-sonnet-5` for the independent reviewer. The records below require authorized Braintrust workspace access.

## Live trace

[Open the verified operational trace](https://www.braintrust.dev/app/Ankit%27s%20Evaluation%20Projects/p/CasaFlowAI/logs?r=ef9abd81b2e2fbe8d137fa00d200f2af&s=ae6e6d45ea5d4979).

- Request: `OPS-A016-002`, propose insulation from Not started to Ready.
- Result: **Pause — Unresolved prerequisite** because Electrical rough-in remains In progress.
- Independent reviewer: **Looks right**.
- Braintrust visibly contains the worker and reviewer child spans, their request/response content, **52,254 tokens**, and **17.94 seconds** total duration.
- The activity board and inspection register remained unchanged by the recommendation.
- A separate Proceed regression confirmed rough plumbing stayed Ready until the synthetic contractor approval, then changed to In progress and appeared in the homeowner view.
- An earlier transient Anthropic connection failure is retained as an error trace. The retry succeeded; the failed attempt was not discarded.

## Fresh 20-case experiment

[Open the experiment](https://www.braintrust.dev/app/Ankit%27s%20Evaluation%20Projects/p/CasaFlowAI/experiments/CasaFlowAI-20-cases-2026-09-19T23-02-39-370Z-768c5e).

Experiment ID: `6ef0f924-f449-4f12-9a49-45912cb6c0a5`. Recorded application HTML version: `8fd056b077c6`. Dataset: **CasaFlowAI synthetic transitions (20 cases)**. Expected labels are stored separately from model inputs. Scores are calculated on the server using the existing prototype evaluator.

Completed at 4:08 PM Pacific on September 19, 2026. The product and Braintrust both recorded all 20 scored cases.

| Metric | Fresh result | Gate |
|---|---|---|
| Blocker recall | **10/10 — 100%** | At least 90% |
| False-pause rate | **0/10 — 0%** | At most 10% |
| Exact boundary/recommendation/subtype match | **15/20 — 75%** | At least 75% |
| Valid grounded outputs | **20/20** | 20/20 |
| Model-run errors or invalid outputs | **0** | 0 |

Braintrust also shows **100% deterministic-contract validity**, **100% reviewer completion**, **44 LLM calls** (including repairs), **967,286 tokens**, and **zero LLM errors**.

The measured synthetic gates passed. Five exact-label mismatches remain, all in the subtype field; boundary and recommendation match in each row:

| Case | Expected subtype | Actual subtype |
|---|---|---|
| TR-010 | Parallel activity prerequisites satisfied | All material prerequisites satisfied |
| TR-014 | Passed reinspection missing | Inspection unresolved |
| TR-016 | Unrelated decision does not block | All material prerequisites satisfied |
| TR-019 | Final inspection correction open | Inspection unresolved |
| TR-020 | Passed final reinspection | All material prerequisites satisfied |

Matching the broad decision does not establish that every next action or resolver is correct. These rows remain marked **Mismatch · classify impact** in the product for human review. The first five cases updated the primary evaluation cards from these same fresh calls; their human verdicts remain a separate manual step.

## Implementation checks

Seven automated tests pass: synchronized/parsing standalone entry points; all 20 contexts isolated from evaluator labels; conservative error scoring; credential scrubbing/token metrics; persistent incomplete-upload warnings; trace ownership and duplicate handling; and canonical experiment scoring with partial-run handling. `git diff --check` also passes.

The integration preserves the already-deployed product's model routing, prompts, policy rules, and contractor gates. Subsequent upload-warning and metadata-redaction improvements do not change model inputs, responses, or scoring. The repository includes the previously deployed product snapshot so a new deployment preserves the current experience.

This is a small synthetic evaluation, not production validation. Automated scores and reviewer verdicts do not substitute for human review or permit real project data in the public demo.
