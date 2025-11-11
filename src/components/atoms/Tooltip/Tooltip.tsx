import React from "react";

export interface TooltipProps {
  delayDuration?: number;
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

