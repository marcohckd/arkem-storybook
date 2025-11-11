import React, { ReactNode } from "react";
import "./Card.css";

export type CardHeaderProps = {
  children?: ReactNode;
  className?: string;
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
}) => {
  const classes = [
    "arkem-card__header",
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

