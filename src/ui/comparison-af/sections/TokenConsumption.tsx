import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { formatDuration, formatNumber } from '../App';
import type { ComparisonData } from '../types';
import { RUN_COLORS } from '../types';

echarts.use([BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

interface Props {
  data: ComparisonData;
  runLabels: string[];
}

export function TokenConsumption({ data, runLabels }: Props) {
  // Per-function output tokens bar chart
  const sorted = [...data.functions].sort((a, b) => {
    const maxA = Math.max(...a.runs.map((r) => r.totalOutputTokens));
    const maxB = Math.max(...b.runs.map((r) => r.totalOutputTokens));
    return maxB - maxA;
  });

  const outputTokensOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: { text: 'Output Tokens per Function', textStyle: { color: '#e2e8f0', fontSize: 14 }, left: 10 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
      formatter: (params: any) => {
        const lines = [`<b>${params[0].name}</b>`];
        for (const p of params) {
          lines.push(`<span style="color:${p.color}">${p.seriesName}</span>: ${formatNumber(p.value)}`);
        }
        return lines.join('<br/>');
      },
    },
    legend: { data: runLabels, textStyle: { color: '#94a3b8' }, top: 0 },
    grid: { left: 120, right: 30, top: 40, bottom: 30 },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#94a3b8', formatter: (v: number) => formatNumber(v) },
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
      data: sorted.map((f) => f.runs[i]?.totalOutputTokens || 0),
      itemStyle: { color: RUN_COLORS[i] },
    })),
  };

  // Tokens per attempt over time (cumulative tokens as conversation lengthens)
  const tokensPerAttemptOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: { text: 'Input Tokens per Attempt (grows as conversation lengthens)', textStyle: { color: '#e2e8f0', fontSize: 14 }, left: 10 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 11 },
    },
    legend: { data: runLabels, textStyle: { color: '#94a3b8' }, top: 0 },
    grid: { left: 80, right: 30, top: 40, bottom: 40 },
    xAxis: {
      type: 'category',
      name: 'Attempt #',
      axisLabel: { color: '#94a3b8' },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#94a3b8', formatter: (v: number) => formatNumber(v) },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    series: runLabels.map((label, i) => {
      // Average input tokens by attempt number
      const byAttempt: Record<number, number[]> = {};
      for (const func of data.functions) {
        const run = func.runs[i];
        if (!run) continue;
        for (const att of run.attempts) {
          if (!byAttempt[att.num]) byAttempt[att.num] = [];
          byAttempt[att.num].push(att.inputTokens);
        }
      }
      const attemptNums = Object.keys(byAttempt).map(Number).sort((a, b) => a - b);
      return {
        name: label,
        type: 'line' as const,
        data: attemptNums.map((n) => {
          const vals = byAttempt[n];
          return [String(n), vals.reduce((s, v) => s + v, 0) / vals.length];
        }),
        lineStyle: { color: RUN_COLORS[i] },
        itemStyle: { color: RUN_COLORS[i] },
        symbolSize: 6,
      };
    }),
  };

  // Aggregate tokens summary
  const totals = runLabels.map((_, i) => ({
    inputTokens: data.functions.reduce((s, f) => s + (f.runs[i]?.totalInputTokens || 0), 0),
    outputTokens: data.functions.reduce((s, f) => s + (f.runs[i]?.totalOutputTokens || 0), 0),
    costUsd: data.functions.reduce((s, f) => s + (f.runs[i]?.totalCostUsd || 0), 0),
    successfulMatches: data.functions.filter((f) => f.runs[i]?.success).length,
    totalAttempts: data.functions.reduce((s, f) => s + (f.runs[i]?.numAttempts || 0), 0),
  }));

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {runLabels.map((label, i) => (
          <div key={i} className="bg-slate-800/60 rounded-lg p-4">
            <div className="text-slate-400 text-sm mb-2" style={{ color: RUN_COLORS[i] }}>{label}</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-slate-500">Input Tokens</div>
                <div className="text-white font-medium">{formatNumber(totals[i].inputTokens)}</div>
              </div>
              <div>
                <div className="text-slate-500">Output Tokens</div>
                <div className="text-white font-medium">{formatNumber(totals[i].outputTokens)}</div>
              </div>
              <div>
                <div className="text-slate-500">Total Cost</div>
                <div className="text-white font-medium">${totals[i].costUsd.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-slate-500">Cost/Match</div>
                <div className="text-white font-medium">
                  ${totals[i].successfulMatches > 0 ? (totals[i].costUsd / totals[i].successfulMatches).toFixed(2) : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-slate-500">Cost/Attempt</div>
                <div className="text-white font-medium">${(totals[i].costUsd / totals[i].totalAttempts).toFixed(2)}</div>
              </div>
              <div>
                <div className="text-slate-500">I/O Ratio</div>
                <div className="text-white font-medium">{(totals[i].inputTokens / totals[i].outputTokens).toFixed(0)}:1</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4 mb-4">
        <ReactEChartsCore echarts={echarts} option={outputTokensOption} style={{ height: 900 }} />
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4">
        <ReactEChartsCore echarts={echarts} option={tokensPerAttemptOption} style={{ height: 400 }} />
      </div>
    </div>
  );
}
