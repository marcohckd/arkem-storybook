import React from "react";
import "./Link.css";

export type LinkProps = {
  /** URL or path for the link */
  href?: string;
  /** Link text content */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
  /** Visual variant of the link */
  variant?: "default" | "subtle" | "underline";
  /** Size variant of the link */
  size?: "sm" | "md" | "lg";
  /** Whether the link is disabled */
  disabled?: boolean;
  /** Callback function called when the link is clicked */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "onClick">;

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className,
  variant = "default",
  size = "md",
  disabled = false,
  onClick,
  ...rest
}) => {
  const classes = [
    "arkem-link",
    `arkem-link--${variant}`,
    `arkem-link--${size}`,
    disabled && "arkem-link--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <a
      href={disabled ? undefined : href}
      className={classes}
      onClick={handleClick}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </a>
  );
};

