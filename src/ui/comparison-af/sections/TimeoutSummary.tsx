import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import type { ComparisonData } from '../types';
import { RUN_COLORS } from '../types';

echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

interface Props {
  data: ComparisonData;
  runLabels: string[];
}

export function TimeoutSummary({ data, runLabels }: Props) {
  // Aggregate timeout counts
  const timeoutTypes = ['Soft Timeout', 'Hard Timeout', 'TTFT Timeout', 'Compilation Failure'] as const;

  const runTotals = runLabels.map((_, i) => {
    let soft = 0, hard = 0, ttft = 0, compile = 0;
    for (const func of data.functions) {
      const run = func.runs[i];
      if (!run) continue;
      soft += run.softTimeouts;
      hard += run.hardTimeouts;
      ttft += run.ttftTimeouts;
      compile += run.compileFailures;
    }
    return { soft, hard, ttft, compile };
  });

  // Per-function timeout table
  const funcsWithTimeouts = data.functions.filter((f) =>
    f.runs.some((r) => r.softTimeouts > 0 || r.hardTimeouts > 0 || r.ttftTimeouts > 0),
  );

  // Stacked bar chart of timeouts per run
  const timeoutBarOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'Timeout / Error Counts per Run',
      textStyle: { color: '#e2e8f0', fontSize: 14 },
      left: 10,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 12 },
    },
    legend: {
      data: [...timeoutTypes],
      textStyle: { color: '#94a3b8' },
      top: 0,
    },
    grid: { left: 60, right: 30, top: 40, bottom: 30 },
    xAxis: {
      type: 'category',
      data: runLabels,
      axisLabel: { color: '#cbd5e1' },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    series: [
      {
        name: 'Soft Timeout',
        type: 'bar',
        stack: 'total',
        data: runTotals.map((r) => r.soft),
        itemStyle: { color: '#f59e0b' },
      },
      {
        name: 'Hard Timeout',
        type: 'bar',
        stack: 'total',
        data: runTotals.map((r) => r.hard),
        itemStyle: { color: '#ef4444' },
      },
      {
        name: 'TTFT Timeout',
        type: 'bar',
        stack: 'total',
        data: runTotals.map((r) => r.ttft),
        itemStyle: { color: '#8b5cf6' },
      },
      {
        name: 'Compilation Failure',
        type: 'bar',
        stack: 'total',
        data: runTotals.map((r) => r.compile),
        itemStyle: { color: '#64748b' },
      },
    ],
  };

  // Per-function timeout heatmap-style table
  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {runLabels.map((label, i) => (
          <div key={i} className="bg-slate-800/60 rounded-lg p-4">
            <div className="text-slate-400 text-sm mb-2" style={{ color: RUN_COLORS[i] }}>
              {label}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-yellow-500 text-xs">Soft Timeouts</div>
                <div className="text-white font-medium">{runTotals[i].soft}</div>
              </div>
              <div>
                <div className="text-red-500 text-xs">Hard Timeouts</div>
                <div className="text-white font-medium">{runTotals[i].hard}</div>
              </div>
              <div>
                <div className="text-purple-500 text-xs">TTFT Timeouts</div>
                <div className="text-white font-medium">{runTotals[i].ttft}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Compile Failures</div>
                <div className="text-white font-medium">{runTotals[i].compile}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4 mb-4">
        <ReactEChartsCore echarts={echarts} option={timeoutBarOption} style={{ height: 300 }} />
      </div>

      {/* Per-function timeout table */}
      <div className="bg-slate-800/40 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">Per-Function Timeout Breakdown</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 px-2 text-slate-400">Function</th>
                <th className="text-left py-2 px-2 text-slate-400">Tier</th>
                {runLabels.map((label, i) => (
                  <th key={i} className="text-center py-2 px-2" style={{ color: RUN_COLORS[i] }}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {funcsWithTimeouts.map((func) => (
                <tr key={func.functionName} className="border-b border-slate-800">
                  <td className="py-2 px-2 text-slate-200 font-mono text-xs">{func.functionName}</td>
                  <td className="py-2 px-2 text-slate-400 text-xs">{func.tier}</td>
                  {func.runs.map((run, ri) => (
                    <td key={ri} className="py-2 px-2 text-center text-xs">
                      {run.softTimeouts > 0 && (
                        <span className="inline-block px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400 mr-1">
                          S:{run.softTimeouts}
                        </span>
                      )}
                      {run.hardTimeouts > 0 && (
                        <span className="inline-block px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 mr-1">
                          H:{run.hardTimeouts}
                        </span>
                      )}
                      {run.ttftTimeouts > 0 && (
                        <span className="inline-block px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 mr-1">
                          T:{run.ttftTimeouts}
                        </span>
                      )}
                      {run.softTimeouts === 0 && run.hardTimeouts === 0 && run.ttftTimeouts === 0 && (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
