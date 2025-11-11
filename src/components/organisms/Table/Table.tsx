import React from "react";
import "./Table.css";

export interface TableProps {
  /** Table content, typically TableHeader, TableBody, TableRow, TableCell components */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Size variant of the table */
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

