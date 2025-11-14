import * as React from "react";
import { LucideIcon } from "lucide-react";
import "./List.css";

export interface ListItem {
  /** Unique identifier for the item */
  id?: string;
  /** Primary date/time text */
  date: string;
  /** Location or primary content line */
  location: string;
  /** Secondary identifier (e.g., observation ID) */
  observationId?: string;
  /** Coordinates or additional metadata */
  coords?: string;
}

export interface ListProps {
  /** Array of list items */
  items: ListItem[];
  /** Optional header with icon and title */
  header?: {
    icon?: LucideIcon;
    title: string;
    secondary?: string;
  };
  /** Additional CSS class name */
  className?: string;
  /** ARIA label for the list */
  ariaLabel?: string;
}

export const List: React.FC<ListProps> = ({
  items,
  header,
  className,
  ariaLabel,
}) => {
  const HeaderIcon = header?.icon;

  return (
    <div className={`arkem-list ${className || ""}`} role="list" aria-label={ariaLabel}>
      {header && (
        <div className="arkem-list__header">
          {HeaderIcon && (
            <HeaderIcon 
              className="arkem-list__header-icon" 
              size={16}
              aria-hidden="true"
            />
          )}
          <span className="arkem-list__header-text">{header.title}</span>
          {header.secondary && (
            <span className="arkem-list__header-secondary">{header.secondary}</span>
          )}
        </div>
      )}
      <div className="arkem-list__content">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className="arkem-list__item"
            role="listitem"
          >
            <div className="arkem-list__item-date">{item.date}</div>
            <div className="arkem-list__item-content">
              {item.location}
              {item.observationId && ` • ${item.observationId}`}
              {item.coords && ` • ${item.coords}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

