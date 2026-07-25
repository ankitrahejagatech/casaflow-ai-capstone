# Agentic AI Capstone Design Companion

Welcome. This companion helps you complete the **Design** phase of your Agentic AI Capstone.

It does one job:

```text
Help you turn your chosen workflow into a complete agent blueprint and finish the Design PRD answers.
```

## Very Important

This companion works on **your own** project — the one you chose in Discovery.

Northstar Home is an example only.

Do **not** switch to Northstar Home as your project unless your instructor explicitly tells you to use it.

You must have your completed Discovery PRD answers before you start. The companion will ask you to paste them first. If any are missing or vague, it will help you fix them quickly before Design begins.

## What This Companion Will Help You Do

By the end, you should have Design PRD answers for:

1. Agent role
2. Target workflow
3. Agent loop
4. Inputs and context
5. Tools or simulated tools
6. Memory decision
7. Output format
8. Escalation rules
9. Human approval point
10. Initial eval plan

Then stop.

Do not move into Develop or Deploy yet. Design happens on paper. You are not building anything in this phase.

## Step-By-Step Setup In Codex

1. Download the companion ZIP.
2. Start a new Codex chat.
3. Attach the ZIP to the chat, or open the unzipped folder as the workspace if Codex gives you that option.
4. Paste the prompt from `STUDENT_START_PROMPT.md`.
5. Paste your Discovery PRD answers when the companion asks for them.
6. Answer one question at a time.
7. When the companion gives you the final Design PRD answers, paste those answers into your PRD.
8. Stop. Wait for the Develop guide before building.

## Start Prompt

Use this exact prompt:

```text
I am starting the Design phase of my Agentic AI Capstone.

Read START_HERE.md, AGENTS.md, and 02_DESIGN.md.

First ask me to paste my completed Discovery PRD answers. If any are missing or vague, help me fix them quickly before we continue.

This is my own project. Do not recommend Northstar Home as my project. Northstar Home is only an example.

Ask me one question at a time. Grill me until my agent has a clear role, target workflow, loop, context plan, tools, memory decision, output format, escalation rules, human approval point, and five eval cases.

Then help me write self-contained Design PRD answers for:
1. Agent role
2. Target workflow
3. Agent loop
4. Inputs and context
5. Tools or simulated tools
6. Memory decision
7. Output format
8. Escalation rules
9. Human approval point
10. Initial eval plan

After the Design PRD answers are complete, stop and tell me not to move to Develop yet.
```

## Files In This Workspace

- `STUDENT_START_PROMPT.md` - the exact prompt to paste into Codex.
- `CODEX_SETUP_GUIDE.md` - step-by-step setup instructions.
- `02_DESIGN.md` - the Design walkthrough.
- `DESIGN_PRD_TEMPLATE.md` - what to write in the PRD.
- `AGENT_BLUEPRINT_GRILL.md` - questions to pressure-test your blueprint.
- `SYSTEM_PROMPT_STARTER.md` - how to draft your agent's system prompt from your PRD.
- `EVAL_CASES_STARTER.md` - how to write five eval cases with expected behavior.
- `NORTHSTAR_HOME_EXAMPLE.md` - example only, not the default project.
- `AGENTS.md` - instructions for the AI companion.
- `data/` - sample synthetic data for the Northstar example.
- `policies/` - sample policy docs for the Northstar example.

## The Rule

Your capstone should be your project.

Northstar Home is there to teach the pattern, not to replace your thinking.
