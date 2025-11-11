import React, { ReactNode } from "react";

import "./Panel.css";

export type PanelProps = {
  /** Panel content */
  children?: ReactNode;
  /** Additional CSS class name */
  className?: string;
  /** Whether to apply inner shadow effect */
  withInnerShadow?: boolean;
};

export const Panel: React.FC<PanelProps> = ({
  children,
  className,
  withInnerShadow = false,
}) => {
  const classes = [
    "arkem-panel",
    withInnerShadow && "arkem-panel--inner-shadow",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

