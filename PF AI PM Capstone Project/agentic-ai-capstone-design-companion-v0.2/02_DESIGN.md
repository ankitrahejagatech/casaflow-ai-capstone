# 02 - Design Walkthrough

Goal: turn your chosen workflow into a complete agent blueprint and prepare Design PRD answers.

Design answers:

```text
How will the agent do the job — what it observes, decides, produces, and when it hands back to a human?
```

Design happens on paper. You are not building anything yet.

## Stop Point

This companion stops at Design.

Do not continue to Develop or Deploy until your instructor gives you the next guide.

## Step 0: Paste Your Discovery Answers

Design builds on Discovery. Before anything else, paste your ten Discovery PRD answers.

If any answer is missing or vague, fix it now — briefly. Do not redo Discovery. Tighten the weak answer and move on.

## Step 1: Write The Agent Role Statement

One sentence that says what the agent is hired to do.

Use this template:

```text
The agent is hired to [job] for [user], within [boundaries], escalating when [conditions].
```

Weak: "An AI assistant that helps with support."

Better: "The agent is hired to triage inbound support tickets for a support associate, within return and escalation policy, escalating when data is missing or the case is out of policy."

## Step 2: Write The Target Workflow

Describe how the workflow changes when the agent is introduced. Write the future process as numbered text steps.

Weak: "The agent automates the workflow."

Better:

```text
1. A new ticket arrives.
2. The agent reads it and pulls the customer, order, and policy context.
3. The agent classifies the issue and urgency.
4. The agent drafts a policy-citing reply.
5. The associate approves, edits, or escalates.
```

## Step 3: Define The Agent Loop

Every agent runs a loop: observe, decide, act, check.

Answer for your agent:

- Observe: what does it read or receive?
- Decide: what does it reason about or classify?
- Act: what does it produce?
- Check: what does it verify before handing work back?

If you cannot name the check step, your agent has no quality control.

## Step 4: List Inputs And Context

What does the agent need to perform well? Three kinds:

- Facts: records, history, the case itself.
- Rules: policies, boundaries, escalation triggers.
- Examples: samples of good output.

Name the actual files. "Customer data" is weak. `customers.csv` is a plan. This is also where your synthetic data plan from Discovery becomes concrete.

All files must be synthetic. Never use real customer, employee, or company data.

## Step 5: Choose Tools, Real Or Simulated

What tools, files, systems, or mock actions will the prototype use?

Simulated is enough. A CSV standing in for a database is a valid tool. Text descriptions are enough at this stage.

Do not add tools the loop does not need. Every tool must map to a step in your target workflow.

## Step 6: Make The Memory Decision

What should the agent remember across runs, and what should it not remember?

"No memory" is a valid answer — many strong agents run each case with full context and remember nothing. Whatever you choose, write the reason.

Weak: "The agent remembers everything to be more helpful."

Better: "No memory. Every case arrives with full context, and forgetting between cases prevents stale or leaked information."

## Step 7: Define The Output Format

What should the agent produce so a human can review it quickly and confidently?

Use labeled fields, not a wall of chat text. A reviewer should be able to judge the output in under a minute.

Example shape: category, urgency, recommended action, draft reply, policy cited.

## Step 8: Write The Escalation Rules

What should happen when the agent is unsure, missing data, or facing a risky case?

Cover these five trigger types:

1. Low confidence.
2. Missing data.
3. Anger or legal language.
4. Out-of-policy request.
5. High stakes.

For each trigger, the answer is the same shape: stop, flag, hand to a human.

## Step 9: Place The Human Approval Point

Where does the human approve, edit, reject, or escalate the agent's work?

The gate goes **before** anything with consequences — before a message sends, before money moves, before a record changes. A gate after the consequence is not a gate.

## Step 10: Write Five Eval Cases

What cases will prove the agent works, respects boundaries, and handles edge cases?

Write five, each with expected behavior:

- 1 happy path.
- 3 edge cases (missing data, difficult user, unusual input).
- 1 boundary case that the agent must refuse and escalate.

Use `EVAL_CASES_STARTER.md` for the format.

## Write The Design PRD Answers

When the blueprint is strong enough, the companion should produce this format:

```text
Agent role:

Target workflow:

Agent loop:

Inputs and context:

Tools or simulated tools:

Memory decision:

Output format:

Escalation rules:

Human approval point:

Initial eval plan:
```

Every answer must be self-contained with no required link-outs.

## Build-Readiness Gate

Before you stop, answer these five questions:

1. Can you state the agent's job in one sentence?
2. Can you name the file that grounds each fact the agent uses?
3. Do you know exactly what happens when data is missing?
4. Is there a human gate before anything with consequences?
5. Does one eval case test the boundary the agent must refuse?

If any answer is no, fix that section before you stop.

## Final Stop Message

At the end, the companion should say:

```text
Design is complete. Paste these answers into your Design PRD section. Stop here and wait for the Develop guide before building.
```
