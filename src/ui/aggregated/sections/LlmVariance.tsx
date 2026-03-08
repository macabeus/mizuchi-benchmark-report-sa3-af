import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, BoxplotChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, DatasetComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import type { AggregatedData, ProjectData } from '../types';
import { PROJECT_COLORS, TIERS } from '../types';

echarts.use([BarChart, BoxplotChart, GridComponent, TooltipComponent, LegendComponent, DatasetComponent, CanvasRenderer]);

function getConsistencyStats(proj: ProjectData) {
  const funcNames = proj.runs[0].functions.map((f) => f.functionName);
  let alwaysMatch = 0, alwaysFail = 0, flipped = 0;
  const variances: number[] = [];

  for (const name of funcNames) {
    const outcomes = proj.runs.map((r) => r.functions.find((f) => f.functionName === name)!.success);
    const matchRate = outcomes.filter(Boolean).length / outcomes.length;
    if (matchRate === 1) alwaysMatch++;
    else if (matchRate === 0) alwaysFail++;
    else flipped++;

    // Variance of match rate (binary per run)
    const mean = matchRate;
    const variance = outcomes.reduce((s, o) => s + (((o ? 1 : 0) - mean) ** 2), 0) / outcomes.length;
    variances.push(Math.sqrt(variance));
  }

  return { alwaysMatch, alwaysFail, flipped, total: funcNames.length, variances };
}

function getFlippedByTier(proj: ProjectData) {
  const result: Record<string, { total: number; flipped: number }> = {};
  for (const tier of TIERS) {
    const funcs = proj.runs[0].functions.filter((f) => f.tier === tier);
    let flipped = 0;
    for (const func of funcs) {
      const outcomes = proj.runs.map((r) => r.functions.find((f) => f.functionName === func.functionName)!.success);
      if (outcomes.some((o) => o) && outcomes.some((o) => !o)) flipped++;
    }
    result[tier] = { total: funcs.length, flipped };
  }
  return result;
}

export function LlmVariance({ data }: { data: AggregatedData }) {
  const sa3Stats = getConsistencyStats(data.projects.sa3);
  const afStats = getConsistencyStats(data.projects.af);
  const sa3Tiers = getFlippedByTier(data.projects.sa3);
  const afTiers = getFlippedByTier(data.projects.af);

  // Consistency bar chart
  const consistencyOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: { text: 'Outcome Consistency Across 3 Runs', textStyle: { color: '#e2e8f0', fontSize: 14 }, left: 10 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0' },
      axisPointer: { type: 'shadow' },
    },
    legend: { data: ['Always Match', 'Always Fail', 'Flipped'], textStyle: { color: '#94a3b8' }, top: 0 },
    grid: { left: 80, right: 30, top: 40, bottom: 30 },
    xAxis: { type: 'value', max: 30, axisLabel: { color: '#94a3b8' }, splitLine: { lineStyle: { color: '#334155' } } },
    yAxis: { type: 'category', data: [data.projects.af.name, data.projects.sa3.name], axisLabel: { color: '#cbd5e1' } },
    series: [
      {
        name: 'Always Match',
        type: 'bar',
        stack: 'total',
        data: [afStats.alwaysMatch, sa3Stats.alwaysMatch],
        itemStyle: { color: '#22c55e' },
        label: { show: true, color: '#fff', fontSize: 11 },
      },
      {
        name: 'Always Fail',
        type: 'bar',
        stack: 'total',
        data: [afStats.alwaysFail, sa3Stats.alwaysFail],
        itemStyle: { color: '#ef4444' },
        label: { show: true, color: '#fff', fontSize: 11 },
      },
      {
        name: 'Flipped',
        type: 'bar',
        stack: 'total',
        data: [afStats.flipped, sa3Stats.flipped],
        itemStyle: { color: '#f59e0b' },
        label: { show: true, color: '#fff', fontSize: 11 },
      },
    ],
  };

  return (
    <div>
      <div className="bg-slate-800/30 rounded-lg p-4 mb-6">
        <ReactEChartsCore echarts={echarts} option={consistencyOption} style={{ height: 200 }} />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {([['sa3', sa3Stats, sa3Tiers], ['af', afStats, afTiers]] as const).map(([key, stats, tiers]) => (
          <div key={key} className="bg-slate-800/60 rounded-lg p-4" style={{ borderLeft: `4px solid ${PROJECT_COLORS[key]}` }}>
            <h4 className="font-medium mb-3" style={{ color: PROJECT_COLORS[key] }}>
              {data.projects[key].name}
            </h4>
            <div className="grid grid-cols-3 gap-3 text-sm mb-3">
              <div>
                <div className="text-emerald-400 text-xs">Always Match</div>
                <div className="text-white font-bold text-lg">{stats.alwaysMatch}</div>
                <div className="text-slate-500 text-xs">{((stats.alwaysMatch / stats.total) * 100).toFixed(0)}%</div>
              </div>
              <div>
                <div className="text-red-400 text-xs">Always Fail</div>
                <div className="text-white font-bold text-lg">{stats.alwaysFail}</div>
                <div className="text-slate-500 text-xs">{((stats.alwaysFail / stats.total) * 100).toFixed(0)}%</div>
              </div>
              <div>
                <div className="text-yellow-400 text-xs">Flipped</div>
                <div className="text-white font-bold text-lg">{stats.flipped}</div>
                <div className="text-slate-500 text-xs">{((stats.flipped / stats.total) * 100).toFixed(0)}%</div>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              Deterministic: <span className="text-white font-medium">{(((stats.alwaysMatch + stats.alwaysFail) / stats.total) * 100).toFixed(0)}%</span>
            </div>
            <div className="mt-2 text-xs">
              <span className="text-slate-500">Flipped by tier: </span>
              {TIERS.map((t) => (
                <span key={t} className="mr-2">
                  <span className="text-slate-400">{t}: </span>
                  <span className="text-white">{tiers[t].flipped}/{tiers[t].total}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
