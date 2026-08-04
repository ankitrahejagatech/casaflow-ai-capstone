# CasaFlowAI Deploy PRD

## Product

**CasaFlowAI** is an evidence-grounded project-state coordinator for small residential general contractors managing permitted home-extension projects in the City of San Jose.

The locked prototype has three role-appropriate surfaces:

- **General Contractor View:** project phases, activity board, typed updates, quick updates, editable speech transcripts, card drag/select, inspection details, agent review, and contractor approval controls.
- **Homeowner View:** contractor-approved project progress, completed and upcoming work, latest approved update, and a question-or-feedback form that enters the contractor review queue without changing project state.
- **CasaFlowAI SiteOps:** five primary evals, the complete 20-case benchmark, worker and reviewer results, policies and records, and local API-key settings.

The core loop is:

> Contractor proposes an update → CasaFlowAI loads approved project context → worker agent recommends and cites evidence → independent review agent checks the package → contractor approves, edits, or escalates → only an approved allowed change updates the board and homeowner view

External communication is never sent automatically.

---

## 1. Go / No-Go decision

### Decision: Conditional Go

CasaFlowAI is a **Go for public launch as a synthetic-data demonstration**. It is a **No-Go for unrestricted real project data or production use** until a private pilot environment passes privacy, security, identity, authorization, project-isolation, retention, and incident-response review.

The public prototype is ready because it demonstrates the complete human-controlled loop, including:

- Four contractor input paths: drag/select, typed update, quick update, and editable speech transcript.
- Evidence-grounded recommendations: **Proceed**, **Pause**, **Needs clarification**, or **Needs inspection, permit, or professional review**.
- Deterministic grounding, authority, missing-data, and professional-boundary checks.
- A Claude Haiku 4.5 worker and separately prompted Claude Sonnet 5 advisory reviewer.
- Contractor approval before any consequential project-state change.
- A derived homeowner view that displays only contractor-approved project state.
- A refusal case for fabricated homeowner approval and unauthorized financial, schedule, and communication commitments.

The final balanced synthetic benchmark contains 10 blocker cases and 10 safe-to-proceed cases. Results were:

- **Blocker recall: 10/10, or 100%** — Discovery target: at least 90%.
- **False-pause rate: 0/10, or 0%** — Discovery guardrail: at most 10%.
- **Valid grounded outputs: 20/20**.
- **Errors or invalid outputs: 0**.
- **Exact boundary, recommendation, and subtype match: 15/20, or 75%**.

The remaining five exact-label differences were subtype-specific calibration differences, not missed blocker-versus-safe decisions. These results justify a controlled demonstration and a small observed pilot; they do not establish production performance.

The prototype must remain labeled as a capstone demonstration. Every visitor supplies their own Anthropic API key, which is stored only in that browser's local storage or current tab and is not embedded in shipped files.

---

## 2. Privacy and safety risks

### Public prototype

The public GitHub Pages prototype is synthetic-data-only. It must never contain real homeowner, contractor, property, permit, inspection, financial, contract, dispute, or professional-review information. The three views model information visibility but do not implement production authentication or role enforcement.

The prototype's speech input is a browser convenience that creates an editable transcript. CasaFlowAI does not persist raw audio. Photos are optional context and are never sufficient proof of completion, safety, code compliance, inspection passage, permit acceptance, or professional approval.

### Private pilot

A private pilot may use consented, minimized real data only after readiness review. Potential data includes identities, contact details, project address, scope, approved plans, schedules, costs, selections, change orders, inspections, disputes, and professional-review requirements.

Before real data is entered, the pilot requires:

- Written contractor and homeowner consent.
- Private authenticated access, verified roles, and strict project isolation.
- Least-privilege access for the contractor, homeowner, and CasaFlowAI SiteOps team.
- A defined purpose for every collected field and removal of non-material fields.
- Approved AI-provider terms, data handling, retention, deletion, and incident-response procedures.
- A named incident owner and an immediate-pause process.
- Independent privacy and security approval.

The contractor may see the full project review package for an authorized project. The homeowner may see only contractor-approved homeowner-relevant status and may submit a question or concern to the contractor queue. The homeowner cannot view contractor-only notes, margins, bids, internal reasoning, or another project's information. CasaFlowAI SiteOps receives only the minimum data required for approved monitoring and incident handling.

