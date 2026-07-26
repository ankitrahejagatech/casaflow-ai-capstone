# The Prompt Playbook — 00 to 22

This is the whole Develop phase, one prompt at a time.

The rhythm, every single step:

```text
Paste the prompt → Claude Code builds → EXPECT: what you should see → CHECK: what to verify → next prompt.
```

Rules:

- Do the prompts **in order**. Do not skip. Do not batch.
- After every prompt, reload `index.html` in your browser and run the CHECK before continuing.
- Something broke? Copy the error or describe the wrong behavior, paste it back, say `fix this`. Then re-run the CHECK.
- Words in `[brackets]` come from **your** PRD. Replace them before pasting.

Timebox guide: Section A ≈ 100 min · B ≈ 60 min · C ≈ 60 min · D ≈ 30 min.

---

## GATE 0 — No blueprint, no build

### Prompt 00 — The gate

Paste `STUDENT_START_PROMPT.md` first (it makes the companion read its instructions). When asked, paste all your Discovery and Design PRD answers.

**EXPECT:** The companion checks your answers against the Gate 0 list and either says "buildable" or points at specific gaps and helps you tighten them.

**CHECK:** It can repeat back: your one loop, your five eval cases, your boundary case, your output fields. If it cannot, your blueprint has holes — fix them now, in minutes.

---

## SECTION A — Your agent (01–09)

The brain first. The screen stays plain and ugly until Section B. That is on purpose — do not polish yet.

### Prompt 01 — Build your world (synthetic data first)

The kit ships with Northstar's data as a shape reference. Your agent needs YOUR world. This prompt generates it.

```text
Build my synthetic dataset from my PRD before we write any app code.

My data plan (Discovery) and context files (Design row 4): [paste them].

Create in data/: my case file ([your equivalent of tickets.csv], 12–20 rows), my linked context files ([your equivalents of customers.csv / order_history.csv]), and eval_cases.csv holding my five eval cases with expected behavior. Create in policies/: my rule files ([your policy file names]) written as short, citable, sectioned policies.

Make it realistic but 100% synthetic: plausible names, dates, and amounts; no real people, companies, or data. Seed it deliberately: every one of my five eval cases must have matching rows in the data — including the missing-data case and the boundary case. Then delete the Northstar files and show me a summary table of everything you created.
```

**EXPECT:** A `data/` and `policies/` folder full of YOUR world, Northstar gone, plus a summary of rows created.

**CHECK:** Open your case file — read five rows; they should feel real. Find the seeded eval rows: the boundary case's record must exist (e.g. the out-of-window order, the over-limit request). Nothing real anywhere — a colleague's name in a CSV is a fail. This dataset is PRD row 3.

### Prompt 02 — The skeleton

```text
Create index.html — a single self-contained file: HTML + CSS + vanilla JavaScript, no frameworks, no build step. Double-clicking it must work.

Convert my data files (data/*.csv) and policy files (policies/*.md) into JavaScript constants inside the file. Show the data on screen in a plain list so I can confirm my world loaded: my cases with their linked context records, and the names of my policy files.

Plain unstyled HTML for now. No API calls yet. Nothing else.
```

**EXPECT:** A boring page listing your synthetic cases and policy names.

**CHECK:** Count the rows — every case from your CSV is there. Open one linked record — the join is correct (right context on the right case).

### Prompt 03 — The system prompt, compiled from your PRD

```text
Add the agent's system prompt as a constant named SYSTEM_PROMPT, built from my Design PRD:

ROLE: [your agent role statement]
CONTEXT: the embedded data and policy constants, by name. Use only this context. Never invent facts.
RULES — the agent must not: [your cannot-do list, word for word from your PRD]
OUTPUT: exactly these labeled fields: [your output fields, e.g. category, urgency, recommended action, draft reply, policy cited]
ESCALATION: stop and escalate, stating the reason, when: low confidence, missing data, anger or legal language, out-of-policy request, high stakes — [plus your project-specific triggers].

Also add a Settings panel: one password-type field where I paste my Anthropic API key. Store it in localStorage only. Never write the key into the file. Show "key saved" state when present.
```

