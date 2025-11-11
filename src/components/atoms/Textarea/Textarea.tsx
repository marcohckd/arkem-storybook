import React from "react";
import "./Textarea.css";

export type TextareaProps = {
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  state?: "default" | "error" | "success";
  maxLength?: number;
  rows?: number;
  resize?: "none" | "vertical" | "horizontal" | "both";
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "size">;

export const Textarea: React.FC<TextareaProps> = ({
  size = "md",
  placeholder,
  value = "",
  onChange,
  disabled = false,
  className,
  ariaLabel,
  state = "default",
  maxLength,
  rows = 4,
  resize = "vertical",
  ...rest
}) => {
  const textareaClasses = [
    "arkem-textarea",
    `arkem-textarea--${size}`,
    state !== "default" && `arkem-textarea--${state}`,
    disabled && "arkem-textarea--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <textarea
      className={textareaClasses}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      aria-label={ariaLabel}
      maxLength={maxLength}
      rows={rows}
      style={{ resize }}
      {...rest}
    />
  );
};

