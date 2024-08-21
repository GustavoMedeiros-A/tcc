import React from "react";

interface TextProps {
  children: React.ReactNode;
  size?: string;
  color?: string;
  bold?: boolean;
}

const Text: React.FC<TextProps> = ({
  children,
  size = "16px",
  color = "#fff",
  bold = false,
}) => {
  return (
    <p
      style={{
        fontSize: size,
        color: color,
        fontWeight: bold ? "bold" : "normal",
        fontFamily: "Source Sans Pro, sans-serif",
      }}
    >
      {children}
    </p>
  );
};

export default Text;
