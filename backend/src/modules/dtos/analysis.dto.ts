export class AnalysisDTO {
  cpuUsage: {
    total: number; //µs
    percent: number; // %
    totalMs: number; // ms
    totalSeconds: number; // s
  };
  memoryUsage: {
    totalUsed: number; // MB
    percentUsed: number; // %
    totalSystemMemory: number; // GB
    freeSystemMemory: number; // GB
  };
  executionTime: number; // ms
}
