import React from "react";

export interface AvatarFallbackProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Stub AvatarFallback component for Storybook.
 * In production, this should be replaced with a proper AvatarFallback component.
 */
export const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "rgba(224, 221, 91, 0.1)", /* color-mix(in srgb, var(--semantic-brand-base) 10%, transparent) */
        color: "var(--semantic-brand-base)",
        fontSize: "var(--fonts-semantic-sm)",
        fontWeight: "var(--font-weight-medium)",
      }}
    >
      {children}
    </div>
  );
};

