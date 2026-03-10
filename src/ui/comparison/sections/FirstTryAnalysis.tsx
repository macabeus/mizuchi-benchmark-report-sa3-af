import type { ComparisonData } from '../types';
import { RUN_COLORS } from '../types';

export function FirstTryAnalysis({ data, runLabels }: { data: ComparisonData; runLabels: string[] }) {
  // For each run, count functions that matched on Claude's first AI attempt
  // Exclude: programmatic-phase matches (0 attempts), timeouts, multi-attempt matches
  const perRun = data.runs.map((_, runIdx) => {
    let firstTryMatches = 0;
    let totalAiFunctions = 0;
    const firstTryFunctions: { name: string; tier: string; tokens: number; duration: number; cost: number }[] = [];
    const multiAttemptMatches: { name: string; tier: string; attempts: number }[] = [];

    for (const func of data.functions) {
      const run = func.runs[runIdx];
      // Skip programmatic-phase matches (0 attempts)
      if (run.matchSource === 'programmatic-phase') {
        continue;
      }
      // Skip functions with no attempts
      if (run.numAttempts === 0) {
        continue;
      }
      totalAiFunctions++;

      if (run.success && run.numAttempts === 1) {
        firstTryMatches++;
        firstTryFunctions.push({
          name: func.functionName,
          tier: func.tier,
          tokens: run.totalInputTokens + run.totalOutputTokens,
          duration: run.totalDurationMs,
          cost: run.totalCostUsd,
        });
      } else if (run.success && run.numAttempts > 1) {
        multiAttemptMatches.push({
          name: func.functionName,
          tier: func.tier,
          attempts: run.numAttempts,
        });
      }
    }

    return { firstTryMatches, totalAiFunctions, firstTryFunctions, multiAttemptMatches };
  });

  // Functions that matched on first try in ALL runs
  const alwaysFirstTry = data.functions.filter((func) =>
    func.runs.every((run) => run.matchSource !== 'programmatic-phase' && run.numAttempts === 1 && run.success),
  );

  // Functions that NEVER matched on first try but eventually matched in at least one run
  const neverFirstTry = data.functions.filter(
    (func) =>
      func.runs.some((run) => run.success && run.matchSource !== 'programmatic-phase') &&
      func.runs.every((run) => run.matchSource === 'programmatic-phase' || run.numAttempts !== 1 || !run.success),
  );

  // Avg tokens/cost for first-try vs multi-attempt
  const firstTryAvgCost =
    perRun.reduce((s, r) => s + r.firstTryFunctions.reduce((a, f) => a + f.cost, 0), 0) /
    Math.max(1, perRun.reduce((s, r) => s + r.firstTryFunctions.length, 0));
  const multiAttemptSuccesses = data.functions
    .flatMap((f) => f.runs.filter((r) => r.success && r.numAttempts > 1 && r.matchSource !== 'programmatic-phase'))
  const multiAttemptAvgCost = multiAttemptSuccesses.length > 0
    ? multiAttemptSuccesses.reduce((s, r) => s + r.totalCostUsd, 0) / multiAttemptSuccesses.length
    : 0;

  const firstTryAvgDuration =
    perRun.reduce((s, r) => s + r.firstTryFunctions.reduce((a, f) => a + f.duration, 0), 0) /
    Math.max(1, perRun.reduce((s, r) => s + r.firstTryFunctions.length, 0));
  const multiAttemptAvgDuration = multiAttemptSuccesses.length > 0
    ? multiAttemptSuccesses.reduce((s, r) => s + r.totalDurationMs, 0) / multiAttemptSuccesses.length
    : 0;

  return (
    <div>
      {/* Per-run summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {perRun.map((run, i) => (
          <div key={i} className="bg-slate-800/60 rounded-lg p-4" style={{ borderLeft: `4px solid ${RUN_COLORS[i]}` }}>
            <h4 className="text-sm font-medium mb-2" style={{ color: RUN_COLORS[i] }}>
              {runLabels[i]}
            </h4>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-white">{run.firstTryMatches}</span>
              <span className="text-slate-400 text-sm">/ {run.totalAiFunctions} AI functions</span>
            </div>
            <div className="text-slate-500 text-xs">
              {((run.firstTryMatches / run.totalAiFunctions) * 100).toFixed(0)}% matched on first attempt
            </div>
          </div>
        ))}
      </div>

      {/* Cost comparison */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/40 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">First-Try vs Multi-Attempt Cost</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 px-3 text-slate-400">Metric</th>
                <th className="text-center py-2 px-3 text-emerald-400">First Try</th>
                <th className="text-center py-2 px-3 text-amber-400">Multi-Attempt</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-800/50">
                <td className="py-2 px-3 text-slate-300">Avg Cost</td>
                <td className="py-2 px-3 text-center text-slate-200">${firstTryAvgCost.toFixed(2)}</td>
                <td className="py-2 px-3 text-center text-slate-200">${multiAttemptAvgCost.toFixed(2)}</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-2 px-3 text-slate-300">Avg Duration</td>
                <td className="py-2 px-3 text-center text-slate-200">{formatDur(firstTryAvgDuration)}</td>
                <td className="py-2 px-3 text-center text-slate-200">{formatDur(multiAttemptAvgDuration)}</td>
              </tr>
              <tr className="border-b border-slate-800/50">
                <td className="py-2 px-3 text-slate-300">Cost Ratio</td>
                <td className="py-2 px-3 text-center text-emerald-400">1x</td>
                <td className="py-2 px-3 text-center text-amber-400">
                  {firstTryAvgCost > 0 ? `${(multiAttemptAvgCost / firstTryAvgCost).toFixed(1)}x` : '—'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-800/40 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Consistency</h4>
          <div className="space-y-3">
            <div>
              <div className="text-slate-400 text-xs mb-1">Always first-try (all runs)</div>
              <div className="text-white text-lg font-bold">{alwaysFirstTry.length} functions</div>
              <div className="text-slate-500 text-xs mt-1">
                {alwaysFirstTry.map((f) => f.functionName).join(', ') || 'None'}
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-xs mb-1">Never first-try (matched only via retries)</div>
              <div className="text-white text-lg font-bold">{neverFirstTry.length} functions</div>
              <div className="text-slate-500 text-xs mt-1">
                {neverFirstTry.map((f) => f.functionName).join(', ') || 'None'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Per-function breakdown table */}
      <div className="bg-slate-800/40 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">Per-Function First-Try Results</h4>
        <p className="text-slate-500 text-xs mb-3">
          Showing only functions that had AI attempts (excludes programmatic-phase matches).
        </p>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-1 px-2 text-slate-400">Function</th>
              <th className="text-left py-1 px-2 text-slate-400">Tier</th>
              {runLabels.map((label, i) => (
                <th key={i} className="text-center py-1 px-2" style={{ color: RUN_COLORS[i] }}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.functions
              .filter((f) => f.runs.some((r) => r.matchSource !== 'programmatic-phase' && r.numAttempts > 0))
              .map((func) => (
                <tr key={func.functionName} className="border-b border-slate-800/50">
                  <td className="py-1 px-2 text-slate-200 font-mono">{func.functionName}</td>
                  <td className="py-1 px-2 text-slate-400">{func.tier}</td>
                  {func.runs.map((run, i) => {
                    if (run.matchSource === 'programmatic-phase') {
                      return (
                        <td key={i} className="py-1 px-2 text-center">
                          <span className="px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-500">PROG</span>
                        </td>
                      );
                    }
                    if (run.numAttempts === 0) {
                      return (
                        <td key={i} className="py-1 px-2 text-center text-slate-600">—</td>
                      );
                    }
                    const isFirstTry = run.success && run.numAttempts === 1;
                    const isMultiMatch = run.success && run.numAttempts > 1;
                    return (
                      <td key={i} className="py-1 px-2 text-center">
                        <span
                          className={`px-1.5 py-0.5 rounded ${
                            isFirstTry
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : isMultiMatch
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {isFirstTry ? '1st' : isMultiMatch ? `${run.numAttempts}att` : 'FAIL'}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatDur(ms: number): string {
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  if (min > 0) {
    return `${min}m ${sec % 60}s`;
  }
  return `${sec}s`;
}
