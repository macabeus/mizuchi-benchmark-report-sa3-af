# Cross-Platform Benchmark Analysis: SA3 (GBA/ARM) vs Animal Forest (N64/MIPS)

This report compares Mizuchi's decompilation matching performance across two distinct targets: **Sonic Advance 3** (GBA, ARMv4T, agbcc/GCC) and **Animal Forest** (N64, MIPS, IDO). Each target was benchmarked over 3 runs of 30 functions (10 easy, 10 medium, 10 hard), for a total of 180 function attempts.

---

## Run-Level Summary

| Metric | SA3 Run 1 | SA3 Run 2 | SA3 Run 3 | AF Run 1 | AF Run 2 | AF Run 3 |
|---|---|---|---|---|---|---|
| Matched | 22/30 | 24/30 | 21/30 | 22/30 | 22/30 | 23/30 |
| Match rate | 73.3% | 80.0% | 70.0% | 73.3% | 73.3% | 76.7% |
| Cost | $42.93 | $40.36 | $26.15 | $15.95 | $12.69 | $18.38 |
| Total attempts | 127 | 123 | 146 | 125 | 118 | 127 |
| Token throughput | 56.8 tok/s | 44.2 tok/s | 11.1 tok/s | 9.1 tok/s | 6.8 tok/s | 10.2 tok/s |

| Aggregate Metric | SA3 (avg) | AF (avg) |
|---|---|---|
| Match rate | 74.4% | 74.4% |
| Cost per run | $36.48 | $15.67 |
| Cost per match | $1.63 | $0.70 |
| Deterministic outcomes | 83.3% (25/30) | 93.3% (28/30) |
| Flipped functions | 5 | 2 |

---

## 1. Which Platform Is Harder to Decompile?

The headline number is striking: both platforms land at exactly **74.4% overall match rate**. But this aggregate masks significant differences in where the difficulty lies.

### Tier-by-tier comparison

| Tier | SA3 match rate | AF match rate | Delta |
|---|---|---|---|
| Easy | 70.0% (21/30) | 96.7% (29/30) | AF +26.7pp |
| Medium | 90.0% (27/30) | 86.7% (26/30) | SA3 +3.3pp |
| Hard | 63.3% (19/30) | 40.0% (12/30) | SA3 +23.3pp |

The difficulty curves are inverted. AF's easy tier is nearly solved (96.7%), while SA3's easy tier sits at just 70% -- though this is misleading. Two SA3 easy functions (`sub_806D404` and `sub_80C5FCC`) are likely misclassified; they fail in every run, dragging the tier down. If those two are reclassified, SA3's adjusted easy rate would climb to roughly 87.5%, still well below AF's 96.7%.

SA3's medium tier is the real standout: **90% match rate with only ~2.5 average attempts**. These are the pipeline's sweet spot on ARM -- functions where Claude converges quickly and reliably. AF medium is close at 86.7%, but requires more diverse strategies to get there.

The hard tiers tell the clearest story. SA3 hard matches at 63.3% vs AF's 40.0%. On hard functions, Claude alone performs substantially better against ARM/GCC than MIPS/IDO. This is consistent with Claude's training data likely containing more ARM/GCC patterns than IDO-specific codegen idioms.

**Bottom line:** Neither platform is categorically harder. AF is easier at the low end and harder at the high end. The identical aggregate rate is a coincidence of opposing difficulty gradients canceling out.

---

## 2. Which Pipeline Phases Matter Most Per Platform?

This is the most operationally significant finding. The two platforms demand fundamentally different pipeline strategies.

### SA3: Claude does everything

| Phase | Matches per run | Share |
|---|---|---|
| Claude AI | ~22 | 100% |
| m2c | 0 | 0% |
| Permuter | 0 | 0% |

SA3 is a pure LLM story. Across all 3 runs, m2c produced zero matches and the permuter produced zero matches. Every single SA3 match came from Claude generating correct C code directly.

This makes sense: m2c was originally "mips-to-c" and its ARM support is limited to nonexistent. The permuter struggles with GCC's less deterministic instruction scheduling compared to IDO, making random register/expression swaps unlikely to hit the exact codegen pattern.

### AF: Multi-strategy pipeline

