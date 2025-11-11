import React, { ReactNode } from "react";
import "./Card.css";

export type CardFooterProps = {
  /** Footer content */
  children?: ReactNode;
  /** Additional CSS class name */
  className?: string;
};

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
}) => {
  const classes = [
    "arkem-card__footer",
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

