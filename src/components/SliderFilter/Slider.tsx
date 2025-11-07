import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import "./Slider.css";

export interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
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