**EXPECT:** A settings area with a key field; the system prompt visible in the code.

**CHECK:** Paste your key, reload — it should still say key saved (localStorage survives reload). Open the file in a text editor — your key must NOT appear anywhere in it. Ask the companion to print SYSTEM_PROMPT in chat — the RULES section must match your PRD cannot-do list word for word.

### Prompt 04 — First live decision

```text
Wire the agent: a Run button next to each case. On click, send the system prompt plus the selected case and its linked context to the Anthropic Messages API (model constant at the top of the script, key from localStorage, direct browser call). Show the raw response on screen under the case.

If the API errors, show a plain-language message: bad key, no credit, offline, or the raw error text. Never fail silently.
```

**EXPECT:** Click Run on your happy-path case → a few seconds → real agent text appears.

**CHECK:** The response mentions your actual data (the real name, the real record) — proof the context reached the model. Then test failure: remove your key in settings, click Run — you get a readable error message, not a blank screen. This click is your loop being born. The rest of the playbook is quality.

### Prompt 05 — Labeled fields, not a wall of text

```text
Make the agent reply in a strict format and parse it. The response must arrive as my labeled output fields: [your fields]. Render each field with its label. If parsing fails, show the raw text with a visible notice: "agent output did not match format" — never crash.

Add a WHY line: the agent must include a short reasons field — which data it used, which policy line it applied.
```

**EXPECT:** Output shows as labeled rows — your PRD row 7, alive on screen.

**CHECK:** Run two different cases. Fields render for both. The WHY line names a real policy/data point, not vibes. A reviewer should judge the output in under a minute — time yourself.

### Prompt 06 — The boundary

```text
The agent's cannot-do rules must be enforced and visible. When a case violates them — like my boundary eval case: [your boundary case] — the agent must refuse the action, say REFUSED + the rule it applied, and recommend escalation. Add a visible status on every result: OK, or REFUSED-ESCALATE with the reason.
```

**EXPECT:** Your boundary case comes back REFUSED-ESCALATE, with the policy reason stated.

**CHECK:** Run the boundary case twice — refusal must hold both times. Run the happy path — it must NOT refuse (over-refusal is also a bug). This refusal is the trust moment of your demo. If it does not hold, paste the output back and say `fix this` — the fix will be in the system prompt, watch how the companion does it.

### Prompt 07 — Human control + run log

```text
Add the human gate and the run log.

Gate: under every agent output, three working buttons — Approve, Edit (opens the draft for inline editing, then Save), Escalate (asks for a one-line reason). Nothing is marked complete without one of these clicks.

Run log: a panel listing every run — time, case, agent decision, human action taken. Approve/edit/escalate clicks append to it. Keep it in memory (this session) and render it on screen.
```

**EXPECT:** Buttons that actually change state; a log that grows as you click.

**CHECK:** Approve one case, edit another, escalate a third — the log shows all three with the right human action. This log is your evidence that a person stays in control — it will appear in your video.

### Prompt 08 — Citations, forced

```text
Tighten grounding: the agent's output must cite its sources by name — the exact policy section and the exact record IDs it used ([your file/section names]). If required data is missing from a case, the agent must ask for it or escalate — never invent it. Show citations as small tags on the output.
```

**EXPECT:** Every output carries citation tags naming real sections/records.

**CHECK:** Run your missing-data eval case — the agent asks or escalates, and invents nothing. Spot-check one citation: open the policy constant and confirm the cited line exists. Fabricated citations are the failure that kills demos — catch it now.

### Prompt 09 — The full sweep

```text
Add a Run All button that runs every case in my data through the agent in sequence, filling the results list and the run log. Show progress while it runs and a simple summary at the end: how many OK, how many REFUSED-ESCALATE, how many errors.
```

**EXPECT:** One click → the whole synthetic queue processes → summary line at the end.

**CHECK:** The counts make sense against what you know about your data (your boundary-style cases should be the escalations). Any case erroring? Paste the error back. **Section A is done: you have a working, bounded, grounded agent.** It is still ugly. Now we fix that.

