import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import type { AggregatedData, ProjectData } from '../types';
import { PROJECT_COLORS, TIERS } from '../types';

echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

function timeoutStats(proj: ProjectData) {
  let soft = 0, hard = 0, ttft = 0, compile = 0, totalAttempts = 0;
  for (const run of proj.runs) {
    for (const f of run.functions) {
      soft += f.softTimeouts;
      hard += f.hardTimeouts;
      ttft += f.ttftTimeouts;
      compile += f.compileFailures;
      totalAttempts += f.numAttempts;
    }
  }
  const n = proj.runs.length;
  return {
    soft: soft / n,
    hard: hard / n,
    ttft: ttft / n,
    compile: compile / n,
    totalAttempts: totalAttempts / n,
    softRate: (soft / totalAttempts) * 100,
    hardRate: (hard / totalAttempts) * 100,
    ttftRate: (ttft / totalAttempts) * 100,
  };
}

function timeoutByTier(proj: ProjectData) {
  return TIERS.map((tier) => {
    let soft = 0, hard = 0, ttft = 0, attempts = 0;
    for (const run of proj.runs) {
      for (const f of run.functions.filter((f) => f.tier === tier)) {
        soft += f.softTimeouts;
        hard += f.hardTimeouts;
        ttft += f.ttftTimeouts;
        attempts += f.numAttempts;
      }
    }
    return { tier, soft, hard, ttft, attempts, rate: attempts > 0 ? ((soft + hard + ttft) / attempts) * 100 : 0 };
  });
}

export function TimeoutPatterns({ data }: { data: AggregatedData }) {
  const sa3 = timeoutStats(data.projects.sa3);
  const af = timeoutStats(data.projects.af);
  const sa3ByTier = timeoutByTier(data.projects.sa3);
  const afByTier = timeoutByTier(data.projects.af);

  const barOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: { text: 'Avg Timeouts per Run by Type', textStyle: { color: '#e2e8f0', fontSize: 14 }, left: 10 },
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
      data: ['Soft Timeout', 'Hard Timeout', 'TTFT Timeout', 'Compile Failure'],
      axisLabel: { color: '#cbd5e1', fontSize: 11 },
    },
    yAxis: { type: 'value', axisLabel: { color: '#94a3b8' }, splitLine: { lineStyle: { color: '#334155' } } },
    series: [
      {
        name: data.projects.sa3.name,
        type: 'bar',
        data: [sa3.soft, sa3.hard, sa3.ttft, sa3.compile],
        itemStyle: { color: PROJECT_COLORS.sa3 },
      },
      {
        name: data.projects.af.name,
        type: 'bar',
        data: [af.soft, af.hard, af.ttft, af.compile],
        itemStyle: { color: PROJECT_COLORS.af },
      },
    ],
  };

  // Timeout rate by tier
  const tierOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: { text: 'Timeout Rate by Tier (% of attempts)', textStyle: { color: '#e2e8f0', fontSize: 14 }, left: 10 },
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
    yAxis: { type: 'value', name: '%', axisLabel: { color: '#94a3b8' }, splitLine: { lineStyle: { color: '#334155' } } },
    series: [
      {
        name: data.projects.sa3.name,
        type: 'bar',
        data: sa3ByTier.map((t) => +t.rate.toFixed(1)),
        itemStyle: { color: PROJECT_COLORS.sa3 },
        label: { show: true, position: 'top', formatter: '{c}%', color: PROJECT_COLORS.sa3, fontSize: 10 },
      },
      {
        name: data.projects.af.name,
        type: 'bar',
        data: afByTier.map((t) => +t.rate.toFixed(1)),
        itemStyle: { color: PROJECT_COLORS.af },
        label: { show: true, position: 'top', formatter: '{c}%', color: PROJECT_COLORS.af, fontSize: 10 },
      },
    ],
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/30 rounded-lg p-4">
          <ReactEChartsCore echarts={echarts} option={barOption} style={{ height: 300 }} />
        </div>
        <div className="bg-slate-800/30 rounded-lg p-4">
          <ReactEChartsCore echarts={echarts} option={tierOption} style={{ height: 300 }} />
        </div>
      </div>

      {/* Rate summary */}
      <div className="bg-slate-800/40 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">Timeout Rate per Attempt</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 px-3 text-slate-400">Metric</th>
              <th className="text-center py-2 px-3" style={{ color: PROJECT_COLORS.sa3 }}>{data.projects.sa3.name}</th>
              <th className="text-center py-2 px-3" style={{ color: PROJECT_COLORS.af }}>{data.projects.af.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800/50">
              <td className="py-2 px-3 text-slate-300">Soft timeout rate</td>
              <td className="py-2 px-3 text-center text-slate-300">{sa3.softRate.toFixed(1)}%</td>
              <td className="py-2 px-3 text-center text-slate-300">{af.softRate.toFixed(1)}%</td>
            </tr>
            <tr className="border-b border-slate-800/50">
              <td className="py-2 px-3 text-slate-300">Hard timeout rate</td>
              <td className="py-2 px-3 text-center text-slate-300">{sa3.hardRate.toFixed(1)}%</td>
              <td className="py-2 px-3 text-center text-slate-300">{af.hardRate.toFixed(1)}%</td>
            </tr>
            <tr className="border-b border-slate-800/50">
              <td className="py-2 px-3 text-slate-300">TTFT timeout rate</td>
              <td className="py-2 px-3 text-center text-slate-300">{sa3.ttftRate.toFixed(1)}%</td>
              <td className="py-2 px-3 text-center text-slate-300">{af.ttftRate.toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
