import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import "./Slider.css";

export interface SliderProps {
  /** Controlled value of the slider */
  value?: number[];
  /** Default value for uncontrolled slider */
  defaultValue?: number[];
  /** Callback function called when the value changes */
  onValueChange?: (value: number[]) => void;
  /** Callback function called when the user commits the value (e.g., on mouse up) */
  onValueCommit?: (value: number[]) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      onValueCommit,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      className,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    return (
      <SliderPrimitive.Root
        ref={ref}
        className={`arkem-slider ${className || ""}`}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        onValueCommit={onValueCommit}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-label={ariaLabel}
        {...props}
      >
        <SliderPrimitive.Track className="arkem-slider__track">
          <SliderPrimitive.Range className="arkem-slider__range" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="arkem-slider__thumb"
          aria-label={ariaLabel ? `${ariaLabel} minimum` : undefined}
        />
        <SliderPrimitive.Thumb
          className="arkem-slider__thumb"
          aria-label={ariaLabel ? `${ariaLabel} maximum` : undefined}
        />
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = "Slider";

