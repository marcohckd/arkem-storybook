import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import "./Switch.css";

export interface SwitchProps {
  /** Whether the switch is checked */
  checked?: boolean;
  /** Callback function called when the checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Additional CSS class name */
  className?: string;
  /** Size variant of the switch */
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

