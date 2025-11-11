import React from "react";

export interface TableBodyProps {
  /** Body content, typically TableRow with TableCell components */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export const TableBody: React.FC<TableBodyProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <tbody
      className={`arkem-table__body ${className || ""}`}
      style={style}
    >
      {children}
    </tbody>
  );
};