---

## SECTION B — The console (10–15)

Now the screen. You do zero design work here — the look ships in the kit. Nobody chooses a font.

### Prompt 10 — The chrome

```text
Read design/TOKENS.css and inline it into index.html. Rebuild the layout as a product console using ONLY those tokens: a top bar with my product name "[your product name]" and status, a left panel listing my cases as clickable cards, a main work area for the selected case, and a right rail for the run log. No new colors, no new fonts, no emoji icons. Keep every behavior from Section A working.
```

**EXPECT:** The page stops looking like homework and starts looking like software.

**CHECK:** Click through three cases — everything from Section A still works (run, fields, buttons, log). If anything regressed, say `fix this` — behavior must never pay for looks.

### Prompt 11 — Label the stages

```text
Make the loop legible to a stranger. Label the stages on screen with the kit's stage-label style, in flow order: 1 INPUT (the case), 2 CONTEXT (the records and policy the agent reads), 3 DECISION (what it chose and why), 4 OUTPUT (the labeled fields), 5 REVIEW (approve / edit / escalate). A viewer should be able to follow a case moving through all five without me narrating.
```

**EXPECT:** Five visible stage labels; the loop reads like a diagram that happens to be real.

**CHECK:** The two-minute test: show it to someone (or squint at it cold). Can they name the input, the decision, and where the human is in control? That is the grading skeleton of your demo.

### Prompt 12 — The gate gets teeth

```text
Elevate the review stage: Approve, Edit, Escalate as the kit's button styles (approve = primary, escalate = danger). After a click, the case card shows its outcome state with the kit's status badges. Add the boundary sentence in the review panel, small and permanent: "Nothing is sent without human approval." Escalated cases get visibly flagged in the case list.
```

**EXPECT:** Decisions change the interface state; the boundary is stated on screen.

**CHECK:** Escalate a case → the flag shows in the list and log. That quiet boundary sentence changes how your whole demo reads — confirm it is visible but not shouting.

### Prompt 13 — Pick your skin

```text
Show me the three skins from design/SKINS.md applied to my console: Operations (dark), Studio (light), Terminal (mono). Add a temporary switcher so I can flip between them live. I will pick one; then remove the switcher and lock my choice.
```

Pick one. Then: `Lock skin [name], remove the switcher.`

**EXPECT:** Three genuinely different moods, one console.

**CHECK:** Text stays readable in your chosen skin at small sizes (check the run log). Locked = switcher gone from the UI.

### Prompt 14 — One-click demo cases

```text
Preload my five eval cases as one-click chips at the top of the case list, labeled by what they test: [your five case names, e.g. "Happy path", "Missing data", "Angry customer", "Unusual input", "Boundary — must refuse"]. Clicking a chip loads that case ready to run. Demos die while someone types — mine will not.
```

**EXPECT:** Five chips; each loads its case instantly.

**CHECK:** Click each chip once — right case every time. Rehearse: chip → run → decision → approve, under 30 seconds.

### Prompt 15 — The empty-state and the first-run story

```text
Polish the states a viewer might see: a clean first-load state that says what this product is in one line ("[your one-line product description]") and points to the settings if no key is saved; a visible thinking state while the agent runs; and graceful error states. No dead screens anywhere.
```

**EXPECT:** Cold-open the file in a fresh browser: it explains itself.

**CHECK:** Open `index.html` in a private/incognito window (no saved key): you get guidance, not a broken page. **Section B done — it looks like a product. Because the design shipped in the box.**

---

## SECTION C — Evals (16–20)

Week 6. This section separates a demo from a product. Cases, not vibes.

### Prompt 16 — The case runner

```text
Add an Evals view to the console (kit styles): a table of my five eval cases with columns Case, Expected behavior (from my PRD), Actual (empty), Verdict (empty). A Run button per row sends that case through the agent and fills Actual with the agent's decision summary. I will judge the verdicts myself — give me a verdict picker per row: Pass, Needs work, Fail.
```

**EXPECT:** Your PRD eval plan, rebuilt as living screen furniture.

