import React from "react";

export interface TableRowProps {
  /** Row content, typically TableCell or TableHead components */
  children: React.ReactNode;
  /** Whether this is an even row (for zebra striping) */
  isEven?: boolean;
  /** Whether this row is selected */
  isSelected?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
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

