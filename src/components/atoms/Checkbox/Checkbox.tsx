import React from "react";
import "./Checkbox.css";

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Callback function called when the checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Additional CSS class name */
  className?: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** ARIA label for accessibility */
  "aria-label"?: string;
}

/**
 * Checkbox component for form inputs and selections.
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

