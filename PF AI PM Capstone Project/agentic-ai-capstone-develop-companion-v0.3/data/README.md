# CasaFlowAI Synthetic Data

Every person, company, address, permit, activity, decision, event, and date in this folder is fictional and exists only for the CasaFlowAI capstone prototype.

## MVP scope

- Jurisdiction: City of San Jose
- Project: one synthetic 620-square-foot single-story rear home extension
- Rough-trade scope: plumbing, electrical, and mechanical/HVAC
- Contractor inputs: project-board actions and contractor chat
- Homeowner experience: read-only rendering of approved homeowner-visible state
- Interactive approval: one Project-Change Gate
- Inspection verification: contractor attestation only; no screenshots or municipal integration
- Final closeout: one composite Final inspection followed by homeowner handoff
- Onboarding: represented in data but excluded from the interactive Develop demo

## Agent-visible data

- `project_baseline.json` - the five raw onboarding inputs, generated-field classifications, and recorded baseline approval
- `project_state.json` - contractor-approved canonical activity state using separate progress, quality, blocker, applicability, and exception dimensions
- `activity_dependencies.csv` - project-specific construction dependencies, parallel-work rules, and inspection references
- `inspection_register.csv` - project-specific San Jose inspection applicability and contractor-attested statuses
- `decision_selection_register.csv` - homeowner decisions and material selections
- `change_order_register.csv` - proposed and approved synthetic changes with status provenance and field-review provenance
- `project_requirements.csv` - static permit, plan, jurisdiction, weather-tight, professional, authorization, and closeout rules
- `event_log.jsonl` - immutable raw source events
- `source_claims.jsonl` - historical atomic claims and review status; incoming eval-event claims are not pre-extracted
- `evidence_catalog.csv` - source and provenance metadata
- `homeowner_portal_view.json` - generated read-only fixture; never an independent truth source

## Evaluation isolation

The 20 transition cases are independent snapshots of the same fictional project:

- `transition_requests.csv` indexes the trigger event and input mode.
- `eval_snapshots.jsonl` contains a neutral, resettable starting state for each case.
- `transition_labels.csv` contains hidden extraction and decision ground truth.
- `eval_cases.csv` documents the five primary qualitative demo anchors.

Before every eval, the prototype resets to that case’s snapshot. Running one case must not change another.

Each snapshot is a synthetic, contractor-approved canonical reset fixture for that eval, not a new incoming claim. Its rows are citeable as `snapshot_id/record_id`. Activity, inspection, decision, change-order, and requirement values override the corresponding current values in the global registers for that eval only. The reset fixture may condense older setup history; material scenario-specific changes retain explicit source and approval events. Omitted activity dimensions inherit the snapshot’s `activity_dimension_defaults`; a case may preserve a valid last-known progress value while marking its `record_quality` as `Unknown` or `Conflicting`.

Only the events in `available_event_ids` and evidence in `available_evidence_ids` belong to the case’s pre-event context. A historical claim may be loaded only when its `event_id` is available and, when it has an `approval_event_id`, that approval event is also available. The trigger event is supplied separately after the reset and is never included in its own pre-event snapshot. All paths in `evidence_catalog.csv` resolve from the companion folder.

The agent may receive the selected transition-request index row, its raw trigger event, its matching snapshot overlay, whitelisted evidence, applicable project records, and policies. It must never receive:

- `transition_labels.csv`
- Expected-result columns from `eval_cases.csv`
- Another case’s post-run state
- Events or evidence omitted from the case’s allowlists
- Claims whose source or approval event is omitted from the case’s event allowlist

## Balanced labeled set

The 20 cases contain:

- 10 project-board inputs: 5 safe and 5 blocker
- 10 contractor-chat inputs: 5 safe and 5 blocker
- 10 safe-to-proceed cases total
- 10 genuine-blocker cases total
- 5 primary demo anchors

## Decision-output contract

`recommendation` is exactly one of four values:

- `Proceed`
- `Pause`
- `Needs clarification`
- `Needs inspection, permit, or professional review`

`recommendation_subtype`, `boundary_result`, `exception_state`, and `reason_code` are independent fields. For example, a missing homeowner approval is `Pause` with subtype `Homeowner approval required`; a permitted soft exception remains `Proceed` with exception state `Approved soft exception`.

## State-maintenance contract

The evaluated loop is:

> Raw board or chat event → immutable evidence → unreviewed atomic claims → dependency and inspection evaluation → proposed multidimensional state change → contractor approval

Recording an event or claim is automatic. A `source_event` never changes canonical state. Canonical promotion requires a separate immutable `approval_event` from the Project-Change Gate, including the approved source IDs, claim IDs, and field-level differences.

## Inspection contract

Construction completion and inspection status are separate. `Passed - contractor confirmed` means the contractor reported the result and approved the register change; it is not a CasaFlowAI declaration of code compliance or City verification.

After a failed inspection, the affected gate remains unsatisfied until both correction completion and a passed reinspection are separately recorded.
