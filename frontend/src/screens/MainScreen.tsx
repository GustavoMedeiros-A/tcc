import React, { useState } from "react";
import SearchOptions from "../components/SearchOptions";
import DescriptionPanel from "../components/DescriptionPanel";
import PerformanceCharts from "../components/PerformanceCharts";
import { executeMongoQuery, executePostgresQuery } from "../common/service";
import { AnalysisInterface, IOptions } from "../common/interface";

const MainScreen: React.FC = () => {
  const [showCharts, setShowCharts] = useState(false);
  const [chartPostgresData, setChartPostgresData] =
    useState<AnalysisInterface>();
  const [chartMongoDBData, setChartMongoDBData] = useState<AnalysisInterface>();

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleApplyTest = async (options: IOptions) => {
    // TODO: USAR APENAS UMA ENDPOINT PRA FAZER ESSES TESTES
    try {
      const postgresData = await executePostgresQuery(options);

      await sleep(5000);
      const mongoData = await executeMongoQuery(options);

      setChartMongoDBData(mongoData);
      setChartPostgresData(postgresData);
      setShowCharts(true);
    } catch (error) {
      console.error("Error executing query:", error);
    }
  };

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", backgroundColor: "#111" }}
    >
      <aside
        style={{
          width: "250px",
          backgroundColor: "#1a1a1a",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ marginBottom: "40px", color: "#fff" }}>
            <h3>DBAnalyzer</h3>
          </div>
        </div>
        <div style={{ color: "#aaa" }}>User settings</div>
      </aside>
      <main
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#222",
            padding: "20px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <SearchOptions applyChart={handleApplyTest} />
          <DescriptionPanel />
        </div>

        {showCharts && (
          <div
            style={{
              backgroundColor: "#222",
              padding: "20px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-around",
              marginTop: "20px",
            }}
          >
            <PerformanceCharts
              postgresData={chartPostgresData}
              mongoData={chartMongoDBData}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default MainScreen;
