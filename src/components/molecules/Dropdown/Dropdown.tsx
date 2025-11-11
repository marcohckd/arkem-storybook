import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import "./Dropdown.css";

export type DropdownOption = {
  /** Option value */
  value: string;
  /** Option display label */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
};

export type DropdownProps = {
  /** Size variant of the dropdown */
  size?: "sm" | "md" | "lg";
  /** Array of dropdown options */
  options: DropdownOption[];
  /** Selected value (controlled) */
  value?: string;
  /** Callback function called when selection changes */
  onChange?: (value: string) => void;
  /** Placeholder text displayed when no option is selected */
  placeholder?: string;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "size">;

export const Dropdown: React.FC<DropdownProps> = ({
  size = "md",
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  className,
  ariaLabel,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    if (options.find((opt) => opt.value === optionValue)?.disabled) {
      return;
    }
    setSelectedValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex((opt) => opt.value === selectedValue);
        const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        const nextOption = options[nextIndex];
        if (!nextOption.disabled) {
          handleSelect(nextOption.value);
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (isOpen) {
        const currentIndex = options.findIndex((opt) => opt.value === selectedValue);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        const prevOption = options[prevIndex];
        if (!prevOption.disabled) {
          handleSelect(prevOption.value);
        }
      }
    }
  };

  const classes = [
    "arkem-dropdown",
    `arkem-dropdown--${size}`,
    disabled && "arkem-dropdown--disabled",
    isOpen && "arkem-dropdown--open",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} ref={dropdownRef}>
      <button
        type="button"
        className="arkem-dropdown__trigger"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="arkem-dropdown__value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`arkem-dropdown__icon ${isOpen ? "arkem-dropdown__icon--open" : ""}`}
          size={16}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="arkem-dropdown__menu" role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`arkem-dropdown__option ${
                option.value === selectedValue ? "arkem-dropdown__option--selected" : ""
              } ${option.disabled ? "arkem-dropdown__option--disabled" : ""}`}
              onClick={() => handleSelect(option.value)}
              disabled={option.disabled}
              role="option"
              aria-selected={option.value === selectedValue}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

