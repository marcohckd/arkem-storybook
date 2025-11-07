import React from "react";

export interface TableCellProps {
  children: React.ReactNode;
  sticky?: boolean;
  stickyOffset?: number;
  stickyRight?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  sticky = false,
  stickyOffset,
  stickyRight = false,
  className,
  style,
}) => {
  const classes = [
    "arkem-table__cell",
    sticky && "arkem-table__cell--sticky",
    sticky && stickyRight && "arkem-table__cell--sticky-right",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const stickyStyle: React.CSSProperties = sticky
    ? {
        position: "sticky",
        ...(stickyRight
          ? { right: "0" }
          : { left: stickyOffset !== undefined ? `${stickyOffset}px` : "0" }),
        zIndex: stickyRight ? 20 : 10,
      }
    : {};

  return (
    <td className={classes} style={{ ...stickyStyle, ...style }}>
      {children}
    </td>
  );
};

