import React, { useState, useEffect, useRef } from "react";

export interface TooltipContentProps {
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Stub TooltipContent component for Storybook.
 * In production, this should be replaced with a proper TooltipContent component.
 * This is a basic hover-based implementation for Storybook purposes.
 */
export const TooltipContent: React.FC<TooltipContentProps> = ({
  side = "top",
  sideOffset = 4,
  children,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current?.parentElement;
    if (!trigger) return;

    const showTooltip = () => setIsVisible(true);
    const hideTooltip = () => setIsVisible(false);

    trigger.addEventListener("mouseenter", showTooltip);
    trigger.addEventListener("mouseleave", hideTooltip);

    return () => {
      trigger.removeEventListener("mouseenter", showTooltip);
      trigger.removeEventListener("mouseleave", hideTooltip);
    };
  }, []);

  if (!isVisible) return null;

  const sideStyles: Record<string, React.CSSProperties> = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: `${sideOffset}px` },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: `${sideOffset}px` },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: `${sideOffset}px` },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: `${sideOffset}px` },
  };

  return (
    <div
      ref={contentRef}
      className={className}
      style={{
        position: "absolute",
        zIndex: 1000,
        padding: "var(--spacing-8) var(--spacing-12)",
        background: "var(--semantic-table-tooltip-bg)",
        color: "var(--semantic-text-primary)",
        border: "var(--border-widths-mode-1-border-width-hairline) solid var(--semantic-table-border)",
        borderRadius: "var(--radius-sm)",
        fontSize: "var(--fonts-semantic-sm)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        ...sideStyles[side],
      }}
    >
      {children}
    </div>
  );
};

