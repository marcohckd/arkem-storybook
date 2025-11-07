import React from "react";

import "./Label.css";

export interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
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

