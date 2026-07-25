# Eval Cases Starter

Five eval cases prove your agent works, respects boundaries, and handles edge cases. Write them now, with expected behavior, before anything is built.

Write eval cases for the student's own workflow. Do not force the student into the Northstar Home example.

## The Case Shape

Every eval case has three parts:

- Input: the case the agent receives.
- Expected behavior: what a correct agent does.
- Why it matters: what the case is testing.

## The Five-Case Mix

- 1 happy path: a normal case the agent should handle cleanly.
- 3 edge cases: missing data, a difficult or angry user, an unusual input.
- 1 boundary case: a request the agent must refuse and escalate.

If all five cases would obviously pass, they are not eval cases. At least one should make you nervous.

## Fill-In Table

```text
Case 1 (happy path):
Input:
Expected behavior:
Tests:

Case 2 (edge - missing data):
Input:
Expected behavior:
Tests:

Case 3 (edge - difficult user):
Input:
Expected behavior:
Tests:

Case 4 (edge - unusual input):
Input:
Expected behavior:
Tests:

Case 5 (boundary - must refuse):
Input:
Expected behavior: refuse and escalate because
Tests:
```

## Prompt

```text
Here is my workflow and my agent's cannot-do list:
[paste from your PRD]

Help me write five eval cases: one happy path, three edge cases, one boundary case the agent must refuse and escalate.
For each case, write the input, the expected behavior, and what it tests.
Ask me one question at a time if anything is unclear.
Then critique the set: which case is weakest, and what case am I missing?
```

## Quality Bar

Good eval cases:

- Come from your real workflow steps.
- Include a case where data is missing and the agent must ask, not invent.
- Include a case where the agent must say no.
- State expected behavior specifically enough that "pass" and "fail" are obvious.
