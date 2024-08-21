import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datapicker.css";

interface CheckboxOptionProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showDatePicker?: boolean;
  filterDate?: Date | null;
  onDateChange?: (date: Date | null) => void;
  showOrderOptions?: boolean;
  orderType?: string;
}

const CheckboxOption: React.FC<CheckboxOptionProps> = ({
  label,
  name,
  checked,
  onChange,
  showDatePicker = false,
  filterDate = null,
  onDateChange,
  showOrderOptions = false,
  orderType = "asc",
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ color: "#fff", fontWeight: "bold" }}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
        />{" "}
        {label}
      </label>
      {showDatePicker && checked && (
        <div style={{ marginTop: "10px" }}>
          <DatePicker
            selected={filterDate}
            onChange={onDateChange}
            dateFormat="dd/MM/yyyy"
            className="date-picker"
          />
        </div>
      )}
      {showOrderOptions && checked && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <label style={{ color: "#fff" }}>
            <input
              type="radio"
              name="orderType"
              value="asc"
              checked={orderType === "asc"}
              onChange={onChange}
            />{" "}
            Ascendente
          </label>
          <label style={{ color: "#fff" }}>
            <input
              type="radio"
              name="orderType"
              value="desc"
              checked={orderType === "desc"}
              onChange={onChange}
            />{" "}
            Descendente
          </label>
        </div>
      )}
    </div>
  );
};

export default CheckboxOption;
