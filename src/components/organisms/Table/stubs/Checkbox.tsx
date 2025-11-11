import React from "react";
import "./Checkbox.css";

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
}

/**
 * Stub Checkbox component for Storybook.
 * In production, this should be replaced with a proper Checkbox component.
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onCheckedChange,
  className,
  disabled = false,
  "aria-label": ariaLabel,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(e.target.checked);
  };

  const classes = ["arkem-checkbox", className].filter(Boolean).join(" ");
  const wrapperClasses = ["arkem-checkbox-wrapper", checked && "arkem-checkbox-wrapper--checked"]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={wrapperClasses}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={classes}
        aria-label={ariaLabel}
      />
    </span>
  );
};

