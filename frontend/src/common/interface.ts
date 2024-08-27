export interface IOptions {
  dataSize: string;
  joinLookup: boolean;
  filter: boolean;
  filterDate: Date | null;
  order: boolean;
  orderType: "ASC" | "DESC";
  useIndexes: boolean;
}

export interface AnalysisInterface {
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
