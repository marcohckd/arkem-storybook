import React, { useState } from "react";
import { Input } from "../../atoms/Input/Input";
import { Search, X } from "lucide-react";
import "./SearchBox.css";

export type SearchBoxProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  onClear?: () => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "size">;

export const SearchBox: React.FC<SearchBoxProps> = ({
  value: controlledValue,
  onChange,
  placeholder = "Search...",
  disabled = false,
  className,
  size = "md",
  onClear,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (isControlled) {
      onChange?.(newValue);
    } else {
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleClear = () => {
    if (isControlled) {
      onChange?.("");
      onClear?.();
    } else {
      setInternalValue("");
      onChange?.("");
      onClear?.();
    }
  };

  return (
    <div className={`arkem-searchbox ${className || ""}`}>
      <Input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        iconLeading={<Search size={16} />}
        iconTrailing={value ? <X size={16} onClick={handleClear} style={{ cursor: "pointer" }} /> : undefined}
        ariaLabel={placeholder}
        {...rest}
      />
    </div>
  );
};

