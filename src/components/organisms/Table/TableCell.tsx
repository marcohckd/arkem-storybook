import React from "react";

export interface TableCellProps {
  /** Cell content */
  children: React.ReactNode;
  /** Whether the cell is sticky */
  sticky?: boolean;
  /** Offset for sticky positioning */
  stickyOffset?: number;
  /** Whether sticky positioning is on the right side */
  stickyRight?: boolean;
  /** Number of columns this cell spans */
  colSpan?: number;
  /** Number of rows this cell spans */
  rowSpan?: number;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  sticky = false,
  stickyOffset,
  stickyRight = false,
  colSpan,
  rowSpan,
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
    <td
      className={classes}
      style={{ ...stickyStyle, ...style }}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </td>
  );
};

