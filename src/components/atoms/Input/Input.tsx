import React from "react";
import "./Input.css";

export type InputProps = {
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  iconLeading?: React.ReactNode;
  iconTrailing?: React.ReactNode;
  state?: "default" | "error" | "success";
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  /**
   * @deprecated Use FormField molecule instead. This prop is kept for backward compatibility only.
   * Input is a pure atom component - use FormField for labels, error messages, and help text.
   */
  label?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "size">;

export const Input: React.FC<InputProps> = ({
  size = "md",
  placeholder,
  value = "",
  onChange,
  disabled = false,
  className,
  ariaLabel,
  iconLeading,
  iconTrailing,
  label,
  state = "default",
  maxLength,
  multiline = false,
  rows = 4,
  ...rest
}) => {
  // Backward compatibility: support label prop but prefer FormField molecule
  // Note: Input is a pure atom - FormField should be used for labels
  const currentLength = value?.toString().length || 0;
  const showCharacterCount = maxLength !== undefined;
  const hasLabelOrCount = label || showCharacterCount;

  const wrapperClasses = [
    hasLabelOrCount ? "arkem-input-field" : "",
    state !== "default" && hasLabelOrCount && `arkem-input-field--${state}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [
    "arkem-input",
    `arkem-input--${size}`,
    state !== "default" && `arkem-input--${state}`,
    disabled && "arkem-input--disabled",
    multiline && "arkem-input--multiline",
  ]
    .filter(Boolean)
    .join(" ");

  const labelClasses = [
    "arkem-input__label",
    state !== "default" && `arkem-input__label--${state}`,
  ]
    .filter(Boolean)
    .join(" ");

  const InputComponent = multiline ? "textarea" : "input";

  const inputElement = (
    <div
      className={hasLabelOrCount ? "arkem-input-wrapper" : ""}
      data-has-leading={iconLeading ? "true" : "false"}
      data-has-trailing={iconTrailing ? "true" : "false"}
      data-state={state}
    >
      {iconLeading && (
        <span className="arkem-input__icon arkem-input__icon--leading" aria-hidden="true">
          {iconLeading}
        </span>
      )}
      {React.createElement(InputComponent, {
        className: inputClasses,
        placeholder,
        value,
        onChange,
        disabled,
        "aria-label": ariaLabel || label,
        maxLength,
        rows: multiline ? rows : undefined,
        ...rest,
      })}
      {iconTrailing && (
        <span className="arkem-input__icon arkem-input__icon--trailing" aria-hidden="true">
          {iconTrailing}
        </span>
      )}
    </div>
  );

  // Backward compatibility: wrap with label/count if provided
  if (hasLabelOrCount) {
    return (
      <div className={wrapperClasses}>
        <div className="arkem-input__header">
          {label && (
            <label className={labelClasses} htmlFor={rest.id}>
              {label}
            </label>
          )}
          {showCharacterCount && (
            <span
              className={`arkem-input__count ${
                state !== "default" ? `arkem-input__count--${state}` : ""
              }`}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
        {inputElement}
      </div>
    );
  }

  // Pure atom: return just the input element
  return inputElement;
};