| Phase | Matches per run (avg) | Share |
|---|---|---|
| Claude AI | ~15 | ~67% |
| m2c (setup phase) | ~4 | ~18% |
| Permuter (programmatic) | ~1 | ~4% |
| Permuter (background) | ~2.5 | ~11% |

AF benefits significantly from programmatic tools. The m2c decompiler matches roughly 4 functions per run during the setup phase -- these are "free" matches that cost zero LLM tokens. Functions like `func_80062760_jp`, `aEDZ_actor_init`, `func_808C9FD0_jp`, and `func_808C61D8_jp` are consistently matched by m2c alone.

The permuter adds another ~3.5 matches per run (1 in the programmatic phase, 2-3 running in the background while Claude works). IDO's deterministic instruction scheduling makes it amenable to permutation: if the code is structurally correct but has a register allocation mismatch or expression ordering issue, random permutations can find the exact match.

**Implication for pipeline design:** On SA3, you could strip out m2c and the permuter entirely with no loss. On AF, removing those tools would drop the match rate from 74.4% to roughly 50%. The optimal pipeline is platform-specific.

---

## 3. Cost Analysis

### Per-run and per-match costs

SA3 is **2.3x more expensive** than AF on both a per-run and per-match basis:

| Metric | SA3 | AF | Ratio |
|---|---|---|---|
| Average cost per run | $36.48 | $15.67 | 2.3x |
| Average cost per match | $1.63 | $0.70 | 2.3x |
| Median attempts to match | ~4.2 | ~3.4 | 1.2x |

### Why SA3 costs more

Two factors drive SA3's higher cost:

1. **No free programmatic matches.** AF gets ~5.5 matches per run from m2c + permuter at essentially zero marginal cost. SA3 gets zero. Every SA3 match must be earned through Claude token consumption.

2. **Higher token consumption per attempt.** SA3 runs consumed more tokens on average, likely because ARM/GCC codegen requires more iterative refinement (more retry attempts with longer error context accumulation).

### Projected cost at scale

Extrapolating from these rates, the cost to match functions at scale:

| Scale | SA3 projected cost | AF projected cost |
|---|---|---|
| 100 functions | ~$121.60 | ~$52.23 |
| 500 functions | ~$608.00 | ~$261.17 |
| 1000 functions | ~$1,216.00 | ~$522.33 |

These projections assume linear scaling, which is optimistic -- harder functions at scale would shift the cost-per-match upward. But the 2.3x ratio between platforms should hold roughly constant since it is driven by structural differences in tool effectiveness.

---

## 4. LLM Reliability and Determinism

### Outcome consistency

A function's outcome is "deterministic" if it matches in all 3 runs or fails in all 3 runs. "Flipped" functions are those that change outcome across runs.

| Metric | SA3 | AF |
|---|---|---|
| Always match | 20 (66.7%) | 21 (70.0%) |
| Always fail | 5 (16.7%) | 7 (23.3%) |
| Flipped | 5 (16.7%) | 2 (6.7%) |
| Determinism rate | 83.3% | 93.3% |

AF is substantially more predictable. Only 2 functions flipped across runs (`func_800BC368_jp` in easy, `func_808D6BAC_jp` in medium). SA3 had 5 flipped functions, though this comparison is confounded -- SA3 Runs 1-2 used older Mizuchi versions, so some "flips" may reflect tooling changes rather than LLM variance.

### Hard tier behavior

The hard tier is where reliability matters most, and the two platforms show different patterns:

- **AF hard:** Deterministically binary. The same 6 functions fail in every single run. There is no stochastic hope -- they are blocked by structural issues (likely requiring decomp knowledge that Claude lacks, or IDO codegen patterns that are fundamentally unpredictable).
- **SA3 hard:** Noisier. 63.3% match rate with some functions flipping between runs. Claude sometimes gets lucky with ARM codegen on hard functions, suggesting these are at the edge of its capability rather than firmly beyond it.

This difference aligns with the broader pattern: IDO codegen is more deterministic (same inputs always produce same outputs), so Claude either knows the pattern or it doesn't. GCC's codegen has more variation, giving Claude more room to stumble into correct solutions -- but also more room to miss.

---

## 5. Key Findings for the Blog Post

### Headline finding

