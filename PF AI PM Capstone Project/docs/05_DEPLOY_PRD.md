# CasaFlowAI — Deploy PRD

## 1. Go / no-go view

**Verdict: Conditional Go.** CasaFlowAI is ready to launch as a public, synthetic-data demonstration. It is not yet approved for a real-project-data pilot.

The public-demo decision is supported by the following:

- The full 20-case evaluation produced 100% blocker recall, a 0% false-pause rate, 20 of 20 valid grounded outputs, and 65% exact-label accuracy. The two Discovery safety targets—at least 90% blocker recall and at most 10% false-pause—were met. Exact-label accuracy remains an improvement opportunity and is not being represented as production readiness.
- The product enforces its boundaries on screen. It can recommend and draft, but it cannot independently apply a project-state change, send a homeowner communication, fabricate evidence, or replace an inspector, engineer, architect, licensed trade professional, or contractor.
- Pilot roles, operating rituals, success thresholds, immediate-pause triggers, and rollback steps are defined.
- The public application uses synthetic project records only, and no API key is shipped with the application.

The real-data pilot remains a no-go until a qualified, independent privacy and security reviewer approves the consent language, authentication and project-isolation controls, data minimization, retention and deletion rules, AI-provider data handling, and incident-response process.

## 2. Privacy and safety risks

CasaFlowAI may eventually process contractor and homeowner identities, email addresses, project addresses, project scope, schedules, costs, permits, inspections, selections, change orders, disputes, and professional-review requirements. In the proposed real-data pilot, this information would be available only to the authorized contractor for that project, the AI provider as required to process a request, and the product owner to the minimum extent necessary for approved monitoring and incident handling. Homeowners would receive only contractor-approved information and would not see contractor-only notes, pricing, margins, internal reasoning, or information from another project.

A leak or cross-project retrieval could expose a homeowner’s address, construction plans, financial information, project disputes, schedule, or security-relevant details about the property. Other material risks include an unauthorized communication, an unsupported state change, treating a photo as proof, fabricating or misreading evidence, and recommending work through an unresolved inspection, permit, safety, or professional requirement.

The public GitHub Pages product must remain synthetic-data-only. Real data must never be entered into that public demo. Before a private real-data pilot begins, CasaFlowAI requires:

- Written contractor and homeowner consent.
- Private, authenticated access with strict project isolation and role-based permissions.
- Data minimization and an approved retention and deletion policy.
- Review of the AI provider’s data-handling terms.
- A named incident owner and immediate-pause process.
- Independent privacy and security approval.

Identifiable pilot data will be deleted within 30 days after the pilot ends. Only de-identified aggregate metrics and documented product learnings may be retained. Images may provide context but may never independently prove completion, safety, code compliance, inspection approval, permit acceptance, or professional approval. Raw voice or audio data is outside the initial pilot scope.

This capstone prototype is synthetic end to end; a real pilot requires a formal privacy and security review first.

## 3. Human operating model

CasaFlowAI uses the following human roles:

1. **Operator — participating general contractor or owner-operator:** Enters or selects project updates, reviews the evidence and recommendation, corrects inaccurate information, approves field-specific project changes, and separately approves any external communication. A small contractor is not assumed to have a separate project lead.
2. **Escalation coordinator — CasaFlowAI product owner, Ankit Raheja:** Receives only the minimum necessary escalation category, case identifier, severity, and disposition; preserves the audit trail; and routes the issue back to the contractor. The escalation coordinator does not make a construction, inspection, engineering, regulatory, legal, or safety decision.
3. **Product decision owner — CasaFlowAI product owner, Ankit Raheja:** Controls prompt, policy, model, agent-logic, tool, access, and pilot-scope changes; approves releases; and may pause or expand the pilot. The contractor remains the decision-maker for the project and determines whether an inspector, engineer, architect, licensed trade professional, emergency authority, or other qualified authority is required.

The approval gates remain independent:

