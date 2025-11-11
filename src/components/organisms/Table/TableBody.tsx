import React from "react";

export interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
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

