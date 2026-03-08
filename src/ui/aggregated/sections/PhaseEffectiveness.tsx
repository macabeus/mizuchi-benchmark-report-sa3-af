import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import type { AggregatedData, ProjectData } from '../types';
import { PROJECT_COLORS } from '../types';

echarts.use([BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

function matchSourceBreakdown(proj: ProjectData) {
  const totals: Record<string, number> = { m2c: 0, permuter: 0, claude: 0, unmatched: 0 };
  for (const run of proj.runs) {
    for (const f of run.functions) {
      if (f.matchSource === 'programmatic-phase') totals.m2c++;
      else if (f.matchSource === 'decomp-permuter') totals.permuter++;
      else if (f.matchSource === 'claude') totals.claude++;
      else totals.unmatched++;
    }
  }
  const n = proj.runs.length;
  return { m2c: totals.m2c / n, permuter: totals.permuter / n, claude: totals.claude / n, unmatched: totals.unmatched / n };
}

function permuterStats(proj: ProjectData) {
  let totalTasks = 0, improved = 0, perfectMatches = 0, totalImprovement = 0;
  for (const run of proj.runs) {
    for (const f of run.functions) {
      for (const pt of f.permuterTasks) {
        totalTasks++;
        if (pt.baseScore - pt.bestScore > 0) { improved++; totalImprovement += pt.baseScore - pt.bestScore; }
        if (pt.perfectMatch) perfectMatches++;
      }
    }
  }
  const n = proj.runs.length;
  return { totalTasks: totalTasks / n, improved: improved / n, perfectMatches: perfectMatches / n, avgImprovement: improved > 0 ? totalImprovement / improved : 0 };
}

function m2cQuality(proj: ProjectData) {
  const diffs: number[] = [];
  let hasOutput = 0, total = 0;
  for (const run of proj.runs) {
    for (const f of run.functions) {
      total++;
      if (f.m2cHasOutput) hasOutput++;
      if (f.m2cDiffCount !== null) diffs.push(f.m2cDiffCount);
    }
  }
  return {
    hasOutputRate: (hasOutput / total) * 100,
    matchRate: (diffs.filter((d) => d === 0).length / Math.max(diffs.length, 1)) * 100,
    diffs,
  };
}

export function PhaseEffectiveness({ data }: { data: AggregatedData }) {
  const sa3Src = matchSourceBreakdown(data.projects.sa3);
  const afSrc = matchSourceBreakdown(data.projects.af);

  // Stacked contribution chart
  const stackedOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: { text: 'Match Source Contribution (avg per run)', textStyle: { color: '#e2e8f0', fontSize: 14 }, left: 10 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0' },
      axisPointer: { type: 'shadow' },
    },
    legend: { data: ['m2c', 'Permuter', 'Claude', 'Unmatched'], textStyle: { color: '#94a3b8' }, top: 0 },
    grid: { left: 80, right: 30, top: 40, bottom: 30 },
    xAxis: { type: 'value', max: 30, axisLabel: { color: '#94a3b8' }, splitLine: { lineStyle: { color: '#334155' } } },
    yAxis: { type: 'category', data: [data.projects.af.name, data.projects.sa3.name], axisLabel: { color: '#cbd5e1' } },
    series: [
      { name: 'm2c', type: 'bar', stack: 'total', data: [afSrc.m2c, sa3Src.m2c], itemStyle: { color: '#22c55e' } },
      { name: 'Permuter', type: 'bar', stack: 'total', data: [afSrc.permuter, sa3Src.permuter], itemStyle: { color: '#a855f7' } },
      { name: 'Claude', type: 'bar', stack: 'total', data: [afSrc.claude, sa3Src.claude], itemStyle: { color: '#06b6d4' } },
      { name: 'Unmatched', type: 'bar', stack: 'total', data: [afSrc.unmatched, sa3Src.unmatched], itemStyle: { color: '#475569' } },
    ],
  };

  const sa3Perm = permuterStats(data.projects.sa3);
  const afPerm = permuterStats(data.projects.af);
  const sa3M2c = m2cQuality(data.projects.sa3);
  const afM2c = m2cQuality(data.projects.af);

  return (
    <div>
      <div className="bg-slate-800/30 rounded-lg p-4 mb-6">
        <ReactEChartsCore echarts={echarts} option={stackedOption} style={{ height: 200 }} />
      </div>

      {/* Phase-by-phase comparison cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* m2c */}
        <div className="bg-slate-800/60 rounded-lg p-4 border-l-4 border-emerald-500">
          <h4 className="text-emerald-400 font-medium mb-3">m2c (Programmatic)</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Matches/run</span>
              <span>
                <span style={{ color: PROJECT_COLORS.sa3 }}>{sa3Src.m2c.toFixed(1)}</span>
                <span className="text-slate-600 mx-1">vs</span>
                <span style={{ color: PROJECT_COLORS.af }}>{afSrc.m2c.toFixed(1)}</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Has output</span>
              <span>
                <span style={{ color: PROJECT_COLORS.sa3 }}>{sa3M2c.hasOutputRate.toFixed(0)}%</span>
                <span className="text-slate-600 mx-1">vs</span>
                <span style={{ color: PROJECT_COLORS.af }}>{afM2c.hasOutputRate.toFixed(0)}%</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Match rate</span>
              <span>
                <span style={{ color: PROJECT_COLORS.sa3 }}>{sa3M2c.matchRate.toFixed(0)}%</span>
                <span className="text-slate-600 mx-1">vs</span>
                <span style={{ color: PROJECT_COLORS.af }}>{afM2c.matchRate.toFixed(0)}%</span>
              </span>
            </div>
          </div>
        </div>

        {/* Permuter */}
        <div className="bg-slate-800/60 rounded-lg p-4 border-l-4 border-purple-500">
          <h4 className="text-purple-400 font-medium mb-3">Permuter (Background)</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Total matches/run</span>
              <span>
                <span style={{ color: PROJECT_COLORS.sa3 }}>{sa3Src.permuter.toFixed(1)}</span>
                <span className="text-slate-600 mx-1">vs</span>
                <span style={{ color: PROJECT_COLORS.af }}>{afSrc.permuter.toFixed(1)}</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tasks/run</span>
              <span>
                <span style={{ color: PROJECT_COLORS.sa3 }}>{sa3Perm.totalTasks.toFixed(0)}</span>
                <span className="text-slate-600 mx-1">vs</span>
                <span style={{ color: PROJECT_COLORS.af }}>{afPerm.totalTasks.toFixed(0)}</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Improved score</span>
              <span>
                <span style={{ color: PROJECT_COLORS.sa3 }}>{sa3Perm.improved.toFixed(0)}</span>
                <span className="text-slate-600 mx-1">vs</span>
                <span style={{ color: PROJECT_COLORS.af }}>{afPerm.improved.toFixed(0)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Claude */}
        <div className="bg-slate-800/60 rounded-lg p-4 border-l-4 border-cyan-500">
          <h4 className="text-cyan-400 font-medium mb-3">Claude (AI Phase)</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">AI matches/run</span>
              <span>
                <span style={{ color: PROJECT_COLORS.sa3 }}>{sa3Src.claude.toFixed(1)}</span>
                <span className="text-slate-600 mx-1">vs</span>
                <span style={{ color: PROJECT_COLORS.af }}>{afSrc.claude.toFixed(1)}</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">AI match rate</span>
              <span>
                <span style={{ color: PROJECT_COLORS.sa3 }}>{((sa3Src.claude / 30) * 100).toFixed(0)}%</span>
                <span className="text-slate-600 mx-1">vs</span>
                <span style={{ color: PROJECT_COLORS.af }}>{((afSrc.claude / 30) * 100).toFixed(0)}%</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
