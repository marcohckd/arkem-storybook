import React, { ReactNode } from "react";
import "./Card.css";

export type CardProps = {
  children?: ReactNode;
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

