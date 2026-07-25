# Product Faculty Feedback

## Discovery feedback

> This is among the sharpest Discovery work in the cohort on the dimensions students usually fumble — your measurement and safety thinking are genuinely strong. Blocker recall at 90% paired with a 10% false-pause guardrail is exactly the right instinct: you picked the metric that maps to the actual harm (a missed blocker stops crews and surprises the homeowner) and you constrained the failure mode that would make the tool annoying (crying wolf on safe-to-proceed work). The four-state recommendation is a clean, reviewable decision space, and your human boundary is thorough to the point of being a model for the group — you correctly fenced off permit-record edits, structural and code calls, scheduling, and replacing a licensed professional.
>
> Here's the one thing to wrestle with before Design, and it's structural rather than cosmetic: your reasoning depends on structured records — a milestone register, a homeowner-decision log, a change-order register with approval statuses — but your trigger is an unstructured contractor message ("drywall's done, 8 photos"). In your demo that works because you authored both the message and the registers, so they agree. In the real world, a 1–30-person contractor is precisely the user least likely to maintain clean registers — that fragmentation is the pain you're solving.
>
> So the genuinely hard agentic question isn't "given the project state, detect the blocker" (that's lookup with reasoning on top); it's "how does the agent construct and keep that project state current from the same scattered messages, photos, and updates?" I'd make that state-maintenance the heart of the Design phase — how the agent updates its model when a new message arrives, how it handles a contractor update that conflicts with a prior record, and what it does when the record it needs simply doesn't exist yet. Nail that and you've got something well beyond a capstone. Approved to proceed to Design.

## Design response

The Design phase made state construction and maintenance the core agent behavior:

- Baseline fields are separated into confirmed facts, policy defaults, AI inferences, proposed values, and unknowns.
- The contractor ratifies the baseline before it becomes canonical.
- Every project action becomes source-stamped evidence.
- Source-specific claims remain distinct from confirmed facts.
- Conflicts are preserved rather than silently resolved.
- Missing state produces clarification rather than inference from schedules or templates.
- Canonical state changes require field-specific contractor approval.
- Project history remains immutable and project-scoped.

## Design feedback

> The state maintenance push from Discovery came back fully answered, Ankit, baseline fields separated into confirmed facts, policy defaults, AI inferences and unknowns with the contractor ratifying each one, a homeowner dispute recorded as a dispute rather than silently overwriting approved state, and a missing drywall status producing clarification instead of an inference from the schedule, which are exactly the three hard cases I asked you to design for.
>
> The five way completion states and the hard requirement acknowledgment that records proceeding without endorsing it are the most grown up treatment of contractor reality in this cohort.
>
> The concern is what else arrived with it: a homeowner portal with its own Q&A, a simulated email channel, and three approval gates is a second product stacked on the first, and your four minute demo now has to carry two user surfaces.
>
> Build in this order, state engine and transition evaluation first with the portal as a read only rendering of approved state, homeowner questions scripted rather than live, and grow your labeled set past the five scenarios to twenty or more transition requests, because 90 percent recall and a 10 percent false pause rate are not computable from five cases. Cleared for Develop on that sequencing.

## Develop sequencing decision

The Develop MVP will follow the faculty sequencing:

1. Build the state engine.
2. Build activity transition evaluation.
3. Build the contractor review card and project-change approval.
4. Render a read-only homeowner view from approved state.
5. Use scripted homeowner questions.
6. Expand to at least 20 labeled transition requests.

The following remain future or stretch capabilities:

- Live homeowner agent Q&A
- Simulated or real email channel
- Separate homeowner-publication workflow
- Real authentication and permissions
- Notifications
- Calendar integration
- Payments
- Automatic scheduling and resource optimization
- Multi-project management

