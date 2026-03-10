import type { AggregatedData, ProjectData } from '../types';
import { PROJECT_COLORS } from '../types';

function getFirstTryStats(proj: ProjectData) {
  return proj.runs.map((run) => {
    let firstTry = 0;
    let totalAi = 0;
    let firstTryCost = 0;
    let multiAttemptCost = 0;
    let multiAttemptCount = 0;

    for (const func of run.functions) {
      if (func.matchSource === 'programmatic-phase' || func.numAttempts === 0) {
        continue;
      }
      totalAi++;
      if (func.success && func.numAttempts === 1) {
        firstTry++;
        firstTryCost += func.totalCostUsd;
      } else if (func.success && func.numAttempts > 1) {
        multiAttemptCost += func.totalCostUsd;
        multiAttemptCount++;
      }
    }

    return {
      firstTry,
      totalAi,
      rate: totalAi > 0 ? (firstTry / totalAi) * 100 : 0,
      avgFirstTryCost: firstTry > 0 ? firstTryCost / firstTry : 0,
      avgMultiAttemptCost: multiAttemptCount > 0 ? multiAttemptCost / multiAttemptCount : 0,
    };
  });
}

export function FirstTryAnalysis({ data }: { data: AggregatedData }) {
  const sa3Stats = getFirstTryStats(data.projects.sa3);
  const afStats = getFirstTryStats(data.projects.af);

  const sa3AvgRate = sa3Stats.reduce((s, r) => s + r.rate, 0) / sa3Stats.length;
  const afAvgRate = afStats.reduce((s, r) => s + r.rate, 0) / afStats.length;

  const sa3TotalFirstTry = sa3Stats.reduce((s, r) => s + r.firstTry, 0);
  const sa3TotalAi = sa3Stats.reduce((s, r) => s + r.totalAi, 0);
  const afTotalFirstTry = afStats.reduce((s, r) => s + r.firstTry, 0);
  const afTotalAi = afStats.reduce((s, r) => s + r.totalAi, 0);

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {(
          [
            ['sa3', data.projects.sa3, sa3Stats, sa3AvgRate, sa3TotalFirstTry, sa3TotalAi],
            ['af', data.projects.af, afStats, afAvgRate, afTotalFirstTry, afTotalAi],
          ] as const
        ).map(([key, proj, stats, avgRate, totalFirst, totalAi]) => (
          <div
            key={key}
            className="bg-slate-800/60 rounded-lg p-4"
            style={{ borderLeft: `4px solid ${PROJECT_COLORS[key]}` }}
          >
            <h4 className="font-medium mb-3" style={{ color: PROJECT_COLORS[key] }}>
              {proj.name}
            </h4>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-white">{avgRate.toFixed(0)}%</span>
              <span className="text-slate-400 text-sm">first-try rate (avg across runs)</span>
            </div>
            <div className="text-slate-500 text-xs mb-3">
              {totalFirst}/{totalAi} AI functions matched on first attempt across {stats.length} runs
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {stats.map((s, i) => (
                <div key={i} className="bg-slate-900/40 rounded p-2 text-center">
                  <div className="text-slate-500 mb-1">Run {i + 1}</div>
                  <div className="text-white font-medium">
                    {s.firstTry}/{s.totalAi}
                  </div>
                  <div className="text-slate-500">{s.rate.toFixed(0)}%</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Note about what's excluded */}
      <div className="bg-slate-800/30 rounded-lg p-3 mb-6 border border-slate-700/30">
        <p className="text-slate-400 text-xs">
          <span className="text-slate-300 font-medium">Note:</span> Programmatic-phase matches (m2c/permuter with 0 AI
          attempts) are excluded from this analysis. SA3 has no programmatic matches; AF has 5 per run. The rates above
          measure only functions that required Claude&apos;s AI intervention.
        </p>
      </div>

      {/* Per-run comparison table */}
      <div className="bg-slate-800/40 rounded-lg p-4 mb-6">
        <h4 className="text-white font-medium mb-3">Per-Run First-Try Rates</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 px-3 text-slate-400">Run</th>
              <th className="text-center py-2 px-3 text-slate-400">First-Try Matches</th>
              <th className="text-center py-2 px-3 text-slate-400">AI Functions</th>
              <th className="text-center py-2 px-3 text-slate-400">First-Try Rate</th>
              <th className="text-center py-2 px-3 text-slate-400">Avg Cost (1st Try)</th>
              <th className="text-center py-2 px-3 text-slate-400">Avg Cost (Multi)</th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                ['sa3', data.projects.sa3, sa3Stats],
                ['af', data.projects.af, afStats],
              ] as const
            ).flatMap(([key, proj, stats]) =>
              stats.map((s, i) => (
                <tr key={`${key}-${i}`} className="border-b border-slate-800/50">
                  <td className="py-2 px-3 text-slate-300">
                    <span
                      className="inline-block w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: PROJECT_COLORS[key] }}
                    />
                    {proj.runs[i].label}
                  </td>
                  <td className="py-2 px-3 text-center text-white font-medium">{s.firstTry}</td>
                  <td className="py-2 px-3 text-center text-slate-300">{s.totalAi}</td>
                  <td className="py-2 px-3 text-center text-white font-medium">{s.rate.toFixed(0)}%</td>
                  <td className="py-2 px-3 text-center text-emerald-400">
                    ${s.avgFirstTryCost.toFixed(2)}
                  </td>
                  <td className="py-2 px-3 text-center text-amber-400">
                    {s.avgMultiAttemptCost > 0 ? `$${s.avgMultiAttemptCost.toFixed(2)}` : '—'}
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>

      {/* Takeaway */}
      <div className="bg-slate-800/40 rounded-lg p-4">
        <h4 className="text-white font-medium mb-2">Key Insight</h4>
        <p className="text-slate-400 text-sm">
          SA3 has a higher first-try rate ({sa3AvgRate.toFixed(0)}%) than AF ({afAvgRate.toFixed(0)}%) for AI-driven
          matches, despite similar overall success rates. This suggests Claude is more effective at producing correct code
          on the first attempt for GBA/ARM/GCC targets. AF compensates with programmatic tools (m2c + permuter) that
          solve functions before AI even starts, keeping total success rates comparable.
        </p>
      </div>
    </div>
  );
}
