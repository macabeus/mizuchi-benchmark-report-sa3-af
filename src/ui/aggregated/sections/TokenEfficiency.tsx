import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import type { AggregatedData, ProjectData } from '../types';
import { PROJECT_COLORS } from '../types';

echarts.use([BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

function tokensPerSec(proj: ProjectData) {
  return proj.runs.map((run) => {
    const totalOutput = run.functions.reduce((s, f) => s + f.totalOutputTokens, 0);
    const totalAiMs = run.functions.reduce((s, f) => s + f.aiDurationMs, 0);
    return totalAiMs > 0 ? totalOutput / (totalAiMs / 1000) : 0;
  });
}

function avgTokensPerAttempt(proj: ProjectData) {
  // For each attempt number (1-12), average input+output tokens
  const byAttempt: Record<number, { input: number[]; output: number[] }> = {};
  for (const run of proj.runs) {
    for (const f of run.functions) {
      for (const att of f.attempts) {
        if (!byAttempt[att.num]) byAttempt[att.num] = { input: [], output: [] };
        byAttempt[att.num].input.push(att.inputTokens);
        byAttempt[att.num].output.push(att.outputTokens);
      }
    }
  }
  return Object.entries(byAttempt)
    .sort(([a], [b]) => +a - +b)
    .map(([num, data]) => ({
      num: +num,
      avgInput: data.input.reduce((a, b) => a + b, 0) / data.input.length,
      avgOutput: data.output.reduce((a, b) => a + b, 0) / data.output.length,
      count: data.input.length,
    }));
}

export function TokenEfficiency({ data }: { data: AggregatedData }) {
  const sa3Tps = tokensPerSec(data.projects.sa3);
  const afTps = tokensPerSec(data.projects.af);
  const sa3ByAtt = avgTokensPerAttempt(data.projects.sa3);
  const afByAtt = avgTokensPerAttempt(data.projects.af);

  // Tokens/sec per run
  const tpsOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: { text: 'Output Tokens/Second per Run', textStyle: { color: '#e2e8f0', fontSize: 14 }, left: 10 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0' },
    },
    legend: { data: [data.projects.sa3.name, data.projects.af.name], textStyle: { color: '#94a3b8' }, top: 0 },
    grid: { left: 60, right: 30, top: 40, bottom: 30 },
    xAxis: { type: 'category', data: ['Run 1', 'Run 2', 'Run 3'], axisLabel: { color: '#cbd5e1' } },
    yAxis: { type: 'value', name: 'tok/s', axisLabel: { color: '#94a3b8' }, splitLine: { lineStyle: { color: '#334155' } } },
    series: [
      {
        name: data.projects.sa3.name,
        type: 'bar',
        data: sa3Tps.map((v) => +v.toFixed(1)),
        itemStyle: { color: PROJECT_COLORS.sa3 },
        label: { show: true, position: 'top', formatter: '{c}', color: PROJECT_COLORS.sa3, fontSize: 11 },
      },
      {
        name: data.projects.af.name,
        type: 'bar',
        data: afTps.map((v) => +v.toFixed(1)),
        itemStyle: { color: PROJECT_COLORS.af },
        label: { show: true, position: 'top', formatter: '{c}', color: PROJECT_COLORS.af, fontSize: 11 },
      },
    ],
  };

  // Input token growth per attempt number (line chart)
  const maxAtt = Math.max(sa3ByAtt.length, afByAtt.length);
  const attNums = Array.from({ length: maxAtt }, (_, i) => i + 1);

  const growthOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: { text: 'Avg Input Tokens by Attempt Number', textStyle: { color: '#e2e8f0', fontSize: 14 }, left: 10 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0' },
    },
    legend: { data: [data.projects.sa3.name, data.projects.af.name], textStyle: { color: '#94a3b8' }, top: 0 },
    grid: { left: 80, right: 30, top: 40, bottom: 30 },
    xAxis: { type: 'category', data: attNums.map(String), name: 'Attempt #', axisLabel: { color: '#cbd5e1' } },
    yAxis: {
      type: 'value',
      name: 'Avg Input Tokens',
      axisLabel: { color: '#94a3b8', formatter: (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)) },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    series: [
      {
        name: data.projects.sa3.name,
        type: 'line',
        data: attNums.map((n) => sa3ByAtt.find((a) => a.num === n)?.avgInput || null),
        itemStyle: { color: PROJECT_COLORS.sa3 },
        smooth: true,
      },
      {
        name: data.projects.af.name,
        type: 'line',
        data: attNums.map((n) => afByAtt.find((a) => a.num === n)?.avgInput || null),
        itemStyle: { color: PROJECT_COLORS.af },
        smooth: true,
      },
    ],
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/30 rounded-lg p-4">
          <ReactEChartsCore echarts={echarts} option={tpsOption} style={{ height: 300 }} />
        </div>
        <div className="bg-slate-800/30 rounded-lg p-4">
          <ReactEChartsCore echarts={echarts} option={growthOption} style={{ height: 300 }} />
        </div>
      </div>
    </div>
  );
}
