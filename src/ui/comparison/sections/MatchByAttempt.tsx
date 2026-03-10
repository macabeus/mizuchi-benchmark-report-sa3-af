import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, MarkLineComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import type { ComparisonData } from '../types';
import { RUN_COLORS } from '../types';

echarts.use([LineChart, GridComponent, TooltipComponent, LegendComponent, MarkLineComponent, CanvasRenderer]);

export function MatchByAttempt({ data, runLabels }: { data: ComparisonData; runLabels: string[] }) {
  const maxAttempts = 12;

  // For each run, compute cumulative match % by attempt number
  const seriesData = data.runs.map((_, runIdx) => {
    // Count functions that required AI (exclude programmatic-phase)
    const aiFunctions = data.functions.filter(
      (f) => f.runs[runIdx].matchSource !== 'programmatic-phase' && f.runs[runIdx].numAttempts > 0,
    );
    const totalAi = aiFunctions.length;

    const cumulative: number[] = [];
    let matched = 0;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      // Count functions that matched on exactly this attempt number
      const matchedThisAttempt = aiFunctions.filter(
        (f) => f.runs[runIdx].success && f.runs[runIdx].numAttempts === attempt,
      ).length;
      matched += matchedThisAttempt;
      cumulative.push(totalAi > 0 ? (matched / totalAi) * 100 : 0);
    }

    return cumulative;
  });

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
          (p) =>
            `<span style="color:${RUN_COLORS[data.runs.findIndex((r) => r.label === p.seriesName)]}">${p.seriesName}</span>: ${p.value.toFixed(1)}%`,
        );
        return `Attempt ${attempt}<br/>${lines.join('<br/>')}`;
      },
    },
    legend: {
      data: runLabels,
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
      name: '% Matched',
      axisLabel: { color: '#94a3b8', formatter: '{value}%' },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    series: seriesData.map((cumData, i) => ({
      name: runLabels[i],
      type: 'line',
      data: cumData.map((v) => +v.toFixed(1)),
      smooth: false,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { color: RUN_COLORS[i], width: 2 },
      itemStyle: { color: RUN_COLORS[i] },
    })),
  };

  // Also compute a summary table
  const milestones = [1, 2, 3, 5, 12];

  return (
    <div>
      <div className="bg-slate-800/30 rounded-lg p-4 mb-6">
        <ReactEChartsCore echarts={echarts} option={option} style={{ height: 350 }} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/40 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Cumulative Match Rate by Attempt</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 px-3 text-slate-400">By Attempt</th>
                {runLabels.map((label, i) => (
                  <th key={i} className="text-center py-2 px-3" style={{ color: RUN_COLORS[i] }}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {milestones.map((m) => (
                <tr key={m} className="border-b border-slate-800/50">
                  <td className="py-2 px-3 text-slate-300">{m === 1 ? '1st attempt' : `By attempt ${m}`}</td>
                  {seriesData.map((cumData, i) => (
                    <td key={i} className="py-2 px-3 text-center text-slate-200">
                      {cumData[m - 1].toFixed(1)}%
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-800/40 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Key Insight</h4>
          <p className="text-slate-400 text-sm mb-3">
            The chart shows the cumulative percentage of AI-solvable functions matched by each attempt number.
            Programmatic-phase matches (m2c/permuter with 0 AI attempts) are excluded.
          </p>
          <p className="text-slate-400 text-sm">
            A steep initial rise followed by a plateau indicates that most value comes from the first few attempts.
            Functions that haven&apos;t matched by attempt 3-5 rarely match at all, suggesting diminishing returns
            from additional retries.
          </p>
        </div>
      </div>
    </div>
  );
}
