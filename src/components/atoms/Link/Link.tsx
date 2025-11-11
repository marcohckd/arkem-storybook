import React from "react";
import "./Link.css";

export type LinkProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "subtle" | "underline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
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

