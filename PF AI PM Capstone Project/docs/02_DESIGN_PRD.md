# CasaFlowAI Design PRD

## 1. Agent role

CasaFlowAI is hired to construct and maintain an evidence-grounded, activity-level state for a residential home-extension project, help a small general contractor coordinate parallel work and identify invalid activity transitions, and provide the homeowner with a contractor-approved view of progress, next steps, decisions, and change impacts.

It uses only authorized project information, makes no financial, contractual, regulatory, safety, or professional commitments, and escalates missing or conflicting evidence, low-confidence conclusions, privacy risks, and high-stakes decisions.

The contractor or project lead is the primary operational user. The homeowner is a secondary user who receives approved visibility and may submit questions, concerns, selections, acknowledgments, and supporting information.

**Develop role statement:** CasaFlowAI evaluates contractor-requested activity transitions against an evidence-grounded home-extension project state, recommends the safe next workflow state for contractor review, and escalates missing or conflicting evidence, authority limits, privacy risks, and high-stakes decisions without independently making consequential commitments.

### Develop MVP cutline

The Develop MVP prioritizes:

1. State engine
2. Activity transition evaluation
3. Contractor review experience
4. Project-change approval
5. Read-only homeowner rendering of approved state
6. Scripted homeowner questions
7. At least 20 labeled transition requests

Live homeowner Q&A and the simulated email channel remain documented product capabilities but are outside the core four-minute demo.

The single Develop loop is:

> Authorized contractor attempts a project-board transition or submits a natural chat update → CasaFlowAI automatically preserves the event, extracts claims and intent, loads canonical state, dependencies, inspections, and policies, and evaluates the affected transition → CasaFlowAI produces a review package → contractor approves, corrects, rejects, or escalates → only an explicitly approved state change is applied and audited.

## 2. Target workflow

1. The dataset represents creation of a fictional residential home-extension project using five minimum inputs: contractor email, homeowner email, project address, scope description, and current stage or most recently completed activity. Onboarding is not an interactive Develop screen.

2. CasaFlowAI proposes an initial project model containing workstreams, activities, dependencies, homeowner decisions, recorded requirements, unknowns, and potentially parallel work.

3. Generated information is separated into:

   - Confirmed facts
   - Policy defaults
   - AI inferences
   - Proposed values
   - Unknowns

4. The contractor confirms, corrects, removes, or marks every baseline field unknown. The approved baseline becomes canonical project state.

5. The contractor operates CasaFlowAI through an internal workspace rather than emailing the agent. The contractor may:

   - Select Request Ready, Start Work, Mark Done, Report Blocker, or Correct Status on an activity
   - Chat with CasaFlowAI
   - Upload optional evidence

   Every board action or chat update triggers dependency evaluation automatically; the contractor does not need to ask CasaFlowAI to check.

6. Multiple activities may be active simultaneously. The overall project phase is a summary; each activity has its own progress, data-quality, blocker, applicability, exception, and dependency records.

7. Normal activity progress states are:

   - Not started
   - Ready
   - In progress
   - Reported complete
   - Confirmed complete

   Separate state dimensions are:

   - Record quality: Confirmed, Unknown, or Conflicting
   - Blocker state: Clear or Blocked
   - Applicability: Applicable or Not applicable
   - Exception state: None, Approved soft exception, or Started under unresolved hard requirement

8. A contractor-facing “Mark Done” action becomes a proposed **Reported complete** update. CasaFlowAI evaluates dependencies and evidence before offering **Confirmed complete** for contractor approval.

9. Activity completion and inspection status remain separate. Confirmed complete does not automatically mean that an inspection passed.

10. The homeowner portal may display:

    - Contractor-approved project status
    - Active workstreams
    - Recently completed activities
    - Next expected activities
    - Homeowner decisions
    - Approved schedule or change impacts
    - Shared evidence
    - Project messages

11. The homeowner may submit a question, concern, selection, acknowledgment, or optional attachment. For the Develop MVP, these interactions are scripted inputs rather than a live agent surface.

12. Email is an optional external communication channel between contractor and homeowner. CasaFlowAI may draft an email on the contractor’s behalf, but the core Develop demo does not require a simulated email channel.

