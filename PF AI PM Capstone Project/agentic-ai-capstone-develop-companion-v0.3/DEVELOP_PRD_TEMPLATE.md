# Develop PRD Template — The 8 Rows

Fill these during prompt 21. Every answer self-contained: no links, no "see video." A reviewer reads the sheet alone and understands the product.

```text
1. Prototype scope:
   [The one end-to-end loop the prototype proves, as five stations with your
    project's names on them: input → context → decision → output → human review.]

2. User interaction:
   [What the human does, concretely: picks/types what, sees what, clicks what.
    Name the three buttons and what each does.]

3. Synthetic data used:
   [The files and what is in them: your CSVs, your policy files, roughly how many
    rows, and one line on how you made them realistic. State plainly: all synthetic.]

4. Eval cases:
   [Your five cases with expected behavior: 1 happy path, 3 edges, 1 boundary the
    agent must refuse and escalate.]

5. Eval results:
   [The table as text: case → expected → actual → verdict (pass / needs work / fail).
    Honest verdicts. Specific actuals — "forgot to flag urgency", not "mostly fine".]

6. Improvement made:
   [Before: the failure. Change: the one thing you changed and why. After: the
    re-run result. One paragraph.]

7. Known limitations:
   [3–5 specific limits, stated as scope decisions. What it handles, what it does
    not, what format it needs. No "works great".]

8. Prototype evidence:
   [Your demo in words — a 90-second walkthrough a stranger could picture:
    "the user picks X, the agent reads Y and Z, decides A with reason B, drafts C,
    the human approves/edits/escalates, the log records it." Mention the refusal.]
```

Row 8 test: if a stranger can describe your loop back to you after reading it, the row is done.