Raw speech and audio remain disabled in the initial real-data pilot until the speech provider, consent language, retention behavior, and privacy controls are approved. The initial pilot uses structured board actions and text updates. Identifiable pilot data is deleted within 30 days after the pilot ends; only de-identified aggregate metrics and documented learnings may be retained.

One privacy breach, cross-project exposure, unauthorized send, unauthorized state change, fabricated evidence event, concealed conflict, or recommendation to proceed through a hard safety, inspection, permit, privacy, or professional boundary immediately pauses the pilot.

---

## 3. Human operating model

CasaFlowAI uses three accountable pilot roles.

### 1. Operator — participating general contractor or owner-operator

The operator is the general contractor responsible for the extension project. A separate project lead is not assumed. The operator enters project updates, reviews the worker recommendation and reviewer verdict, corrects inaccurate values, approves field-specific allowed changes, and decides whether to edit or escalate. No consequential state change or homeowner communication bypasses this role.

### 2. Escalation coordinator — CasaFlowAI product owner, Ankit Raheja

The escalation coordinator receives the minimum necessary case identifier, risk category, severity, evidence pointer, and disposition. The coordinator preserves the audit trail and returns the matter to the contractor. The contractor decides whether an inspector, engineer, architect, licensed trade professional, emergency authority, attorney, or another qualified authority must be involved. The coordinator does not make the underlying construction or professional decision.

### 3. Product decision owner — CasaFlowAI product owner, Ankit Raheja

The product decision owner controls prompt, policy, model, agent-logic, tool-calling, data-schema, permission, access, and release changes. The owner may pause the pilot and decides whether a tested change is released or whether the pilot expands.

The Haiku worker and Sonnet reviewer are automation components, not human authorities. The review agent is advisory: **Looks right** does not approve a change, and **Needs attention** requires the contractor to inspect, edit, or escalate the worker output.

Approval rules remain independent:

- Reviewing a recommendation does not itself update canonical state.
- Only the explicitly displayed and contractor-approved allowed change may update the project board or register.
- The homeowner view updates only from approved state.
- A homeowner message enters the contractor queue but does not change status or obtain an autonomous construction answer.
- Human approval cannot override privacy, evidence-integrity, safety, regulatory, or licensed-professional boundaries.

---

## 4. Quality monitoring

### Quality metrics

- Blocker recall must remain at or above **90%**.
- False-pause rate must remain at or below **10%**.
- Valid grounding and citation checks must have **zero fabricated, cross-case, or unverifiable citations**.
- Hard authority and safety boundary failures must remain at **zero**.
- At least **80%** of pilot recommendations should be accepted with no more than minor contractor edits.
- Exact boundary, recommendation, and subtype accuracy on the complete 20-case synthetic suite must remain at or above the locked calibration baseline of **75% (15/20)** before any behavioral release or pilot expansion.

### Calibration check and trigger

SiteOps compares the predicted boundary, base recommendation, and subtype with the evaluator-only label. For every mismatch, SiteOps separately evaluates the proposed human resolver and next action against the case-visible evidence and governing policy. Each mismatch is classified as:

- **Action-equivalent:** the label differs, but the safe next step and required human resolver remain the same.
- **Action-changing:** the mismatch changes whether work may proceed, who must respond, or whether contractor, homeowner, inspector, permit authority, or qualified-professional review is required.

If exact-label accuracy falls below **75%** on the complete 20-case regression suite, CasaFlowAI holds the behavioral release and any pilot expansion, preserves the last approved configuration, performs a subtype and next-action confusion review, documents the affected cases and root cause, adds or revises labeled regression cases where needed, and reruns the complete suite before product-owner approval.

An action-changing mismatch is a material quality failure even when blocker detection is correct. Any action-changing mismatch—including an incorrect **Proceed**, a hard-boundary bypass, a wrong resolver or authority, or an incorrect hold on safe work—places or keeps the affected workflow on hold pending human review.

### Value metrics

- **Primary value metric: Cut contractor coordination time per project update by 30%.** Measure from the contractor entering or proposing an update through completing review and preparing the approved homeowner-facing status.
- At least **3 of 5 contractors** must say they would continue using CasaFlowAI after the pilot.
- At least **2 of 3 homeowners** must report that approved updates made current status, blockers, and next steps clearer.

### Risk metrics

The acceptable count is zero for privacy breaches, cross-project retrieval, unauthorized messages or state changes, fabricated evidence, hidden conflicts, and recommendations to proceed through unresolved hard requirements.

### Change control

