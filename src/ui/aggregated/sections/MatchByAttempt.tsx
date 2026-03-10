import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import type { AggregatedData, ProjectData } from '../types';
import { PROJECT_COLORS } from '../types';

echarts.use([LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

function getCumulativeMatchRate(proj: ProjectData): number[] {
  const maxAttempts = 12;
  // Average across runs
  const perRun = proj.runs.map((run) => {
    const aiFuncs = run.functions.filter((f) => f.matchSource !== 'programmatic-phase' && f.numAttempts > 0);
    const total = aiFuncs.length;
    const cumulative: number[] = [];
    let matched = 0;
    for (let a = 1; a <= maxAttempts; a++) {
      matched += aiFuncs.filter((f) => f.success && f.numAttempts === a).length;
      cumulative.push(total > 0 ? (matched / total) * 100 : 0);
    }
    return cumulative;
  });

  // Average across runs
  return Array.from({ length: maxAttempts }, (_, i) =>
    perRun.reduce((s, r) => s + r[i], 0) / perRun.length,
  );
}

export function MatchByAttempt({ data }: { data: AggregatedData }) {
  const sa3Cumulative = getCumulativeMatchRate(data.projects.sa3);
  const afCumulative = getCumulativeMatchRate(data.projects.af);
  const maxAttempts = 12;

  const option: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0' },
      formatter: (params: Array<{ seriesName: string; value: number; dataIndex: number }>) => {
        const attempt = params[0].dataIndex + 1;
        const lines = params.map(
          (p) => `<span style="color:${p.seriesName === data.projects.sa3.name ? PROJECT_COLORS.sa3 : PROJECT_COLORS.af}">${p.seriesName}</span>: ${p.value.toFixed(1)}%`,
        );
        return `Attempt ${attempt}<br/>${lines.join('<br/>')}`;
      },
    },
    legend: {
      data: [data.projects.sa3.name, data.projects.af.name],
      textStyle: { color: '#94a3b8' },
      top: 0,
    },
    grid: { left: 60, right: 30, top: 40, bottom: 40 },
    xAxis: {
      type: 'category',
      data: Array.from({ length: maxAttempts }, (_, i) => String(i + 1)),
      name: 'Attempt',
      nameLocation: 'middle',
      nameGap: 25,
      nameTextStyle: { color: '#94a3b8' },
      axisLabel: { color: '#cbd5e1' },
    },
    yAxis: {
      type: 'value',
      max: 100,
      name: '% Matched (avg across runs)',
      axisLabel: { color: '#94a3b8', formatter: '{value}%' },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    series: [
      {
        name: data.projects.sa3.name,
        type: 'line',
        data: sa3Cumulative.map((v) => +v.toFixed(1)),
        smooth: false,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: PROJECT_COLORS.sa3, width: 2 },
        itemStyle: { color: PROJECT_COLORS.sa3 },
      },
      {
        name: data.projects.af.name,
        type: 'line',
        data: afCumulative.map((v) => +v.toFixed(1)),
        smooth: false,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: PROJECT_COLORS.af, width: 2 },
        itemStyle: { color: PROJECT_COLORS.af },
      },
    ],
  };

  const milestones = [1, 2, 3, 5, 12];

  return (
    <div>
      <div className="bg-slate-800/30 rounded-lg p-4 mb-6">
        <ReactEChartsCore echarts={echarts} option={option} style={{ height: 350 }} />
      </div>

      <div className="bg-slate-800/40 rounded-lg p-4 mb-6">
        <h4 className="text-white font-medium mb-3">Cumulative Match Rate (averaged across runs)</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 px-3 text-slate-400">By Attempt</th>
              <th className="text-center py-2 px-3" style={{ color: PROJECT_COLORS.sa3 }}>
                {data.projects.sa3.name}
              </th>
              <th className="text-center py-2 px-3" style={{ color: PROJECT_COLORS.af }}>
                {data.projects.af.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((m) => (
              <tr key={m} className="border-b border-slate-800/50">
                <td className="py-2 px-3 text-slate-300">{m === 1 ? '1st attempt' : `By attempt ${m}`}</td>
                <td className="py-2 px-3 text-center text-slate-200">{sa3Cumulative[m - 1].toFixed(1)}%</td>
                <td className="py-2 px-3 text-center text-slate-200">{afCumulative[m - 1].toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
        <p className="text-slate-400 text-xs">
          <span className="text-slate-300 font-medium">Note:</span> Programmatic-phase matches (m2c/permuter with 0 AI
          attempts) are excluded. The percentages represent the share of AI-solvable functions matched cumulatively by
          each attempt number. Values are averaged across all 3 runs per platform.
        </p>
      </div>
    </div>
  );
}
