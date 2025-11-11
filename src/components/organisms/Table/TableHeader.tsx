import React from "react";

export interface TableHeaderProps {
  /** Header content, typically TableRow with TableHead components */
  children: React.ReactNode;
  /** Additional CSS class name */
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

