import React from "react";
import "./Divider.css";

export type DividerProps = {
  /** Orientation of the divider */
  orientation?: "horizontal" | "vertical";
  /** Additional CSS class name */
  className?: string;
};

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  className,
}) => {
  const classes = [
    "arkem-divider",
    `arkem-divider--${orientation}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <hr className={classes} role="separator" />;
};

