import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import "./Switch.css";

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  size?: "default" | "sm";
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ checked, onCheckedChange, disabled, ariaLabel, className, size = "default", ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`arkem-switch arkem-switch--${size} ${className || ""}`}
      data-size={size}
      {...props}
    >
      <SwitchPrimitive.Thumb className="arkem-switch__thumb" />
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = "Switch";

