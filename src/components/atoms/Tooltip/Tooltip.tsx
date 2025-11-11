import React from "react";

export interface TooltipProps {
  /** Delay in milliseconds before showing the tooltip (default: 200) */
  delayDuration?: number;
  /** Tooltip content, typically TooltipTrigger and TooltipContent components */
  children: React.ReactNode;
}

/**
 * Tooltip component for displaying contextual information on hover.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  delayDuration = 200,
  children,
}) => {
  return <div style={{ position: "relative", display: "inline-block" }}>{children}</div>;
};

