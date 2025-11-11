import React from "react";
import { Input, type InputProps } from "../../atoms/Input/Input";
import { Label } from "../../atoms/Label/Label";
import "./FormField.css";

export type FormFieldProps = Omit<InputProps, "label" | "ariaLabel"> & {
  label?: string;
  error?: string;
  helpText?: string;
  htmlFor?: string;
  showCharacterCount?: boolean;
};

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helpText,
  htmlFor,
  showCharacterCount,
  maxLength,
  value,
  state,
  ...inputProps
}) => {
  const currentLength = value?.toString().length || 0;
  const shouldShowCount = showCharacterCount && maxLength !== undefined;
  const effectiveState = error ? "error" : state || "default";

  return (
    <div className="arkem-form-field">
      {(label || shouldShowCount) && (
        <div className="arkem-form-field__header">
          {label && (
            <Label htmlFor={htmlFor || inputProps.id} className="arkem-form-field__label">
              {label}
            </Label>
          )}
          {shouldShowCount && (
            <span
              className={`arkem-form-field__count ${
                effectiveState !== "default" ? `arkem-form-field__count--${effectiveState}` : ""
              }`}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      )}
      <Input
        {...inputProps}
        value={value}
        maxLength={maxLength}
        state={effectiveState}
        ariaLabel={inputProps.ariaLabel || label}
      />
      {error && (
        <div className="arkem-form-field__error" role="alert">
          {error}
        </div>
      )}
      {helpText && !error && (
        <div className="arkem-form-field__help">
          {helpText}
        </div>
      )}
    </div>
  );
};