**Two completely different platforms, two completely different strategies, one identical result: 74.4%.** SA3 achieves this through raw LLM capability alone. AF achieves it through a multi-strategy pipeline where Claude, m2c, and the permuter each contribute. The fact that both land at the same number is coincidental but narratively compelling.

### Surprising results

1. **m2c is useless on ARM but matches ~13% of MIPS functions for free.** This alone makes the AF pipeline dramatically cheaper. m2c's MIPS heritage gives it a structural advantage on N64 targets that no amount of LLM improvement can replicate on ARM.

2. **SA3 medium (90%) is easier than SA3 easy (70%).** The tier classification has at least 2 misclassified functions in SA3's easy bucket. Tier labels should not be taken at face value.

3. **Claude is better at ARM hard functions (63.3%) than MIPS hard functions (40%).** Despite ARM being a less common target in decompilation communities, Claude's general knowledge of GCC codegen patterns transfers well. IDO's proprietary optimizations are a harder target for LLMs.

4. **The permuter works on IDO but not GCC.** IDO's deterministic scheduling makes it permutable; GCC's more complex optimization pipeline makes random permutation a needle-in-a-haystack problem.

### Caveats to flag

- SA3 Runs 1-2 used older Mizuchi versions with different retry logic and prompting strategies. Only Run 3 is directly comparable to the AF runs. The 5 "flipped" SA3 functions may reflect tooling changes, not LLM variance.
- Token throughput varied dramatically (6.8-56.8 tok/s) due to API conditions, affecting timeout behavior and total attempt counts. AF had consistently slow throughput, leading to more soft timeouts (71 avg vs SA3's 36 avg).
- Sample size is 30 functions per platform. With only 10 functions per tier, a single misclassified function shifts tier rates by 10 percentage points.

---

## 6. Data Quality Warnings

### SA3 version inconsistency

SA3 Runs 1-2 were conducted on older Mizuchi versions. Changes between versions include different retry logic, prompt construction, and timeout handling. This means:

- The 5 SA3 flipped functions cannot be cleanly attributed to LLM stochasticity vs tooling changes.
- SA3's aggregate statistics (74.4% average, $36.48 average cost) blend results from different systems.
- Only SA3 Run 3 was run on the same Mizuchi version as the AF runs.

If we restrict to Run 3 only, SA3 drops to **70.0%** match rate at **$26.15** -- still more expensive than AF but closer in cost.

### Asymmetric run reliability

AF's 3 runs are directly comparable: same Mizuchi version, same configuration, variance is pure LLM noise. SA3's runs are not. Any cross-run analysis on SA3 (flipped functions, consistency rates) should be interpreted with caution.

### Token throughput effects

The wide variation in API throughput (6.8-56.8 tok/s) means timeout behavior was not consistent. SA3 Run 1's high throughput (56.8 tok/s) gave Claude more effective thinking time per attempt, potentially inflating its match rate. AF's consistently low throughput may have depressed its Claude-only match rate.

### Recommendation

**Re-run SA3 on the final Mizuchi version** to produce 3 clean, comparable runs. This would:
- Resolve the version confound on flipped functions
- Give a reliable SA3 determinism rate
- Allow apples-to-apples cost comparison
- Confirm whether SA3's higher cost is structural (no programmatic tools) or partly an artifact of earlier, less efficient Mizuchi versions

Until then, treat SA3 aggregate numbers as approximate and prefer Run 3 data when precision matters.

---

## Appendix: Platform Comparison At a Glance

| Dimension | SA3 (GBA/ARM/GCC) | AF (N64/MIPS/IDO) |
|---|---|---|
| Overall match rate | 74.4% | 74.4% |
| Cost per run | $36.48 | $15.67 |
| Cost per match | $1.63 | $0.70 |
| Claude-only match rate | ~74% | ~50% |
| m2c contribution | 0% | ~18% |
| Permuter contribution | 0% | ~15% |
| Best tier | Medium (90%) | Easy (96.7%) |
| Worst tier | Hard (63.3%) | Hard (40%) |
| Determinism | 83.3% | 93.3% |
| Flipped functions | 5 (confounded) | 2 (clean) |
| Optimal pipeline | Claude-only | Claude + m2c + permuter |
