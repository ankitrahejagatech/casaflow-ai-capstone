# CasaFlowAI — Agentic AI Product Management Capstone

CasaFlowAI is an agentic coordination product for small residential general contractors managing home-extension projects.

The product maintains an evidence-grounded project state from contractor actions, homeowner submissions, project records, and optional supporting evidence. It evaluates requested activity transitions, identifies blockers, preserves conflicts and unknowns, and keeps consequential project changes under human control.

## Core product decision

CasaFlowAI does not assume that a small contractor already maintains clean project registers. It helps construct and maintain project state while separating:

- Confirmed facts
- Source-specific claims
- Policy defaults
- AI inferences
- Proposed changes
- Unknown information
- Conflicting information

## Recommendation states

CasaFlowAI produces one of four recommendations:

1. **Proceed**
2. **Pause — unresolved prerequisite**
3. **Needs inspection, permit, or professional review**
4. **Needs clarification**

The product supports parallel workstreams and scoped blockers. It may allow a contractor-approved exception for an eligible soft dependency. It never represents a hard safety, regulatory, inspection, permit, privacy, or professional requirement as satisfied without the appropriate evidence and authority.

## Develop MVP cutline

Per Product Faculty feedback, development should proceed in this order:

1. State engine and activity transition evaluation
2. Contractor review experience and project-change approval
3. Read-only homeowner rendering of approved state
4. Scripted homeowner questions rather than live Q&A
5. A labeled set of at least 20 transition requests

The simulated email channel, live homeowner agent, and additional approval workflows remain documented product capabilities but are not required for the core four-minute MVP demo.

## Repository guide

- [Discovery PRD](PF%20AI%20PM%20Capstone%20Project/docs/01_DISCOVERY_PRD.md)
- [Design PRD](PF%20AI%20PM%20Capstone%20Project/docs/02_DESIGN_PRD.md)
- [Initial Eval Plan](PF%20AI%20PM%20Capstone%20Project/docs/03_EVAL_PLAN.md)
- [Product Faculty Feedback](PF%20AI%20PM%20Capstone%20Project/docs/04_FACULTY_FEEDBACK.md)
- `PF AI PM Capstone Project/agentic-ai-capstone-discovery-companion-v0.2/`
- `PF AI PM Capstone Project/agentic-ai-capstone-design-companion-v0.2/`

## Safety and data

The capstone uses synthetic data only. No real homeowner identities, addresses, messages, plans, contracts, permits, inspection records, or contractor financial data should be included.

