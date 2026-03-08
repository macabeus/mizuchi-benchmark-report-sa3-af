import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, MarkPointComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import type { ComparisonData } from '../types';
import { RUN_COLORS } from '../types';

echarts.use([LineChart, GridComponent, TooltipComponent, LegendComponent, MarkPointComponent, CanvasRenderer]);

interface Props {
  data: ComparisonData;
  runLabels: string[];
}

export function AttemptTrajectoryCharts({ data, runLabels }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {data.functions.map((func) => (
        <FunctionTrajectory key={func.functionName} func={func} runLabels={runLabels} />
      ))}
    </div>
  );
}

function FunctionTrajectory({
  func,
  runLabels,
}: {
  func: ComparisonData['functions'][0];
  runLabels: string[];
}) {
  const hasAnyFlip = func.runs.some((r) => r.success) && func.runs.some((r) => !r.success);

  const series: any[] = func.runs.map((run, ri) => {
    const lineData: any[] = [];

    // Add m2c point if available
    if (run.m2cDiffCount !== null) {
      lineData.push({ value: ['m2c', run.m2cDiffCount] });
    }

    for (const att of run.attempts) {
      if (att.diffCount !== null) {
        lineData.push({
          value: [`${att.num}`, att.diffCount],
          itemStyle: att.softTimeout
            ? { color: '#ef4444', borderColor: '#ef4444' }
            : att.ttftTimedOut
              ? { color: '#f59e0b', borderColor: '#f59e0b' }
              : att.hardTimeout
                ? { color: '#dc2626', borderColor: '#dc2626', borderWidth: 3 }
                : undefined,
          symbol: att.softTimeout || att.ttftTimedOut || att.hardTimeout ? 'diamond' : 'circle',
          symbolSize: att.softTimeout || att.ttftTimedOut || att.hardTimeout ? 8 : 4,
        });
      }
    }

    return {
      name: runLabels[ri],
      type: 'line',
      data: lineData,
      lineStyle: { color: RUN_COLORS[ri], width: 2 },
      itemStyle: { color: RUN_COLORS[ri] },
      symbolSize: 4,
    };
  });

  const option: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 11 },
    },
    legend: {
      show: false,
    },
    grid: {
      left: 40,
      right: 10,
      top: 10,
      bottom: 25,
    },
    xAxis: {
      type: 'category',
      axisLabel: { color: '#94a3b8', fontSize: 10 },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      min: 0,
      axisLabel: { color: '#94a3b8', fontSize: 10 },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    series,
  };

  return (
    <div className={`bg-slate-800/30 rounded-lg p-3 ${hasAnyFlip ? 'ring-1 ring-amber-500/30' : ''}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-slate-200 text-xs font-mono">{func.functionName}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${
          func.tier === 'easy' ? 'bg-green-500/20 text-green-400' :
          func.tier === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }`}>{func.tier}</span>
        {func.runs.map((r, i) => (
          <span
            key={i}
            className={`text-xs px-1 rounded ${r.success ? 'text-emerald-400' : 'text-red-400'}`}
            style={{ color: RUN_COLORS[i], opacity: r.success ? 1 : 0.5 }}
          >
            {r.success ? 'M' : 'F'}
          </span>
        ))}
      </div>
      <ReactEChartsCore echarts={echarts} option={option} style={{ height: 180 }} />
    </div>
  );
}
