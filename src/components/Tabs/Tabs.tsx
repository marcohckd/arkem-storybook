import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import "./Tabs.css";

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
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
  children: React.ReactNode;
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
  value: string;
  children: React.ReactNode;
  className?: string;
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
  value: string;
  children: React.ReactNode;
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

