export interface ComparisonData {
  runs: RunMeta[];
  functions: FunctionComparison[];
}

export interface RunMeta {
  label: string;
  timestamp: string;
  config: {
    maxRetries: number;
    stallThreshold: number;
    ttftTimeoutMs: number | null;
    model: string;
    softTimeoutMs: number | null;
  };
  summary: {
    totalPrompts: number;
    successfulPrompts: number;
    successRate: number;
    avgAttempts: number;
    totalDurationMs: number;
  };
}

export interface FunctionComparison {
  functionName: string;
  promptPath: string;
  tier: string;
  runs: FunctionRunData[];
}

export interface FunctionRunData {
  runIndex: number;
  success: boolean;
  matchSource: string | null;
  totalDurationMs: number;
  numAttempts: number;
  bestDiffCount: number | null;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCostUsd: number;
  softTimeouts: number;
  hardTimeouts: number;
  ttftTimeouts: number;
  stallDetections: number;
  compileFailures: number;
  m2cDiffCount: number | null;
  m2cHasOutput: boolean;
  m2cDurationMs: number;
  permuterTasks: PermuterTask[];
  setupDurationMs: number;
  aiDurationMs: number;
  phaseDurations: {
    claude: number;
    compiler: number;
    objdiff: number;
  };
  attempts: AttemptData[];
}

export interface AttemptData {
  num: number;
  durationMs: number;
  diffCount: number | null;
  outputTokens: number;
  inputTokens: number;
  costUsd: number;
  softTimeout: boolean;
  ttftTimedOut: boolean;
  ttftMs: number | null;
  stallDetected: boolean;
  hardTimeout: boolean;
  compileFail: boolean;
  success: boolean;
  startTimestamp: string;
}

export interface PermuterTask {
  triggeredByAttempt: number;
  baseScore: number;
  bestScore: number;
  perfectMatch: boolean;
  iterations: number;
  durationMs: number;
}

export const RUN_COLORS = ['#06b6d4', '#a855f7', '#f59e0b'] as const;
export const RUN_COLORS_LIGHT = ['#22d3ee', '#c084fc', '#fbbf24'] as const;
