import React from "react";

import {
  BarElement,
  CategoryScale,
  ChartData,
  ChartOptions,
  Chart as ChartTs,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AnalysisInterface, ExecutionInterface } from "../common/interface";

ChartTs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceChartsProps {
  data?: ExecutionInterface;
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ data }) => {
  // TODO: USAR APENAS UMA ENDPOINT PRA FAZER ESSES TESTES
  const createChart = {
    labels: ["CPU Usage", "Memory Usage", "Response Time"],
    datasets: [
      {
        label: "MongoDB",
        data: [
          data?.mongoData?.cpuUsage.percent,
          data?.mongoData.memoryUsage.percentUsed,
          data?.mongoData.executionTime,
        ],
        backgroundColor: "#00FF00",
      },
      {
        label: "PostgreSQL",
        data: [
          data?.postgresData?.cpuUsage.percent,
          data?.postgresData?.memoryUsage.percentUsed,
          data?.postgresData?.executionTime,
        ],
        backgroundColor: "#FFA500",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Database Performance Metrics",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw;
            if (tooltipItem.dataIndex === 2) {
              return `${label}: ${value} ms`;
            } else {
              return `${label}: ${value}%`;
            }
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "auto", paddingTop: "20px" }}>
      <Bar data={createChart} options={options} />
    </div>
  );
};

export default PerformanceCharts;
