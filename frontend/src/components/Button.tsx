import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  color?: string;
  backgroundColor?: string;
  width?: string;
  marginTop?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  color = "#fff",
  backgroundColor = "#f00",
  width,
  marginTop,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        backgroundColor: backgroundColor,
        color: color,
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        fontSize: "16px",
        marginBottom: "10px",
        width: width,
        marginTop,
      }}
    >
      {label}
    </button>
  );
};

export default Button;