The model and agent configuration remain frozen during each pilot week. Any change to a prompt, policy, worker or reviewer model, model version, agent logic, tool call, permission, state schema, dependency rule, output parser, or citation validator requires:

1. A recorded change and reason.
2. A complete rerun of all 20 hidden-label eval cases.
3. Blocker recall of at least 90%, false-pause of at most 10%, exact-label accuracy of at least 75%, 20/20 valid grounded outputs, and zero hard-boundary failures.
4. Product-owner approval before release.

Purely visual changes require responsive usability and smoke testing. SiteOps is the monitoring surface for the five primary cases, complete 20-case benchmark, policies, records, and model-quality evidence.

---

## 5. User feedback plan

Feedback comes from three channels.

### 1. Behavioral evidence

CasaFlowAI records the proposed transition, worker output, reviewer verdict, contractor approval, edit, or escalation, and resulting project-state effect. A meaningful edit or escalation includes a short reason so the product team can distinguish a wrong decision from missing data, unclear wording, bad interaction design, or an overly strict rule.

### 2. Weekly participant interviews

Each participating contractor receives a 20-minute weekly interview focused on:

- What saved time this week?
- What was wrong, missing, hard to trust, or difficult to use?
- Did the board, text, quick-update, or speech-transcript path fit field behavior?

Each participating homeowner receives a 20-minute weekly interview focused on:

- Was the contractor-approved status easy to understand?
- Were the blocker and next step clear?
- Did the question-or-feedback flow reduce uncertainty?
- What important information was still missing?

### 3. Evaluation replay

Privacy-reviewed pilot problems are converted into de-identified, labeled transition cases. Expected labels remain evaluator-only and are never included in the worker's case context. Pilot-case calibration is reported separately from the synthetic benchmark and is never blended into it. While the pilot set contains fewer than 20 labeled cases, its exact-label result is descriptive; once it reaches at least 20 cases, it must independently meet the same 75% calibration floor. Every action-changing mismatch receives immediate review. The complete synthetic suite must always remain at or above 75%, and both the synthetic suite and accumulated pilot suite are rerun before a behavioral release.

The product owner reviews behavioral evidence, interviews, incidents, and eval regressions weekly. Safety and privacy issues take priority; recurring product friction is prioritized by frequency and time cost. No pilot anecdote is promoted to a confirmed product rule without evidence and controlled testing.

---

## 6. Pilot plan

### Participants

- Begin with **three tech-comfortable general contractors or owner-operators** at residential firms with approximately 1–20 employees.
- Participants must manage permitted City of San Jose home-extension projects, agree to review every CasaFlowAI result, and attend weekly feedback interviews.
- Recruit **three homeowners** who want clearer project coordination. They use an authenticated contractor-approved homeowner view, submit questions to the contractor queue, and provide weekly feedback. They do not access contractor-only information or receive autonomous construction advice.

### Sequence

1. **Two-week readiness period:** consent, private authentication, role verification, project isolation, data minimization, provider review, retention/deletion, incident response, and independent privacy/security approval.
2. **Pilot Weeks 1–2:** three contractors and three homeowners, using private real project data only after readiness approval.
3. **Week 2 gate:** continue only with zero privacy and hard-boundary failures, blocker recall at or above 90%, false-pause at or below 10%, the complete synthetic suite at or above 75% exact-label accuracy, and no serious usability blocker. Pilot exact-label results remain separate and descriptive until at least 20 labeled pilot cases exist; at that point the pilot set must also independently meet 75%.
4. **Pilot Weeks 3–4:** expand to a maximum of five contractors only if the gate passes.

### Initial pilot scope

In scope:

- City of San Jose permitted residential home-extension projects.
- Consented, minimized real project data in a private environment.
- Structured board actions and typed updates.
- Evidence-grounded transition evaluation, parallel-work identification, proposed state changes, contractor review, inspection-register visibility, approved homeowner status, and homeowner questions to the contractor queue.

Out of scope:

- Real data in the public GitHub Pages prototype.
- Raw voice or retained audio until separate privacy approval.
- Autonomous project-state changes or external sends.
- Live autonomous homeowner-agent Q&A.
- Treating photos as proof.
- Payments, purchasing, scheduling, bids, scope commitments, legal conclusions, code interpretation, permit approval, inspection passage, structural judgment, or replacement of a licensed professional.
- Jurisdictions outside the City of San Jose.

### Expansion criteria

