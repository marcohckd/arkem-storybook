import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { Header } from "../Header/Header";
import { Button } from "../../atoms/Button/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../molecules/Tabs/Tabs";
import { ModuleAccessTab, ModuleKey } from "./tabs/ModuleAccessTab";
import { GeographyTab, GeographyRow } from "./tabs/GeographyTab";
import { LimitsTab, LimitsConfig } from "./tabs/LimitsTab";
import { PrivacyTab, PrivacyState } from "./tabs/PrivacyTab";
import { useOverlay } from "../../hooks/useOverlay";

import "./Drawer.css";

export type UserConfigDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
  initialEnabledModules?: ModuleKey[];
  initialGeography?: GeographyRow[];
  initialLimits?: LimitsConfig;
  initialPrivacy?: PrivacyState;
  onSave?: (payload: {
    enabledModules: ModuleKey[];
    geography?: GeographyRow[];
    limits?: LimitsConfig;
    privacy?: PrivacyState;
    userEmail: string;
  }) => void;
  header?: React.ReactNode; // Custom header element (alternative to default Header)
};

export const Drawer: React.FC<UserConfigDrawerProps> = ({
  open,
  onOpenChange,
  user,
  initialEnabledModules = [],
  initialGeography = [],
  initialLimits = { query: 10000, storage: 100, window: "Daily" },
  initialPrivacy = { hashEmail: false, hashPhone: false, maskIP: false, maskLocation: false },
  onSave,
  header,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("modules");
  const [enabledModules, setEnabledModules] = useState<ModuleKey[]>(initialEnabledModules);
  const [selectedGeography, setSelectedGeography] = useState<string[]>([]);
  const [limits, setLimits] = useState<LimitsConfig>(initialLimits);
  const [privacy, setPrivacy] = useState<PrivacyState>(initialPrivacy);
  const [isDirty, setIsDirty] = useState(false);

  // Track previous user to detect changes
  const prevUserRef = useRef<typeof user>(null);
  
  // Track dirty state - use refs to store initial values when user changes
  const initialModulesRef = useRef(initialEnabledModules);
  const initialLimitsRef = useRef(initialLimits);
  const initialPrivacyRef = useRef(initialPrivacy);

  // Reset state only when user changes (not when initial props change)
  useEffect(() => {
    if (user && user !== prevUserRef.current) {
      // Update refs with new initial values
      initialModulesRef.current = initialEnabledModules;
      initialLimitsRef.current = initialLimits;
      initialPrivacyRef.current = initialPrivacy;
      
      // Reset state
      setEnabledModules(initialEnabledModules);
      setSelectedGeography([]);
      setLimits(initialLimits);
      setPrivacy(initialPrivacy);
      setIsDirty(false);
      setActiveTab("modules");
      prevUserRef.current = user;
    } else if (!prevUserRef.current && user) {
      // Initialize refs on first mount
      initialModulesRef.current = initialEnabledModules;
      initialLimitsRef.current = initialLimits;
      initialPrivacyRef.current = initialPrivacy;
      prevUserRef.current = user;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // Only depend on user, not initial props (intentionally)

  useEffect(() => {
    const dirty =
      JSON.stringify(enabledModules) !== JSON.stringify(initialModulesRef.current) ||
      JSON.stringify(limits) !== JSON.stringify(initialLimitsRef.current) ||
      JSON.stringify(privacy) !== JSON.stringify(initialPrivacyRef.current);
    setIsDirty(dirty);
  }, [enabledModules, limits, privacy]);

  // Use overlay hook for shared functionality
  useOverlay({
    isOpen: open,
    onClose: () => onOpenChange(false),
    containerRef: drawerRef,
    preventBodyScroll: true,
    enableFocusTrap: true,
    enableEscape: true,
  });

  // Stable callbacks for tab onChange handlers - must be before early return
  const handleLimitsChange = useCallback((config: LimitsConfig) => {
    setLimits(config);
  }, []);

  const handlePrivacyChange = useCallback((state: PrivacyState) => {
    setPrivacy(state);
  }, []);

  const handleCancel = useCallback(() => {
    setEnabledModules(initialModulesRef.current);
    setLimits(initialLimitsRef.current);
    setPrivacy(initialPrivacyRef.current);
    setIsDirty(false);
    onOpenChange(false);
  }, [onOpenChange]);

  const handleSave = useCallback(() => {
    if (!user) return;
    onSave?.({
      enabledModules,
      limits,
      privacy,
      userEmail: user.email,
    });
    setIsDirty(false);
    onOpenChange(false);
  }, [user, enabledModules, limits, privacy, onSave, onOpenChange]);

  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  }, [onOpenChange]);

  // Handle exit animation before unmounting
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else if (shouldRender) {
      // Start exit animation, then unmount after transition completes
      timeoutRef.current = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match CSS transition duration
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [open, shouldRender]);

  // Don't render if not open and not animating
  if (!shouldRender) return null;

  return (
    <div
      className="arkem-drawer-overlay"
      onClick={handleBackdropClick}
      aria-hidden={!open}
      data-state={open ? "open" : "closed"}
    >
      <div
        ref={drawerRef}
        className="arkem-drawer arkem-drawer--right"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        aria-describedby="drawer-description"
      >
        <VisuallyHidden.Root>
          <h2 id="drawer-title">Configure User Access</h2>
          <p id="drawer-description">
            Configure access settings for {user?.name || "user"}
          </p>
        </VisuallyHidden.Root>

        {/* Sticky Header */}
        <div className="arkem-drawer__header-sticky">
          {header ? (
            header
          ) : (
            <>
              <Header
                hierarchy="secondary"
                label="Configure User Access"
                rightSlot={
                  <Button
                    size="md"
                    hierarchy="secondary"
                    tone="black"
                    function="close"
                    iconTrailing={true}
                    trailingIconName="X"
                    showText={false}
                    onClick={() => onOpenChange(false)}
                    ariaLabel="Close drawer"
                  />
                }
              />
              {user && (
                <div className="arkem-drawer__user-info">
                  <div
                    style={{
                      fontSize: "var(--fonts-semantic-md)",
                      fontWeight: "var(--font-weight-medium)",
                      color: "var(--semantic-text-primary)",
                    }}
                  >
                    {user.name}
                  </div>
                  <div
                    style={{
                      fontSize: "var(--fonts-semantic-sm)",
                      color: "var(--semantic-text-secondary)",
                    }}
                  >
                    {user.email} • {user.role}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="arkem-drawer__body">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="geography">Geography</TabsTrigger>
              <TabsTrigger value="limits">Limits</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>
            <TabsContent value="modules">
              <ModuleAccessTab
                enabledModules={enabledModules}
                onModulesChange={setEnabledModules}
              />
            </TabsContent>
            <TabsContent value="geography">
              <GeographyTab
                initialData={initialGeography}
                selectedRows={selectedGeography}
                onSelectionChange={setSelectedGeography}
              />
            </TabsContent>
            <TabsContent value="limits">
              <LimitsTab
                initialQuery={limits.query}
                initialStorage={limits.storage}
                initialWindow={limits.window}
                onChange={handleLimitsChange}
              />
            </TabsContent>
            <TabsContent value="privacy">
              <PrivacyTab initial={privacy} onChange={handlePrivacyChange} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sticky Footer */}
        <div className="arkem-drawer__footer-sticky">
          <Button
            size="md"
            hierarchy="secondary"
            tone="grey"
            function="action"
            onClick={handleCancel}
            ariaLabel="Cancel"
            leadingIconName="X"
            iconLeading={true}
          >
            Cancel
          </Button>
          <Button
            size="md"
            hierarchy="secondary"
            tone="color"
            onClick={handleSave}
            disabled={!isDirty}
            ariaLabel="Save changes"
            leadingIconName="Check"
            iconLeading={true}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
