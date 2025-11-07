import React from "react";

export interface TooltipTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

/**
 * Stub TooltipTrigger component for Storybook.
 * In production, this should be replaced with a proper TooltipTrigger component.
 */
export const TooltipTrigger: React.FC<TooltipTriggerProps> = ({
  asChild,
  children,
}) => {
  return <div style={{ display: "inline-block" }}>{children}</div>;
};