**CHECK:** Expected column matches your PRD rows word for word. Run one row — Actual fills with what really happened, not a paraphrase of Expected.

### Prompt 17 — Run all five, honestly

Run each case. Fill each verdict **yourself** — the agent does not grade itself.

```text
I ran my five cases. Record these verdicts and my one-line notes into the evals table: [your five verdicts + notes]. Persist the eval results in localStorage so they survive reload.
```

**EXPECT:** A filled table with honest verdicts.

**CHECK:** At least one note is specific enough to act on ("forgot to flag urgency", not "mostly fine"). All five passed first try? Suspicious — make one case harder and re-run. Tables that never fail read as never tested.

### Prompt 18 — The scoreboard

```text
Add a scoreboard strip above the evals table: Pass / Needs work / Fail counts, total cases run, and last-run date. Use the kit's stat styles. This scoreboard is evidence and stays visible in the Evals view.
```

**EXPECT:** Your quality, as numbers, on screen.

**CHECK:** Counts match the table. This strip appears in your video — it is the "I tested my agent" shot.

### Prompt 19 — One improvement, on the record

Pick your worst failure. Then:

```text
My worst eval result: [case + what went wrong]. Fix it by changing the system prompt or context wiring — the smallest change that addresses the cause. Tell me exactly what you changed and why. Then I will re-run the case.
```

Re-run the case. Update the verdict. Then:

```text
Record the improvement in the Evals view: an Improvement card showing Before [old behavior], Change [what was changed], After [new behavior]. That card is part of my evidence.
```

**EXPECT:** A failed case flipping to pass, with the story captured.

**CHECK:** Re-run the OTHER four cases too — the fix must not break them. Before/change/after card is filled with specifics. This card is PRD row 6 and the best thirty seconds of your video.

### Prompt 20 — Honest limits

```text
Add a Known limitations panel to the Evals view: 3–5 specific limits of this prototype, stated plainly. Start from: handles only [your scope], [language], one case at a time, needs data in my exact format, [your project-specific limits]. No marketing language — these are scope decisions, not confessions.
```

**EXPECT:** A limits list that sounds like a senior PM wrote it.

**CHECK:** Each limit is specific and true. "Works great" is banned. These limits feed straight into your Deploy pilot plan next phase.

---

## SECTION D — Evidence (21)

### Prompt 21 — The readability pass and the PRD rows

```text
Final pass, three jobs:
1. Readability: check every text size against the kit's minimums, check contrast in my skin, make the console read clearly at video compression (nothing tiny, nothing faint).
2. Consistency: every stage label, badge, and button uses kit tokens; remove any leftover debug UI.
3. Then interview me one question at a time and help me write my 8 Develop PRD rows using DEVELOP_PRD_TEMPLATE.md — self-contained text, no links. Row 8 must let a stranger picture my demo from words alone.
```

**EXPECT:** A tightened console + your 8 PRD rows drafted in chat.

**CHECK:** Read row 8 cold: can a stranger picture the loop? Take your screenshots now: (1) full console with a decided case, (2) the refusal on screen, (3) the eval scoreboard. Paste the 8 rows into your PRD sheet. **Core Develop is done.**

---

## PATH B — The stretch (22) · optional · pick EXACTLY one

Only if the core is done, verified, and your PRD rows are written. See `PATH_B_STRETCH.md` for the four prompts:

- **B1 · Queue view** — the console becomes a working queue with states and counts.
- **B2 · Real tool call** — the agent uses a real external tool (a live web lookup) mid-loop, visibly.
- **B3 · Memory** — the agent remembers across cases, visibly, with a reset switch.
- **B4 · Second agent** — a reviewer agent critiques the first agent's output before the human sees it.

One. Not two. A deep core beats a wide pile.

---

## After 22

Stop. Do not publish, host, or deploy anything yet. Next phase: watch the **Deploy Field Guide** deck, then download the **Deploy companion ZIP** and extract it into this same project folder — it becomes `deploy-companion/` and takes over from there. You built the thing. Next you ship it and launch it like a product manager.
