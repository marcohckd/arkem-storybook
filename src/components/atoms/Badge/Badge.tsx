import React from "react";

export interface BadgeProps {
  variant?: "default" | "secondary";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Badge component for displaying labels and tags.
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
      background: "var(--semantic-badge-default-bg, var(--color-fill-neutral-600))",
      color: "var(--semantic-badge-default-text, var(--semantic-text-secondary))",
    },
    secondary: {
      background: "var(--semantic-badge-secondary-bg, var(--color-fill-neutral-800))",
      color: "var(--semantic-badge-secondary-text, var(--semantic-text-secondary))",
      border: "var(--border-width-thin) solid var(--semantic-badge-secondary-border, var(--semantic-border-muted))",
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

