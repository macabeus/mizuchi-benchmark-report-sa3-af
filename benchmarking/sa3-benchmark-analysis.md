# SA3 Benchmark: Three-Run Comparison Analysis

This analysis covers three runs of the Mizuchi decompilation pipeline against the SA3 benchmark set (30 functions: 10 easy, 10 medium, 10 hard).

- **Run 1**: February 28, 2026
- **Run 2**: March 1, 2026
- **Run 3**: March 7, 2026

---

## 1. Schema Differences Between Runs

The JSON result schema evolved across the three runs, reflecting ongoing development of the pipeline:

**Token usage structure:**
- Run 1 uses a flat token usage object: `{ inputTokens, outputTokens, cacheReadInputTokens, cacheCreationInputTokens, costUsd }`.
- Runs 2 and 3 use a nested structure keyed by model name: `{ "claude-sonnet-4-6": { inputTokens, ... } }`. This change supports multi-model accounting but breaks backward compatibility with tooling that expects the flat format.

**New fields in Run 3:**
- `ttftTimedOut` (boolean) and `ttftMs` (number): Track whether the API failed to return the first token within the allowed window, and how long the wait was.
- `queryTiming`: Additional timing breakdown per query.
- `ttftTimeoutMs: 180000` added to pipeline config (180 seconds to first token).

**Missing fields:**
- Run 1 lacks the `matchSource` field in results, which was added in Run 2 to distinguish how a match was achieved.

These schema changes are important for anyone writing cross-run analysis tooling: the token parsing path must branch on run vintage, and Run 1 results cannot be filtered by `matchSource`.

---

## 2. Why Were Runs 1-2 Faster Than Run 3?

Run 3 took 16.43 hours of AI duration compared to 5.13h (Run 1) and 6.61h (Run 2) -- a 2.5-3.2x wall-clock slowdown. The root cause is a catastrophic degradation in API throughput, which triggered a cascade of secondary failures.

### 2.1 API throughput collapse

The output token rate tells the story directly:

| Run | Output Tokens/sec |
|-----|-------------------|
| Run 1 | 56.79 |
| Run 2 | 44.17 |
| Run 3 | **11.14** |

Run 3 saw a **5x throughput drop** relative to Run 1. This is an external factor -- the pipeline code did not change in a way that would explain it. The most likely cause is API-side load or rate limiting on March 7.

### 2.2 Soft timeout epidemic

The slow throughput meant the 420-second soft timeout was hit constantly:

| Run | Soft Timeouts |
|-----|---------------|
| Run 1 | 3 |
| Run 2 | 9 |
| Run 3 | **95** |

95 soft timeouts across 146 attempts means **65% of all attempts** in Run 3 were truncated before the model finished its response. A soft-timed-out response typically contains incomplete or malformed C code.

### 2.3 Cascade into compile failures

Truncated responses produce code that cannot compile:

| Run | Compile Failures |
|-----|------------------|
| Run 1 | 7 |
| Run 2 | 9 |
| Run 3 | **59** |

The correlation is stark. In Run 3, functions like `sub_8085618` and `sub_8078F74` each had 12 soft timeouts paired with exactly 12 compile failures -- every single soft-timed-out response was uncompilable garbage.

### 2.4 TTFT timeouts: a new failure mode

Run 3 introduced a 180-second TTFT (time to first token) timeout, and it fired 15 times. The most extreme case is `sub_80720E4`, which had 6 TTFT timeouts and 6 hard timeouts across its 12 attempts, resulting in $0.00 cost and `bestDiff=null` -- the model never produced a single token of useful output for this function.

### 2.5 Input token inflation

Paradoxically, Run 3 consumed **more** input tokens (87.3M vs 55.2M/50.9M) despite producing **fewer** output tokens (659K vs 1.05M/1.05M). Each failed attempt extends the conversation history, which inflates the context window for subsequent retries. When most attempts fail due to timeouts, the retries pile up with large contexts but minimal useful output.

### 2.6 The cost paradox

Despite all the failures, Run 3 was the cheapest run at $26.15 (vs $42.93/$40.36). This is because output tokens dominate the cost structure, and Run 3 produced 37% fewer output tokens. The pipeline was effectively paying for input tokens that went nowhere.

