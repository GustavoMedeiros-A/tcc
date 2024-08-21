import React from "react";

interface DataSizeSelectionProps {
  dataSize: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DataSizeSelection: React.FC<DataSizeSelectionProps> = ({
  dataSize,
  onChange,
}) => {
  return (
    <div style={{ marginBottom: "30px" }}>
      <p style={{ color: "#aaa", fontWeight: "bold" }}>Tamanho dos dados:</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label style={{ color: "#fff" }}>
          <input
            type="radio"
            name="dataSize"
            value="small"
            checked={dataSize === "small"}
            onChange={onChange}
          />{" "}
          Pequeno
        </label>
        <label style={{ color: "#fff" }}>
          <input
            type="radio"
            name="dataSize"
            value="medium"
            checked={dataSize === "medium"}
            onChange={onChange}
          />{" "}
          Médio
        </label>
        <label style={{ color: "#fff" }}>
          <input
            type="radio"
            name="dataSize"
            value="large"
            checked={dataSize === "large"}
            onChange={onChange}
          />{" "}
          Grande
        </label>
      </div>
    </div>
  );
};

export default DataSizeSelection;
