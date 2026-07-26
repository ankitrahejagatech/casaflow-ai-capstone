# CasaFlowAI Dependency and Exception Policy

## DE-1 - Dependency classification

Each applicable dependency must be classified as:

- Satisfied
- Known incomplete
- Missing
- Conflicting
- Not applicable
- Hard requirement
- Eligible soft dependency

CasaFlowAI must use the project’s recorded dependency data. It must not invent a dependency from a generic construction sequence or ignore a project-specific dependency.

## DE-2 - Recommendation mapping

Use the following deterministic mapping:

- All material dependencies satisfied → `Proceed`
- Known incomplete operational prerequisite → recommendation `Pause`; subtype `Unresolved prerequisite`
- Missing or conflicting dependency status → `Needs clarification`
- Unresolved inspection, permit, approved-plan, regulatory, safety, or professional requirement → `Needs inspection, permit, or professional review`

Unresolved failed or unclear inspections and unresolved material scope or cost changes prevent Proceed for the affected activity.

After a failed inspection, correction completion alone is insufficient. The gate remains unresolved until a passed reinspection is also recorded under `inspection_status_policy.md §IP-4`.

Evaluate unmet prerequisites in causal order. When prerequisite construction work is incomplete and its downstream inspection is merely not yet eligible, the incomplete work is the controlling gap and produces recommendation `Pause` with subtype `Unresolved prerequisite`. Use `Needs inspection, permit, or professional review` when the applicable inspection or professional action is currently due, failed, unclear, or otherwise independently unresolved.

## DE-3 - Scoped blockers and parallel work

A blocker applies only to the activity, work area, workstream, or project scope identified by the evidence.

CasaFlowAI must separately list unaffected activities that may continue when their own prerequisites are satisfied. It must not represent the entire project as stopped merely because one activity is blocked.

Parallel work does not allow one activity to bypass its own dependency.

## DE-4 - Soft dependency exceptions

CasaFlowAI may offer a soft exception only when:

- The dependency record explicitly permits an exception.
- No hard requirement is involved.
- The contractor is authorized.
- The exception has a stated reason and scope.
- Supporting evidence is identified.
- The contractor acknowledges the stated risk.
- The exception does not create a prohibited financial, contractual, regulatory, safety, privacy, or professional decision.

After field-specific contractor approval, the result may be:

- Recommendation: `Proceed`
- Recommendation subtype: `Contractor-approved soft exception`
- Exception state: `Approved soft exception`

The exception and acknowledgment must be audited and must not clear unrelated blockers.

## DE-5 - Hard requirements

No exception can clear a hard safety, inspection, permit, approved-plan, regulatory, privacy, or licensed-professional requirement.

If a contractor chooses to proceed despite a hard requirement, CasaFlowAI may record only:

- `exception_state: Started under unresolved hard requirement`
- The unresolved requirement
- The warning shown
- The contractor’s reason and acknowledgment
- Actor, scope, and timestamp

CasaFlowAI’s recommendation must remain non-Proceed. The record must not describe the action as approved, accepted, compliant, or recommended.

## DE-6 - Completion transitions

A construction dependency on confirmed completion is not satisfied by:

- A schedule expectation
- Crew availability
- A `Reported complete` status
- An optional photo alone
- A homeowner statement
- A contractor statement that has not passed through the Project-Change Gate

An explicit authorized contractor statement may become a contractor-approved construction fact only after its claim and field-specific change are reviewed through the Project-Change Gate.

Inspection attestations follow `inspection_status_policy.md`; construction completion never implies an inspection result.
