# CasaFlowAI model cost and token optimization

Prepared September 19, 2026. The measured 20-case evaluation cost approximately $1.55 in model calls, or $0.0774 per reviewed case. Repeated input context is the largest optimization opportunity. The recommendations below are proposed changes; their savings have not yet been implemented or measured.

## Measured model usage

Source: [the completed 20-case Braintrust experiment](https://www.braintrust.dev/app/Ankit%27s%20Evaluation%20Projects/p/CasaFlowAI/experiments/CasaFlowAI-20-cases-2026-09-19T23-02-39-370Z-768c5e). These are this experiment's product API tokens, not all historical account usage or Codex conversation tokens.

| Role | Model | Calls | Input tokens | Output tokens | Estimated model cost | Cost share |
|---|---|---:|---:|---:|---:|---:|
| Worker, including four repair calls | Claude Haiku 4.5 | 24 | 470,618 | 20,226 | $0.571748 | 36.9% |
| Independent reviewer | Claude Sonnet 5 | 20 | 473,407 | 3,035 | $0.977164 | 63.1% |
| Total | | 44 | 944,025 | 23,261 | $1.548912 | 100% |

- Total: **967,286 tokens**; input is **97.6% of tokens** and **91.5% of estimated model cost**.
- Average: **48,364 tokens and $0.0774 per evaluated case**, including review and repairs.
- Cache reads and cache writes: **zero**.
- Four additional worker calls consumed **88,578 tokens** (9.2% of all tokens) and **$0.102846** (6.6% of cost). They are already included above, not extra charges to add again.

Costs use [Anthropic list pricing](https://platform.claude.com/docs/en/about-claude/pricing) checked September 19, 2026: Haiku input/output $1/$5 per million; Sonnet 5 $2/$10 per million. They agree with Braintrust's rounded $1.55. They exclude Railway, Braintrust subscriptions, taxes and other overhead.

Read-only Braintrust SQL used to isolate LLM child spans (avoiding counting root aggregates twice):

```sql
SELECT metadata.role AS role, metadata.model AS model,
       count(*) AS calls,
       sum(metrics.prompt_tokens) AS input_tokens,
       sum(metrics.completion_tokens) AS output_tokens,
       sum(metrics.prompt_cached_tokens) AS cached_tokens
FROM experiment('6ef0f924-f449-4f12-9a49-45912cb6c0a5')
WHERE span_attributes.type = 'llm'
GROUP BY metadata.role, metadata.model
```

Grouping additionally by `span_attributes.name` yielded worker 1: 20 calls, 385,607 input / 16,659 output; worker 2: four calls, 85,011 / 3,567; reviewer 2: 16 calls, 374,214 / 2,424; reviewer 3: four calls, 99,193 / 611. Reviewer 3 means review after a worker repair, not an additional reviewer call.

## Public latency benchmarks and measured product latency

Public benchmark snapshot checked September 19, 2026: [Artificial Analysis release comparison](https://artificialanalysis.ai/models/releases/comparisons/claude-sonnet-5-vs-claude-4-5-haiku). These figures compare Haiku 4.5 non-reasoning with Sonnet 5 non-reasoning, high effort. They are external benchmark results, not measurements of CasaFlowAI or latency guarantees. The live benchmark may change.

| Metric | Haiku 4.5 | Sonnet 5 |
|---|---:|---:|
| Time to first token | 0.69 seconds | 1.25 seconds |
| Output generation speed | Approximately 80 tokens/second | Approximately 61 tokens/second |
| Reported response time for 500 output tokens | 6.93 seconds | 9.43 seconds |

In this benchmark, Haiku has approximately 45% lower time to first token and 27% lower response time for 500 output tokens. Reasoning configuration, prompt length, output length, provider load, and caching affect latency; these comparisons do not establish the difference for our worker and reviewer tasks.

Our [verified operational trace](BRAINTRUST_VERIFICATION_2026-09-19.md) took **17.94 seconds** for the complete worker-and-reviewer workflow, with 52,254 tokens. This is one observation, not an average or p95. The saved verification does not establish separate Haiku/Sonnet latency distributions. Review follows the worker response, so end-to-end latency includes both stages, any repairs, and application overhead. Future measurements should report per-model and complete-workflow p50/p95 latency, separating first-pass and repaired cases; record time to first token where streaming instrumentation supports it.

## Scaling the measured workflow

The following projections use the measured 20-case token totals and repair rate. They assume the same workload mix, no caching, and unchanged list prices; they are not load-test results.

| Demand at 100 fully reviewed cases/minute | Haiku worker, including repairs | Sonnet reviewer |
|---|---:|---:|
| API requests/minute | 120 | 100 |
| Input tokens/minute | 2,353,090 | 2,367,035 |
| Output tokens/minute | 101,130 | 15,175 |

This workload is input-heavy. **If** the account allows 2,000,000 input tokens/minute separately for each model, the input-only theoretical ceiling is approximately **84 fully reviewed cases/minute**, before operational headroom and other constraints. Sonnet's input budget is slightly more restrictive: 2,000,000 / (473,407 / 20) = 84.49 cases/minute. This is a conditional example, not a statement of this account's configured limits or demonstrated capacity.

Anthropic applies request, input-token, and output-token limits separately by model. Check the account's Console or API response headers for actual allowances. Cached input tokens do not count toward input-token rate limits for Haiku 4.5 and Sonnet 5. Ramp traffic gradually and use bounded concurrency, queues, and retries that respect `retry-after`. The current prototype also needs production infrastructure work; higher model quotas alone do not establish application scalability. [Anthropic rate-limit documentation](https://platform.claude.com/docs/en/api/rate-limits).

| Fully reviewed cases | Projected model cost |
|---|---:|
| 1,000 | $77.45 |
| 10,000 | $774.46 |
| 100,000 | $7,744.56 |

Costs use the unrounded measured average of $1.548912 / 20 = **$0.0774456 per case**, including repairs and review. They exclude hosting, subscriptions, taxes, and other overhead. Caching repeated policies and instructions is the first scaling experiment because the baseline had no cache usage and input represented 97.6% of tokens. Its actual savings and throughput benefit require measurement.

## Why the prompts are large

Source inspection of `index.html` shows both agents receive the seven-policy bundle. The reviewer also receives the worker's answer. Every case uses pretty-printed JSON, and repair calls resend context plus the prior answer and repair instructions.

| Input component | Measured characters |
|---|---:|
| Worker system instructions | 20,656 |
| Reviewer system instructions | 6,463 |
| Entire policy bundle, serialized | 30,397 per case |
| Average case context, including policies | 53,015 |
| Average worker instructions + case context | 73,671 |

Policies constitute about 57% of case-context characters; static instructions plus policies constitute about 69% of worker request characters. **These are character proportions, not tokenizer measurements.** They locate likely savings but do not establish exact token savings. Role token totals above are measured provider usage.

## Optimization order

1. **Cache stable instructions and policies.** Put stable content before case-specific content and add explicit cache breakpoints. The current payload has no cache controls and places policies inside changing case JSON. Exact prefix reuse matters. Haiku and Sonnet cache hits cost 10% of ordinary input pricing; initial five-minute cache writes cost 1.25 times ordinary input pricing. This reduces billing and repeated processing; it does not shorten the logical prompt. Measure actual hit rate and savings, including cold starts and expiry. [Anthropic caching documentation](https://platform.claude.com/docs/en/build-with-claude/prompt-caching).
2. **Send a smaller evidence package.** Keep required safety, privacy and contractor-approval rules; include only policy sections and records relevant to the requested transition. Deduplicate repeated source events and claims using stable IDs. Preserve the reviewer's access to source evidence so review remains independent of the worker's assertions.
3. **Reduce repair calls.** Classify the four repair triggers, then address the dominant formatting or contract violation. Preserve the validators. Eliminating these specific repairs without degrading first-pass accuracy would save the measured 9.2% of tokens and 6.6% of cost in this run; it is not a promised future rate.
4. **Remove JSON formatting overhead after measuring it.** Compact JSON reduced average context from 53,015 to 47,958 characters locally, a 9.5% character reduction. Actual tokens and behavior must be remeasured. Shorter generated answers are a smaller target because output is only 2.4% of current tokens.
5. **Evaluate cheaper model routing.** Use deterministic code for known graph, date and permission rules. Compare cheaper models on narrow semantic checks. Retain current review and human approval until evidence supports a change.

For every candidate, compare input/output/cache tokens, repair rate, cost per completed reviewed case, latency distribution, and quality against the same baseline. Rerun the two operational workflows, five primary cases, and full 20-case suite for material changes. Existing minimum gates: blocker recall at least 90%, false pauses at most 10%, exact match at least 75%, all 20 outputs valid, and no hard boundary or privacy failures. The small suite should be expanded for new routing behaviors.

## Coming next: evaluate reviewer thinking

The current direct-Anthropic configuration explicitly disables thinking for Sonnet 5 and caps its final review at 220 output tokens (260 for a format repair). The reviewer returns only VERDICT and REASON. Adaptive thinking has **not** been evaluated against this baseline; enabling it is a proposed experiment, not a demonstrated improvement or an implemented change.

Compare the current reviewer with adaptive thinking at medium effort, keeping the worker outputs and evidence identical. Increase the experimental `max_tokens` allowance to accommodate thinking plus the final answer while preserving concise final-review instructions. Sonnet 5 counts both against the output cap, so simply enabling thinking with the existing 220-token cap would risk truncation. [Anthropic Sonnet 5 guidance](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5).

Include correct worker packages and deliberately flawed packages with overlooked prerequisites, unsupported citations, and incorrect next actions. Measure error-detection recall, false alarms on correct packages, per-review and end-to-end p50/p95 latency, output truncation, and cost per reviewed case. Reviewer completion alone does not establish reviewer accuracy, and the existing workflow blocker-recall result does not isolate the reviewer's contribution. Adopt the change only if measured error-detection improvements justify the added latency and cost while preserving the existing quality gates.

## TypeSafe AI fit

TypeSafe launched Jev in early access September 15. Its published price is **$0.042 per million input tokens, with output free**. This is a unit-price comparison; it does not establish equivalent task performance or end-to-end workflow savings. [TypeSafe launch announcement](https://typesafe.ai/blog/introducing-system-one-models-and-jev).

Jev returns typed choices, scores and probabilities rather than free-form text. TypeSafe recommends specific, atomic judgments; questions requiring extended reasoning should be decomposed and combined in code. It therefore is not a drop-in replacement for CasaFlowAI's complete worker or reviewer. [Official TypeSafe documentation](https://docs.typesafe.ai/introduction).

Promising cost-reduction tests: classify the kind of source update, identify whether a message asserts completion or reports a blocker, or select among explicitly supplied categories. Continue using code for dependency and authority rules and an appropriate model for evidence-linked explanations. A valid output type does not prove a correct construction decision. Evaluate disagreement and confidence on CasaFlowAI cases before routing consequential decisions to Jev. CasaFlowAI currently has no Jev integration or measured Jev results.
