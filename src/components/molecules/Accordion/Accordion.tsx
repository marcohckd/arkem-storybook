import * as React from "react";
import { LucideIcon } from "lucide-react";
import "./Accordion.css";

export interface AccordionSection {
  /** Unique identifier for the section */
  id: string;
  /** Section title */
  title: string;
  /** Number of items/metrics in the section */
  count?: number;
  /** Icon component from lucide-react */
  icon?: LucideIcon;
  /** Threat level for color coding (optional) */
  threatLevel?: "critical" | "high" | "medium" | "low";
  /** Section content */
  children: React.ReactNode;
}

export interface AccordionProps {
  /** Array of accordion sections */
  sections: AccordionSection[];
  /** Initially expanded section IDs */
  defaultExpanded?: string[];
  /** Controlled expanded section IDs */
  expanded?: string[];
  /** Callback when section expand/collapse state changes */
  onExpandedChange?: (expanded: string[]) => void;
  /** Additional CSS class name */
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  sections,
  defaultExpanded = [],
  expanded: controlledExpanded,
  onExpandedChange,
  className,
}) => {
  const [internalExpanded, setInternalExpanded] = React.useState<Set<string>>(
    new Set(defaultExpanded)
  );

  const expanded = controlledExpanded 
    ? new Set(controlledExpanded) 
    : internalExpanded;

  const toggle = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }

    if (onExpandedChange) {
      onExpandedChange(Array.from(newExpanded));
    } else {
      setInternalExpanded(newExpanded);
    }
  };

  return (
    <div className={`arkem-accordion ${className || ""}`}>
      {sections.map((section) => {
        const isExpanded = expanded.has(section.id);
        const [isHovered, setIsHovered] = React.useState(false);
        const Icon = section.icon;

        return (
          <div
            key={section.id}
            className="arkem-accordion__section"
            data-expanded={isExpanded}
          >
            <div
              className="arkem-accordion__header"
              onClick={() => toggle(section.id)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              data-hovered={isHovered}
              data-threat-level={section.threatLevel}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              aria-controls={`accordion-content-${section.id}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(section.id);
                }
              }}
            >
              <div className="arkem-accordion__header-left">
                {Icon && (
                  <Icon
                    size={16}
                    className="arkem-accordion__icon"
                    aria-hidden="true"
                  />
                )}
                <span className="arkem-accordion__title">{section.title}</span>
                {section.count !== undefined && (
                  <span className="arkem-accordion__count">
                    • {section.count} metrics
                  </span>
                )}
              </div>
              <svg
                className={`arkem-accordion__chevron ${isExpanded ? "arkem-accordion__chevron--expanded" : ""}`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {isExpanded && (
              <div
                id={`accordion-content-${section.id}`}
                className="arkem-accordion__content"
                role="region"
                aria-labelledby={`accordion-header-${section.id}`}
              >
                {section.children}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

