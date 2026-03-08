import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import type { AggregatedData, ProjectData } from '../types';
import { PROJECT_COLORS, TIERS, TIER_COLORS } from '../types';

echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

interface FailedFunc {
  name: string;
  tier: string;
  avgAttempts: number;
  avgDuration: number;
  bestDiff: number | null;
  avgCost: number;
}

function getFailedFunctions(proj: ProjectData): FailedFunc[] {
  const funcNames = proj.runs[0].functions.map((f) => f.functionName);
  const failed: FailedFunc[] = [];
  for (const name of funcNames) {
    const runsData = proj.runs.map((r) => r.functions.find((f) => f.functionName === name)!);
    if (runsData.every((r) => !r.success)) {
      const diffs = runsData.flatMap((r) => r.attempts.map((a) => a.diffCount).filter((d) => d !== null)) as number[];
      failed.push({
        name,
        tier: runsData[0].tier,
        avgAttempts: runsData.reduce((s, r) => s + r.numAttempts, 0) / runsData.length,
        avgDuration: runsData.reduce((s, r) => s + r.totalDurationMs, 0) / runsData.length / 60000,
        bestDiff: diffs.length > 0 ? Math.min(...diffs) : null,
        avgCost: runsData.reduce((s, r) => s + r.totalCostUsd, 0) / runsData.length,
      });
    }
  }
  return failed;
}

