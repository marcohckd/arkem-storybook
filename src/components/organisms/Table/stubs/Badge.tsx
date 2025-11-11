import React from "react";

export interface BadgeProps {
  variant?: "default" | "secondary";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Stub Badge component for Storybook.
 * In production, this should be replaced with a proper Badge component.
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
  className,
  style,
}) => {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "var(--spacing-8) var(--spacing-12)",
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--fonts-semantic-sm)",
    fontWeight: "var(--font-weight-medium)",
    ...style,
  };

  const variantStyles: Record<"default" | "secondary", React.CSSProperties> = {
    default: {
      background: "var(--semantic-badge-default-bg)",
      color: "var(--semantic-badge-default-text)",
    },
    secondary: {
      background: "var(--semantic-badge-secondary-bg)",
      color: "var(--semantic-badge-secondary-text)",
      border: "var(--border-width-thin) solid var(--semantic-badge-secondary-border)",
    },
  };

  return (
    <span
      className={className}
      style={{ ...baseStyle, ...variantStyles[variant] }}
    >
      {children}
    </span>
  );
};

