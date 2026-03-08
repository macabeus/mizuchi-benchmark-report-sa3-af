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

const PHASE_COLORS = {
  claude: '#06b6d4',
  compiler: '#10b981',
  objdiff: '#f59e0b',
  m2c: '#8b5cf6',
};

export function PipelinePhaseBreakdown({ data, runLabels }: Props) {
  // Per run, show stacked bar chart of phase durations per function
  const charts = runLabels.map((label, ri) => {
    const funcs = data.functions.map((f) => ({
      name: f.functionName,
      claude: f.runs[ri]?.phaseDurations.claude || 0,
      compiler: f.runs[ri]?.phaseDurations.compiler || 0,
      objdiff: f.runs[ri]?.phaseDurations.objdiff || 0,
      m2c: f.runs[ri]?.m2cDurationMs || 0,
    }));

    // Sort by total time
    funcs.sort((a, b) => (b.claude + b.compiler + b.objdiff + b.m2c) - (a.claude + a.compiler + a.objdiff + a.m2c));

    const option: echarts.EChartsCoreOption = {
      backgroundColor: 'transparent',
      title: { text: label, textStyle: { color: RUN_COLORS[ri], fontSize: 14 }, left: 10 },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#1e293b',
        borderColor: '#334155',
        textStyle: { color: '#e2e8f0', fontSize: 11 },
        formatter: (params: any) => {
          const lines = [`<b>${params[0].name}</b>`];
          let total = 0;
          for (const p of params) {
            lines.push(`${p.seriesName}: ${formatDuration(p.value)}`);
            total += p.value;
          }
          lines.push(`<b>Total: ${formatDuration(total)}</b>`);
          return lines.join('<br/>');
        },
      },
      legend: {
        data: ['Claude Runner', 'Compiler', 'Objdiff', 'm2c'],
        textStyle: { color: '#94a3b8' },
        top: 0,
      },
      grid: { left: 120, right: 30, top: 40, bottom: 20 },
      xAxis: {
        type: 'value',
        axisLabel: { color: '#94a3b8', formatter: (v: number) => formatDuration(v) },
        splitLine: { lineStyle: { color: '#334155' } },
      },
      yAxis: {
        type: 'category',
        data: funcs.map((f) => f.name),
        axisLabel: { color: '#cbd5e1', fontSize: 10 },
        inverse: true,
      },
      series: [
        { name: 'Claude Runner', type: 'bar', stack: 'total', data: funcs.map((f) => f.claude), itemStyle: { color: PHASE_COLORS.claude } },
        { name: 'Compiler', type: 'bar', stack: 'total', data: funcs.map((f) => f.compiler), itemStyle: { color: PHASE_COLORS.compiler } },
        { name: 'Objdiff', type: 'bar', stack: 'total', data: funcs.map((f) => f.objdiff), itemStyle: { color: PHASE_COLORS.objdiff } },
        { name: 'm2c', type: 'bar', stack: 'total', data: funcs.map((f) => f.m2c), itemStyle: { color: PHASE_COLORS.m2c } },
      ],
    };

    return (
      <div key={ri} className="bg-slate-800/30 rounded-lg p-4 mb-4">
        <ReactEChartsCore echarts={echarts} option={option} style={{ height: 800 }} />
      </div>
    );
  });

  // Claude % of total
  const claudePercentages = runLabels.map((_, i) => {
    let totalClaude = 0;
    let totalAll = 0;
    for (const func of data.functions) {
      const run = func.runs[i];
      if (!run) continue;
      totalClaude += run.phaseDurations.claude;
      totalAll += run.phaseDurations.claude + run.phaseDurations.compiler + run.phaseDurations.objdiff + run.m2cDurationMs;
    }
    return ((totalClaude / totalAll) * 100).toFixed(1);
  });

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {runLabels.map((label, i) => (
          <div key={i} className="bg-slate-800/60 rounded-lg p-4 text-center">
            <div className="text-slate-400 text-sm">{label}</div>
            <div className="text-2xl font-bold text-white">{claudePercentages[i]}%</div>
            <div className="text-slate-500 text-xs">of time spent in Claude Runner</div>
          </div>
        ))}
      </div>
      {charts}
    </div>
  );
}