13. Every workspace action, scripted portal event, chat message, and upload becomes a source-stamped project event. CasaFlowAI automatically stores extracted atomic claims as Unreviewed without changing canonical state.

14. CasaFlowAI evaluates the requested activity status-including Ready, In Progress, Reported complete, or Confirmed complete-and checks:

    - Applicable prerequisites
    - Parallel activities
    - Blocker scope
    - Hard and soft dependencies
    - Missing or conflicting evidence
    - Required approvals

15. CasaFlowAI produces one of four recommendations:

    1. Proceed
    2. Pause
    3. Needs inspection, permit, or professional review
    4. Needs clarification

16. A blocker applies only to the affected activity, workstream, work area, or project scope identified by the evidence. Unaffected work may continue.

17. For an eligible soft dependency, the contractor may request a scoped exception with a reason, evidence, and acknowledgment. If approved, CasaFlowAI uses recommendation **Proceed**, subtype **Contractor-approved soft exception**, and exception state **Approved soft exception**.

18. CasaFlowAI cannot clear a hard safety, inspection, permit, regulatory, privacy, or professional requirement. A contractor may record that work proceeded, but CasaFlowAI preserves the unresolved requirement and does not endorse the transition.

19. CasaFlowAI creates a contractor review package containing the recommendation, evidence, blockers, proposed state changes, available parallel work, next action, and derived homeowner-view preview.

20. The Develop MVP has one interactive Project-Change Gate. The read-only homeowner portal automatically derives predesignated homeowner-visible fields from approved state. External communication is outside the core loop.

21. CasaFlowAI preserves all previous states, evidence, warnings, exceptions, acknowledgments, corrections, approvals, and rejections.

## 3. Agent loop

### Observe

CasaFlowAI reads:

- Contractor workspace actions and chat messages
- Scripted homeowner submissions
- Optional photos and documents
- Canonical project and activity state
- Activity dependencies
- Contractor-attested Inspection Register
- Homeowner decisions and selections
- Change-order records
- Permit, inspection, plan, and professional-review requirements
- Previous claims, conflicts, exceptions, and escalations
- Role, privacy, communication, dependency, and escalation policies

Every input remains attributed to its source. Photos are optional supporting evidence and cannot independently prove completion, safety, compliance, inspection approval, or regulatory acceptance.

### Decide

CasaFlowAI determines:

1. Which project, activity, workstream, and work area are affected.
2. Whether the actor is authorized for each claim or request.
3. Which source-specific claims were made.
4. Whether the event proposes a canonical state change.
5. Which dependencies apply.
6. Whether each dependency is satisfied, incomplete, missing, conflicting, hard, soft, or not applicable.
7. Whether other work may continue in parallel.
8. Whether a homeowner action is required.
9. Whether an exception is permitted.
10. Whether material evidence is missing or conflicting.
11. Which recommendation and subtype represent the controlling blocker.

Known incomplete prerequisites produce **Pause**. Missing or conflicting prerequisite status produces **Needs clarification**. Unresolved recorded regulatory or professional requirements produce **Needs inspection, permit, or professional review**.

### Act

CasaFlowAI produces:

- Specific operational question
- Proposed recommendation and subtype
- Controlling blocker and blocker scope
- Other unresolved blockers
- Activities that may continue
- Top cited evidence
- Current-versus-proposed state
- Exception availability
- Recommended next action
- Proposed homeowner rendering
- Contractor approval and escalation controls

### Check

Before presenting its output, CasaFlowAI validates:

- Claim grounding and citation accuracy
- Source authority and project matching
- Canonical-state consistency
- Activity dependencies and parallel-work logic
- Blocker scope
- Hard-versus-soft dependency treatment
- Exception eligibility
- Privacy and role-based visibility
- Professional and regulatory boundaries
- Homeowner-view safety
- Recommendation consistency
- One-minute contractor readability

A material validation failure changes the result to the appropriate clarification, review, pause, or refusal state.

## 4. Inputs and context

### Project facts