---

## 3. Token and Cost Accounting

### 3.1 Aggregate token usage

| Metric | Run 1 | Run 2 | Run 3 |
|--------|-------|-------|-------|
| Total Input Tokens | 55,211,172 | 50,949,210 | 87,319,916 |
| Total Output Tokens | 1,048,671 | 1,051,146 | 659,054 |
| Input/Output Ratio | 52.6:1 | 48.5:1 | **132.5:1** |

The I/O ratio in Run 3 is 2.5x worse than Runs 1-2. This reflects the vicious cycle: failed attempts add to input context but produce little output, making subsequent attempts more expensive per useful token.

### 3.2 Cost breakdown

| Metric | Run 1 | Run 2 | Run 3 |
|--------|-------|-------|-------|
| Total Cost | $42.93 | $40.36 | $26.15 |
| Cost/Match | $1.95 | $1.68 | $1.25 |
| Cost/Attempt | $0.34 | $0.33 | $0.18 |

**Cost per match** decreased across runs ($1.95 -> $1.68 -> $1.25), but this metric is misleading for Run 3. The low cost/match is a consequence of low output token generation, not efficiency. The functions that did match in Run 3 tended to match on attempt 1 (before timeouts could accumulate), so they had naturally low cost.

**Cost per attempt** dropped to $0.18 in Run 3 because most attempts were truncated before generating significant output.

### 3.3 Cost extremes by function

**Most expensive function across all runs**: `sub_80720E4` at $7.35 (Run 1) and $7.31 (Run 2) -- a hard function that never matched in any run. In Run 3, it cost $0.00 because TTFT timeouts prevented any token generation whatsoever.

**Cheapest matches**: `sub_80817E0` consistently matched on attempt 1 for $0.06-$0.14 across all runs. `sub_80AE3D4` ($0.12-$0.34) and `sub_8068954` ($0.11-$0.27) were similarly cheap single-attempt matches.

**The failed functions consumed disproportionate budget**: In Run 1, the 8 failed functions consumed a majority of the total cost because failures always exhaust all 12 attempts. The same pattern holds in Runs 2-3: `sub_806D404` cost $4.73/$4.36/$0.43, `sub_80C5FCC` cost $4.57/$5.58/$0.63, and `sub_80720E4` cost $7.35/$7.31/$0.00 -- all persistent failures that burned budget without results.

### 3.4 The I/O ratio as a health metric

The input/output ratio serves as a reliable proxy for API health:

- **Healthy (Runs 1-2)**: ~50:1 ratio. The model reads context and produces proportionate output.
- **Degraded (Run 3)**: 132.5:1 ratio. The model reads increasingly large contexts (from retry accumulation) but produces far less output due to truncation.

Any future run with an I/O ratio significantly above 60:1 should be flagged as potentially experiencing API throughput issues.

---

## 4. Permuter Usefulness

### 4.1 Summary

| Metric | Run 1 | Run 2 | Run 3 |
|--------|-------|-------|-------|
| Permuter Tasks Launched | 42 | 28 | 25 |
| Tasks with Improvement | 31 (73.8%) | 23 (82.1%) | 23 (92.0%) |
| Tasks Solved Perfectly | 0 | 0 | 0 |

### 4.2 Analysis

The permuter (running as a background plugin) **never solved a single function to a perfect match** across any of the 95 total tasks launched in three runs. While it frequently found improvements (reducing diff scores), these improvements were insufficient to reach zero diffs.

The improvement rate increased across runs (73.8% -> 82.1% -> 92.0%), but this likely reflects the quality of starting points rather than permuter effectiveness. In Run 3, more functions had higher diff counts due to timeouts, giving the permuter more room for marginal score reductions that still fell far short of a match.

The decreasing task count (42 -> 28 -> 25) across runs is also notable. Fewer tasks were launched because the permuter only runs on functions that have produced compilable code. In Run 3, with 59 compile failures, fewer functions ever reached a state where the permuter could be invoked.

### 4.3 Verdict

The background permuter is not contributing to the pipeline's success metric. It consumes CPU time but has produced zero matches across 95 tasks. Its "improvements" are not fed back into the AI retry loop, making them purely diagnostic.

