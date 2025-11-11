import React, { useState, useMemo, useCallback, ReactNode } from "react";
import { Button } from "../../atoms/Button/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../organisms/Table";
import { Checkbox } from "../../atoms/Checkbox";
import "./DataTable.css";

export interface DataTableColumn<T> {
  id: string;
  header: string | ReactNode;
  accessor?: (row: T) => any;
  cell?: (row: T, value: any) => ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  sticky?: boolean;
  stickyRight?: boolean;
}

export interface DataTableBatchAction {
  label: string;
  icon?: string;
  onClick: (selectedIds: string[]) => void;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => string;
  pageSize?: number;
  enableSelection?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  batchActions?: DataTableBatchAction[];
  emptyMessage?: string;
  className?: string;
  ariaLabel?: string;
}

export function DataTable<T>({
  data,
  columns,
  getRowId,
  pageSize = 10,
  enableSelection = true,
  enableSorting = true,
  enablePagination = true,
  batchActions = [],
  emptyMessage = "No data available",
  className,
  ariaLabel = "Data Table",
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Sorted data
  const sortedData = useMemo(() => {
    if (!enableSorting || !sortColumn) return data;

    const column = columns.find((col) => col.id === sortColumn);
    if (!column || !column.sortable || !column.accessor) return data;

    return [...data].sort((a, b) => {
      const aValue = column.accessor!(a);
      const bValue = column.accessor!(b);

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection, columns, enableSorting]);

  // Paginated data
  const paginatedData = useMemo(() => {
    if (!enablePagination) return sortedData;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, enablePagination]);

  // Toggle sort
  const handleSort = useCallback(
    (columnId: string) => {
      if (!enableSorting) return;
      const column = columns.find((col) => col.id === columnId);
      if (!column || !column.sortable) return;

      if (sortColumn === columnId) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(columnId);
        setSortDirection("asc");
      }
    },
    [sortColumn, sortDirection, columns, enableSorting]
  );

  // Selection handlers
  const toggleRowSelection = useCallback(
    (rowId: string) => {
      setSelectedRows((prev) =>
        prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
      );
    },
    []
  );

  const toggleAllSelection = useCallback(() => {
    if (selectedRows.length === sortedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sortedData.map((row) => getRowId(row)));
    }
  }, [selectedRows.length, sortedData, getRowId]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  return (
    <div className={`arkem-data-table ${className || ""}`}>
      {/* Batch Actions Toolbar */}
      {enableSelection && selectedRows.length > 0 && batchActions.length > 0 && (
        <div className="arkem-data-table__toolbar">
          <div className="arkem-data-table__toolbar-left">
            <Checkbox
              checked={selectedRows.length === sortedData.length && sortedData.length > 0}
              onCheckedChange={toggleAllSelection}
              aria-label="Select all"
            />
            <span className="arkem-data-table__toolbar-text">
              {selectedRows.length} item{selectedRows.length !== 1 ? "s" : ""} selected
            </span>
          </div>
          <div className="arkem-data-table__toolbar-actions">
            {batchActions.map((action, index) => (
              <Button
                key={index}
                size="sm"
                hierarchy="secondary"
                tone="black"
                leadingIconName={action.icon as any}
                onClick={() => action.onClick(selectedRows)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="arkem-data-table__container">
        <Table ariaLabel={ariaLabel}>
          <TableHeader>
            <TableRow>
              {enableSelection && (
                <TableHead
                  style={{
                    width: "var(--component-table-checkbox-column-width)",
                    textAlign: "center",
                  }}
                >
                  <Checkbox
                    checked={selectedRows.length === sortedData.length && sortedData.length > 0}
                    onCheckedChange={toggleAllSelection}
                    aria-label="Select all"
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  sortable={column.sortable && enableSorting}
                  onClick={() => column.sortable && handleSort(column.id)}
                  sticky={column.sticky}
                  stickyRight={column.stickyRight}
                  style={{
                    width: column.width,
                    textAlign: column.align || "left",
                  }}
                >
                  {typeof column.header === "string" ? column.header : column.header}
                  {column.sortable && enableSorting && sortColumn === column.id && (
                    <span>{sortDirection === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (enableSelection ? 1 : 0)}
                  style={{ textAlign: "center", padding: "var(--spacing-32)" }}
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => {
                const rowId = getRowId(row);
                const isSelected = selectedRows.includes(rowId);
                return (
                  <TableRow key={rowId} isEven={index % 2 === 0} isSelected={isSelected}>
                    {enableSelection && (
                      <TableCell style={{ textAlign: "center" }}>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleRowSelection(rowId)}
                          aria-label={`Select row ${rowId}`}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => {
                      const value = column.accessor ? column.accessor(row) : undefined;
                      const cellContent = column.cell ? column.cell(row, value) : value;
                      return (
                        <TableCell
                          key={column.id}
                          sticky={column.sticky}
                          stickyRight={column.stickyRight}
                          style={{
                            width: column.width,
                            textAlign: column.align || "left",
                          }}
                        >
                          {cellContent}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {enablePagination && totalPages > 1 && (
        <div className="arkem-data-table__pagination">
          <Button
            size="sm"
            hierarchy="secondary"
            tone="black"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="arkem-data-table__pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            size="sm"
            hierarchy="secondary"
            tone="black"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

