import React, { useState } from "react";
import "./MapPin.css";

export type MapPinType =
  | "device"
  | "poi-prison"
  | "poi-police"
  | "poi-courthouse"
  | "poi-nightclub"
  | "poi-bar"
  | "poi-stripclub"
  | "poi-marketplace"
  | "poi-casino"
  | "poi-bus-station"
  | "poi-community-centre"
  | "poi-shelter"
  | "poi-place-of-worship"
  | "poi-point-generic"
  | "event"
  | "incident-crime"
  | "incident-emergency"
  | "incident-security";

export type MapPinState = "default" | "hover" | "active" | "selected" | "dimmed";

export interface MapPinProps {
  /** Type of map pin */
  type: MapPinType;
  /** Current state of the pin */
  state?: MapPinState;
  /** Label text displayed below the pin */
  label?: string;
  /** Whether to show the label (default: false for non-POI pins, true for POI pins) */
  showLabel?: boolean;
  /** Whether the pin should pulse (for active/live items) */
  pulse?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Click handler */
  onClick?: () => void;
  /** Mouse enter handler */
  onMouseEnter?: () => void;
  /** Mouse leave handler */
  onMouseLeave?: () => void;
}

/**
 * Truncates a device ID to show first 4 and last 4 characters with ellipsis.
 * Example: "0251E342-6E4D-4207-A1AD-DD0C3D9BF553" -> "0251...F553"
 */
const truncateDeviceId = (deviceId: string): string => {
  if (deviceId.length <= 12) return deviceId;
  return `${deviceId.slice(0, 4)}...${deviceId.slice(-4)}`;
};

/**
 * Checks if a string looks like a device ID (UUID format).
 */
const isDeviceId = (text: string): boolean => {
  // Check for UUID format: 8-4-4-4-12 hex characters
  return /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(text);
};

/**
 * MapPin component for geospatial intelligence map visualizations.
 * Displays a fixed 4px pin with optional label and pulse animation.
 * Device pins automatically truncate device IDs in default state and expand on hover.
 */
export const MapPin: React.FC<MapPinProps> = ({
  type,
  state = "default",
  label,
  showLabel,
  pulse = false,
  className,
  style,
  ariaLabel,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // POI pins show labels by default, others default to false
  const shouldShowLabel = showLabel !== undefined 
    ? showLabel 
    : type.startsWith("poi-");
  
  // Determine if we should show truncated or full label for device pins
  const shouldTruncate = type === "device" && label && isDeviceId(label);
  const displayLabel = shouldTruncate && !isHovered && state !== "hover" 
    ? truncateDeviceId(label) 
    : label;

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);
    onMouseEnter?.();
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setIsHovered(false);
    onMouseLeave?.();
  };

  return (
    <div
      className={`arkem-map-pin ${className || ""}`}
      data-type={type}
      data-state={state}
      data-pulse={pulse}
      data-hovered={isHovered}
      style={style}
      aria-label={ariaLabel || label || `${type} pin`}
      role="button"
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="arkem-map-pin__marker" />
      {shouldShowLabel && label && (
        <div className="arkem-map-pin__label" aria-hidden="true">
          <span className="arkem-map-pin__label-text">{displayLabel}</span>
          {shouldTruncate && (
            <span className="arkem-map-pin__label-full" aria-hidden="true">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

