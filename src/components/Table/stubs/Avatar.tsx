import React from "react";

export interface AvatarProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Stub Avatar component for Storybook.
 * In production, this should be replaced with a proper Avatar component.
 */
export const Avatar: React.FC<AvatarProps> = ({ children, className }) => {
  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "var(--spacing-style-spacing-4px-8-32px)",
        height: "var(--spacing-style-spacing-4px-8-32px)",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

