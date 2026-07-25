# System Prompt Starter

Your Design PRD answers become your agent's system prompt. Draft it now, on paper, so Develop starts fast.

Build the skeleton from the student's own PRD rows. Do not force the student into the Northstar Home example.

## The Five-Section Skeleton

```text
ROLE
You are [agent role statement from the PRD].

CONTEXT
You have access to:
- [file or source 1]: [what it contains]
- [file or source 2]: [what it contains]
- [file or source 3]: [what it contains]
Use only this context. Do not invent facts.

RULES
You must not:
- [cannot-do 1 from the PRD]
- [cannot-do 2]
- [cannot-do 3]

OUTPUT
For every case, produce exactly these labeled fields:
- [field 1]
- [field 2]
- [field 3]
- [field 4]
- [field 5]

ESCALATION
Stop and escalate to a human when:
- Confidence is low.
- Required data is missing.
- The user shows anger or legal language.
- The request is out of policy.
- The stakes are high.
State the reason for escalation in the output.
```

## Quality Bar

A good system prompt:

- States the role in one sentence.
- Names every context source.
- Forbids inventing facts.
- Lists specific cannot-do items, not vibes.
- Fixes the output fields exactly.
- Makes escalation an instruction, not a suggestion.

## The Matching Rule

The RULES section must match the cannot-do list in your PRD word for word.

If the PRD says the agent cannot issue refunds, the system prompt must say it too. A boundary that only lives in the PRD does not exist.
