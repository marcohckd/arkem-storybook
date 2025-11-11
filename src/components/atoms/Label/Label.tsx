import React from "react";

import "./Label.css";

export interface LabelProps {
  /** ID of the form control this label is associated with */
  htmlFor?: string;
  /** Label text content */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  className,
}) => {
  return (
    <label htmlFor={htmlFor} className={`arkem-label ${className || ""}`}>
      {children}
    </label>
  );
};

