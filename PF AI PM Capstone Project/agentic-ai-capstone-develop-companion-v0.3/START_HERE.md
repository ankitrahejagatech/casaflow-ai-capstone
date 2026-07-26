# Agentic AI Capstone Develop Companion

Welcome. This companion helps you complete the **Develop** phase of your Agentic AI Capstone.

**Watch the Develop Field Guide deck first** — it explains the phase; this kit runs it.

It does one job:

```text
Help you turn your Design blueprint into a working, tested, demo-ready prototype — one prompt at a time.
```

## Very Important

This companion works on **your own** project — the one you designed in Discovery and Design.

Northstar Home is an example only. Do **not** switch to Northstar Home as your project unless your instructor explicitly tells you to.

You must have your completed **Discovery and Design PRD answers** before you start. The companion will ask you to paste them first. No build starts on a blueprint that does not exist.

## What You Will Have At The End

- One file: `index.html`. Double-click it, it runs. That is your prototype.
- One complete agent loop, visible on screen: input → context → decision → output → human approve / edit / escalate.
- A refusal you can demo: the case your agent must escalate, escalating on screen.
- An eval scoreboard: your five cases, run for real, with honest verdicts.
- One documented improvement, driven by a failed test.
- The 8 Develop PRD rows, written.

## The Tool

You build in **Claude Code**, inside the **Claude Desktop app → Code tab**.

- No terminal. No npm. No Node. You never install anything.
- You need a **paid Claude plan** (free claude.ai does not include Claude Code).
- Setup steps: `CLAUDE_CODE_SETUP_GUIDE.md`.

## The Method

Everything runs on one rhythm, about 22 prompts total:

```text
Paste prompt N → Claude Code builds → VERIFY: expected outcome + what to check → next prompt.
```

The prompts live in `PROMPT_PLAYBOOK.md`. Every prompt ships with what you should see and what to check. If you see an error instead: copy the error, paste it back, say "fix this." That is the whole debugging method.

Do not skip the verify step. The verify step is the difference between managing an agent and hoping.

## The Sections

| Section | Prompts | What you get |
|---|---|---|
| Gate 0 | 00 | Blueprint check. PRD answers pasted and confirmed buildable. |
| A · Your agent | 01–09 | The working loop: data, decisions, reasons, boundaries, refusal. |
| B · The console | 10–15 | A real product screen around your loop. Looks designed, because the design ships in this kit. |
| C · Evals | 16–20 | Case runner, five verdicts, a scoreboard, one improvement. |
| D · Evidence | 21 | Readability pass, screenshots, PRD rows 29–36 filled. |
| Path B · Stretch | 22 | Optional. Pick exactly one: queue view, real tool call, memory, or a second agent. |

The work and the grade live in sections A and C. The console makes it demo-ready. Do them in order.

## Timebox

Weeks 5–6. Plan for **3–5 focused hours** across the two weeks. Week 5: sections A and B. Week 6: sections C and D.

## Step-By-Step Setup

1. Download this companion ZIP from your course.
2. Unzip it to a folder you can find again.
3. Open Claude Desktop → Code tab → open that folder.
4. Paste the prompt from `STUDENT_START_PROMPT.md`.
5. Paste your Discovery + Design PRD answers when asked.
6. Work through `PROMPT_PLAYBOOK.md` one prompt at a time. Verify each.
7. When the playbook says stop — stop. Deploy is phase 4. Publishing is not a Develop row.

## What Is In The Box

```text
START_HERE.md                  ← you are here
STUDENT_START_PROMPT.md        ← the first prompt you paste
CLAUDE_CODE_SETUP_GUIDE.md     ← tool setup, once
PROMPT_PLAYBOOK.md             ← prompts 00–22, each with verify steps
CLAUDE.md / AGENTS.md          ← instructions for the AI (do not edit)
03_DEVELOP.md                  ← the phase walkthrough the AI follows
DEVELOP_PRD_TEMPLATE.md        ← the 8 PRD rows you must fill
DEBUGGING_GUIDE.md             ← when the agent misbehaves
NORTHSTAR_HOME_EXAMPLE.md      ← what finished looks like (example only)
PATH_B_STRETCH.md              ← the four stretch options, pick one
design/TOKENS.css              ← locked design tokens. The look ships in the box.
design/SKINS.md                ← the three skins, pick one
data/*.csv                     ← Northstar synthetic data (replace with YOURS)
policies/*.md                  ← Northstar policies (replace with YOURS)
```

## The Rules That Never Bend

1. Synthetic data only. Never real customers, employees, or company data.
2. Your API key lives in the app's settings field (browser localStorage) — never written into `index.html`, never pasted into a file.
3. One loop. The companion will refuse to build features beyond it. That is scope control, not laziness.
4. Nothing "sends" without human approval. The gate is real, on screen.
5. Stop at the end of Develop. Then: watch the **Deploy Field Guide** deck, download the **Deploy companion ZIP**, and extract it into THIS folder (it becomes `deploy-companion/`). Same Claude Code session carries on.
