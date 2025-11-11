import React from "react";
import * as Lucide from "lucide-react";
import "./Button.css";

export interface ButtonProps {
  /** Size variant of the button */
  size?: "sm" | "md" | "lg";
  /** Visual hierarchy variant */
  hierarchy?: "primary" | "secondary" | "mode";
  /** Color tone variant */
  tone?: "black" | "grey" | "color";
  /** Visual state of the button */
  state?: "default" | "hover" | "focused" | "disabled";
  /** Functional variant of the button */
  function?: "feature" | "action" | "table-action" | "close" | "borderless";
  /** Whether to show button text */
  showText?: boolean;
  /** Whether to show leading icon */
  iconLeading?: boolean;
  /** Whether to show trailing icon */
  iconTrailing?: boolean;
  /** Name of the Lucide icon to display as leading icon */
  leadingIconName?: keyof typeof Lucide;
  /** Name of the Lucide icon to display as trailing icon */
  trailingIconName?: keyof typeof Lucide;
  /** Custom React node for leading icon */
  leadingIcon?: React.ReactNode;
  /** Custom React node for trailing icon */
  trailingIcon?: React.ReactNode;
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Button content/text */
  children?: React.ReactNode;
  /** Callback function called when button is clicked */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Story-only control for forcing visual state */
  forcedState?: "default" | "hover" | "focused" | "disabled";
}

/**
 * Derives hierarchy from size if not explicitly provided
 */
function getHierarchy(size?: ButtonProps["size"], explicitHierarchy?: ButtonProps["hierarchy"]): "secondary" | "primary" | "mode" {
  if (explicitHierarchy) {
    return explicitHierarchy;
  }
  if (size === "sm" || size === "md") {
    return "secondary";
  }
  return "primary";
}

export const Button: React.FC<ButtonProps> = ({
  size = "md",
  hierarchy,
  tone = "grey",
  state = "default",
  function: buttonFunction,
  showText = true,
  iconLeading = true,
  iconTrailing = false,
  leadingIconName,
  trailingIconName,
  leadingIcon,
  trailingIcon,
  fullWidth,
  disabled,
  className,
  children,
  onClick,
  ariaLabel,
  forcedState,
  ...rest
}) => {
  const effectiveHierarchy = getHierarchy(size, hierarchy);
  
  // Mode hierarchy enforces black tone
  const effectiveTone = effectiveHierarchy === "mode" ? "black" : tone;

  // Use state if provided, otherwise fall back to forcedState for backward compatibility
  const effectiveState = state !== "default" ? state : forcedState;

  // Sync disabled prop with state="disabled" for consistency
  const isDisabled = disabled || effectiveState === "disabled";

  // Dynamic Lucide icon resolution
  // Type assertion: Lucide icons are React components when accessed by name
  const LeadingIconComponent = leadingIconName
    ? (Lucide[leadingIconName] as React.ComponentType<{ strokeWidth?: number }> | undefined)
    : null;
  const TrailingIconComponent = trailingIconName
    ? (Lucide[trailingIconName] as React.ComponentType<{ strokeWidth?: number }> | undefined)
    : null;

  // Visibility and layout
  const hasLabel = !!children && showText !== false;
  const showLeading = !!(LeadingIconComponent || leadingIcon) && iconLeading === true;
  const showTrailing = !!(TrailingIconComponent || trailingIcon) && iconTrailing === true;
  const hasAnyIcon = showLeading || showTrailing;
  const iconOnly = hasAnyIcon && !hasLabel;

  const classes = ["arkem-btn", fullWidth && "is-fullwidth", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      disabled={isDisabled}
      onClick={onClick}
      data-size={size}
      data-tone={effectiveTone}
      data-hierarchy={effectiveHierarchy}
      data-function={buttonFunction}
      data-forced-state={effectiveState && effectiveState !== "default" ? effectiveState : undefined}
      data-disabled={isDisabled ? "true" : undefined}
      data-icon-only={iconOnly ? "true" : undefined}
      data-has-leading={showLeading ? "true" : "false"}
      data-has-trailing={showTrailing ? "true" : "false"}
      aria-label={ariaLabel || (iconOnly && children ? String(children) : undefined)}
      aria-disabled={isDisabled || undefined}
      {...rest}
    >
      {showLeading && (
        <span className="arkem-btn__icon arkem-btn__icon--lead" aria-hidden="true">
          {LeadingIconComponent
            ? React.createElement(LeadingIconComponent, { strokeWidth: 2 })
            : leadingIcon || null}
        </span>
      )}
      {hasLabel && <span className="arkem-btn__label">{children}</span>}
      {showTrailing && (
        <span className="arkem-btn__icon arkem-btn__icon--trail" aria-hidden="true">
          {TrailingIconComponent
            ? React.createElement(TrailingIconComponent, { strokeWidth: 2 })
            : trailingIcon || null}
        </span>
      )}
    </button>
  );
};

