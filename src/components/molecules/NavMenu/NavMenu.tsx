import React from "react";
import { ChevronsUpDown } from "lucide-react";
import "./NavMenu.css";

export interface NavMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  variant?: "default" | "support" | "settings" | "user";
  email?: string;
  avatar?: string;
  status?: "online" | "offline";
}

export interface NavMenuProps {
  items: NavMenuItem[];
  onItemClick?: (id: string) => void;
  collapsed?: boolean;
}

/**
 * NavMenu component for displaying navigation menu items with support for collapsed/expanded states.
 */
export const NavMenu: React.FC<NavMenuProps> = ({
  items,
  onItemClick,
  collapsed = false,
}) => {
  return (
    <div className="arkem-navmenu">
      {items.map((item) => {
        if (item.variant === "user") {
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                gap: collapsed ? "var(--spacing-0)" : "var(--spacing-12)",
                padding: "var(--spacing-8) var(--spacing-12)",
                borderRadius: "var(--radius-md)",
                border: "none",
                backgroundColor: "var(--semantic-background-muted)",
                color: "var(--semantic-text-primary)",
                cursor: "pointer",
                transition: "background-color var(--transition-base)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--semantic-background-interactive)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--semantic-background-muted)";
              }}
            >
              <div
                style={{
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "var(--semantic-background-interactive)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.label}
                      width={32}
                      height={32}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        color: "var(--semantic-text-primary)",
                        fontSize: "var(--fonts-semantic-sm)",
                        fontWeight: "var(--font-weight-medium)",
                      }}
                    >
                      {item.label
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>
                {item.status === "online" && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      right: "-2px",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "var(--semantic-feedback-success-base)",
                      borderRadius: "50%",
                      border: "2px solid var(--semantic-border-subtle)",
                    }}
                  />
                )}
              </div>
              {!collapsed && (
                <>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div
                      style={{
                        fontSize: "var(--fonts-semantic-sm)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--semantic-text-primary)",
                      }}
                    >
                      {item.label}
                    </div>
                    {item.email && (
                      <div
                        style={{
                          fontSize: "var(--fonts-semantic-xs)",
                          color: "var(--semantic-text-secondary)",
                        }}
                      >
                        {item.email}
                      </div>
                    )}
                  </div>
                  <ChevronsUpDown
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "var(--color-icon-neutral-50)",
                    }}
                  />
                </>
              )}
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: collapsed ? "0" : "var(--spacing-12)",
              padding: "var(--spacing-8) var(--spacing-12)",
              borderRadius: "var(--radius-md)",
              border: "none",
              backgroundColor: item.isActive
                ? "var(--semantic-background-muted)"
                : "transparent",
              color: item.isActive
                ? "var(--semantic-text-primary)"
                : "var(--semantic-text-secondary)",
              cursor: "pointer",
              transition: "all var(--transition-base)",
            }}
            onMouseEnter={(e) => {
              if (!item.isActive) {
                e.currentTarget.style.backgroundColor = "var(--semantic-background-interactive)";
                e.currentTarget.style.color = "var(--semantic-text-primary)";
              }
            }}
            onMouseLeave={(e) => {
              if (!item.isActive) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--semantic-text-secondary)";
              }
            }}
          >
            {item.icon && (
              <div className="arkem-navmenu__icon">
                {item.icon}
              </div>
            )}
            {!collapsed && (
              <span
                style={{
                  fontSize: "var(--fonts-semantic-sm)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

