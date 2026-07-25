# Agent Blueprint Grill

Use these questions before declaring your blueprint build-ready.

Northstar Home is an example only. Do not recommend it as the student's project.

## Prompt

```text
Act as my agent design reviewer.
Ask me one question at a time.
Your job is to find whether my blueprint has a fuzzy role, missing context files, unnecessary tools, a lazy memory decision, an unreviewable output, missing escalation triggers, a gate placed after consequences, or eval cases that cannot fail.
After each answer, give a recommendation.
Do not recommend Northstar Home as my project. Use Northstar only as an example pattern if needed.
```

## Questions

1. What is the agent's role in one sentence?
2. Which file grounds each fact the agent uses?
3. What happens when required data is missing?
4. Which tool maps to which workflow step, and which tool could you delete?
5. What does the agent remember, and why is that the right choice?
6. Can a human judge the output in under a minute? What are the labeled fields?
7. What are the five escalation triggers, and what does the agent do at each one?
8. Where exactly is the human approval point, and what consequence does it sit before?
9. Which eval case tests the boundary the agent must refuse?
10. Could any of your five eval cases fail? What would failure look like?

## Go / No-Go Filter

The blueprint is build-ready if:

- The role fits in one sentence.
- Every fact traces to a named file.
- Missing data has a defined behavior.
- The output is labeled fields, reviewable in under a minute.
- The human gate sits before consequences.
- One eval case tests the refusal boundary.

The blueprint is not ready if:

- The role needs a paragraph.
- Context is "the data" with no file names.
- Tools exist that no workflow step uses.
- Memory is "everything, to be helpful."
- Escalation is "the agent will know."
- Every eval case would obviously pass.
