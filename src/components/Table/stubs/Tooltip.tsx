import React from "react";

export interface TooltipProps {
  delayDuration?: number;
  children: React.ReactNode;
}

/**
 * Stub Tooltip component for Storybook.
 * In production, this should be replaced with a proper Tooltip component.
 * This is a basic wrapper that passes through children.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  delayDuration = 200,
  children,
}) => {
  return <div style={{ position: "relative", display: "inline-block" }}>{children}</div>;
};

