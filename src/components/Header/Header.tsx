import React from "react";

import { Button } from "../Button/Button";

import "./Header.css";

export type HeaderProps = {
  hierarchy?: "primary" | "secondary";
  label: string;
  rightSlot?: React.ReactNode;
  featureCount?: number;
  functionCount?: number;
  close?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  hierarchy = "primary",
  label,
  rightSlot,
  featureCount = 0,
  functionCount = 0,
  close = false,
}) => {
  // Map Header hierarchy to Button sizes:
  // Header primary → Button sm (32px)
  // Header secondary → Button md (40px)
  const buttonSize = hierarchy === "primary" ? "sm" : "md";

  // Calculate total buttons to determine if actions container should render
  const hasActions = featureCount > 0 || functionCount > 0 || close;

  return (
    <header className={`arkem-header arkem-header--${hierarchy}`}>
      <span className="arkem-header__label">{label}</span>
      <div className="arkem-header__slot">
        {rightSlot}
        {hasActions && (
          <div className="arkem-header__actions">
            {/* Feature buttons */}
            {Array.from({ length: Math.min(featureCount || 0, 2) }).map((_, index) => (
              <Button
                key={`feature-${index}`}
                size={buttonSize}
                hierarchy="secondary"
                tone="black"
                function="feature"
                iconTrailing={true}
                trailingIconName="ArrowRight"
                showText={false}
                iconLeading={false}
                ariaLabel="Feature"
              />
            ))}
            {/* Function buttons */}
            {Array.from({ length: Math.min(functionCount || 0, 2) }).map((_, index) => (
              <Button
                key={`function-${index}`}
                size={buttonSize}
                hierarchy="secondary"
                tone="black"
                function="action"
                iconTrailing={true}
                trailingIconName="ArrowRight"
                showText={false}
                iconLeading={false}
                ariaLabel="Action"
              />
            ))}
            {/* Close button */}
            {close && (
              <Button
                key="close"
                size={buttonSize}
                hierarchy="secondary"
                tone="black"
                function="close"
                iconTrailing={true}
                trailingIconName="X"
                showText={false}
                iconLeading={false}
                ariaLabel="Close"
              />
            )}
          </div>
        )}
      </div>
    </header>
  );
};

