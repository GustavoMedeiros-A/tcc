import React from "react";
import SearchOptions from "../components/SearchOptions";
import DescriptionPanel from "../components/DescriptionPanel";

const MainScreen: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#111" }}>
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
          <SearchOptions />
          <DescriptionPanel />
        </div>
      </main>
    </div>
  );
};

export default MainScreen;
