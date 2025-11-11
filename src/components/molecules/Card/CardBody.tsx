import React, { ReactNode } from "react";
import "./Card.css";

export type CardBodyProps = {
  /** Body content */
  children?: ReactNode;
  /** Additional CSS class name */
  className?: string;
};

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className,
}) => {
  const classes = [
    "arkem-card__body",
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

