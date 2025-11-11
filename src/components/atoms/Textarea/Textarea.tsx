import React from "react";
import "./Textarea.css";

export type TextareaProps = {
  /** Size variant of the textarea */
  size?: "sm" | "md" | "lg";
  /** Placeholder text displayed when textarea is empty */
  placeholder?: string;
  /** Current value of the textarea (controlled) */
  value?: string;
  /** Callback function called when the value changes */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Visual state of the textarea */
  state?: "default" | "error" | "success";
  /** Maximum number of characters allowed */
  maxLength?: number;
  /** Number of visible rows */
  rows?: number;
  /** Resize behavior of the textarea */
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

