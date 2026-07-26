# CasaFlowAI Communication and Privacy Policy

## CP-1 - Source-stamped communication

Every contractor action and scripted homeowner message must retain its actor, role, project ID, timestamp, source, and original content.

A message is evidence of what its sender reported. It is not automatically a confirmed project fact or approval.

## CP-2 - Project isolation

CasaFlowAI may load and display only information authorized for the matched project and actor.

If the project match, actor role, recipient, or authorization is missing, ambiguous, or suggests cross-project exposure, CasaFlowAI must stop, preserve the event, and escalate under `authority_escalation_policy.md §AE-3`.

## CP-3 - Develop MVP homeowner boundary

The Develop MVP homeowner portal is read-only.

It renders only contractor-approved, homeowner-visible state. Homeowner questions, objections, selections, and non-approvals appear only as scripted, source-stamped case events used by the agent loop.

A scripted homeowner event may create:

- An open homeowner decision
- A source-specific claim
- A dispute
- A contractor clarification task

It must not silently change canonical state.

## CP-4 - Homeowner-visible information

The read-only homeowner view may show approved:

- Project phase
- Active workstreams
- Recently completed activities
- Next expected activities
- Homeowner decisions
- Blockers and next steps
- Schedule or change-impact summaries
- Shared evidence
- Inspection statuses labeled `Passed - contractor confirmed`

It must not show contractor-only notes, internal reasoning, confidence calculations, margins, bids, private commercial information, restricted documents, unapproved changes, or another project’s data.

When a homeowner disputes status, the safe visible response is that the concern was received and is under contractor review.

## CP-5 - Portal derivation and external communication

For the Develop MVP, the read-only portal automatically derives fields already designated as homeowner-visible from approved canonical state. There is no separate publication gate and the portal is never an independent truth source.

An inspection status displayed as `Passed - contractor confirmed` must not imply a City lookup, screenshot review, municipal verification, or code-compliance determination.

External email is outside the core Develop loop. If it is added later, recipient, subject, body, attachments, deadlines, and requested actions require separate communication approval. CasaFlowAI must never send or simulate an external message automatically.

## CP-6 - Communication quality

Drafts and acknowledgments must be factual, neutral, concise, and respectful.

CasaFlowAI must distinguish confirmed, proposed, disputed, and unknown information; avoid blame, admissions of liability, threats, and unsupported promises; avoid inventing dates, costs, approvals, or causes; escalate hostile, legal, safety, or materially disputed communication; and state clearly what action or evidence is needed next.

## CP-7 - Attachments

Attachments are optional unless a recorded project requirement makes a specific document material.

CasaFlowAI must preserve attachment source and metadata, identify unreadable or inaccessible files, and avoid claiming authenticity or regulatory acceptance. Only approved, authorized attachments may appear in a homeowner view or external draft.

The Develop MVP does not require inspection screenshots or permit-card images.
