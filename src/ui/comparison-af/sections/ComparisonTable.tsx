import { formatDuration } from '../App';
import type { ComparisonData } from '../types';
import { RUN_COLORS } from '../types';

export function ComparisonTable({ data }: { data: ComparisonData }) {
  // Find functions that flipped between runs
  const flippedFunctions = new Set<string>();
  for (const func of data.functions) {
    const outcomes = func.runs.map((r) => r.success);
    if (outcomes.some((o) => o !== outcomes[0])) {
      flippedFunctions.add(func.functionName);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left py-2 px-2 text-slate-400 font-medium">Function</th>
            <th className="text-left py-2 px-2 text-slate-400 font-medium">Tier</th>
            {data.runs.map((run, i) => (
              <th key={i} colSpan={4} className="text-center py-2 px-1 font-medium" style={{ color: RUN_COLORS[i] }}>
                {run.label}
              </th>
            ))}
          </tr>
          <tr className="border-b border-slate-700/50 text-xs">
            <th />
            <th />
            {data.runs.map((_, i) => (
              <Fragment key={i}>
                <th className="py-1 px-1 text-slate-500">Outcome</th>
                <th className="py-1 px-1 text-slate-500">Best Diff</th>
                <th className="py-1 px-1 text-slate-500">Attempts</th>
                <th className="py-1 px-1 text-slate-500">Duration</th>
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.functions.map((func) => {
            const isFlipped = flippedFunctions.has(func.functionName);
            return (
              <tr
                key={func.functionName}
                className={`border-b border-slate-800 hover:bg-slate-800/30 ${isFlipped ? 'bg-slate-800/20' : ''}`}
              >
                <td className="py-2 px-2 text-slate-200 font-mono text-xs">{func.functionName}</td>
                <td className="py-2 px-2">
                  <TierBadge tier={func.tier} />
                </td>
                {func.runs.map((run, ri) => {
                  // Determine if this specific outcome flipped
                  const otherOutcomes = func.runs.filter((_, j) => j !== ri).map((r) => r.success);
                  const flippedHere = isFlipped && otherOutcomes.some((o) => o !== run.success);
                  const improved = flippedHere && run.success;
                  const regressed = flippedHere && !run.success;

                  return (
                    <Fragment key={ri}>
                      <td className="py-2 px-1">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            run.success
                              ? improved
                                ? 'bg-green-500/30 text-green-300 ring-1 ring-green-400'
                                : 'bg-emerald-500/20 text-emerald-400'
                              : regressed
                                ? 'bg-red-500/30 text-red-300 ring-1 ring-red-400'
                                : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {run.success ? 'MATCH' : 'FAIL'}
                        </span>
                      </td>
                      <td className="py-2 px-1 text-center">
                        {run.bestDiffCount !== null ? (
                          <span
                            className={`font-mono text-xs ${
                              run.bestDiffCount === 0
                                ? 'text-emerald-400'
                                : run.bestDiffCount <= 5
                                  ? 'text-yellow-400'
                                  : run.bestDiffCount <= 20
                                    ? 'text-orange-400'
                                    : 'text-red-400'
                            }`}
                            style={{ opacity: run.success ? 1 : 0.7 + Math.min(0.3, 10 / (run.bestDiffCount + 1)) }}
                          >
                            {run.bestDiffCount}
                          </span>
                        ) : (
                          <span className="text-slate-600">N/A</span>
                        )}
                      </td>
                      <td className="py-2 px-1 text-center text-slate-300 text-xs">{run.numAttempts}</td>
                      <td className="py-2 px-1 text-slate-300 text-xs">{formatDuration(run.totalDurationMs)}</td>
                    </Fragment>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const colors: Record<string, string> = {
    easy: 'bg-green-500/20 text-green-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    hard: 'bg-red-500/20 text-red-400',
  };
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[tier] || 'bg-slate-700 text-slate-400'}`}>{tier}</span>;
}

function Fragment({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
