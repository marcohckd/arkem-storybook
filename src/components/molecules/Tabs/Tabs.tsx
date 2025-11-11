import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import "./Tabs.css";

export interface TabsProps {
  /** Initial active tab value (uncontrolled) */
  defaultValue?: string;
  /** Active tab value (controlled) */
  value?: string;
  /** Callback function called when tab changes */
  onValueChange?: (value: string) => void;
  /** Tabs content, typically TabsList and TabsContent components */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}) => {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={`arkem-tabs ${className || ""}`}
    >
      {children}
    </TabsPrimitive.Root>
  );
};

export interface TabsListProps {
  /** Tabs trigger elements */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({
  children,
  className,
}) => {
  return (
    <TabsPrimitive.List className={`arkem-tabs__list ${className || ""}`}>
      {children}
    </TabsPrimitive.List>
  );
};

export interface TabsTriggerProps {
  /** Unique value identifying this tab */
  value: string;
  /** Tab trigger content */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
  /** Whether the tab is disabled */
  disabled?: boolean;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className,
  disabled,
}) => {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className={`arkem-tabs__trigger ${className || ""}`}
      disabled={disabled}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
};

export interface TabsContentProps {
  /** Value of the tab this content belongs to */
  value: string;
  /** Tab content */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className,
}) => {
  return (
    <TabsPrimitive.Content
      value={value}
      className={`arkem-tabs__content ${className || ""}`}
    >
      {children}
    </TabsPrimitive.Content>
  );
};

