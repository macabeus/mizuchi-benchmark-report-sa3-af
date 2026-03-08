import type { AggregatedData, ProjectData } from '../types';
import { PROJECT_COLORS } from '../types';

function avg(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function projMetrics(proj: ProjectData) {
  const runs = proj.runs;
  const totalTokens = avg(runs.map((r) => r.summary.totalInputTokens + r.summary.totalOutputTokens));
  const totalCost = avg(runs.map((r) => r.summary.totalCost));
  const successCount = avg(runs.map((r) => r.summary.successfulPrompts));
  const totalAttempts = avg(runs.map((r) => r.summary.totalAttempts));
  const costPerMatch = totalCost / successCount;
  const costPerAttempt = totalCost / totalAttempts;

  // Avg attempts for matched vs failed
  const matchedAttempts: number[] = [];
  const failedAttempts: number[] = [];
  for (const run of runs) {
    for (const f of run.functions) {
      if (f.success) {
        matchedAttempts.push(f.numAttempts);
      } else {
        failedAttempts.push(f.numAttempts);
      }
    }
  }

  return {
    totalTokens,
    totalCost,
    costPerMatch,
    costPerAttempt,
    avgAttemptsToMatch: matchedAttempts.length > 0 ? avg(matchedAttempts) : 0,
    avgAttemptsBeforeGivingUp: failedAttempts.length > 0 ? avg(failedAttempts) : 0,
    successCount,
    totalAttempts,
  };
}

export function CostEfficiency({ data }: { data: AggregatedData }) {
  const sa3 = projMetrics(data.projects.sa3);
  const af = projMetrics(data.projects.af);

  const rows: { label: string; sa3: string; af: string; winner?: 'sa3' | 'af' }[] = [
    {
      label: 'Avg tokens per run',
      sa3: formatNum(sa3.totalTokens),
      af: formatNum(af.totalTokens),
    },
    {
      label: 'Avg USD per run',
      sa3: `$${sa3.totalCost.toFixed(2)}`,
      af: `$${af.totalCost.toFixed(2)}`,
      winner: sa3.totalCost < af.totalCost ? 'sa3' : 'af',
    },
    {
      label: 'Cost per successful match',
      sa3: `$${sa3.costPerMatch.toFixed(2)}`,
      af: `$${af.costPerMatch.toFixed(2)}`,
      winner: sa3.costPerMatch < af.costPerMatch ? 'sa3' : 'af',
    },
    {
      label: 'Cost per attempt',
      sa3: `$${sa3.costPerAttempt.toFixed(2)}`,
      af: `$${af.costPerAttempt.toFixed(2)}`,
      winner: sa3.costPerAttempt < af.costPerAttempt ? 'sa3' : 'af',
    },
    {
      label: 'Avg attempts to match',
      sa3: sa3.avgAttemptsToMatch.toFixed(1),
      af: af.avgAttemptsToMatch.toFixed(1),
      winner: sa3.avgAttemptsToMatch < af.avgAttemptsToMatch ? 'sa3' : 'af',
    },
    {
      label: 'Avg attempts before giving up',
      sa3: sa3.avgAttemptsBeforeGivingUp.toFixed(1),
      af: af.avgAttemptsBeforeGivingUp.toFixed(1),
    },
    {
      label: 'Avg matches per run',
      sa3: sa3.successCount.toFixed(1),
      af: af.successCount.toFixed(1),
    },
    {
      label: 'Avg total attempts per run',
      sa3: sa3.totalAttempts.toFixed(0),
      af: af.totalAttempts.toFixed(0),
    },
  ];

  return (
    <div className="bg-slate-800/40 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left py-3 px-5 text-slate-400 font-medium">Metric</th>
            <th className="text-center py-3 px-5 font-medium" style={{ color: PROJECT_COLORS.sa3 }}>
              {data.projects.sa3.name}
            </th>
            <th className="text-center py-3 px-5 font-medium" style={{ color: PROJECT_COLORS.af }}>
              {data.projects.af.name}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-slate-800/50 hover:bg-slate-800/20">
              <td className="py-2.5 px-5 text-slate-300">{row.label}</td>
              <td className={`py-2.5 px-5 text-center font-medium ${row.winner === 'sa3' ? 'text-emerald-400' : 'text-slate-300'}`}>
                {row.sa3}
              </td>
              <td className={`py-2.5 px-5 text-center font-medium ${row.winner === 'af' ? 'text-emerald-400' : 'text-slate-300'}`}>
                {row.af}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(Math.round(n));
}
