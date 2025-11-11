import React from "react";
import "./Spinner.css";

export type SpinnerProps = {
  /** Size variant of the spinner */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class name */
  className?: string;
  /** ARIA label for accessibility (defaults to 'Loading') */
  "aria-label"?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  className,
  "aria-label": ariaLabel = "Loading",
}) => {
  const classes = [
    "arkem-spinner",
    `arkem-spinner--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
    >
      <span className="arkem-spinner__circle" />
    </div>
  );
};

