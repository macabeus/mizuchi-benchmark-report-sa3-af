import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { formatDuration } from '../App';
import type { ComparisonData } from '../types';
import { RUN_COLORS } from '../types';

echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

interface Props {
  data: ComparisonData;
  runLabels: string[];
}

export function DurationComparison({ data, runLabels }: Props) {
  // Sort functions by max duration across runs
  const sorted = [...data.functions].sort((a, b) => {
    const maxA = Math.max(...a.runs.map((r) => r.totalDurationMs));
    const maxB = Math.max(...b.runs.map((r) => r.totalDurationMs));
    return maxB - maxA;
  });

  const option: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
      formatter: (params: any) => {
        const lines = [`<b>${params[0].name}</b>`];
        for (const p of params) {
          lines.push(
            `<span style="color:${p.color}">${p.seriesName}</span>: ${formatDuration(p.value)}`,
          );
        }
        return lines.join('<br/>');
      },
    },
    legend: {
      data: runLabels,
      textStyle: { color: '#94a3b8' },
      top: 0,
    },
    grid: {
      left: 120,
      right: 30,
      top: 40,
      bottom: 30,
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: '#94a3b8',
        formatter: (v: number) => formatDuration(v),
      },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    yAxis: {
      type: 'category',
      data: sorted.map((f) => f.functionName),
      axisLabel: { color: '#cbd5e1', fontSize: 10 },
      inverse: true,
    },
    series: runLabels.map((label, i) => ({
      name: label,
      type: 'bar' as const,
      data: sorted.map((f) => f.runs[i]?.totalDurationMs || 0),
      itemStyle: { color: RUN_COLORS[i] },
      barGap: '10%',
    })),
  };

  // Total duration comparison
  const totalDurations = runLabels.map((_, i) =>
    data.functions.reduce((sum, f) => sum + (f.runs[i]?.totalDurationMs || 0), 0),
  );

  return (
    <div>
      {/* Total duration cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {runLabels.map((label, i) => (
          <div key={i} className="bg-slate-800/60 rounded-lg p-4 text-center">
            <div className="text-slate-400 text-sm mb-1">{label}</div>
            <div className="text-2xl font-bold" style={{ color: RUN_COLORS[i] }}>
              {formatDuration(totalDurations[i])}
            </div>
            {i > 0 && (
              <div className="text-slate-500 text-xs mt-1">
                {((totalDurations[i] / totalDurations[0] - 1) * 100).toFixed(0)}% vs Run 1
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4">
        <ReactEChartsCore echarts={echarts} option={option} style={{ height: 900 }} />
      </div>
    </div>
  );
}
