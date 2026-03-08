export interface AggregatedData {
  projects: {
    sa3: ProjectData;
    af: ProjectData;
  };
}

export interface ProjectData {
  name: string;
  platform: string;
  runs: RunData[];
  functionNames: string[];
}

export interface RunData {
  label: string;
  timestamp: string;
  config: {
    maxRetries: number;
    ttftTimeoutMs: number | null;
    model: string;
    softTimeoutMs: number | null;
  };
  functions: FunctionData[];
  summary: RunSummary;
}

export interface RunSummary {
  totalPrompts: number;
  successfulPrompts: number;
  successRate: number;
  totalDurationMs: number;
  totalCost: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalAttempts: number;
  avgAttempts: number;
}

export interface FunctionData {
  functionName: string;
  tier: string;
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
  compileFailures: number;
  m2cDiffCount: number | null;
  m2cHasOutput: boolean;
  permuterTasks: PermuterTask[];
  aiDurationMs: number;
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
}

export interface PermuterTask {
  triggeredByAttempt: number;
  baseScore: number;
  bestScore: number;
  perfectMatch: boolean;
  iterations: number;
  durationMs: number;
}

export const PROJECT_COLORS = {
  sa3: '#06b6d4', // cyan
  af: '#a855f7', // purple
} as const;

export const TIER_COLORS = {
  easy: '#22c55e',
  medium: '#eab308',
  hard: '#ef4444',
} as const;

export const TIERS = ['easy', 'medium', 'hard'] as const;
