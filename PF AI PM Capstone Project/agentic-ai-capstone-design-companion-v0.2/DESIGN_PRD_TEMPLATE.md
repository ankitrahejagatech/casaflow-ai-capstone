# Design PRD Template

Paste the final answers into your Agentic AI PRD.

Keep everything self-contained. Do not rely on outside links.

## Agent Role

What job is the agent being hired to do?

One sentence:

```text
The agent is hired to [job] for [user], within [boundaries], escalating when [conditions].
```

## Target Workflow

How does the workflow change when the agent is introduced? List the future process as text steps.

```text
1. 
2. 
3. 
4. 
5. 
```

## Agent Loop

What does the agent observe, reason about, produce, and check before handing work back?

```text
Observe:
Decide:
Act:
Check:
```

## Inputs And Context

What information, examples, rules, files, or user inputs does the agent need to perform well?

Name the actual files:

- Facts:
- Rules:
- Examples:

## Tools Or Simulated Tools

What tools, files, systems, or mock actions will the prototype use? Text descriptions are enough.

Simulated tools are valid. Every tool should map to a workflow step.

## Memory Decision

What should the agent remember, and what should it not remember?

"No memory" is a valid answer. Write the reason either way.

## Output Format

What should the agent produce so a human can review it quickly and confidently?

List the labeled fields:

```text
Field 1:
Field 2:
Field 3:
Field 4:
Field 5:
```

## Escalation Rules

What should happen when the agent is unsure, missing data, or facing a risky case?

Cover: low confidence, missing data, anger or legal language, out-of-policy requests, high stakes.

## Human Approval Point

Where does the human approve, edit, reject, or escalate the agent's work?

The gate must come before anything with consequences.

## Initial Eval Plan

What cases will prove the agent works, respects boundaries, and handles edge cases?

List five cases with expected behavior:

```text
1. Happy path: [case] -> expected: 
2. Edge: [case] -> expected: 
3. Edge: [case] -> expected: 
4. Edge: [case] -> expected: 
5. Boundary: [case] -> expected: refuse and escalate because 
```
