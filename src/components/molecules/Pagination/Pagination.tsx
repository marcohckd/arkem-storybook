import React from "react";
import { Button } from "../../atoms/Button/Button";
import "./Pagination.css";

export interface PaginationProps {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Additional CSS class name */
  className?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  ariaLabel = "Pagination",
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={`arkem-pagination ${className || ""}`}
      role="navigation"
      aria-label={ariaLabel}
    >
      <Button
        size="sm"
        hierarchy="secondary"
        tone="black"
        function="borderless"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        ariaLabel="Previous page"
      >
        Previous
      </Button>
      <span className="arkem-pagination__info">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        size="sm"
        hierarchy="secondary"
        tone="black"
        function="borderless"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        ariaLabel="Next page"
      >
        Next
      </Button>
    </div>
  );
};

