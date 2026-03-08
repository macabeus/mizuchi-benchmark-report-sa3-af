import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { ScatterChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import type { AggregatedData, ProjectData } from '../types';
import { PROJECT_COLORS, TIERS } from '../types';

echarts.use([ScatterChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

const TIER_X: Record<string, number> = { easy: 1, medium: 2, hard: 3 };

function getFuncStats(proj: ProjectData) {
  const byFunc: Record<string, { matchRate: number; avgAttempts: number; avgDuration: number; bestDiff: number | null; tier: string }> = {};
  const funcNames = proj.runs[0].functions.map((f) => f.functionName);
  for (const name of funcNames) {
    const runsData = proj.runs.map((r) => r.functions.find((f) => f.functionName === name)!);
    const matchRate = runsData.filter((r) => r.success).length / runsData.length;
    const avgAttempts = runsData.reduce((s, r) => s + r.numAttempts, 0) / runsData.length;
    const avgDuration = runsData.reduce((s, r) => s + r.totalDurationMs, 0) / runsData.length / 60000;
    const diffs = runsData.map((r) => r.bestDiffCount).filter((d) => d !== null) as number[];
    const bestDiff = diffs.length > 0 ? Math.min(...diffs) : null;
    byFunc[name] = { matchRate, avgAttempts, avgDuration, bestDiff, tier: runsData[0].tier };
  }
  return byFunc;
}

export function DifficultyScatter({ data }: { data: AggregatedData }) {
  const sa3Stats = getFuncStats(data.projects.sa3);
  const afStats = getFuncStats(data.projects.af);

  // Scatter: x = tier (jittered), y = match rate, size = avg attempts
  const makeSeries = (stats: Record<string, ReturnType<typeof getFuncStats>[string]>, projKey: 'sa3' | 'af', name: string) =>
    TIERS.map((tier) => ({
      name: `${name} (${tier})`,
      type: 'scatter' as const,
      data: Object.entries(stats)
        .filter(([, s]) => s.tier === tier)
        .map(([fn, s], i) => ({
          value: [TIER_X[tier] + (projKey === 'sa3' ? -0.15 : 0.15) + (i % 3 - 1) * 0.04, s.matchRate * 100, s.avgAttempts],
          name: fn,
        })),
      symbolSize: (val: number[]) => Math.max(8, Math.min(30, val[2] * 3)),
      itemStyle: {
        color: PROJECT_COLORS[projKey],
        opacity: 0.8,
        borderColor: '#fff',
        borderWidth: 1,
      },
    }));

  const scatterOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: { text: 'Match Rate by Tier — Every Function', textStyle: { color: '#e2e8f0', fontSize: 14 }, left: 10 },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 11 },
      formatter: (p: { name: string; value: number[] }) =>
        `<b>${p.name}</b><br/>Match Rate: ${p.value[1].toFixed(0)}%<br/>Avg Attempts: ${p.value[2].toFixed(1)}`,
    },
    legend: {
      data: [data.projects.sa3.name, data.projects.af.name],
      textStyle: { color: '#94a3b8' },
      top: 0,
    },
    grid: { left: 60, right: 30, top: 50, bottom: 30 },
    xAxis: {
      type: 'value',
      min: 0.5,
      max: 3.5,
      axisLabel: {
        color: '#cbd5e1',
        formatter: (v: number) => ({ 1: 'Easy', 2: 'Medium', 3: 'Hard' })[Math.round(v)] || '',
      },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      min: -5,
      max: 110,
      name: 'Match Rate (%)',
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    series: [
      // Invisible series for legend
      { name: data.projects.sa3.name, type: 'scatter', data: [], itemStyle: { color: PROJECT_COLORS.sa3 } },
      { name: data.projects.af.name, type: 'scatter', data: [], itemStyle: { color: PROJECT_COLORS.af } },
      ...makeSeries(sa3Stats, 'sa3', data.projects.sa3.name),
      ...makeSeries(afStats, 'af', data.projects.af.name),
    ],
  };

  // Best diff for failed functions
  const failedSa3 = Object.entries(sa3Stats).filter(([, s]) => s.matchRate === 0);
  const failedAf = Object.entries(afStats).filter(([, s]) => s.matchRate === 0);

  return (
    <div>
      <div className="bg-slate-800/30 rounded-lg p-4 mb-6">
        <ReactEChartsCore echarts={echarts} option={scatterOption} style={{ height: 450 }} />
        <p className="text-slate-500 text-xs mt-2 text-center">Bubble size = average attempts needed. SA3 dots shifted left, AF dots shifted right within each tier.</p>
      </div>

      {/* Always-fail closest approach */}
      <div className="bg-slate-800/40 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">Always-Failed Functions — Closest Approach</h4>
        <p className="text-slate-500 text-xs mb-3">Best diff count achieved across all 3 runs for functions that never matched.</p>
        <div className="grid grid-cols-2 gap-4">
          {([['sa3', failedSa3, data.projects.sa3.name], ['af', failedAf, data.projects.af.name]] as const).map(([key, funcs, name]) => (
            <div key={key}>
              <h5 className="text-sm font-medium mb-2" style={{ color: PROJECT_COLORS[key] }}>{name}</h5>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-1 px-2 text-slate-400">Function</th>
                    <th className="text-left py-1 px-2 text-slate-400">Tier</th>
                    <th className="text-center py-1 px-2 text-slate-400">Best Diff</th>
                  </tr>
                </thead>
                <tbody>
                  {funcs
                    .sort(([, a], [, b]) => (a.bestDiff ?? 9999) - (b.bestDiff ?? 9999))
                    .map(([fn, s]) => (
                      <tr key={fn} className="border-b border-slate-800/50">
                        <td className="py-1 px-2 text-slate-300 font-mono">{fn}</td>
                        <td className="py-1 px-2 text-slate-400">{s.tier}</td>
                        <td className="py-1 px-2 text-center text-slate-300">{s.bestDiff ?? '—'}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