- Reviewing a recommendation does not apply a project-state change.
- A project change requires explicit, field-specific contractor approval.
- An external communication requires separate contractor approval.
- Human approval cannot override a privacy, evidence-integrity, safety, regulatory, or professional-authority boundary.

After every recommendation, the contractor records approve, edit, reject, or escalate. Each contractor and participating homeowner has a 20-minute weekly feedback interview. The product owner reviews actions, incidents, edits, escalations, and feedback weekly and decides whether a controlled product change is warranted.

## 4. Quality monitoring

CasaFlowAI monitors three metric families.

### Quality

- Blocker recall must remain at or above 90%.
- False-pause rate must remain at or below 10%.
- At least 80% of recommendations must be accepted by contractors with no more than minor edits.
- Grounding and citation validation must produce zero fabricated, cross-case, or unverifiable citations.

### Value

- **Primary value metric:** Cut contractor coordination time per project update by 30%. Time is measured from entering a project update through completing review and preparing a homeowner-ready message.
- At least 3 of 5 contractors must say they would continue using CasaFlowAI after the pilot.
- At least 2 of 3 participating homeowners must report that contractor-approved updates made project status, blockers, and next steps clearer.

### Risk

The acceptable count is zero for:

- Privacy breaches or cross-project exposure.
- Unauthorized sends or canonical-state changes.
- Fabricated evidence or concealed conflicts.
- Recommendations to proceed through a hard inspection, permit, safety, or professional-review requirement.

One risk event immediately pauses the pilot. Missing a quality or value threshold prevents expansion and triggers diagnosis and improvement.

The model and core agent configuration remain frozen during each pilot week. Approved changes are released in controlled weekly batches unless a safety or privacy defect requires an immediate pause. A prompt, policy, model or model-version, agent-logic, tool-calling or permission, project-state schema, dependency-rule, output-parser, or citation-validation change requires:

1. Recording the change and its reason.
2. Rerunning all 20 labeled eval cases.
3. Confirming blocker recall of at least 90%, false-pause of at most 10%, zero grounding errors, and zero hard-boundary failures.
4. Product-owner approval before release.

Purely visual changes require usability and smoke testing. The 20-case suite is also rerun monthly during a stable pilot.

## 5. User feedback plan

Feedback comes from three channels:

1. **Behavioral review data:** CasaFlowAI records every contractor approve, edit, reject, and escalate action. A meaningful edit or rejection includes a short reason so the team can distinguish an incorrect recommendation from unclear wording or missing context.
2. **Weekly interviews:** Each contractor receives a 20-minute weekly interview focused on two questions: “What saved you time this week?” and “What was wrong, missing, or difficult to trust?” Each participating homeowner receives a 20-minute weekly interview focused on whether the contractor-approved update made status and next steps clearer and what important question remained unanswered.
3. **Evaluation replay:** Representative pilot problems are converted into privacy-reviewed, de-identified test cases and rerun against the labeled evaluation table. The agent cannot read expected labels during execution.

The product owner reviews these three sources weekly, prioritizes issues by safety and frequency, and documents the resulting product decision. Behavioral changes follow the controlled release and 20-case regression process. Homeowners are recruitment and research participants during this pilot, not direct users of the current prototype: they do not log in, enter project state, interact directly with the agent, or access contractor-only data.

## 6. Pilot plan

The pilot is small, reversible, and observed.

### Participants

- Three initial tech-comfortable small residential general contractors or owner-operators with 1–20 employees.
- Each contractor must serve the City of San Jose, manage permitted residential home-extension work, agree to review every CasaFlowAI result, and attend a weekly feedback interview.
- Three homeowners who want clearer extension-project coordination will help recruit or encourage participating contractors, review contractor-approved sample updates outside the product, and provide weekly research feedback.

### Sequence and duration

1. **Two-week privacy and access readiness period:** Complete consent, private authentication, project isolation, data minimization, retention, provider review, incident response, and independent privacy/security approval.
2. **Pilot Weeks 1–2:** Run with three contractors.
3. **Week 2 expansion gate:** Expand only if there have been zero privacy or hard-boundary failures, blocker recall is at least 90%, false-pause is at most 10%, and no serious usability blocker remains.
4. **Pilot Weeks 3–4:** Add two contractors, for a maximum of five, only if the gate passes.

