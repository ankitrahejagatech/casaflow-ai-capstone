# CasaFlowAI Discovery PRD

## Product name

**CasaFlowAI**

## Workflow / project choice

Evidence-grounded activity-transition evaluation for an active residential home-extension project. Maintaining approved project state and detecting blockers are supporting capabilities within this workflow.

## 1. User

The primary user is the owner or project lead at a small residential general contractor with approximately 1-30 employees. This user coordinates active home-extension projects while communicating with homeowners, subcontractors, inspectors, suppliers, and licensed professionals.

The user needs a reliable way to understand project status and identify unresolved dependencies without repeatedly reconstructing the project from scattered messages, photos, documents, notes, and memory.

## 2. Workflow

The recurring workflow is evaluating one contractor-requested activity transition against the evidence-grounded current state of an active residential home-extension project.

CasaFlowAI maintains the approved project state from source-stamped project events and supporting evidence. When the contractor requests a transition, CasaFlowAI determines whether that activity can proceed or an unresolved dependency must be addressed first.

CasaFlowAI produces one of four recommendations:

1. Proceed
2. Pause
3. Needs inspection, permit, or professional review
4. Needs clarification

The recommendation subtype carries the specific reason, such as **Unresolved prerequisite** or **Homeowner approval required**; it does not create another recommendation value.

It explains its reasoning, cites the evidence it used, identifies affected and unaffected work, proposes state changes, and prepares the next human-reviewable action.

## 3. Trigger

For the Develop MVP, the workflow begins whenever an authorized contractor or project lead attempts a project-board status transition or submits a contractor-chat update.

The contractor states what happened or what they intend to do; they do not need to ask CasaFlowAI to check. CasaFlowAI automatically extracts the relevant claims and transition intent, loads the affected dependencies, and evaluates the request.

Scripted, source-stamped homeowner questions, objections, selections, or non-approvals may appear as evaluation-case context, but the MVP homeowner portal is read-only and does not independently trigger the agent.

## 4. Current process

1. The contractor receives information from job-site observations, subcontractors, homeowners, inspectors, photos, messages, permits, and personal notes.
2. The contractor mentally reconstructs what has changed.
3. The contractor decides whether a project milestone or activity is ready to advance.
4. The contractor searches earlier messages or documents when a prerequisite is uncertain.
5. The contractor manually follows up on homeowner decisions, inspections, materials, or change orders.
6. The contractor communicates status through phone calls, texts, email, or messaging applications.
7. The homeowner asks follow-up questions about stage, schedule, delays, costs, and required decisions.
8. There is usually no consistently maintained, source-traceable record showing parallel work, confirmed status, unknowns, conflicting claims, and open blockers.

## 5. Pain points

Project information is fragmented across communications, documents, photos, and memory. This makes it easy to miss blockers or discover them too late.

Common blockers include:

- Incomplete prerequisite work
- Outstanding homeowner selections or approvals
- Unapproved change orders
- Pending or unclear inspections
- Permit or approved-plan uncertainty
- Professional-review requirements
- Missing materials
- Conflicting contractor and homeowner understandings

A missed blocker can leave crews unable to proceed, force subcontractor rescheduling, increase coordination work, delay the project, create unexpected costs, frustrate the homeowner, and produce disputes.

## 6. Agent opportunity

CasaFlowAI can:

- Construct an initial project model from minimal raw information
- Keep activity-level state current from project events
- Preserve source, timestamp, role, and evidence provenance
- Separate claims from confirmed facts
- Track parallel activities and scoped blockers
- Detect missing or conflicting information
- Evaluate requested activity transitions
- Identify work that may continue despite a scoped blocker
- Recommend the appropriate workflow state
- Cite the evidence supporting its recommendation
- Propose field-level state changes
- Prepare contractor and homeowner-facing outputs

CasaFlowAI advises, drafts, and records. It does not independently make financial, contractual, safety, regulatory, code, inspection, scheduling, or licensed-professional decisions.

## 7. Synthetic data plan

The demonstration will use one completely fictional residential home-extension project.

Synthetic data will include:

- Fictional contractor and homeowner identities
- Fictional project address and scope
- City of San Jose synthetic permit and inspection-applicability profile
- Organic project-board actions and contractor-chat messages
- Scripted homeowner events
- Optional synthetic or appropriately licensed photos
- Immutable source events and atomic source-specific claims
- Multidimensional activity state and dependency records
- A separate contractor-attested Inspection Register
- Homeowner decision and selection records
- Change-order records
- Simplified permit, schedule, and professional-review records
- Policy files
- Twenty labeled evaluation cases with isolated resettable snapshots

The project uses a synthetic City of San Jose inspection profile. Inspection screenshots and municipal integrations are outside the MVP. `Passed - contractor confirmed` records the contractor’s reported status; CasaFlowAI does not independently declare code compliance or City verification.

## 8. Human boundary

CasaFlowAI is an advisor and coordinator, not an autonomous project manager.

Without explicit human approval, it must never:

- Approve or reject a change order
- Authorize spending, purchases, payments, or bids
- Change project scope
- Commit to a schedule or completion date
- Schedule subcontractors, inspections, or deliveries
- Make engineering, architectural, structural, electrical, plumbing, mechanical, safety, or code decisions
- Determine permit compliance or independently declare an inspection passed
- Replace an inspector or licensed professional
- Submit or modify official permit or inspection records
- Send external communication
- Publish restricted information to the homeowner
- Mark contractually or legally significant work complete
- Delete or conceal evidence or audit history

Photos are supporting evidence only. They cannot independently prove completion, safety, code compliance, inspection approval, or regulatory acceptance.

If a contractor proceeds despite a hard unresolved requirement, CasaFlowAI may record the contractor’s decision but must preserve the requirement, warning, actor, reason, scope, and timestamp. It does not endorse or clear the transition.

## 9. Success metric

The primary metric is blocker recall:

> CasaFlowAI must correctly flag at least 90% of labeled cases containing a genuine unresolved blocker.

The guardrail metric is false-pause rate:

> No more than 10% of genuinely safe-to-proceed cases should be incorrectly paused.

Additional deterministic targets:

- No unapproved canonical-state updates
- No unauthorized fields exposed in the derived homeowner view
- No unapproved external communication
- No unsupported claim represented as confirmed fact
- 100% refusal of prohibited actions in labeled boundary cases

The five primary scenarios are qualitative design anchors. A labeled set of at least 20 transition requests is required before calculating recall and false-pause rates.

## 10. Initial demo idea

The four-minute Develop demo should focus on one contractor surface:

1. Show the confirmed project state and parallel activities.
2. Submit an organic contractor chat update and show automatic evaluation producing Proceed.
3. Attempt a project-board status transition and show a scoped Pause while unrelated work remains available.
4. Demonstrate a conflicting or missing-data case producing Needs clarification.
5. Briefly show the read-only homeowner view reflecting only approved state.
6. Show aggregate results from at least 20 labeled transition requests.

Project onboarding is represented in synthetic data but excluded from the interactive demo. Live homeowner Q&A, real email integration, payments, scheduling optimization, authentication, and multi-project management are outside the core demo.
