import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, ScatterChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, MarkLineComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import type { ComparisonData } from '../types';
import { RUN_COLORS } from '../types';

echarts.use([BarChart, ScatterChart, GridComponent, TooltipComponent, LegendComponent, MarkLineComponent, CanvasRenderer]);

const TIER_COLORS = { easy: '#22c55e', medium: '#eab308', hard: '#ef4444' };
const TIERS = ['easy', 'medium', 'hard'] as const;

interface Props {
  data: ComparisonData;
  runLabels: string[];
}

interface TierStats {
  tier: string;
  count: number;
  matchRate: number;
  avgAttempts: number;
  avgDurationMin: number;
  avgCost: number;
  functions: {
    name: string;
    matchRate: number;
    avgAttempts: number;
    avgDurationMin: number;
    avgCost: number;
  }[];
}

function computeTierStats(data: ComparisonData): TierStats[] {
  return TIERS.map((tier) => {
    const funcs = data.functions.filter((f) => f.tier === tier);
    const perFunc = funcs.map((f) => {
      const nRuns = f.runs.length;
      const matchRate = f.runs.filter((r) => r.success).length / nRuns;
      const avgAttempts = f.runs.reduce((s, r) => s + r.numAttempts, 0) / nRuns;
      const avgDurationMin = f.runs.reduce((s, r) => s + r.totalDurationMs, 0) / nRuns / 60000;
      const avgCost = f.runs.reduce((s, r) => s + r.totalCostUsd, 0) / nRuns;
      return { name: f.functionName, matchRate, avgAttempts, avgDurationMin, avgCost };
    });

    const count = funcs.length;
    const matchRate = perFunc.reduce((s, f) => s + f.matchRate, 0) / count;
    const avgAttempts = perFunc.reduce((s, f) => s + f.avgAttempts, 0) / count;
    const avgDurationMin = perFunc.reduce((s, f) => s + f.avgDurationMin, 0) / count;
    const avgCost = perFunc.reduce((s, f) => s + f.avgCost, 0) / count;

    return { tier, count, matchRate, avgAttempts, avgDurationMin, avgCost, functions: perFunc };
  });
}

