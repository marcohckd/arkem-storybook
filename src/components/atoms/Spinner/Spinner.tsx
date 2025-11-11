import React from "react";
import "./Spinner.css";

export type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
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

