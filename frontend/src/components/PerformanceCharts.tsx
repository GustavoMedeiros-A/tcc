import React from "react";

import {
  BarElement,
  CategoryScale,
  Chart as ChartTs,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AnalysisInterface } from "../common/interface";

ChartTs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceChartsProps {
  postgresData?: AnalysisInterface;
  mongoData?: AnalysisInterface;
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({
  postgresData,
  mongoData,
}) => {
  // TODO: USAR APENAS UMA ENDPOINT PRA FAZER ESSES TESTES
  const createChart = {
    labels: ["CPU Usage", "Memory Usage", "Response Time"],
    datasets: [
      {
        label: "MongoDB",
        data: [
          mongoData?.cpuUsage.percent,
          mongoData?.memoryUsage.percentUsed,
          mongoData?.executionTime,
        ],
        backgroundColor: "#00FF00",
      },
      {
        label: "PostgreSQL",
        data: [
          postgresData?.cpuUsage.percent,
          postgresData?.memoryUsage.percentUsed,
          postgresData?.executionTime,
        ],
        backgroundColor: "#FFA500",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Database Performance Metrics",
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