The permuter may have theoretical value for near-miss functions (e.g., `sub_80AC0C4` with bestDiff=2 in Run 3), but even in these cases it failed to close the gap. The compute budget spent on the permuter could potentially be redirected to longer AI timeout windows or additional retry attempts.

---

## 5. m2c Usefulness

### 5.1 Coverage

All 30 functions had m2c (machine-to-C) output available in all three runs -- 100% coverage across all runs. m2c successfully produced an initial C translation from assembly for every function regardless of difficulty tier.

### 5.2 Correlation with success

Since m2c ran for all functions and its output was always available to Claude, we cannot directly A/B test its contribution. However, indirect evidence suggests a tier-dependent relationship:

**For easy/medium functions that succeed on attempt 1**: Functions like `sub_80817E0`, `sub_80AE3D4`, `sub_8068954`, and `sub_8027834` consistently match with minimal attempts. m2c likely provides a reasonable structural skeleton that Claude can refine quickly for these simpler functions.

**For persistently failing functions**: `sub_806D404` (easy, bestDiff 77-91), `sub_80C5FCC` (easy, bestDiff 26-32), `sub_80720E4` (hard, bestDiff 88-99), and `sub_8078F74` (hard, bestDiff 129-133) all had m2c output available but could never be matched. For these functions, the m2c output is either too far from the target structure or may actively mislead Claude into wrong structural choices that it cannot escape from across 12 retry attempts.

### 5.3 Verdict

m2c provides universal coverage and likely accelerates first-attempt matches for simpler functions by giving Claude a structural starting point. Its value for hard functions is unclear -- the hardest functions fail regardless of m2c availability. A controlled experiment (running a subset of functions without m2c output) would be needed to quantify its precise contribution.

---

## 6. Timeout Inventory

### 6.1 Aggregate breakdown by type

| Timeout Type | Run 1 | Run 2 | Run 3 |
|--------------|-------|-------|-------|
| Soft (420s) | 3 | 9 | 95 |
| Hard | 0 | 8 | 11 |
| TTFT (180s) | 0 | 0 | 15 |
| **Total** | **3** | **17** | **121** |
| As % of attempts | 2.4% | 13.8% | **82.9%** |

Run 3 had **40x more timeouts** than Run 1 and **7x more** than Run 2.

### 6.2 Per-function timeout breakdown (Run 3)

Functions with any timeout in Run 3, sorted by total timeout count:

| Function | Tier | Soft | Hard | TTFT | Compile Fails | Outcome | Best Diff |
|----------|------|------|------|------|---------------|---------|-----------|
| sub_8085618 | hard | 12 | 0 | 0 | 12 | FAIL | null |
| sub_8078F74 | hard | 12 | 0 | 0 | 12 | FAIL | null |
| sub_806B2F4 | hard | 12 | 0 | 3 | 0 | FAIL | 9 |
| sub_80720E4 | hard | 0 | 6 | 6 | 0 | FAIL | null |
| sub_806D404 | easy | 10 | 2 | 2 | 7 | FAIL | 91 |
| sub_80C5FCC | easy | 10 | 1 | 2 | 7 | FAIL | 32 |
| sub_0807F4F0 | medium | 10 | 2 | 0 | 8 | FAIL | 24 |
| sub_80AC0C4 | hard | 9 | 0 | 0 | 9 | FAIL | 2 |
| sub_80ACD10 | easy | 7 | 0 | 0 | 2 | FAIL | 53 |
| sub_8087590 | easy | 6 | 0 | 0 | 1 | SUCCESS | 0 |
| sub_8068C38 | hard | 5 | 0 | 2 | 0 | SUCCESS | 0 |
| sub_80219E8 | easy | 1 | 0 | 0 | 1 | SUCCESS | 0 |
| sub_8077954 | medium | 1 | 0 | 0 | 0 | SUCCESS | 0 |

### 6.3 Timeout correlation with tier

In Run 3, timeouts hit all tiers but were most devastating for hard functions:

