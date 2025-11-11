import React from "react";

export interface TooltipTriggerProps {
  /** Whether to merge props with child element */
  asChild?: boolean;
  /** Trigger element content */
  children: React.ReactNode;
}

/**
 * TooltipTrigger component that wraps the element that triggers the tooltip.
 */
export const TooltipTrigger: React.FC<TooltipTriggerProps> = ({
  asChild,
  children,
}) => {
  return <div style={{ display: "inline-block" }}>{children}</div>;
};

