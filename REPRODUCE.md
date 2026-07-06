# Reproducing the benchmark

This branch bundles everything needed to reproduce the **Fable 5 vs. Sonnet 4.6**
matching-decompilation benchmark that powers the report website in this repo.

## What's here

| File | Model | Game | Retries | Soft timeout |
| --- | --- | --- | --- | --- |
| `mizuchi-sa3.yaml` | Fable 5 | Sonic Advance 3 (GBA / ARMv4T / agbcc) | 6 | 3:40 (Run 1), 7:00 (Runs 2–3) |
| `mizuchi-af.yaml` | Fable 5 | Animal Forest (N64 / MIPS / IDO 7.1) | 6 | 3:40 (Run 1), 7:00 (Runs 2–3) |
| `mizuchi-sa3.sonnet-4-6.yaml` | Sonnet 4.6 | Sonic Advance 3 | 12 | 7:00 |
| `mizuchi-af.sonnet-4-6.yaml` | Sonnet 4.6 | Animal Forest | 12 | 7:00 |

The soft timeout was raised between runs by editing `softTimeout` in the config;
the `.yaml` files hold the base settings, and the exact per-run values are the
ones in the table above (see the report for the full run breakdown).

## Raw run data (GitHub Release)

The complete run outputs — per-attempt C code, object files, objdiff results, and
the full `run-results-*.json` / `run-report-*.html` for every run — are attached
to the [`fable-5-benchmark-data`](https://github.com/macabeus/mizuchi-benchmark-reports/releases/tag/fable-5-benchmark-data)
release (they're too large for the git repo):

- **`benchmarking-fable.tar.gz`** — Fable 5 runs (SA3 + AF, Runs 1–3)
- **`benchmarking-sonnet-4-6.tar.gz`** — Sonnet 4.6 runs (SA3 + AF, 3 runs each)

```sh
curl -L -O https://github.com/macabeus/mizuchi-benchmark-reports/releases/download/fable-5-benchmark-data/benchmarking-fable.tar.gz
curl -L -O https://github.com/macabeus/mizuchi-benchmark-reports/releases/download/fable-5-benchmark-data/benchmarking-sonnet-4-6.tar.gz
tar -xzf benchmarking-fable.tar.gz
tar -xzf benchmarking-sonnet-4-6.tar.gz
```

Each `run-report-*.html` is a self-contained viewer of its matching
`run-results-*.json`; open it in a browser to explore a run without any tooling.

## Running it yourself

1. Install [Mizuchi](https://github.com/macabeus/mizuchi) and the target decomp
   projects (Sonic Advance 3 and Animal Forest) with their toolchains
   (`agbcc` + `arm-none-eabi` for SA3; IDO 7.1 + `asm-processor` +
   `mips-linux-gnu` for AF).
2. **Edit the absolute paths** in the `.yaml` files — they point at this
   machine's checkout (`/Users/macabeus/ApenasMeu/decompiler/...`). Update
   `projectPath`, `getContextScript`, `compilerScript`, and `promptsDir` to
   match your layout.
3. Run a benchmark:

   ```sh
   mizuchi run -c mizuchi-sa3.yaml   # Fable 5, Sonic Advance 3
   mizuchi run -c mizuchi-af.yaml    # Fable 5, Animal Forest
   ```

The same prompt set was used for both models; only the retry limit and soft
timeout differ between the Fable and Sonnet configs.
