import React from "react";

export interface AvatarFallbackProps {
  /** Fallback content, typically initials or placeholder text */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

/**
 * AvatarFallback component for displaying initials when no image is available.
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

