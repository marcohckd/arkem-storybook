import React from "react";

export interface TableHeadProps {
  /** Header cell content */
  children: React.ReactNode;
  /** Whether the header cell is sticky */
  sticky?: boolean;
  /** Offset for sticky positioning */
  stickyOffset?: number;
  /** Whether sticky positioning is on the right side */
  stickyRight?: boolean;
  /** Whether the column is sortable */
  sortable?: boolean;
  /** Callback function called when header is clicked */
  onClick?: () => void;
  /** Number of columns this header spans */
  colSpan?: number;
  /** Number of rows this header spans */
  rowSpan?: number;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export const TableHead: React.FC<TableHeadProps> = ({
  children,
  sticky = false,
  stickyOffset,
  stickyRight = false,
  sortable = false,
  onClick,
  colSpan,
  rowSpan,
  className,
  style,
}) => {
  const classes = [
    "arkem-table__head",
    sticky && "arkem-table__head--sticky",
    sticky && stickyRight && "arkem-table__head--sticky-right",
    sortable && "arkem-table__head--sortable",
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
        zIndex: stickyRight ? 30 : 20,
      }
    : {};

  return (
    <th
      className={classes}
      style={{ ...stickyStyle, ...style }}
      onClick={sortable || onClick ? onClick : undefined}
      colSpan={colSpan}
      rowSpan={rowSpan}
      aria-sort={sortable ? "none" : undefined}
    >
      {children}
    </th>
  );
};

