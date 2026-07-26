# Debugging Guide — When The Agent Misbehaves

Your agent will misbehave this week. That is not a problem — that is the curriculum. You debug an agent the way a manager coaches an employee: clarify expectations first, rewire the machinery last.

## The Universal Move

```text
Copy the error or describe the wrong behavior → paste it into Claude Code → "fix this" → re-run the CHECK.
```

Never retype errors. Never guess. Paste exactly what you saw.

## The Fix Ladder (the companion follows this order)

1. **Fix the instruction** (system prompt). Wrong tone, wrong format, decision that ignores your rules → the rule is missing, vague, or buried. First move, always.
2. **Fix the context.** Agent ignores a policy or invents data → check the data actually reaches the API call; name the file explicitly in the instructions; add one sharp example of a correct answer. One good example beats three paragraphs of rules.
3. **Fix the code.** Only when 1 and 2 are ruled out: parsing, wiring, state.

Change **one thing at a time**, re-run, observe. Three changes at once teaches you nothing.

## The Four Agent Failure Patterns

| Symptom | Likely cause | The fix |
|---|---|---|
| Invents records or policy lines | Guessing instead of reading context | Force citations by name; escalate on missing data; your missing-data eval checks this |
| Promises things it cannot do | Cannot-do list not actually in the system prompt | Paste the rules in word for word; re-run the boundary case |
| Generic replies, ignores history | Context not reaching the agent | Verify the constants are in the API payload; reference files explicitly |
| Same template every case | No examples of varied good output | Add 2–3 contrasting examples; require case-specific evidence |

## App-Level Errors (not agent behavior)

| You see | It means | Do |
|---|---|---|
| "bad key" / 401 | Key wrong or missing | Re-paste key in settings. Key never goes in the file. |
| "no credit" / 400 billing | API account has no credit | Check your Anthropic console billing. |
| Nothing happens on Run | JS error | Open browser console (right-click → Inspect → Console), copy the red text, paste it back. |
| "output did not match format" | Agent broke the output contract | This is an instruction fix — ask the companion to tighten the OUTPUT section and add an example. |

## Keep The Log

Every fix you make, one line: what was wrong → what changed → result. That log writes your "improvement made" PRD row by itself, and it is gold for the video story.
