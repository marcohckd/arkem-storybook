import React from "react";
import "./Table.css";

export interface TableProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  size?: "default" | "sm" | "xs";
}

export const Table: React.FC<TableProps> = ({
  children,
  className,
  ariaLabel,
  size = "default",
}) => {
  return (
    <table
      className={`arkem-table arkem-table--${size} ${className || ""}`}
      aria-label={ariaLabel}
      data-size={size}
    >
      {children}
    </table>
  );
};

