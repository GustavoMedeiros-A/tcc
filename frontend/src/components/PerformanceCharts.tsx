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

ChartTs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceCharts: React.FC = () => {
  const data = {
    labels: ["CPU Usage", "Memory Usage", "Response Time"],
    datasets: [
      {
        label: "MongoDB",
        data: [65, 59, 80],
        backgroundColor: "#00FF00",
      },
      {
        label: "PostgreSQL",
        data: [70, 48, 60],
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default PerformanceCharts;
