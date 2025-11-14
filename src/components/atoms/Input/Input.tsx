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
  state = "default",
  maxLength,
  multiline = false,
  rows = 4,
  ...rest
}) => {
  const inputClasses = [
    "arkem-input",
    `arkem-input--${size}`,
    state !== "default" && `arkem-input--${state}`,
    disabled && "arkem-input--disabled",
    multiline && "arkem-input--multiline",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const InputComponent = multiline ? "textarea" : "input";

  return (
    <div
      className="arkem-input-wrapper"
      data-has-leading={iconLeading ? "true" : "false"}
      data-has-trailing={iconTrailing ? "true" : "false"}
      data-state={state}
      data-size={size}
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
        "aria-label": ariaLabel,
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
};

