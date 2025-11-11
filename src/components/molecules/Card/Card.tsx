import React, { ReactNode } from "react";
import "./Card.css";

export type CardProps = {
  /** Card content, typically CardHeader, CardBody, and/or CardFooter components */
  children?: ReactNode;
  /** Additional CSS class name */
  className?: string;
};

export const Card: React.FC<CardProps> = ({
  children,
  className,
}) => {
  const classes = [
    "arkem-card",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

