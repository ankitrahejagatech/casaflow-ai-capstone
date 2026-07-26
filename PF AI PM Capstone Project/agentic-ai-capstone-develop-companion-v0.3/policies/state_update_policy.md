# CasaFlowAI State Update Policy

## SU-1 - Events, claims, and canonical state are separate

Every project-board action, contractor chat update, scripted homeowner event, and optional attachment is preserved as an immutable source event.

CasaFlowAI automatically extracts atomic, source-specific claims and records them as `Unreviewed`. A claim may later be:

- Accepted
- Corrected
- Rejected
- Disputed
- Superseded

Recording an event or claim does not change canonical project state. Existing source events, claims, and audit history must never be deleted, altered, or concealed.

Photos are optional support. A photo alone cannot prove full-scope completion, safety, code compliance, inspection approval, permit acceptance, or professional approval.

## SU-2 - Information classifications and state dimensions

Every extracted or generated value remains labeled as one of:

- Confirmed fact
- Policy default
- AI inference
- Proposed value
- Unknown
- Conflicting

Each activity stores separate dimensions:

- `progress_state`: Not started, Ready, In progress, Reported complete, or Confirmed complete
- `record_quality`: Confirmed, Unknown, or Conflicting
- `blocker_state`: Clear or Blocked
- `applicability`: Applicable or Not applicable
- `exception_state`: None, Approved soft exception, or Started under unresolved hard requirement

`Proposed` describes an unapplied state diff; it is not a canonical progress state.

CasaFlowAI must not convert a default, inference, proposal, schedule expectation, optional photo, or unsupported statement into a confirmed fact.

## SU-3 - Organic activity-state evaluation

A project-board action or contractor chat update automatically triggers evaluation. The contractor does not need to ask CasaFlowAI to check prerequisites.

For a board action, the activity and requested transition are structured inputs. For a chat update, CasaFlowAI must extract the relevant activity claims, readiness intent, and context before evaluating them.

Every transition remains proposed until explicitly approved through the Project-Change Gate.

“Mark Done” creates a proposed `Reported complete` claim. It does not directly produce `Confirmed complete`.

An explicit, authorized contractor attestation may support `Confirmed complete` after its extracted claim and field-specific state change are reviewed and approved. Construction completion and inspection status remain separate.

## SU-4 - Required transition evaluation

For every board or chat event, CasaFlowAI must automatically identify and load:

1. The correct project.
2. An authorized actor.
3. The affected activity, work area, interpreted intent, and proposed state.
4. The latest contractor-approved multidimensional state for the affected activity.
5. Applicable scope and approved-plan information.
6. Recorded construction dependencies and prerequisites.
7. Relevant homeowner decisions and selections.
8. Relevant change orders.
9. Relevant Inspection Register and professional requirements.
10. Material conflicts and open blockers.

Only facts material to the affected activity are required. An optional photo, estimated completion date, crew availability, or unrelated field does not automatically block Proceed.

## SU-5 - Deterministic missing-data rule

CasaFlowAI must not recommend Proceed when a material fact required by SU-4 is absent, unknown, conflicting, inaccessible, or unsupported.

The base recommendation must be exactly one of:

- `Proceed`
- `Pause`
- `Needs clarification`
- `Needs inspection, permit, or professional review`

The controlling gap determines the base recommendation and its separate subtype:

- Known incomplete prerequisite → recommendation `Pause`; subtype `Unresolved prerequisite`
- Required homeowner decision or approval still pending → recommendation `Pause`; subtype `Homeowner approval required`
- Missing or conflicting prerequisite status → `Needs clarification`
- Unresolved inspection, permit, plan, or professional requirement → `Needs inspection, permit, or professional review`
- Prohibited request → apply `authority_escalation_policy.md §AE-2`; refusal changes `boundary_result`, not the four-value recommendation enum

CasaFlowAI must identify the exact missing fact and the person or record needed to resolve it. A confidence score cannot override this rule.

## SU-6 - Conflicting claims

A new claim that conflicts with canonical state must be recorded as a conflict, not used to silently overwrite the state.

CasaFlowAI must:

- Preserve both claims and their sources.
- Propose `record_quality: Conflicting` for the affected field or activity.
- Preserve the existing `progress_state` until contractor review resolves the conflict.
- Recommend `Needs clarification`.
- Keep unrelated confirmed state unchanged.
- Identify what human clarification can resolve the conflict.

A scripted homeowner objection is evidence of a dispute, not proof that either construction claim is correct.

## SU-7 - Applying approved changes

Only `apply_approved_project_change` may modify canonical activity state or a project register.

Before applying a change, CasaFlowAI must verify:

- The approver is an authorized contractor or project lead.
- Approval is field-specific.
- Approved values match the displayed proposal.
- Supporting source events and claims remain available.
- No new material conflict has arrived.
- The action remains allowed by all policies.
- The approval has not already been applied.

Recommendation approval alone does not approve a state change. Every approval, correction, rejection, and applied change must be appended to the audit log.

## SU-8 - Develop MVP approval scope

The Project-Change Gate is the only interactive approval gate in the core Develop loop. It covers activity, Inspection Register, Decision Register, and Change-Order Register changes.

Automatic event preservation, claim extraction, dependency evaluation, and read-only portal derivation do not require separate approvals. External communication is outside the core loop.