export function FailureAnalysis({ data }: { data: AggregatedData }) {
  const sa3Failed = getFailedFunctions(data.projects.sa3);
  const afFailed = getFailedFunctions(data.projects.af);

  // Tier distribution of failures
  const tierDistOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: { text: 'Always-Failed Functions by Tier', textStyle: { color: '#e2e8f0', fontSize: 14 }, left: 10 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0' },
    },
    legend: { data: [data.projects.sa3.name, data.projects.af.name], textStyle: { color: '#94a3b8' }, top: 0 },
    grid: { left: 60, right: 30, top: 40, bottom: 30 },
    xAxis: {
      type: 'category',
      data: TIERS.map((t) => t.charAt(0).toUpperCase() + t.slice(1)),
      axisLabel: { color: '#cbd5e1' },
    },
    yAxis: { type: 'value', axisLabel: { color: '#94a3b8' }, splitLine: { lineStyle: { color: '#334155' } } },
    series: [
      {
        name: data.projects.sa3.name,
        type: 'bar',
        data: TIERS.map((t) => sa3Failed.filter((f) => f.tier === t).length),
        itemStyle: { color: PROJECT_COLORS.sa3 },
      },
      {
        name: data.projects.af.name,
        type: 'bar',
        data: TIERS.map((t) => afFailed.filter((f) => f.tier === t).length),
        itemStyle: { color: PROJECT_COLORS.af },
      },
    ],
  };

  // Best diff distribution
  const sa3Diffs = sa3Failed.map((f) => f.bestDiff).filter((d) => d !== null) as number[];
  const afDiffs = afFailed.map((f) => f.bestDiff).filter((d) => d !== null) as number[];

  const diffOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: { text: 'Best Diff Count Achieved (Failed Functions)', textStyle: { color: '#e2e8f0', fontSize: 14 }, left: 10 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0' },
    },
    legend: { data: [data.projects.sa3.name, data.projects.af.name], textStyle: { color: '#94a3b8' }, top: 0 },
    grid: { left: 100, right: 30, top: 40, bottom: 30 },
    xAxis: { type: 'value', name: 'Best diff count', axisLabel: { color: '#94a3b8' }, splitLine: { lineStyle: { color: '#334155' } } },
    yAxis: {
      type: 'category',
      data: [...sa3Failed, ...afFailed].sort((a, b) => (a.bestDiff ?? 9999) - (b.bestDiff ?? 9999)).map((f) => f.name),
      axisLabel: { color: '#cbd5e1', fontSize: 9 },
      inverse: true,
    },
    series: [
      {
        name: data.projects.sa3.name,
        type: 'bar',
        data: [...sa3Failed, ...afFailed]
          .sort((a, b) => (a.bestDiff ?? 9999) - (b.bestDiff ?? 9999))
          .map((f) => (sa3Failed.includes(f) ? f.bestDiff : null)),
        itemStyle: { color: PROJECT_COLORS.sa3 },
      },
      {
        name: data.projects.af.name,
        type: 'bar',
        data: [...sa3Failed, ...afFailed]
          .sort((a, b) => (a.bestDiff ?? 9999) - (b.bestDiff ?? 9999))
          .map((f) => (afFailed.includes(f) ? f.bestDiff : null)),
        itemStyle: { color: PROJECT_COLORS.af },
      },
    ],
  };

  const totalWastedCostSa3 = sa3Failed.reduce((s, f) => s + f.avgCost, 0);
  const totalWastedCostAf = afFailed.reduce((s, f) => s + f.avgCost, 0);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/30 rounded-lg p-4">
          <ReactEChartsCore echarts={echarts} option={tierDistOption} style={{ height: 300 }} />
        </div>
        <div className="bg-slate-800/30 rounded-lg p-4">
          <ReactEChartsCore echarts={echarts} option={diffOption} style={{ height: Math.max(300, (sa3Failed.length + afFailed.length) * 25 + 80) }} />
        </div>
      </div>

      {/* Cost of failure */}
      <div className="bg-slate-800/40 rounded-lg p-4 mb-6">
        <h4 className="text-white font-medium mb-3">Cost of Failure</h4>
        <p className="text-slate-400 text-sm mb-3">
          Failed functions exhaust all retry attempts with no match. These are the avg wasted costs per run:
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: PROJECT_COLORS.sa3 }}>${totalWastedCostSa3.toFixed(2)}</div>
            <div className="text-slate-500 text-xs">{data.projects.sa3.name} — {sa3Failed.length} failed functions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: PROJECT_COLORS.af }}>${totalWastedCostAf.toFixed(2)}</div>
            <div className="text-slate-500 text-xs">{data.projects.af.name} — {afFailed.length} failed functions</div>
          </div>
        </div>
      </div>

      {/* Failed functions table */}
      <div className="bg-slate-800/40 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">All Always-Failed Functions</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 px-2 text-slate-400">Project</th>
              <th className="text-left py-2 px-2 text-slate-400">Function</th>
              <th className="text-left py-2 px-2 text-slate-400">Tier</th>
              <th className="text-center py-2 px-2 text-slate-400">Best Diff</th>
              <th className="text-center py-2 px-2 text-slate-400">Avg Duration</th>
              <th className="text-center py-2 px-2 text-slate-400">Avg Cost</th>
            </tr>
          </thead>
          <tbody>
            {([
              ...sa3Failed.map((f) => ({ ...f, project: 'sa3' as const })),
              ...afFailed.map((f) => ({ ...f, project: 'af' as const })),
            ])
              .sort((a, b) => (a.bestDiff ?? 9999) - (b.bestDiff ?? 9999))
              .map((f) => (
                <tr key={`${f.project}-${f.name}`} className="border-b border-slate-800/50">
                  <td className="py-2 px-2">
                    <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: PROJECT_COLORS[f.project] }} />
                    <span className="text-slate-400 text-xs">{f.project === 'sa3' ? 'SA3' : 'AF'}</span>
                  </td>
                  <td className="py-2 px-2 text-slate-200 font-mono text-xs">{f.name}</td>
                  <td className="py-2 px-2">
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: TIER_COLORS[f.tier as keyof typeof TIER_COLORS] + '20', color: TIER_COLORS[f.tier as keyof typeof TIER_COLORS] }}
                    >
                      {f.tier}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-center text-slate-300">{f.bestDiff ?? '—'}</td>
                  <td className="py-2 px-2 text-center text-slate-300">{f.avgDuration.toFixed(1)}m</td>
                  <td className="py-2 px-2 text-center text-slate-300">${f.avgCost.toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