### In scope

- Consented, minimized real project data in a private pilot environment.
- City of San Jose permitted residential home-extension projects.
- Contractor-entered text, chat, or structured project-status transition requests.
- Evidence-grounded transition evaluation, parallel-work identification, proposed state changes, contractor review, and homeowner-ready draft updates.

### Explicitly out of scope

- Real data in the public GitHub Pages demonstration.
- Autonomous project-state changes or external sends.
- Direct homeowner login, live homeowner Q&A, or homeowner access to contractor-only information.
- Raw voice or audio input.
- Treating photos as proof.
- Autonomous purchasing, payments, scheduling, scope commitments, code interpretation, permit approval, inspection passage, structural judgment, or other licensed-professional decisions.
- Jurisdictions outside the City of San Jose.

### Pilot success and expansion

Expansion after the pilot requires every agreed condition:

- Blocker recall at or above 90%.
- False-pause at or below 10%.
- Zero hard-boundary, grounding, or privacy failures.
- Contractor coordination time per project update reduced by at least 30%.
- At least 80% of recommendations accepted with no more than minor edits.
- At least 3 of 5 contractors willing to continue.
- At least 2 of 3 homeowners reporting clearer status and next steps.
- Product-owner and privacy/security-reviewer approval.

### Rollback

If an immediate-pause condition occurs, CasaFlowAI is paused and contractors return to their existing manual process. The affected case and audit record are preserved, the issue is diagnosed, and all 20 labeled cases are rerun. The pilot may resume with only the original three-contractor group after the fix passes the required thresholds and the product owner approves restart.

## 7. Four-minute video outline

### 0:00–0:30 — Product and outcome

Introduce CasaFlowAI as an evidence-grounded project-state coordinator for small residential general contractors managing City of San Jose home extensions. State the promise: fragmented field updates become reviewable recommendations and proposed state changes without surrendering contractor control.

### 0:30–1:30 — Problem and Discovery

Show why fragmented texts, calls, schedules, and memory cause missed prerequisites, delayed crews, homeowner stress, repetitive contractor coordination, and disputes. Explain the core question: can the requested activity proceed, or is there a blocker? Present the four recommendation states and the Discovery targets of at least 90% blocker recall and at most 10% false-pause.

### 1:30–2:30 — Live product demonstration

Lead with the known-blocker case: the contractor attempts to move insulation forward while electrical rough-in is incomplete. Show CasaFlowAI identifying the exact incomplete prerequisite, limiting the pause to the affected activity, and identifying work that may continue in parallel. Show the worker-agent recommendation, independent review-agent verdict, citations, current-versus-proposed state, and contractor approval controls.

Then briefly show:

- The happy path, where satisfied prerequisites produce **Proceed** without requiring the contractor to ask the agent to perform a check.
- The fabricated-homeowner-approval case, where CasaFlowAI refuses the request and disables unsafe approval actions.

### 2:30–3:30 — Evidence and honest limitations

Show the 20-case scoreboard: 100% blocker recall, 0% false-pause, 20 of 20 valid grounded outputs, and 65% exact-label accuracy. Explain the EVAL-03 improvement: “conflicting source claim” was technically correct but operationally unhelpful, so the output was changed to explain the actual homeowner-contractor conflict. Show that the independent review agent is advisory and cannot bypass the contractor.

State the honest limitation: these results come from a small synthetic labeled set and do not establish real-world production performance. The current product is a public synthetic-data prototype, not an approved real-data system.

### 3:30–4:00 — Launch plan and close

Present the Conditional Go: public synthetic launch now, followed by privacy readiness and a staged three-to-five-contractor pilot only after independent review. End on the live product URL:

`https://ankitrahejagatech.github.io/casaflow-ai-capstone/`
