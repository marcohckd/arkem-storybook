import React from "react";
import "./Radio.css";

export interface RadioProps {
  /** Whether the radio button is checked */
  checked?: boolean;
  /** Callback function called when the checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Name attribute for grouping radio buttons */
  name?: string;
  /** Value attribute for the radio button */
  value?: string;
  /** Whether the radio button is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** ARIA label for accessibility */
  "aria-label"?: string;
}

export const Radio: React.FC<RadioProps> = ({
  checked = false,
  onCheckedChange,
  name,
  value,
  disabled = false,
  className,
  "aria-label": ariaLabel,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(e.target.checked);
  };

  const classes = ["arkem-radio", className].filter(Boolean).join(" ");
  const wrapperClasses = ["arkem-radio-wrapper", checked && "arkem-radio-wrapper--checked"]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={wrapperClasses}>
      <input
        type="radio"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        value={value}
        className={classes}
        aria-label={ariaLabel}
      />
    </span>
  );
};

