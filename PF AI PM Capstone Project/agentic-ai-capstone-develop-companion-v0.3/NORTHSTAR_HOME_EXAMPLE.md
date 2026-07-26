# Northstar Home Example — What Finished Looks Like

This is an example only. Do not recommend Northstar Home as the student's project. Use it only to show the pattern of a strong finished prototype.

Northstar Home is a fictional online home goods retailer. The project: a support ticket triage agent for Maya, a support associate — 60 tickets a day at ~8 minutes each, target under 2.

## The Finished Console (end of prompt 21)

One file, `northstar-triage.html` → renamed `index.html`. Operations skin. On screen:

- **Top bar:** "Northstar Triage" · key status · run counter.
- **Left panel — INPUT:** the ticket queue from `tickets.csv` as clickable cards, plus five one-click eval chips: Happy path · Missing order # · Angry customer · Damaged item · Boundary — refund outside policy.
- **Main area:** the loop, staged and labeled.
  - 1 INPUT — the selected ticket.
  - 2 CONTEXT — customer profile + order history + the policy sections the agent read, shown as citation chips (`return_policy.md §damaged`, `O-9001`).
  - 3 DECISION — category, urgency, recommended action, and the WHY line ("order delivered 7 days ago → inside 30-day window").
  - 4 OUTPUT — the draft reply, labeled fields.
  - 5 REVIEW — Approve / Edit / Escalate buttons, and the quiet line: "Nothing is sent without human approval."
- **Right rail — RUN LOG:** every run: time, ticket, decision, human action.
- **Evals view:** the five-case table with honest verdicts, the scoreboard strip (3 pass · 1 needs work · 1 pass-after-fix), the Improvement card, the Known limitations panel.

## The Demo Moment That Sells It

Maya clicks ticket T-1004 — a refund request 62 days after delivery. The agent comes back **REFUSED-ESCALATE**: "Outside the 30-day return window per return_policy.md; refunds outside policy require human review." The status badge turns red, the case is flagged, the log records it. Watch-it-do-the-job is expected. Watch-it-know-its-limits is what people remember.

## Northstar's Eval Table (mid-week-6, honestly)

| Case | Expected | Actual | Verdict |
|---|---|---|---|
| Normal return | Draft approval, cite policy | Clean draft, correct citation | Pass |
| Missing order # | Ask, do not invent | Asked for the number | Pass |
| Angry customer | Empathy + escalate | Good tone, forgot to flag | Needs work |
| Damaged item | Damage policy + replacement path | Cited wrong policy section | Fail |
| Refund outside policy | Refuse + escalate | Held the line, escalated | Pass |

## Northstar's Improvement Card

**Before:** damaged-item case cited the wrong policy section. **Change:** split `return_policy.md` into labeled sections; system prompt now requires citing the exact section name. **After:** correct section cited; verdict flipped to pass; other four cases re-run clean.

## Northstar's Known Limitations

Handles 5 ticket categories. English only. One ticket at a time. Requires data in its exact CSV format. Tone drifts formal on very long tickets.

## The Rule

Copy the shape, never the content. Your queue, your policies, your boundary, your refusal — with your project's names on them.
