import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart, ScatterChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { formatDuration } from '../App';
import type { ComparisonData, AttemptData } from '../types';
import { RUN_COLORS } from '../types';

echarts.use([LineChart, ScatterChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

interface Props {
  data: ComparisonData;
  runLabels: string[];
}

export function TokensPerSecond({ data, runLabels }: Props) {
  // Overall tokens/sec per run
  const runStats = runLabels.map((_, i) => {
    let totalOutputTokens = 0;
    let totalAiDurationMs = 0;
    for (const func of data.functions) {
      const run = func.runs[i];
      if (!run) continue;
      totalOutputTokens += run.totalOutputTokens;
      totalAiDurationMs += run.aiDurationMs;
    }
    return {
      tokensPerSec: totalOutputTokens / (totalAiDurationMs / 1000),
      totalOutputTokens,
      totalAiDurationMs,
    };
  });

  // Tokens/sec over time within each run (scatter plot)
  // Collect all attempts with timestamps and compute tokens/sec
  const scatterSeries = runLabels.map((label, ri) => {
    const points: [number, number][] = [];
    // Get earliest timestamp for this run
    let minTs = Infinity;
    for (const func of data.functions) {
      const run = func.runs[ri];
      if (!run) continue;
      for (const att of run.attempts) {
        const ts = new Date(att.startTimestamp).getTime();
        if (ts < minTs) minTs = ts;
      }
    }

    for (const func of data.functions) {
      const run = func.runs[ri];
      if (!run) continue;
      for (const att of run.attempts) {
        if (att.outputTokens > 0 && att.durationMs > 0) {
          const elapsed = (new Date(att.startTimestamp).getTime() - minTs) / 1000 / 60; // minutes
          const tps = att.outputTokens / (att.durationMs / 1000);
          points.push([elapsed, tps]);
        }
      }
    }

    return {
      name: label,
      type: 'scatter' as const,
      data: points,
      itemStyle: { color: RUN_COLORS[ri], opacity: 0.6 },
      symbolSize: 5,
    };
  });

  const scatterOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'Output Tokens/Second per Attempt Over Time',
      textStyle: { color: '#e2e8f0', fontSize: 14 },
      left: 10,
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 11 },
      formatter: (params: any) => {
        return `${params.seriesName}<br/>Elapsed: ${params.value[0].toFixed(0)}min<br/>Tokens/sec: ${params.value[1].toFixed(1)}`;
      },
    },
    legend: { data: runLabels, textStyle: { color: '#94a3b8' }, top: 0 },
    grid: { left: 60, right: 30, top: 50, bottom: 40 },
    xAxis: {
      type: 'value',
      name: 'Elapsed (minutes)',
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    yAxis: {
      type: 'value',
      name: 'Tokens/sec',
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    series: scatterSeries,
  };

  // Per-function tokens/sec bar chart
  const funcTps = data.functions.map((func) => ({
    name: func.functionName,
    values: func.runs.map((run) => {
      if (run.totalOutputTokens === 0 || run.aiDurationMs === 0) return 0;
      return run.totalOutputTokens / (run.aiDurationMs / 1000);
    }),
  }));

  funcTps.sort((a, b) => {
    const maxA = Math.max(...a.values);
    const maxB = Math.max(...b.values);
    return maxB - maxA;
  });

  return (
    <div>
      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {runLabels.map((label, i) => (
          <div key={i} className="bg-slate-800/60 rounded-lg p-5 text-center">
            <div className="text-slate-400 text-sm mb-1">{label}</div>
            <div className="text-3xl font-bold" style={{ color: RUN_COLORS[i] }}>
              {runStats[i].tokensPerSec.toFixed(1)}
            </div>
            <div className="text-slate-500 text-xs mt-1">output tokens/sec (aggregate)</div>
            {i > 0 && (
              <div className="text-slate-500 text-xs mt-1">
                {((runStats[i].tokensPerSec / runStats[0].tokensPerSec - 1) * 100).toFixed(0)}% vs Run 1
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4">
        <ReactEChartsCore echarts={echarts} option={scatterOption} style={{ height: 400 }} />
      </div>
    </div>
  );
}