- `project_baseline.json` - the five onboarding inputs, field classifications, and baseline approval fixture
- `project_state.json` - contractor-approved project summary and activity states
- `activity_dependencies.csv` - workstreams, prerequisites, parallel-work rules, blocking scope, and exception eligibility
- `inspection_register.csv` - project-specific City of San Jose inspection applicability and contractor-attested statuses
- `decision_selection_register.csv` - homeowner decisions and selections
- `change_order_register.csv` - proposed and approved change impacts and approval status
- `project_requirements.csv` - static permit, plan, jurisdiction, weather-tight, professional-review, authorization, and closeout rules
- `event_log.jsonl` - immutable raw source events
- `source_claims.jsonl` - source-specific atomic claims and review status
- `eval_snapshots.jsonl` - isolated, resettable eval starting states
- `homeowner_portal_view.json` - generated homeowner-visible fixture; never agent input or canonical truth

### Activity dependency fields

`activity_dependencies.csv` includes:

- `activity_id`
- `workstream`
- `activity_name`
- `predecessor_activity_ids`
- `required_inspection_ids`
- `dependency_type`
- `parallel_allowed`
- `blocking_scope`
- `exception_allowed`
- `required_authority`

### Synthetic evidence

```text
project_evidence/
  photos/
  documents/
```

Photos are optional. Documents may include the synthetic permit-applicability profile, professional-review records, or material-selection information. Inspection screenshots, permit-card images, and City integrations are outside the MVP.

### Rules

- `state_update_policy.md`
- `dependency_exception_policy.md`
- `authority_escalation_policy.md`
- `communication_privacy_policy.md`
- `project_lifecycle_policy.md`
- `inspection_status_policy.md`

### Examples

- `approved_output_examples.md`

Examples guide style but are never treated as project facts.

All identities, communications, addresses, evidence, and project documents are fictional or appropriately licensed.

## 5. Tools or simulated tools

1. **`submit_project_event`**

   Preserves a raw project-board action, contractor chat update, scripted homeowner event, or optional upload as an immutable source event.

2. **`append_source_claims`**

   Stores automatically extracted atomic claims as Unreviewed without modifying canonical state.

3. **`load_project_context`**

   Loads only the matched fictional project’s authorized state, registers, policies, and history.

4. **`inspect_optional_attachment`**

   Extracts available text and metadata and reports readability and relevance. It cannot authenticate evidence, detect alteration, or certify work.

5. **`apply_approved_project_change`**

   Applies only field-specific, contractor-approved changes to canonical state or project registers.

The read-only homeowner view is derived from approved, predesignated fields rather than published through a separate core tool. Email tools remain future-product capabilities.

Reasoning, intent extraction, state-diff creation, dependency evaluation, and review-package validation remain parts of the agent loop rather than separate tools.

## 6. Memory decision

CasaFlowAI uses explicit, project-scoped memory only.

### Persistent confirmed memory

- Contractor-approved project state
- Multidimensional activity state and dependencies
- Contractor-approved Inspection Register status
- Homeowner decisions and selections
- Change-order statuses
- Recorded project requirements
- Approved soft-dependency exceptions

### Persistent evidence memory

- Workspace and portal events
- Chats and optional attachments
- Source-specific claims
- Approvals, corrections, rejections, and escalations
- Hard-requirement warnings and contractor acknowledgments

### Derived homeowner memory

`homeowner_portal_view.json` is a generated fixture containing only approved homeowner-visible information. It cannot expose unrestricted canonical state or contractor-only information and is never a truth source.

### Temporary working context

Information used during one Observe-Decide-Act-Check cycle is discarded unless explicitly recorded through an approved tool action.

CasaFlowAI has no unrestricted conversational or cross-project memory. It cannot promote an inference, assumption, template dependency, or proposed value into confirmed memory without contractor approval.

If a contractor proceeds despite a hard requirement:

- The activity’s exception state may be recorded as **Started under unresolved hard requirement**.
- The hard requirement remains unresolved.
- CasaFlowAI’s recommendation remains unchanged.
- The acknowledgment and warning remain in the audit history.

## 7. Output format

### Contractor primary review card

The contractor should understand the card in under one minute. It contains:

- Boundary result: Allowed, Refused, or Escalated
- Project and requested activity
- Work area and workstream
- Proposed base recommendation
- Recommendation subtype
- Controlling reason
- Blocker scope
- Other activities that may continue
- Top cited evidence
- Current-versus-proposed state
- Exception state or availability
- Recommended next action
- Proposed homeowner-visible update
- Approval controls

Expandable details contain the full decision path, evidence table, dependency graph, policy checks, pending effects, confidence factors, and audit history.

### Read-only homeowner rendering

The Develop MVP homeowner view shows:

- Contractor-approved project phase
- Active workstreams
- Recently completed activities
- Next expected activities
- Open homeowner decisions
- Approved blockers and next steps
- Approved schedule impacts
- Approved change-impact summaries
- Shared evidence

It does not provide live agent Q&A in the core MVP.

### Full-product homeowner interaction

The complete product may let the homeowner ask CasaFlowAI questions.

CasaFlowAI provides immediate answers only when grounded entirely in approved homeowner-visible state. Missing, conflicting, consequential, sensitive, or high-stakes questions create a contractor review task and receive a neutral acknowledgment.

## 8. Escalation rules

### Low confidence

When confidence is below 80%, or any material prerequisite remains uncertain, CasaFlowAI preserves confirmed state and escalates. Deterministic material gates override confidence.

### Missing data

CasaFlowAI must not recommend Proceed when an activity’s material prerequisite, authority, evidence, dependency, or confirmed status is absent or unknown. It identifies the exact missing fact and the person or source needed to resolve it.

### Dispute, legal, safety, or hostile language

CasaFlowAI preserves the communication, stops normal drafting, gives a neutral acknowledgment when appropriate, and escalates to the contractor or qualified human. Apparent safety or privacy risks receive urgent escalation without waiting for a confidence threshold.

### Out-of-policy request

CasaFlowAI refuses requests involving:

- Unauthorized financial, contractual, scope, or schedule commitments
- Independent regulatory or professional decisions
- Unauthorized disclosure or communication
- Evidence or audit manipulation
- Unauthorized activity or blocker closure

### High stakes

Unresolved failed or unclear inspections, and unresolved or unapproved material scope or cost changes, prevent a Proceed recommendation for the affected activity. A prior failure is resolved only after correction completion and a passed reinspection are separately recorded.

Other high-stakes triggers include apparent injury or danger, structural uncertainty, permit uncertainty, licensed-professional judgment, contractual liability, and possible cross-project data exposure.

### Dependency exceptions

An eligible soft project dependency may receive a contractor-approved, scoped exception when policy permits.

A hard recorded requirement cannot be cleared by CasaFlowAI. If the contractor proceeds, CasaFlowAI records:

- Contractor-reported activity
- Unresolved requirement
- Warning shown
- Contractor acknowledgment
- Actor, reason, scope, and timestamp

CasaFlowAI does not label the action approved, compliant, or recommended.

### Parallel work

CasaFlowAI identifies unaffected work rather than treating the entire project as blocked.

## 9. Human approval point

### Develop MVP Project-Change Gate

The contractor selects the exact canonical state or register fields to approve, correct, reject, or mark unknown.

It is the only interactive approval gate in the core Develop loop and covers proposed activity, Inspection Register, Decision Register, and Change-Order Register changes.

Immutable event preservation, unreviewed claim extraction, and read-only homeowner-view derivation happen automatically. External email is outside the core loop.

The full product may later add separate homeowner-publication and external-communication gates.

### Hard-requirement acknowledgment

This is not an approval or exception gate. It records the contractor’s real-world decision without:

- Clearing the requirement
- Changing the recommendation to Proceed
- Representing the action as accepted or compliant
- Hiding the warning

## 10. Initial eval plan

The five primary cases are documented in `03_EVAL_PLAN.md`.

Evaluation targets:

- Blocker recall of at least 90%
- False-pause rate no greater than 10%
- 100% refusal of prohibited actions in labeled boundary cases
- No unapproved canonical-state updates
- No unsupported claim represented as confirmed fact

The five cases are qualitative design anchors. The Develop set contains 20 isolated, resettable transition cases: 10 project-board and 10 contractor-chat inputs, with 5 safe and 5 blocker cases in each mode. Hidden labels are never provided to the agent.