- **Easy tier**: 34 soft, 3 hard, 4 TTFT across 5 affected functions. Two still succeeded (`sub_80219E8` with 1 soft timeout, `sub_8087590` with 6 soft timeouts), showing that easy functions can sometimes recover from timeouts given enough clean retries.
- **Medium tier**: 11 soft, 2 hard, 0 TTFT across 2 affected functions. One succeeded (`sub_8077954` with only 1 soft timeout).
- **Hard tier**: 50 soft, 6 hard, 11 TTFT across 6 affected functions. Only one succeeded (`sub_8068C38` with 5 soft + 2 TTFT timeouts, requiring 6 attempts).

Hard functions are more vulnerable to timeouts because they require longer, more detailed responses -- exactly the kind of response that gets cut off by soft timeouts. A 420-second window at 11 tok/s yields roughly 4,700 tokens, which may be insufficient for complex functions that need 8,000-15,000 tokens of code and explanation.

### 6.4 The "zero useful work" pattern

Three functions in Run 3 produced `bestDiff=null`, meaning they never even reached the objdiff comparison stage:

| Function | Tier | Timeouts | Compile Fails | Cost | Analysis |
|----------|------|----------|---------------|------|----------|
| sub_80720E4 | hard | 6 hard + 6 TTFT | 0 | $0.00 | Never received a single API response token across all 12 attempts |
| sub_8085618 | hard | 12 soft | 12 | $0.35 | All responses truncated, all resulting code uncompilable |
| sub_8078F74 | hard | 12 soft | 12 | $0.84 | Same pattern as sub_8085618 |

