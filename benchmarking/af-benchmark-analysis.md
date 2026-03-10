# Animal Forest (N64/MIPS/IDO) Benchmark Analysis

Three benchmark runs of the Mizuchi decompilation pipeline against Animal Forest (N64/MIPS/IDO target). All three runs use the **same Mizuchi version** — any variation between runs is purely from LLM stochasticity and Anthropic API conditions.

---

## 1. Schema Differences

All three AF runs have **identical schema**. The schema matches SA3 Run 3 (the only SA3 run on the same Mizuchi version):

- Nested token usage broken out by model
- `ttftTimedOut` and `ttftMs` fields on each attempt
- `queryTiming` array for per-query latency data
- `ttftTimeoutMs` in plugin config
- Target platform: `n64` (vs SA3's `gba`)

SA3 Runs 1 and 2 were on older Mizuchi versions with different schemas. Since all three AF runs share the same codebase and schema, any differences in outcomes are attributable solely to non-determinism in the LLM and API layer.

---

## 2. Why Did Runs Differ in Duration?

| Metric | AF Run 1 (Mar 7) | AF Run 2 (Mar 8a) | AF Run 3 (Mar 8b) |
|--------|-------------------|--------------------|--------------------|
| Total Duration | 13.28h | 12.64h | 13.53h |
| Total Attempts | 125 | 118 | 127 |
| Output Tokens/sec | 9.10 | 6.81 | 10.21 |
| Soft Timeouts | 67 | 85 | 61 |
| Hard Timeouts | 20 | 19 | 23 |
| TTFT Timeouts | 25 | 23 | 28 |

All three runs used the same code, so the duration spread (~55 minutes between shortest and longest) comes from three factors:

### API Latency Variance

Output token throughput varied significantly: Run 2 was the slowest at 6.81 tok/s, while Run 3 was the fastest at 10.21 tok/s — a 50% spread. Despite being slowest in throughput, Run 2 was the shortest run overall because it had the fewest total attempts (118 vs 125/127). This suggests that raw API speed matters less than how many retry cycles the pipeline enters.

### Timeout Frequency Differences

Run 2 had the highest soft timeout count (85) but the fewest hard and TTFT timeouts. Run 3 had the fewest soft timeouts (61) but the most hard (23) and TTFT (28) timeouts. Hard timeouts are more expensive in wall-clock time than soft timeouts because they consume the full timeout budget before being killed. This explains why Run 3, despite having the fastest token throughput, was the longest run — its 28 TTFT timeouts represent attempts where the pipeline waited for a first token that never arrived within the deadline.

### Attempt Count

Run 2's 118 attempts (vs 125 and 127) meant fewer total API round-trips. Fewer attempts means less time spent in compilation, objdiff comparison, and retry preparation — all of which add up across 30 functions.

**Takeaway**: Wall-clock duration is driven more by timeout frequency and total attempt count than by raw token throughput. The pipeline spends significant time waiting on timeouts that produce no useful work.

---

## 3. Token and Cost Accounting

### Raw Totals

| Metric | AF Run 1 | AF Run 2 | AF Run 3 | AF Average |
|--------|----------|----------|----------|------------|
| Input Tokens | 88,081,507 | 90,463,238 | 96,205,877 | 91,583,541 |
| Output Tokens | 426,197 | 309,775 | 497,411 | 411,128 |
| Total Cost (USD) | $15.95 | $12.69 | $18.38 | $15.67 |
| Matches | 22 | 22 | 23 | 22.3 |
| Total Attempts | 125 | 118 | 127 | 123.3 |

### Per-Unit Costs

| Metric | AF Run 1 | AF Run 2 | AF Run 3 | AF Average |
|--------|----------|----------|----------|------------|
| Cost per Match | $0.73 | $0.58 | $0.80 | $0.70 |
| Cost per Attempt | $0.13 | $0.11 | $0.14 | $0.13 |
| Input Tokens per Attempt | 704,652 | 766,637 | 757,527 | 742,939 |
| Output Tokens per Attempt | 3,410 | 2,625 | 3,917 | 3,317 |

### Comparison to SA3

| Metric | AF Average | SA3 Run 3 (same Mizuchi) | SA3 Average (all runs) |
|--------|------------|--------------------------|------------------------|
| Total Cost | $15.67 | $26.15 | $36.48 |
| Cost per Match | $0.70 | $1.25 | $1.63 |
| Cost per Attempt | $0.13 | — | — |
| Input Tokens | 91.6M | — | — |
| Output Tokens | 411K | — | — |

AF is dramatically cheaper than SA3 — roughly **57% lower cost per match** compared to the same-version SA3 run. This is partly because 4 functions are solved by m2c at zero AI cost and 3-4 more by the permuter at minimal cost, reducing the number of functions that need expensive multi-attempt Claude conversations.

---

## 4. Permuter Usefulness

The decomp-permuter solved **3-4 functions per run** in Animal Forest, a stark contrast to SA3 where the permuter solved **zero functions across all runs**.

### Per-Function Permuter Results

| Function | Run 1 | Run 2 | Run 3 |
|----------|-------|-------|-------|
| func_809D18C8_jp (hard) | permuter | permuter | permuter |
| func_80954E0C_jp (medium) | permuter | permuter | permuter |
| func_808BB604_jp (medium) | permuter | permuter | Claude |
| func_808D6BAC_jp (medium) | permuter | FAIL | permuter |

**func_80954E0C_jp** and **func_809D18C8_jp** are the permuter's star performers — both matched via permuter in all three runs during the programmatic phase, requiring zero AI attempts. `func_809D18C8_jp` is particularly notable as a hard-tier function that Claude alone might have struggled with, but the permuter's brute-force register/instruction reordering found the correct combination every time.

**func_808BB604_jp** was solved by the permuter in Runs 1-2 but by Claude in Run 3, showing that both paths can reach a match for this function. The fact that Claude solved it in Run 3 suggests the permuter is providing a safety net for functions that Claude can sometimes but not always match.

**func_808D6BAC_jp** is particularly interesting — it's one of only two functions that flipped outcome across runs. The permuter matched it in Runs 1 and 3 but failed in Run 2, making it the only function where permuter non-determinism (likely from attempt ordering or timeout) caused an outcome change.

### Why Permuter Works for AF but Not SA3

The IDO compiler (used for N64/MIPS) has more predictable instruction scheduling than GCC (used for GBA/ARM). The permuter operates by trying different source-level permutations (variable reordering, expression restructuring) and recompiling — this is more effective when the compiler's behavior is more mechanical and less dependent on high-level optimization passes. IDO's simpler optimization model means that small source changes produce predictable assembly changes, which is exactly what the permuter exploits.

---

## 5. m2c Usefulness

Four functions matched via the programmatic phase (m2c) in **all three runs**, requiring **zero AI attempts**:

| Function | Tier |
|----------|------|
| func_80062760_jp | easy |
| aEDZ_actor_init | medium |
| func_808C9FD0_jp | medium |
| func_808C61D8_jp | hard |

Note: `func_80954E0C_jp` was also matched during the programmatic phase in all 3 runs, but by the **permuter**, not m2c — see the Permuter section above.

This is a major finding. These 4 functions — including one hard-tier function — were solved entirely by m2c's mechanical decompilation without any LLM involvement. SA3 had **zero m2c matches** across all runs.

### Impact on Pipeline Economics

With 4 out of 30 functions (13.3%) solved by m2c at zero AI cost:
- These functions consume no API tokens, no wall-clock time in retry loops, and contribute no timeouts.
- If we exclude m2c matches, the effective AI success rate for the remaining 26 functions is 17-18/26 (65-69%) for Claude+permuter, which is closer to SA3's raw rate.
- The 4 free matches reduce cost-per-match significantly: without them, AF's average cost per AI-matched function would be higher than $0.70.

### Why m2c Works for N64/MIPS/IDO but Not GBA/ARM/GCC

m2c (now "machine code to C", originally "mips-to-c") was originally designed for MIPS decompilation and has deep knowledge of MIPS calling conventions, IDO compiler patterns, and N64 SDK idioms. The IDO compiler produces relatively straightforward MIPS assembly with predictable stack frame layouts and register usage. GCC for ARM, by contrast, uses more aggressive optimization passes and has register allocation patterns that m2c was not designed to reverse. Despite the renamed scope, m2c's MIPS roots mean its ARM support is significantly less mature.

---

## 6. Timeout Inventory

### Counts per Type per Run

| Timeout Type | AF Run 1 | AF Run 2 | AF Run 3 |
|--------------|----------|----------|----------|
| Soft Timeouts | 67 | 85 | 61 |
| Hard Timeouts | 20 | 19 | 23 |
| TTFT Timeouts | 25 | 23 | 28 |
| **Total Timeouts** | **112** | **127** | **112** |

### Timeout Rates

| Metric | AF Run 1 | AF Run 2 | AF Run 3 |
|--------|----------|----------|----------|
| Timeouts / Total Attempts | 89.6% | 107.6% | 88.2% |
| Soft Timeout Rate | 53.6% | 72.0% | 48.0% |
| Hard Timeout Rate | 16.0% | 16.1% | 18.1% |
| TTFT Timeout Rate | 20.0% | 19.5% | 22.0% |

Note: Total timeouts can exceed total attempts because a single attempt may experience multiple timeout types (e.g., a soft timeout followed by a hard timeout on the same attempt).

### Comparison to SA3

SA3 Run 3 (same Mizuchi version) had 95 soft timeouts — comparable to AF's range. SA3 Runs 1-2 had far fewer (3 and 9 respectively), but those were on older Mizuchi versions that may have had different timeout thresholds.

### Which Functions Consistently Time Out

The 7 always-failing functions are the primary timeout contributors. These functions exhaust all retry attempts, and each retry is likely to hit at least a soft timeout as Claude struggles with code that fundamentally exceeds its capabilities within the time budget. The hard-tier always-fail functions (aBGY_actor_ct, func_80913010_jp, func_8096F348_jp, func_80A242E0_jp, func_80A24A8C_jp, My_Room_Actor_move) likely have complex control flow or data structures that cause Claude to generate long, iterative responses that frequently exceed time limits.

---

## 7. LLM Variance Analysis

### Outcome Stability

| Category | Count | Percentage |
|----------|-------|------------|
| Always Matched (all 3 runs) | 21 | 70.0% |
| Always Failed (all 3 runs) | 7 | 23.3% |
| Flipped (changed outcome) | 2 | 6.7% |

The "noise zone" — functions whose outcome varies across runs — is remarkably small at **6.7% (2/30)**. This means 93.3% of functions have a deterministic outcome regardless of LLM stochasticity.

### Comparison to SA3

SA3 had 5 functions that flipped across its three runs, but this comparison is confounded because SA3 runs used **different Mizuchi versions**. Some of that variance could be from code changes rather than pure LLM non-determinism.

AF's 2/30 flip rate on identical code is the cleaner measurement of true LLM variance. If we assume SA3's flips on the same code version would be similar (~7%), then the pipeline's behavior is highly reproducible — the LLM's stochasticity affects the path (number of attempts, specific errors encountered) more than the destination (match or no match).

### What This Means

The pipeline has a clear "capability frontier": functions either are or aren't within reach of the current system (Claude + m2c + permuter + retry loop). Moving the success rate above ~77% for this function set would require fundamental improvements (better prompts, more context, different model capabilities) rather than just running more times and hoping for luck.

---

## 8. Functions That Flipped

### func_800BC368_jp (easy)

| Run | Outcome | Matched By |
|-----|---------|------------|
| Run 1 | FAIL | — |
| Run 2 | MATCH | Claude |
| Run 3 | MATCH | Claude |

An easy-tier function that failed only in Run 1. Since it succeeded in 2 of 3 runs via Claude, this is a case where the function is within Claude's capability but sits right at the boundary — perhaps requiring a specific approach or phrasing in the generated code that Claude doesn't always produce on the first few attempts. The Run 1 failure likely exhausted retries before Claude stumbled onto the correct pattern.

### func_808D6BAC_jp (medium)

| Run | Outcome | Matched By |
|-----|---------|------------|
| Run 1 | MATCH | decomp-permuter |
| Run 2 | FAIL | — |
| Run 3 | MATCH | decomp-permuter |

A medium-tier function that depends on the permuter for its matches. Claude alone couldn't solve it in any run, but the permuter found the right source permutation in 2 of 3 runs. The Run 2 failure suggests the permuter's search space exploration is somewhat non-deterministic (likely due to time limits on the permuter phase), and this function sits at the edge of what the permuter can reliably find within its budget.

This is notable because it means the permuter is not purely deterministic — it has its own variance, separate from Claude's. The pipeline's total noise zone is a combination of both LLM variance and permuter variance.

---

## 9. Tier Predictability

**Question: Are easy functions really faster and more likely to match than harder ones?**

### Aggregate by Tier

| Tier | Functions | Match Rate | Avg Attempts | Avg Duration | Avg Cost |
|------|-----------|-----------|--------------|-------------|----------|
| Easy | 10 | 96.7% | 1.8 | 8.9m | $0.63 |
| Medium | 10 | 86.7% | 2.4 | 15.1m | $0.33 |
| Hard | 10 | 40.0% | 8.1 | 56.0m | $0.61 |

### Analysis

**For AF, the tier classification works as expected — with a steep drop at hard.** Unlike SA3 (where medium outperformed easy), AF shows the intuitive pattern: easy has the highest match rate (96.7%), medium is strong (86.7%), and hard drops sharply (40.0%).

**Easy functions are nearly perfect.** 9 of 10 easy functions matched in all 3 runs. The sole outlier is `func_800BC368_jp` which failed in Run 2 (67% match rate). This is the only easy function that flipped, and it's one of only 2 functions in the entire AF set that flipped at all.

**Medium functions benefit from programmatic tools.** The 86.7% rate includes 3 functions solved with zero AI attempts (2 by m2c, 1 by permuter). Excluding these "free" matches, Claude's pure AI success rate on medium is 7/7 remaining functions across most runs — still strong. The only medium failure is `func_80A0A928_jp` which failed in all 3 runs.

**Hard functions are where the pipeline struggles.** Only 4 of 10 hard functions ever matched: `func_808B83B4_jp`, `func_808C61D8_jp` (m2c), `func_809AFAF0_jp`, and `func_809D18C8_jp` (permuter). The other 6 failed in all 3 runs. This is a clear binary: hard functions either have a reliable path to success (via AI or tools) or are consistently beyond reach.

### Per-Run Consistency

| Tier | Run 1 | Run 2 | Run 3 |
|------|-------|-------|-------|
| Easy | 100% | 90% | 100% |
| Medium | 90% | 80% | 90% |
| Hard | 40% | 40% | 40% |

Hard-tier results are remarkably stable — exactly 40% in all 3 runs, with the same 4 functions matching every time. The tier classification is a near-perfect predictor for AF: easy means almost certain success, medium means very likely success, and hard means a coin flip at best.

### Comparison with SA3

In SA3, medium functions outperformed easy ones (90% vs 70%), which was counterintuitive. In AF, the tiers predict correctly: easy > medium > hard. The difference likely stems from the tier classification being more accurate for N64/MIPS/IDO functions, where function complexity maps more directly to decompilation difficulty. SA3's easy tier contained 2 functions that were effectively mis-tiered.

### Key Takeaway

AF's tier system is a reliable predictor of pipeline success. Easy functions are near-guaranteed (96.7%), medium functions are strong (86.7%), and hard functions have a clear ceiling at 40%. The hard-tier ceiling is deterministic — the same 6 functions fail every time — suggesting these functions need fundamentally different approaches rather than more attempts.

---

## 10. First-Try Match Rate

**Question: How often does Claude match a function on the very first AI attempt, excluding programmatic-phase matches?**

### Per-Run Results

| Run | First-Try Matches | AI Functions | First-Try Rate |
|-----|-------------------|--------------|----------------|
| Run 1 | 13 | 25 | 52% |
| Run 2 | 13 | 25 | 52% |
| Run 3 | 12 | 25 | 48% |
| **Average** | **12.7** | **25** | **51%** |

AF has 5 functions per run matched during the programmatic phase (4 by m2c, 1 by permuter) with 0 AI attempts. These are excluded from the denominator, leaving 25 functions that required Claude's intervention.

### Analysis

**First-try rate is nearly identical to SA3 (~52% vs ~52%).** Despite the different target architecture (MIPS vs ARM), Claude matches roughly half of AI-required functions on the first attempt for both projects.

**AF's first-try rate is stable across runs.** All three runs produced 12-13 first-try matches — a spread of just 1 function. This reinforces the finding that LLM stochasticity affects the path but not the destination for most functions.

**The "never first-try" functions are important.** Some functions consistently require multiple attempts to match. These are typically harder functions where Claude needs compiler feedback to iteratively refine register allocation, branch structure, or instruction ordering. Understanding what makes these functions resistant to first-try matching could inform prompt improvements.

### Comparison with SA3

Both projects show ~52% first-try rates for AI-driven matches, but the overall pipeline economics differ significantly because AF has 5 free programmatic matches per run. The effective first-try rate including programmatic matches would be (12.7 + 5) / 30 = 59%, higher than SA3's 52%.

### Key Takeaway

The first-try rate is a fundamental property of the current system — roughly half of AI-solvable functions match immediately, regardless of target platform. Improving this rate would have an outsized impact on cost, since each additional retry attempt costs ~330K tokens and ~1.75 minutes.

---

## 11. Cross-Project Comparison: Animal Forest vs Super Mario Advance 3

### Platform Characteristics

| Property | Animal Forest (AF) | Super Mario Advance 3 (SA3) |
|----------|-------------------|------------------------------|
| Platform | N64 | GBA |
| Architecture | MIPS | ARM (Thumb) |
| Compiler | IDO | GCC (agbcc) |
| Target in config | `n64` | `gba` |

### Success Rates

| Metric | AF (avg of 3 runs) | SA3 Run 3 (same Mizuchi) | SA3 (avg of 3 runs) |
|--------|---------------------|--------------------------|----------------------|
| Success Rate | 74.4% (22.3/30) | 70.0% (21/30) | 74.4% (22.3/30) |
| Always-Match Functions | 21/30 (70%) | — | — |
| Always-Fail Functions | 7/30 (23.3%) | — | — |
| Flipped Functions | 2/30 (6.7%) | — | 5/30* (16.7%) |

*SA3 flips confounded by Mizuchi version changes between runs.

### Cost Efficiency

| Metric | AF Average | SA3 Run 3 | SA3 Average |
|--------|------------|-----------|-------------|
| Total Cost | $15.67 | $26.15 | $36.48 |
| Cost per Match | $0.70 | $1.25 | $1.63 |
| Input Tokens | 91.6M | — | — |
| Output Tokens | 411K | — | — |

AF is **57% cheaper per match** than same-version SA3, and **57% cheaper** than SA3's overall average. The cost advantage comes from m2c and the permuter handling 7-8 functions (4 m2c + 3-4 permuter) that would otherwise require expensive Claude retry loops.

### Programmatic Phase (m2c) Effectiveness

| Metric | AF | SA3 |
|--------|-----|-----|
| m2c Matches | 4/30 (13.3%) | 0/30 (0%) |
| Functions Solved at Zero AI Cost | 4 | 0 |

m2c is dramatically more effective on N64/MIPS/IDO than on GBA/ARM/GCC. This is expected — m2c was purpose-built for MIPS decompilation.

### Permuter Effectiveness

| Metric | AF | SA3 |
|--------|-----|-----|
| Permuter Matches per Run | 3-4 | 0 |
| Functions Depending on Permuter | 4 unique | 0 |

The permuter is useful for N64/MIPS/IDO and useless for GBA/ARM/GCC. IDO's more predictable instruction scheduling makes source-level permutations more likely to produce assembly matches.

### Timeout Rates

| Metric | AF Average | SA3 Run 3 |
|--------|------------|-----------|
| Soft Timeouts | 71 | 95 |
| Output Tokens/sec | 8.71 | 11.14 |

AF has somewhat fewer soft timeouts despite lower average throughput, possibly because more functions are resolved early by m2c/permuter and never enter the Claude retry loop where timeouts accumulate.

### Is N64/MIPS/IDO Harder or Easier?

**Easier for the pipeline overall, but not necessarily easier for Claude alone.**

If we strip out m2c and permuter matches and look only at Claude's AI-driven matches:
- AF Claude-only matches: ~15.3/25 remaining functions = **61.3%**
- SA3 Claude-only matches: ~22.3/30 = **74.4%** (SA3 has no non-Claude matches to subtract)

Claude actually has a **lower success rate** on the AF functions that require AI intervention. The N64/MIPS/IDO target is arguably harder for the LLM — MIPS assembly is less commonly represented in training data than ARM, and IDO compiler patterns may be less familiar.

However, the pipeline's total success rate is comparable or slightly better for AF because the programmatic tools (m2c + permuter) compensate for Claude's lower per-function effectiveness. This validates the multi-strategy pipeline design: different tools excel on different targets, and the combination is more robust than any single approach.

### Summary Table

| Dimension | AF (N64/MIPS/IDO) | SA3 (GBA/ARM/GCC) | Winner |
|-----------|--------------------|--------------------|--------|
| Overall Success Rate | 74.4% | 74.4% | Tie |
| Cost per Match | $0.70 | $1.63 | AF |
| m2c Effectiveness | 13.3% free matches | 0% | AF |
| Permuter Effectiveness | 3-4 per run | 0 | AF |
| Claude-only Success Rate | ~61% | ~74% | SA3 |
| Outcome Stability | 93.3% deterministic | ~83%* | AF |
| Timeout Severity | Lower | Higher | AF |

*SA3 stability confounded by version changes.

---

## Key Takeaways

1. **The pipeline is highly deterministic.** 93.3% of functions have the same outcome across all three identical-code runs. The LLM's randomness affects attempt count and path, not final outcome.

2. **m2c is a game-changer for MIPS targets.** 4 free matches (13.3%) at zero cost fundamentally changes the economics of N64 decompilation pipelines.

3. **The permuter adds value for IDO but not GCC.** 3-4 additional matches per run from a tool that was useless on SA3. The IDO compiler's predictable instruction scheduling makes permutation-based matching viable.

4. **AF is dramatically cheaper than SA3** despite similar success rates, because programmatic tools handle the easy wins and reduce the number of functions that need expensive LLM retry loops.

5. **Claude alone is less effective on MIPS/IDO than ARM/GCC.** The pipeline's multi-strategy design masks this — total success rates are similar, but the composition of matches is very different.

6. **The "always fail" set (7 functions) represents the current capability ceiling.** These functions failed in all 3 runs and likely require fundamentally different approaches (better context, function-specific hints, or model improvements) to crack.
