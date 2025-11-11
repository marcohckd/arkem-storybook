import React from "react";
import "./Scrollbar.css";

export type ScrollbarProps = {
  /**
   * The content to wrap with scrollbar styling
   */
  children: React.ReactNode;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Scrollbar size variant
   * @default "thin"
   */
  size?: "thin" | "medium";
  /**
   * Orientation of the scrollbar
   * @default "both"
   */
  orientation?: "horizontal" | "vertical" | "both";
};

export const Scrollbar: React.FC<ScrollbarProps> = ({
  children,
  className,
  size = "thin",
  orientation = "both",
}) => {
  const classes = [
    "arkem-scrollbar",
    `arkem-scrollbar--${size}`,
    `arkem-scrollbar--${orientation}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
};