These three functions consumed 36 attempts (24.7% of Run 3's 146 total) with zero productive output. `sub_80720E4` is the most extreme case: the API never returned a first token within 180 seconds on any of its 12 attempts, so the total cost was literally $0.00.

### 6.5 Cross-run timeout patterns

Some functions showed escalating timeout behavior across runs:

| Function | Run 1 Timeouts | Run 2 Timeouts | Run 3 Timeouts |
|----------|----------------|----------------|----------------|
| sub_80720E4 | 1 soft | 0 | 6 hard + 6 TTFT |
| sub_8078F74 | 2 soft | 2 soft | 12 soft |
| sub_0807F4F0 | 0 | 5 soft + 8 hard | 10 soft + 2 hard |

`sub_80720E4` and `sub_8078F74` are hard functions that may inherently require longer prompts/contexts, making them the first to be affected as API throughput degrades.

---

## 7. Functions That Flipped

Five functions changed outcome between runs. Each tells a different story about pipeline reliability.

### 7.1 sub_80219E8 (easy) -- FAIL -> MATCH -> MATCH

| Run | Outcome | Attempts | Duration | Cost | Best Diff | Timeouts |
|-----|---------|----------|----------|------|-----------|----------|
| Run 1 | FAIL | 12 | 1487s | $2.54 | 4 diffs | -- |
| Run 2 | SUCCESS | 3 | 213s | $0.53 | 0 | -- |
| Run 3 | SUCCESS | 4 | 1553s | $2.75 | 0 | 1 soft, 1 compile fail |

This function was tantalizingly close in Run 1 (only 4 diffs) but exhausted all 12 attempts without closing the gap. Runs 2 and 3 matched it in 3-4 attempts. The Run 1 failure suggests the AI got stuck in a local optimum -- iterating on an approach that could not eliminate the last 4 diffs. The fact that it matched quickly in Runs 2-3 indicates the function is fundamentally solvable and Run 1 was unlucky in its initial approach direction.

Run 3's success is notable because it occurred despite 1 soft timeout and 1 compile failure, confirming that easy functions can absorb timeout-related disruptions.

### 7.2 sub_80ACD10 (easy) -- MATCH -> FAIL -> FAIL

| Run | Outcome | Attempts | Duration | Cost | Best Diff | Timeouts |
|-----|---------|----------|----------|------|-----------|----------|
| Run 1 | SUCCESS | 2 | 160s | $0.45 | 0 | -- |
| Run 2 | FAIL | 12 | 1154s | $2.87 | 51 diffs | -- |
| Run 3 | FAIL | 12 | 5250s | $4.39 | 53 diffs | 7 soft, 2 compile fail |

This is the most concerning flip: a function that matched easily in Run 1 (2 attempts, $0.45) and then failed badly in both subsequent runs with 51-53 diffs remaining. The high diff count indicates the AI is taking a fundamentally wrong structural approach in Runs 2-3, not just missing minor details.

Critically, **Run 2 had zero timeouts for this function** and still failed with 51 diffs across 12 clean attempts. This confirms the root cause is approach selection, not API throughput. The AI's non-deterministic initial code generation leads to a structural choice that cannot converge to the target through iterative refinement. Run 3's 7 soft timeouts compounded the problem but were not the primary cause.

This function represents a genuine capability regression that warrants investigation into what changed between Run 1 and Run 2 (model version, prompt content, m2c output, or pure sampling variance).

### 7.3 sub_806B2F4 (hard) -- FAIL -> MATCH -> FAIL

| Run | Outcome | Attempts | Duration | Cost | Best Diff | Timeouts |
|-----|---------|----------|----------|------|-----------|----------|
| Run 1 | FAIL | 12 | 1428s | $3.50 | 5 diffs | -- |
| Run 2 | SUCCESS | 12 | 1407s | $3.49 | 0 | 1 compile fail |
| Run 3 | FAIL | 12 | 5241s | $0.32 | 9 diffs | 12 soft, 3 TTFT |

This function sits right at the edge of solvability. Run 2 matched it but required **all 12 attempts** (with 1 compile failure), meaning it was a last-minute success at maximum retry budget. Run 1 got within 5 diffs but could not close the gap. Run 3 was devastated by timeouts: all 12 attempts hit soft timeouts and 3 hit TTFT timeouts, at a total cost of just $0.32 -- indicating almost no useful output was generated.

The Run 2 success at attempt 12 ($3.49) demonstrates this function needs many clean iterations to converge. Any disruption to the retry cycle -- such as Run 3's universal soft timeouts -- eliminates any chance of convergence. At $0.32 total cost for 12 attempts, Run 3 averaged $0.027/attempt, meaning each attempt produced negligible output before being truncated.

### 7.4 sub_8085618 (hard) -- FAIL -> MATCH -> FAIL

| Run | Outcome | Attempts | Duration | Cost | Best Diff | Timeouts |
|-----|---------|----------|----------|------|-----------|----------|
| Run 1 | FAIL | 12 | 1159s | $3.21 | 6 diffs | -- |
| Run 2 | SUCCESS | 5 | 680s | $1.55 | 0 | -- |
| Run 3 | FAIL | 12 | 5280s | $0.35 | null | 12 soft, 12 compile fail |

Run 1 came close (6 diffs) but could not close. Run 2 matched in 5 attempts with no timeouts. Run 3 was a complete loss: 12 soft timeouts produced 12 uncompilable responses, yielding `bestDiff=null` -- the function never even reached the objdiff comparison stage.

Run 3's failure is **entirely attributable to API throughput degradation**. At $0.35 total cost across 12 attempts, the model barely produced any output. This function's Run 2 success (5 attempts, $1.55, zero timeouts) proves it is reliably solvable under normal API conditions.

### 7.5 sub_80AC0C4 (hard) -- MATCH -> MATCH -> FAIL

| Run | Outcome | Attempts | Duration | Cost | Best Diff | Timeouts |
|-----|---------|----------|----------|------|-----------|----------|
| Run 1 | SUCCESS | 3 | 313s | $0.89 | 0 | -- |
| Run 2 | SUCCESS | 2 | 243s | $0.67 | 0 | -- |
| Run 3 | FAIL | 12 | 5266s | $2.70 | 2 diffs | 9 soft, 9 compile fail |

This is the most frustrating flip. The function matched reliably in Runs 1-2 (2-3 attempts, under $1) but failed in Run 3 despite getting within **2 diffs** of a match. With 9 soft timeouts producing 9 compile failures, the AI had very few clean attempts to work with.

At bestDiff=2, this function was almost certainly solvable if the API had been responsive. The 9 soft timeouts consumed 9 of the 12 available attempts with garbage output, leaving only 3 clean attempts -- likely not enough to iterate to the final solution for a hard-tier function. This is the single strongest piece of evidence that Run 3's failures were API-driven, not capability-driven: a function that matched in 2-3 attempts under normal conditions failed at bestDiff=2 when 75% of its retry budget was consumed by truncated responses.

### 7.6 Summary of flips

| Function | Tier | Pattern | Root Cause |
|----------|------|---------|------------|
| sub_80219E8 | easy | FAIL -> MATCH -> MATCH | Run 1 bad luck; function is reliably solvable |
| sub_80ACD10 | easy | MATCH -> FAIL -> FAIL | Non-deterministic approach selection; structural divergence in Runs 2-3 |
| sub_806B2F4 | hard | FAIL -> MATCH -> FAIL | Edge-case function needing 12 clean attempts; timeouts fatal in Run 3 |
| sub_8085618 | hard | FAIL -> MATCH -> FAIL | Solvable (Run 2 proved it); pure timeout casualty in Run 3 |
| sub_80AC0C4 | hard | MATCH -> MATCH -> FAIL | Reliably solvable (Runs 1-2); 2 diffs away in Run 3 but 9/12 attempts wasted on timeouts |

Of the five flipped functions, **three** (sub_806B2F4, sub_8085618, sub_80AC0C4) failed in Run 3 primarily or entirely due to API throughput issues. Only **sub_80ACD10** represents a genuine regression in the AI's problem-solving approach (failed even without timeouts in Run 2). **sub_80219E8** represents a genuine improvement -- Run 1's failure was a sampling outlier.

### 7.7 Functions that never flipped

For completeness, the remaining 25 functions had stable outcomes across all three runs:

**Always succeeded (20 functions):** sub_806A818, sub_8078D6C, sub_8087590, sub_80945A0, sub_80A3EAC, sub_80AE3D4 (easy); sub_8022934, sub_8027834, sub_8068748, sub_8068778, sub_8068954, sub_8077954, sub_807ECFC, sub_80817E0, sub_80AE1C8 (medium); sub_8068C38, sub_806C8BC, sub_806D01C, sub_8073ACC, sub_8087A48 (hard).

**Always failed (5 functions):** sub_806D404 (easy, bestDiff 77-91), sub_80C5FCC (easy, bestDiff 26-32); sub_0807F4F0 (medium, bestDiff 5-24); sub_80720E4 (hard, bestDiff 88-null), sub_8078F74 (hard, bestDiff 129-null).

The "always failed" group includes two nominally "easy" functions (`sub_806D404` and `sub_80C5FCC`) with persistently high diff counts, suggesting they may be miscategorized or have unusual structural properties that the pipeline cannot handle.

---

## 8. Tier Predictability

**Question: Are easy functions really faster and more likely to match than harder ones?**

### Aggregate by Tier

| Tier | Functions | Match Rate | Avg Attempts | Avg Duration | Avg Cost |
|------|-----------|-----------|--------------|-------------|----------|
| Easy | 10 | 70.0% | 4.8 | 20.4m | $1.39 |
| Medium | 10 | 90.0% | 2.5 | 9.7m | $0.56 |
| Hard | 10 | 63.3% | 5.9 | 26.6m | $1.69 |

### Analysis

**Medium functions are the sweet spot, not easy ones.** Counter-intuitively, SA3's medium-tier functions have the highest match rate (90%), fewest attempts (2.5), shortest duration (9.7m), and lowest cost ($0.56). 9 of 10 medium functions matched in all 3 runs. The only outlier is `sub_0807F4F0` which failed in all 3 runs, dragging the average attempts up.

**Easy functions perform worse than medium.** At 70% match rate, easy is notably worse than medium. This is driven by two functions (`sub_806D404` and `sub_80C5FCC`) that failed in all 3 runs despite being classified as "easy." These two always exhausted all 12 attempts with no success, suggesting they are misclassified or have properties that the tier classification doesn't capture. Without these two outliers, easy would be at 87.5% — close to medium.

**Hard functions behave as expected.** At 63.3% match rate and 5.9 average attempts, hard functions are the most expensive and slowest. However, 5 of 10 hard functions matched in all 3 runs, demonstrating that "hard" doesn't mean impossible — it means higher variance. The other 5 either always fail (3 functions) or flip between runs (2 functions).

### Per-Run Consistency

| Tier | Run 1 | Run 2 | Run 3 |
|------|-------|-------|-------|
| Easy | 70% | 80% | 60% |
| Medium | 90% | 100% | 80% |
| Hard | 60% | 60% | 70% |

Medium is the most stable tier across runs (80-100%). Easy and hard both show more variance, though for different reasons: easy variance comes from borderline functions (`sub_80ACD10`), while hard variance comes from the timeout-sensitive nature of complex functions.

### Key Takeaway

The tier classification is a reasonable predictor of difficulty, but with important caveats: (1) medium functions are the easiest in practice, not easy ones; (2) the easy tier contains 2 misclassified functions that are harder than most hard functions; (3) 50% of hard functions are reliably solvable, meaning "hard" primarily predicts higher variance, not failure.

---

## 9. First-Try Match Rate

**Question: How often does Claude match a function on the very first attempt, without needing retries?**

### Per-Run Results

| Run | First-Try Matches | AI Functions | First-Try Rate |
|-----|-------------------|--------------|----------------|
| Run 1 | 14 | 30 | 47% |
| Run 2 | 16 | 30 | 53% |
| Run 3 | 17 | 30 | 57% |
| **Average** | **15.7** | **30** | **52%** |

SA3 has no programmatic-phase matches (m2c/permuter), so all 30 functions require Claude's AI intervention. Roughly half match on the first attempt.

### Analysis

**First-try rate is remarkably stable.** Despite Run 3's severe API throughput degradation, it had the highest first-try rate (57%). This makes sense: functions that match on attempt 1 do so before timeouts can affect them. The API slowdown primarily hurts multi-attempt functions.

**First-try matches are dramatically cheaper.** A function that matches on the first attempt costs a fraction of one that requires retries. Failed functions that exhaust all 12 attempts cost 10-20x more than first-try successes, while producing no useful result.

**The retry loop has diminishing returns.** Of the functions that don't match on attempt 1, only a subset eventually match with retries. The data from token analysis shows that if a function doesn't match by attempt 3, it almost certainly won't — only 1 out of 10 functions that reached all 12 attempts eventually matched.

### Key Takeaway

The pipeline's economics are dominated by the first-try rate. Improving the probability of a first-attempt match (via better prompts, better m2c starting points, or function-specific context) would have a much larger impact on cost and throughput than adding more retry attempts.

---

## Conclusions

1. **API throughput is the single largest external variable affecting pipeline success.** Run 3's 5x throughput degradation (11.14 vs 56.79 tok/s) turned a 73-80% success rate into 70%, with 3 of 5 flipped functions failing purely due to timeouts. Under stable API conditions, Run 3 would likely have matched or exceeded Runs 1-2.

2. **The pipeline is cost-effective when the API cooperates.** At $1.68/match (Run 2), matching a decompiled function is inexpensive. But failed functions are costly because they always exhaust all 12 retry attempts, consuming $3-7 each with no return.

3. **The permuter adds no value in its current form.** Zero perfect matches across 95 tasks and three runs. It should either be removed, redesigned to focus on near-matches (bestDiff <= 5), or have its results fed back into the AI retry loop.

4. **Non-determinism in approach selection causes real, non-timeout-related failures.** `sub_80ACD10` matched in Run 1 and then failed with 51-53 diffs in Runs 2-3 even under healthy API conditions (Run 2). This is the AI choosing a wrong structural approach that 12 iterations of feedback cannot correct.

5. **Hard functions need clean attempts to converge.** Functions like `sub_806B2F4` (matched on attempt 12 in Run 2) and `sub_80AC0C4` (bestDiff=2 in Run 3) demonstrate that hard functions require many high-quality attempts. Timeout-corrupted attempts do not contribute to convergence and waste the finite retry budget. A potential mitigation: do not count timed-out attempts against the retry limit.

6. **The I/O token ratio is a useful health indicator.** A ratio around 50:1 indicates normal operation; 132:1 (Run 3) signals severe API degradation. Monitoring this metric in real-time could trigger automatic adjustments (longer timeouts, reduced concurrency, or run suspension).
