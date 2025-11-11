import React from "react";

export interface TableRowProps {
  children: React.ReactNode;
  isEven?: boolean;
  isSelected?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  isEven = false,
  isSelected = false,
  className,
  style,
}) => {
  const classes = [
    "arkem-table__row",
    isEven && "arkem-table__row--even",
    isSelected && "arkem-table__row--selected",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <tr className={classes} style={style}>
      {children}
    </tr>
  );
};

