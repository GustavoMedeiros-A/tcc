import * as os from 'os';

export function toFixedAndParseFloat(value: number) {
  return parseFloat(value.toFixed(2));
}

export function convertBytesToGigabytes(number: number) {
  return toFixedAndParseFloat(number / (1024 * 1024 * 1024));
}

export function calculateTotalCpuUsage(
  endCpuUsageUser: number,
  endCpuUsageSystem: number,
  startCpuUsageUser: number,
  startCpuUsageSystem: number,
): number {
  return Math.abs(
    endCpuUsageUser +
      endCpuUsageSystem -
      (startCpuUsageUser + startCpuUsageSystem),
  );
}

export function calculateCpuPercent(
  totalCpuUsage: number,
  executionTime: number,
): number {
  const numberOfCores = os.cpus().length;
  return (totalCpuUsage / (executionTime * 1000 * numberOfCores)) * 100;
}

export function calculateTotalCpuUsageMs(totalCpuUsage: number): number {
  return totalCpuUsage / 1000;
}

export function calculateTotalCpuUsageSeconds(totalCpuUsage: number): number {
  return totalCpuUsage / 1000000;
}

export function calculateTotalMemoryUsage(
  endMemoryUsage: number,
  startMemoryUsage: number,
): number {
  return Math.abs(endMemoryUsage - startMemoryUsage);
}

export function calculateTotalMemoryUsagepercent(
  totalMemoryUsage: number,
  totalSystemMemory: number,
): number {
  return (totalMemoryUsage / totalSystemMemory) * 100;
}
