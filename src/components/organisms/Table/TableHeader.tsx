import React from "react";

export interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <thead className={`arkem-table__header ${className || ""}`}>
      {children}
    </thead>
  );
};

