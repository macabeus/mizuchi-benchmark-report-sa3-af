import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import type { AggregatedData, ProjectData } from '../types';
import { PROJECT_COLORS, TIER_COLORS, TIERS } from '../types';

echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

function avgMatchRate(proj: ProjectData) {
  return proj.runs.reduce((s, r) => s + r.summary.successRate, 0) / proj.runs.length;
}

function tierMatchRate(proj: ProjectData, tier: string) {
  const rates = proj.runs.map((r) => {
    const funcs = r.functions.filter((f) => f.tier === tier);
    return (funcs.filter((f) => f.success).length / funcs.length) * 100;
  });
  return { avg: rates.reduce((a, b) => a + b, 0) / rates.length, min: Math.min(...rates), max: Math.max(...rates) };
}

export function SuccessRateComparison({ data }: { data: AggregatedData }) {
  const sa3 = data.projects.sa3;
  const af = data.projects.af;

  // Overall bar chart with error bars
  const overallOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: { text: 'Overall Match Rate', textStyle: { color: '#e2e8f0', fontSize: 14 }, left: 10 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0' },
    },
    grid: { left: 80, right: 30, top: 40, bottom: 30 },
    xAxis: { type: 'category', data: [sa3.name, af.name], axisLabel: { color: '#cbd5e1' } },
    yAxis: { type: 'value', max: 100, name: '%', axisLabel: { color: '#94a3b8' }, splitLine: { lineStyle: { color: '#334155' } } },
    series: [
      {
        type: 'bar',
        data: [
          { value: +avgMatchRate(sa3).toFixed(1), itemStyle: { color: PROJECT_COLORS.sa3 } },
          { value: +avgMatchRate(af).toFixed(1), itemStyle: { color: PROJECT_COLORS.af } },
        ],
        barWidth: '40%',
        label: { show: true, position: 'top', formatter: '{c}%', color: '#e2e8f0', fontSize: 14, fontWeight: 'bold' },
      },
      // Min/max as scatter overlay
      {
        type: 'bar',
        data: [
          {
            value: 0,
            label: {
              show: true,
              position: 'insideTop',
              formatter: () => {
                const rates = sa3.runs.map((r) => r.summary.successRate);
                return `${Math.min(...rates).toFixed(0)}–${Math.max(...rates).toFixed(0)}%`;
              },
              color: '#94a3b8',
              fontSize: 11,
            },
          },
          {
            value: 0,
            label: {
              show: true,
              position: 'insideTop',
              formatter: () => {
                const rates = af.runs.map((r) => r.summary.successRate);
                return `${Math.min(...rates).toFixed(0)}–${Math.max(...rates).toFixed(0)}%`;
              },
              color: '#94a3b8',
              fontSize: 11,
            },
          },
        ],
        barGap: '-100%',
        barWidth: '40%',
        itemStyle: { color: 'transparent' },
      },
    ],
  };

  // Per-tier comparison
  const tierOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: { text: 'Match Rate by Difficulty Tier', textStyle: { color: '#e2e8f0', fontSize: 14 }, left: 10 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0' },
    },
    legend: { data: [sa3.name, af.name], textStyle: { color: '#94a3b8' }, top: 0 },
    grid: { left: 60, right: 30, top: 40, bottom: 30 },
    xAxis: {
      type: 'category',
      data: TIERS.map((t) => t.charAt(0).toUpperCase() + t.slice(1)),
      axisLabel: { color: '#cbd5e1', fontSize: 13 },
    },
    yAxis: { type: 'value', max: 100, name: '%', axisLabel: { color: '#94a3b8' }, splitLine: { lineStyle: { color: '#334155' } } },
    series: [
      {
        name: sa3.name,
        type: 'bar',
        data: TIERS.map((t) => +tierMatchRate(sa3, t).avg.toFixed(1)),
        itemStyle: { color: PROJECT_COLORS.sa3 },
        label: { show: true, position: 'top', formatter: '{c}%', color: PROJECT_COLORS.sa3, fontSize: 11 },
      },
      {
        name: af.name,
        type: 'bar',
        data: TIERS.map((t) => +tierMatchRate(af, t).avg.toFixed(1)),
        itemStyle: { color: PROJECT_COLORS.af },
        label: { show: true, position: 'top', formatter: '{c}%', color: PROJECT_COLORS.af, fontSize: 11 },
      },
    ],
  };

  // Per-run rates table
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/30 rounded-lg p-4">
          <ReactEChartsCore echarts={echarts} option={overallOption} style={{ height: 300 }} />
        </div>
        <div className="bg-slate-800/30 rounded-lg p-4">
          <ReactEChartsCore echarts={echarts} option={tierOption} style={{ height: 300 }} />
        </div>
      </div>

      {/* Per-run table */}
      <div className="bg-slate-800/40 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">Per-Run Match Rates</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 px-3 text-slate-400">Run</th>
              <th className="text-center py-2 px-3 text-slate-400">Overall</th>
              {TIERS.map((t) => (
                <th key={t} className="text-center py-2 px-3" style={{ color: TIER_COLORS[t] }}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {([['sa3', sa3], ['af', af]] as const).flatMap(([key, proj]) =>
              proj.runs.map((run, i) => (
                <tr key={`${key}-${i}`} className="border-b border-slate-800/50">
                  <td className="py-2 px-3 text-slate-300">
                    <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: PROJECT_COLORS[key] }} />
                    {run.label}
                  </td>
                  <td className="py-2 px-3 text-center text-white font-medium">{run.summary.successRate.toFixed(1)}%</td>
                  {TIERS.map((t) => {
                    const funcs = run.functions.filter((f) => f.tier === t);
                    const rate = (funcs.filter((f) => f.success).length / funcs.length) * 100;
                    return (
                      <td key={t} className="py-2 px-3 text-center text-slate-300">
                        {rate.toFixed(0)}%
                      </td>
                    );
                  })}
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
