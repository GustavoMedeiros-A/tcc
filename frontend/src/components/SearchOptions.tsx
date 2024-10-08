import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datapicker.css";
import Button from "./Button";
import CheckboxOption from "./CheckboxOption";
import DataSizeSelection from "./DataSizeSelection";
import { IOptions } from "../common/interface";

interface SearchOptionsProps {
  applyChart: (options: IOptions) => void;
}

const SearchOptions: React.FC<SearchOptionsProps> = ({ applyChart }) => {
  const [options, setOptions] = useState<IOptions>({
    dataSize: "small",
    joinLookup: false,
    filter: false,
    filterDate: null,
    order: false,
    orderType: "ASC",
    useIndexes: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      filterDate: date,
    }));
  };

  const handleSubmit = () => {
    applyChart(options);
  };

  return (
    <div
      style={{
        backgroundColor: "#333",
        padding: "20px",
        borderRadius: "10px",
        width: "350px",
      }}
    >
      <h3 style={{ color: "#fff", marginBottom: "20px" }}>
        Configurações de busca
      </h3>

      <DataSizeSelection dataSize={options.dataSize} onChange={handleChange} />

      <CheckboxOption
        label="Fazer Join/Lookup"
        name="joinLookup"
        checked={options.joinLookup}
        onChange={handleChange}
      />

      <CheckboxOption
        label="Aplicar filtro por data"
        name="filter"
        checked={options.filter}
        onChange={handleChange}
        showDatePicker
        filterDate={options.filterDate}
        onDateChange={handleDateChange}
      />

      <CheckboxOption
        label="Ordenar resultados"
        name="order"
        checked={options.order}
        onChange={handleChange}
        showOrderOptions
        orderType={options.orderType}
      />

      {/* <CheckboxOption
        label="Usar índices configurados"
        name="useIndexes"
        checked={options.useIndexes}
        onChange={handleChange}
      /> */}

      <Button
        label="Aplicar Teste"
        onClick={handleSubmit}
        backgroundColor="#d70d0c"
        width="100%"
        marginTop="4vh"
      />
    </div>
  );
};

export default SearchOptions;