Expansion requires all of the following:

- Blocker recall at or above 90%.
- False-pause at or below 10%.
- The complete synthetic suite at or above the locked 75% exact-label calibration floor; once at least 20 labeled pilot cases exist, the separate pilot suite must also independently meet 75%.
- Zero hard-boundary, grounding, or privacy failures.
- Contractor coordination time per update reduced by at least 30%.
- At least 80% of recommendations accepted with no more than minor edits.
- At least 3 of 5 contractors willing to continue.
- At least 2 of 3 homeowners reporting clearer status and next steps.
- Product-owner and privacy/security-reviewer approval.

### Rollback

An immediate-pause condition returns contractors to their existing workflow. CasaFlowAI preserves the affected evidence and audit event, diagnoses the failure, reruns all 20 labeled cases, and completes privacy or safety review as applicable. A synthetic exact-label result below 75% blocks a behavioral release and pilot expansion until calibration review and a passing rerun are complete. Any action-changing mismatch—including an incorrect Proceed, hard-boundary bypass, wrong resolver or authority, or incorrect hold on safe work—places or keeps the affected workflow on hold pending human review. The pilot may restart only after all applicable quality thresholds pass and the product owner approves it.

---

## 7. Four-minute video outline

### 0:00–0:25 — Product and outcome

Introduce CasaFlowAI as an evidence-grounded project-state coordinator for small general contractors managing City of San Jose home extensions. State the core promise: convert fragmented field updates into reviewable next-step recommendations without surrendering contractor control.

### 0:25–0:55 — Problem and Discovery

Explain the cost of fragmented texts, calls, photos, schedules, and memory: missed dependencies, wasted crew time, homeowner anxiety, repetitive coordination, and disputes. Present the decision question—can the requested activity proceed, or is there a blocker?—and the Discovery targets of at least 90% blocker recall and at most 10% false-pause.

### 0:55–1:45 — Demo 1: organic Proceed by voice

Open **General Contractor View**, load the Proceed setup, and speak: “Start rough plumbing.” Show the editable transcript, the visible agent-checking progress, the evidence-grounded **Proceed** recommendation, the independent reviewer, and the contractor approval gate. Approve the change, show Rough plumbing move to In progress, and briefly switch to **Homeowner View** to show the contractor-approved update.

### 1:45–2:35 — Demo 2: scoped Pause by board move

Load the Pause setup and drag Wall and ceiling insulation toward Ready while Electrical rough-in is incomplete. Show CasaFlowAI identify the exact prerequisite, recommend **Pause**, preserve the board, leave the official inspection register unchanged, and give the contractor clear edit or escalation options. Emphasize that unrelated eligible work is evaluated separately rather than stopped by a blanket phase gate.

### 2:35–2:55 — Boundary refusal

Run primary EVAL-05. Show CasaFlowAI refuse the request to fabricate homeowner approval, approve an $8,000 change, commit a date, and send confirmation. Point out that unsafe approval actions remain unavailable and the current state is preserved.

### 2:55–3:35 — Evidence and honest limitations

Open **CasaFlowAI SiteOps**. Show the five primary cases and the complete 20-case scoreboard: **100% blocker recall, 0% false-pause, 20/20 valid grounded outputs, 75% exact-label accuracy, and zero errors**. Explain that 75% is the locked calibration floor: a lower result holds behavioral releases and pilot expansion, while any action-changing mismatch pauses the affected workflow. Explain that Haiku 4.5 generates the worker result, Sonnet 5 independently reviews it, and the contractor remains the final decision-maker. State plainly that this is one small synthetic benchmark, not production proof.

### 3:35–4:00 — Launch plan and close

Present the Conditional Go: public synthetic demonstration now; private three-contractor, three-homeowner pilot only after privacy and access readiness; expansion to five contractors only if quality, value, and risk gates pass. End with the live URL:

`https://ankitrahejagatech.github.io/casaflow-ai-capstone/`

---

## Final checks

1. **PRD completeness — Pass.** All seven Deploy rows are self-contained and describe the locked prototype, measured benchmark, human roles, privacy boundary, pilot, and launch story.
2. **Loop clarity — Pass.** A reader can understand the input, project context, worker decision, independent review, contractor approval, resulting state update, refusal, and escalation without opening another document.
3. **Video timing — Pass.** The outline totals four minutes and includes the problem, two operational demos, a refusal, measured eval evidence, honest limitations, pilot decision, and live URL.
