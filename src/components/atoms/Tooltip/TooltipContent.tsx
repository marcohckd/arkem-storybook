import React, { useState, useEffect, useRef } from "react";

export interface TooltipContentProps {
  /** Position of the tooltip relative to the trigger */
  side?: "top" | "bottom" | "left" | "right";
  /** Offset distance from the trigger element */
  sideOffset?: number;
  /** Tooltip content text */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

/**
 * TooltipContent component that displays the tooltip content.
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
        zIndex: 'var(--z-index-dropdown)',
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

