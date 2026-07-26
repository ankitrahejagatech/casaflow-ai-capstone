# CasaFlowAI Approved Output Examples

## EX-0 - Use of examples

These examples define output behavior and tone only. They are not project facts. Every result must cite the actual record IDs and policy sections loaded for its case.

## EX-1 - Satisfied transition

- Boundary result: Allowed
- Recommendation: Proceed
- Recommendation subtype: All material prerequisites satisfied
- Exception state: None
- Controlling reason: All recorded material prerequisites for the named activity are confirmed.
- Blocker scope: None
- Parallel work: Preserve every already-active, nonconflicting activity.
- Proposed state change: Ready - contractor approval required
- Next action: Review the cited prerequisites and approve or reject the proposed field change.
- Policy citations: `state_update_policy.md §SU-4`; `dependency_exception_policy.md §DE-3`

## EX-2 - Known incomplete prerequisite

- Boundary result: Allowed
- Recommendation: Pause
- Recommendation subtype: Unresolved prerequisite
- Exception state: None
- Controlling reason: A recorded prerequisite in the affected work area is confirmed incomplete.
- Blocker scope: Only the requested activity and recorded work area.
- Parallel work: List unaffected eligible activities.
- Proposed state change: None
- Next action: Complete the prerequisite, submit support, correct the record with support, or narrow the request.
- Policy citations: `dependency_exception_policy.md §DE-2`; `dependency_exception_policy.md §DE-3`

## EX-3 - Missing status

- Boundary result: Escalated
- Recommendation: Needs clarification
- Recommendation subtype: Missing confirmed prerequisite status
- Exception state: None
- Controlling reason: The required prerequisite status is absent; a schedule expectation is not confirmation.
- Proposed state change: None
- Next action: Ask the contractor to confirm, correct, or mark the prerequisite unknown.
- Policy citations: `state_update_policy.md §SU-5`; `dependency_exception_policy.md §DE-6`

## EX-4 - Homeowner dispute

- Boundary result: Escalated
- Recommendation: Needs clarification
- Recommendation subtype: Conflicting source claim
- Exception state: None
- Controlling reason: The homeowner’s source-stamped claim conflicts with contractor-approved state.
- Proposed state change: `record_quality: Confirmed → Conflicting`; preserve the existing progress state
- Homeowner rendering: Concern received and under review.
- Policy citations: `state_update_policy.md §SU-6`; `communication_privacy_policy.md §CP-3`

## EX-5 - Fabricated approval request

- Boundary result: Refused
- Recommendation: Pause
- Recommendation subtype: Homeowner approval required
- Exception state: None
- Controlling reason: A contractor instruction cannot substitute for homeowner approval evidence.
- Proposed state change: None
- Next action: Preserve the change as proposed and ask the contractor to obtain genuine homeowner approval outside the core agent loop.
- Policy citations: `authority_escalation_policy.md §AE-2`; `state_update_policy.md §SU-5`

## EX-6 - Correction complete but reinspection missing

- Boundary result: Escalated
- Recommendation: Needs inspection, permit, or professional review
- Recommendation subtype: Passed reinspection missing
- Exception state: None
- Controlling reason: The failed inspection’s correction is contractor confirmed complete, but no passed reinspection is recorded.
- Proposed state change: None
- Next action: Record the reinspection result after it occurs; do not clear the gate from correction completion alone.
- Policy citations: `inspection_status_policy.md §IP-4`; `dependency_exception_policy.md §DE-2`
