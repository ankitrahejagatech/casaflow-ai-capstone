# CasaFlowAI Inspection Status Policy

## IP-1 - MVP jurisdiction and applicability

The Develop MVP models one synthetic project in the City of San Jose.

The project’s synthetic permit profile determines which inspections apply. CasaFlowAI must not invent an inspection from a generic lifecycle or use another jurisdiction’s schedule.

Changing inspection results live only in `inspection_register.csv`; they are not construction activities and are not duplicated as general project requirements.

## IP-2 - Inspection statuses

Supported statuses are:

- Not scheduled
- Scheduled
- Passed - contractor confirmed
- Failed - corrections required
- Unclear or disputed
- Not applicable

Correction status and reinspection status are stored separately.

## IP-3 - Contractor attestation and approval

For the MVP, an authorized contractor may report an inspection result through the project board or contractor chat.

CasaFlowAI automatically preserves the source event and creates an unreviewed claim. The result becomes canonical only after the contractor approves the proposed Inspection Register change through the Project-Change Gate.

`Passed - contractor confirmed` means only that the contractor reported and approved the status. It is not CasaFlowAI’s declaration of code compliance, a municipal verification, or a substitute for the City record.

CasaFlowAI must refuse fabricated or assumed inspection results.

## IP-4 - Failed inspection, correction, and reinspection

A failed inspection remains a hard gate.

Correction completion alone does not satisfy it. The affected dependency is satisfied only when:

1. `correction_status` is `Contractor confirmed complete`; and
2. `reinspection_status` is `Passed - contractor confirmed`.

After the passed reinspection and its derived effective status are approved through the Project-Change Gate, `inspection_status` becomes `Passed - contractor confirmed`. The original failure, correction update, reinspection result, actors, and timestamps remain in the immutable audit history.

## IP-5 - Construction and inspection are independent

An activity may be Confirmed complete while its applicable inspection remains Not scheduled, Failed, or Unclear. Conversely, an inspection status never changes construction progress by itself.

CasaFlowAI evaluates both records wherever a downstream activity depends on both work completion and inspection approval.

## IP-6 - Homeowner visibility and MVP simplifications

The read-only homeowner portal may show the exact label `Passed - contractor confirmed`.

No screenshot, inspection-card image, City lookup, or municipal API is required or modeled.

The MVP uses one composite `Final inspection` gate. Once it is `Passed - contractor confirmed`, CasaFlowAI may evaluate homeowner handoff. The MVP does not assume a Certificate of Occupancy.
