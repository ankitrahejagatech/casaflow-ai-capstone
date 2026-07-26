# 03 - Develop Walkthrough

Goal: turn the Design blueprint into a working, tested, demo-ready prototype and produce the 8 Develop PRD answers.

Develop answers one question:

```text
Does the agent actually do the job — and can you prove it?
```

## Stop Point

This companion stops at Develop. No publishing, no hosting, no deployment. Deploy is phase 4 and has its own guide.

## Gate 0: The Blueprint Check

No build starts on a blueprint that does not exist. Before prompt 01, the student pastes their Discovery and Design PRD answers. Check:

1. One user, one workflow, one clear trigger. (Discovery)
2. Agent role in one sentence, with boundaries and escalation conditions. (Design 1)
3. Target workflow as numbered steps. (Design 2)
4. Named context files — facts, rules, examples. (Design 4)
5. Labeled output fields a human can judge in under a minute. (Design 7)
6. Escalation triggers with defined behavior. (Design 8)
7. A human approval point before anything with consequences. (Design 9)
8. Five eval cases, including one boundary case the agent must refuse. (Design 10)

Any gap: fix it in minutes, not days. Tighten the weak answer, confirm with the student, move on. Then — and only then — prompt 01.

## The Shape Of The Build

One file, `index.html`, containing three layers:

1. **The world** — the student's synthetic data and policies, embedded as JavaScript constants (converted from their `data/` and `policies/` files).
2. **The agent** — a live call to the Anthropic Messages API. System prompt compiled from the student's Design PRD rows. Key from localStorage, entered in a settings panel.
3. **The console** — the visible loop: case input, context panel, decision + reasons, labeled output fields, Approve / Edit / Escalate, run log. Styled exclusively with `design/TOKENS.css` tokens.

Section A builds layers 1 and 2 with a minimal screen. Section B builds the console properly. Section C proves it. Section D packages the evidence.

## Why This Order

Agent first, console second. The agent is the product; the console is how a viewer believes it. Building the brain first means every UI decision in section B wraps something real — no decorated emptiness. The minimal screen in section A is allowed to be ugly for six prompts. Say so out loud to the student so they do not polish early.

## The Five Must-Shows

Whatever the project, the demo must show:

1. A real input entering live — picked or typed, not a screenshot.
2. Context in use — the viewer can see which data and which policy the agent read.
3. A decision with reasons — what it chose and why, in the agent's own words.
4. An inspectable output — labeled fields a human can read and judge.
5. Human control working — Approve / Edit / Escalate, clicked on screen, logged.

Plus the trust moment: **the refusal**. The boundary case from Design, escalating on screen, with the reason stated. That is the thirty seconds people remember.

## What The Prototype Does Not Need

Logins. Accounts. Live integrations. Multiple workflows. Production error handling. Real data. A database. Hosting. If the student asks for any of these, decline and refocus: complete beats big.

## Evals Are The Grade

Week 6 belongs to section C. The method is three columns: expected, actual, verdict (pass / needs work / fail). Fails are findings, not embarrassments. A table with a needs-work in it reads as tested; a clean sweep reads as untested. One improvement — before, change, after — is mandatory and becomes the best thirty seconds of the student's video.

## The 8 Develop PRD Rows

The build fills these (template in `DEVELOP_PRD_TEMPLATE.md`):

1. Prototype scope — the one loop
2. User interaction — what the human does
3. Synthetic data used — the files
4. Eval cases — five, with expected behavior
5. Eval results — expected vs actual, verdicts
6. Improvement made — before, change, after
7. Known limitations — honest and specific
8. Prototype evidence — the demo, in words a stranger can picture

Self-contained, no links, written in the sheet.

## Final Stop Message

When the 8 rows are written and the loop runs:

```text
Develop is complete. Paste your 8 answers into your Develop PRD section. Stop here — do not publish or deploy anything. Wait for the Deploy guide.
```
