import React from "react";
import "./Radio.css";

export interface RadioProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
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