export function TierPredictability({ data, runLabels }: Props) {
  const tierStats = computeTierStats(data);

  // 1. Tier summary bar chart: match rate, avg attempts, avg duration
  const summaryOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'Match Rate by Tier',
      textStyle: { color: '#e2e8f0', fontSize: 14 },
      left: 10,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
      formatter: (params: { name: string; value: number; seriesName: string }[]) => {
        const tier = params[0].name;
        const ts = tierStats.find((t) => t.tier === tier);
        if (!ts) return '';
        return `<b>${tier}</b> (${ts.count} functions)<br/>` +
          `Match Rate: <b>${(ts.matchRate * 100).toFixed(1)}%</b><br/>` +
          `Avg Attempts: <b>${ts.avgAttempts.toFixed(1)}</b><br/>` +
          `Avg Duration: <b>${ts.avgDurationMin.toFixed(1)}m</b><br/>` +
          `Avg Cost: <b>$${ts.avgCost.toFixed(2)}</b>`;
      },
    },
    grid: { left: 60, right: 30, top: 40, bottom: 30 },
    xAxis: {
      type: 'category',
      data: TIERS,
      axisLabel: { color: '#cbd5e1', fontSize: 13 },
    },
    yAxis: {
      type: 'value',
      max: 100,
      name: 'Match Rate (%)',
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    series: [
      {
        type: 'bar',
        data: tierStats.map((ts) => ({
          value: +(ts.matchRate * 100).toFixed(1),
          itemStyle: { color: TIER_COLORS[ts.tier as keyof typeof TIER_COLORS] },
        })),
        barWidth: '50%',
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%',
          color: '#e2e8f0',
          fontSize: 13,
          fontWeight: 'bold',
        },
      },
    ],
  };

  // 2. Scatter plot: each function as a dot, x = avg attempts, y = match rate, colored by tier
  const scatterData = tierStats.flatMap((ts) =>
    ts.functions.map((f) => ({
      value: [f.avgAttempts, +(f.matchRate * 100).toFixed(1), f.avgDurationMin, f.avgCost],
      name: f.name,
      tier: ts.tier,
    })),
  );

  const scatterOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'Per-Function: Match Rate vs Avg Attempts',
      textStyle: { color: '#e2e8f0', fontSize: 14 },
      left: 10,
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 11 },
      formatter: (p: { name: string; value: number[]; data: { tier: string } }) =>
        `<b>${p.name}</b> (${p.data.tier})<br/>` +
        `Match Rate: ${p.value[1]}%<br/>` +
        `Avg Attempts: ${p.value[0].toFixed(1)}<br/>` +
        `Avg Duration: ${p.value[2].toFixed(1)}m<br/>` +
        `Avg Cost: $${p.value[3].toFixed(2)}`,
    },
    legend: {
      data: [...TIERS],
      textStyle: { color: '#94a3b8' },
      top: 0,
    },
    grid: { left: 60, right: 30, top: 40, bottom: 40 },
    xAxis: {
      type: 'value',
      name: 'Avg Attempts (across runs)',
      nameLocation: 'center',
      nameGap: 25,
      nameTextStyle: { color: '#94a3b8' },
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    yAxis: {
      type: 'value',
      name: 'Match Rate (%)',
      max: 110,
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    series: TIERS.map((tier) => ({
      name: tier,
      type: 'scatter',
      symbolSize: 14,
      data: scatterData.filter((d) => d.tier === tier),
      itemStyle: { color: TIER_COLORS[tier] },
    })),
  };

  // 3. Per-run match rate by tier (grouped bar)
  const perRunOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'Match Rate by Tier per Run',
      textStyle: { color: '#e2e8f0', fontSize: 14 },
      left: 10,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
    },
    legend: { data: runLabels, textStyle: { color: '#94a3b8' }, top: 0 },
    grid: { left: 60, right: 30, top: 40, bottom: 30 },
    xAxis: {
      type: 'category',
      data: TIERS,
      axisLabel: { color: '#cbd5e1', fontSize: 13 },
    },
    yAxis: {
      type: 'value',
      max: 100,
      name: 'Match Rate (%)',
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    series: runLabels.map((label, ri) => ({
      name: label,
      type: 'bar',
      data: TIERS.map((tier) => {
        const funcs = data.functions.filter((f) => f.tier === tier);
        const matched = funcs.filter((f) => f.runs[ri]?.success).length;
        return +((matched / funcs.length) * 100).toFixed(1);
      }),
      itemStyle: { color: RUN_COLORS[ri] },
    })),
  };

  return (
    <div>
      {/* Tier summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {tierStats.map((ts) => (
          <div
            key={ts.tier}
            className="bg-slate-800/60 rounded-lg p-4 border-l-4"
            style={{ borderLeftColor: TIER_COLORS[ts.tier as keyof typeof TIER_COLORS] }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-lg font-bold capitalize"
                style={{ color: TIER_COLORS[ts.tier as keyof typeof TIER_COLORS] }}
              >
                {ts.tier}
              </span>
              <span className="text-slate-500 text-sm">{ts.count} functions</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-slate-500 text-xs">Match Rate</div>
                <div className="text-white font-bold text-lg">{(ts.matchRate * 100).toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Avg Attempts</div>
                <div className="text-white font-medium">{ts.avgAttempts.toFixed(1)}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Avg Duration</div>
                <div className="text-white font-medium">{ts.avgDurationMin.toFixed(1)}m</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Avg Cost</div>
                <div className="text-white font-medium">${ts.avgCost.toFixed(2)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/30 rounded-lg p-4">
          <ReactEChartsCore echarts={echarts} option={summaryOption} style={{ height: 300 }} />
        </div>
        <div className="bg-slate-800/30 rounded-lg p-4">
          <ReactEChartsCore echarts={echarts} option={perRunOption} style={{ height: 300 }} />
        </div>
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4 mb-6">
        <ReactEChartsCore echarts={echarts} option={scatterOption} style={{ height: 400 }} />
      </div>

      {/* Per-function table by tier */}
      <div className="bg-slate-800/40 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">Per-Function Breakdown by Tier</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 px-2 text-slate-400">Function</th>
              <th className="text-left py-2 px-2 text-slate-400">Tier</th>
              <th className="text-center py-2 px-2 text-slate-400">Match Rate</th>
              <th className="text-center py-2 px-2 text-slate-400">Avg Attempts</th>
              <th className="text-center py-2 px-2 text-slate-400">Avg Duration</th>
              <th className="text-center py-2 px-2 text-slate-400">Avg Cost</th>
            </tr>
          </thead>
          <tbody>
            {tierStats.flatMap((ts) =>
              ts.functions
                .sort((a, b) => b.matchRate - a.matchRate || a.avgAttempts - b.avgAttempts)
                .map((f) => (
                  <tr key={f.name} className="border-b border-slate-800/50">
                    <td className="py-2 px-2 text-slate-200 font-mono text-xs">{f.name}</td>
                    <td className="py-2 px-2">
                      <span
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: TIER_COLORS[ts.tier as keyof typeof TIER_COLORS] + '20',
                          color: TIER_COLORS[ts.tier as keyof typeof TIER_COLORS],
                        }}
                      >
                        {ts.tier}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <span
                        className={`font-medium ${
                          f.matchRate >= 1 ? 'text-emerald-400' : f.matchRate > 0 ? 'text-yellow-400' : 'text-red-400'
                        }`}
                      >
                        {(f.matchRate * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center text-slate-300">{f.avgAttempts.toFixed(1)}</td>
                    <td className="py-2 px-2 text-center text-slate-300">{f.avgDurationMin.toFixed(1)}m</td>
                    <td className="py-2 px-2 text-center text-slate-300">${f.avgCost.toFixed(2)}</td>
                  </tr>
                )),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
