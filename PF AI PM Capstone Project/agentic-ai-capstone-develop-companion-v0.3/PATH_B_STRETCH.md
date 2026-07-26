# Path B — The Stretch (Prompt 22) · Pick Exactly One

Only start Path B when the core is done: loop runs, refusal holds, five verdicts recorded, improvement documented, 8 PRD rows written. A deep core beats a wide pile — one stretch, executed well, is the ceiling. Two stretches is how demos break the night before.

Pick the one that strengthens **your** demo story:

---

## B1 · Queue view — "it handles volume"

Best when your story is throughput (triage, review queues, intake).

```text
Path B stretch — queue view. Turn my case list into a working queue: states New → In review → Approved / Escalated, state counts in the panel head, filter chips by state, and Run All moving cases through the queue live. Keep every core behavior working. Kit tokens only.
```

**EXPECT:** The console reads as a living queue; Run All visibly drains "New".
**CHECK:** Counts always match visible cards; escalated cases stay flagged; core CHECK from prompt 09 still passes.

---

## B2 · Real tool call — "it acts, not just reads"

Best when your story is the agent using tools mid-loop. This is the only stretch that adds a real external dependency.

```text
Path B stretch — real tool call. Give the agent one real tool: a web lookup it can request mid-decision. When the agent needs [the thing your workflow genuinely checks, e.g. a current price / address validity / a public status], it emits TOOL_REQUEST with a query; the app performs a fetch to [one specific public API with no key or my existing key]; the result goes back to the agent, which finishes its decision citing the tool result. Show the tool call in the loop as its own labeled step: TOOL.
```

**EXPECT:** A visible TOOL stage lighting up mid-run with a real fetched value in the citation.
**CHECK:** Kill the network (or use a bad query) — the agent must fall back to escalate, not invent the tool result. If no sensible public API fits your project, pick a different stretch — do not force one.

---

## B3 · Memory — "it learns your preferences"

Best when your story is repeated use by the same human.

```text
Path B stretch — memory. Add a visible memory: when the human edits or escalates, store a short preference note (localStorage), e.g. "reviewer prefers shorter drafts" or "always escalate [category]". Feed stored notes into the system prompt on later runs. Show memory as its own panel — what is remembered, when it was learned — with a "Forget all" reset button.
```

**EXPECT:** Edit a draft twice → the third draft visibly adapts; memory panel explains why.
**CHECK:** "Forget all" really resets behavior. Memory must be inspectable — invisible memory reads as creepy, visible memory reads as smart. Note what you chose NOT to remember; that is a PRD-grade decision.

---

## B4 · Second agent — "quality has a reviewer"

Best when your story is trust and quality control. The most impressive stretch on screen — and the most token-hungry.

```text
Path B stretch — second agent. Add a reviewer agent that runs after the worker agent and before the human: separate system prompt, one job — critique the worker's output against my policies and eval criteria. It returns VERDICT (looks right / needs attention) + one-line reason. Show it as its own loop stage: REVIEW AGENT, with its verdict badge next to the worker's output. The human gate stays after both.
```

**EXPECT:** Two agents visibly disagreeing sometimes — that disagreement is the demo gold.
**CHECK:** Feed it your boundary case: worker refuses AND reviewer confirms — or reviewer catches what the worker missed. Human still holds the final click. If the reviewer rubber-stamps everything, tighten its prompt until it catches your Needs-work eval case.

---

## After Your Stretch

Re-run all five eval cases. The stretch must not break the core. Update PRD row 7 (limitations) and row 8 (evidence) to mention the stretch in one sentence each. Then stop — Deploy is next phase.
