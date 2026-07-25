# CasaFlowAI Discovery PRD

## Product name

**CasaFlowAI**

## Workflow / project choice

Residential home-extension project state maintenance, activity-transition evaluation, and blocker detection.

## 1. User

The primary user is the owner or project lead at a small residential general contractor with approximately 1–30 employees. This user coordinates active home-extension projects while communicating with homeowners, subcontractors, inspectors, suppliers, and licensed professionals.

The user needs a reliable way to understand project status and identify unresolved dependencies without repeatedly reconstructing the project from scattered messages, photos, documents, notes, and memory.

## 2. Workflow

The recurring workflow is project-state maintenance, project-update review, and blocker detection during an active residential home-extension project.

CasaFlowAI constructs and maintains an evidence-grounded project state from contractor updates, homeowner submissions, project records, and optional supporting evidence. When a contractor requests an activity transition, CasaFlowAI determines whether the activity can proceed or an unresolved dependency must be addressed first.

CasaFlowAI produces one of four recommendations:

1. Proceed
2. Pause — unresolved prerequisite
3. Needs inspection, permit, or professional review
4. Needs clarification

It explains its reasoning, cites the evidence it used, identifies affected and unaffected work, proposes state changes, and prepares the next human-reviewable action.

## 3. Trigger

The workflow begins when:

- The contractor requests an activity transition
- The contractor changes an activity status
- The contractor submits a structured update or chats with CasaFlowAI
- The contractor uploads optional evidence
- The homeowner submits a portal message, decision, concern, or optional attachment
- A simulated homeowner email arrives

For the Develop MVP, contractor workspace actions are the primary triggers. The homeowner portal is initially a read-only rendering of approved state, with scripted homeowner inputs used for evaluation.

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
- Contractor workspace events and chat messages
- Homeowner portal submissions
- Synthetic emails
- Optional synthetic or appropriately licensed photos
- Activity state and dependency records
- Homeowner decision and selection records
- Change-order records
- Project schedule information
- Simplified inspection, permit, and professional-review records
- Policy files
- Labeled evaluation cases

Inspection and permit data will model realistic approval gates without claiming to reproduce every field or requirement of an actual municipality.

## 8. Human boundary

CasaFlowAI is an advisor and coordinator, not an autonomous project manager.

Without explicit human approval, it must never:

- Approve or reject a change order
- Authorize spending, purchases, payments, or bids
- Change project scope
- Commit to a schedule or completion date
- Schedule subcontractors, inspections, or deliveries
- Make engineering, architectural, structural, electrical, plumbing, mechanical, safety, or code decisions
- Determine permit compliance
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
- No unapproved homeowner publication
- No unapproved external communication
- No unsupported claim represented as confirmed fact
- 100% refusal of prohibited actions in labeled boundary cases

The five primary scenarios are qualitative design anchors. A labeled set of at least 20 transition requests is required before calculating recall and false-pause rates.

## 10. Initial demo idea

The four-minute Develop demo should focus on one contractor surface:

1. Show the confirmed project state and parallel activities.
2. Demonstrate a valid activity transition producing Proceed.
3. Demonstrate an invalid transition producing a scoped Pause while unrelated work remains available.
4. Demonstrate a conflicting or missing-data case producing Needs clarification.
5. Briefly show the read-only homeowner view reflecting only approved state.
6. Show aggregate results from at least 20 labeled transition requests.

Live homeowner Q&A, real email integration, payments, scheduling optimization, authentication, and multi-project management are outside the core demo.

