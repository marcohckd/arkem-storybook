// src/components/templates/DeviceDetails/DeviceDetails.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { 
  Info, 
  Clock, 
  ShieldAlert,
  ChevronRight,
  AlertTriangle,
  Smartphone,
  Network,
  Server,
  LocateFixed,
  Brain
} from "lucide-react";

import { Button } from "../../atoms/Button/Button";
import { Badge } from "../../atoms/Badge/Badge";
import { Modal } from "../../organisms/Modal/Modal";

const meta: Meta<typeof Modal> = {
  title: "Templates/DeviceDetails",
  component: Modal,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--semantic-background-base)', minHeight: '100vh', padding: 'var(--spacing-20)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `> **Device Details Modal Template — A comprehensive multi-pane modal for displaying device information, timeline, and enrichment data**

---

## Overview

The Device Details modal is a complex template that demonstrates how to use the Modal component with a 2+1 layout format to display comprehensive device information. It showcases:

- **Device Information** (top left pane): Tabbed interface with Identity, Specs, Geolocation, and Observations
- **Device Timeline** (bottom left pane): Chronological list of device observations
- **Device Infrastructure** (right pane): Collapsible sections for Threat Assessment, Threat Intelligence, Network Infrastructure, and Services & Exposure

This template demonstrates proper tokenization, conditional visibility handling, and complex content organization patterns.

---

## Features

- Multi-pane layout (2+1 format)
- Tabbed content navigation
- Collapsible enrichment sections
- Conditional visibility for enrichment data
- Custom header with action buttons
- Footer with metadata
- Proper tokenization throughout

---

## Usage

\`\`\`tsx
import { Modal } from "../../organisms/Modal/Modal";

<Modal
  title="Device Details"
  format="2+1"
  isOpen={isOpen}
  onClose={onClose}
  showA={true}
  showB={true}
  showC={true}
/>
\`\`\`

---

## Token Usage

All styling uses semantic design tokens:
- Colors: \`var(--semantic-background-base)\`, \`var(--semantic-text-primary)\`, etc.
- Spacing: \`var(--spacing-8)\`, \`var(--spacing-12)\`, etc.
- Typography: \`var(--fonts-semantic-xs)\`, \`var(--fonts-semantic-sm)\`, etc.
- Borders: \`var(--semantic-border-muted)\`, \`var(--border-width-thin)\`, etc.`,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Wrapper component to manage isOpen state
const ModalWrapper: React.FC<{
  children: (props: { isOpen: boolean; onClose: () => void }) => React.ReactNode;
  initialOpen?: boolean;
}> = ({ children, initialOpen = true }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return <>{children({ isOpen, onClose: () => setIsOpen(false) })}</>;
};

// Helper function to populate Device Information pane
const populateDeviceInformation = (pane: Element) => {
  // Override pane height to allow content wrapping
  const paneElement = pane as HTMLElement;
  paneElement.style.height = 'auto';
  paneElement.style.alignSelf = 'start';
  paneElement.style.overflowY = 'visible';
  paneElement.style.overflowX = 'hidden';
  
  const container = document.createElement('div');
  pane.appendChild(container);
  const root = createRoot(container);

  const DeviceInformationContent = () => {
    const [activeTab, setActiveTab] = React.useState('Identity');

    const tabs = ['Identity', 'Specs', 'Geolocation', 'Observations'];
    
    // Enrichment flags for conditional visibility
    const enrichmentFlags = {
      geo_country: true,
      geo_city: true,
    } as const;

    // Metric type definition
    type Metric = { key?: string; label: string; value?: string; error?: boolean; critical?: boolean };
    
    // Define content for each tab
    const tabContent: Record<string, Array<Metric>> = {
      Identity: [
        { label: 'DEVICE ID:', value: '0251E342-6E4D-4207-A1AD-DD0C3D9BF553' },
        { label: 'USER ID:', value: '6E4D' },
        { label: 'IP ADDRESS:', value: '192.168.1.100' }
      ],
      Specs: [
        { label: 'DEVICE MODEL:', value: 'iPhone 13 Pro' },
        { label: 'OS VERSION:', value: 'iOS 16.5.1' },
        { label: 'SCREEN SIZE:', value: '6.1 inches' }
      ],
      Geolocation: [
        { key: 'geo_country', label: 'COUNTRY:', value: 'Iran' },
        { key: 'geo_city', label: 'CITY:', value: 'Tehran' }
      ],
      Observations: [
        { label: 'FIRST SEEN:', value: '2024-01-15' },
        { label: 'LAST SEEN:', value: '2025-08-01' },
        { label: 'TOTAL EVENTS:', value: '247' }
      ]
    };

    // Render metric row with conditional visibility
    const renderMetricRow = (
      metric: Metric,
      idx: number,
      total: number,
    ) => {
      const isLast = idx === total - 1;
      const key = metric.key;
      const isAvailable = key ? enrichmentFlags[key as keyof typeof enrichmentFlags] : true;

      const displayValue = isAvailable && metric.value ? metric.value : 'N/A';
      const isEmpty = !isAvailable || !metric.value;

      return (
        <div
          key={idx}
          className={`arkem-modal__metric-row${isEmpty ? ' arkem-modal__metric-row--empty' : ''}`}
          style={{
            display: 'flex',
            height: '42px',
            background: 'var(--semantic-background-raised)',
            borderBottom: !isLast
              ? 'var(--border-widths-mode-1-border-width-hairline) solid var(--semantic-border-muted)'
              : 'none',
          }}
        >
          {/* label cell */}
          <div
            style={{
              width: '100px',
              padding: 'var(--spacing-style-spacing-4px-3-12px) var(--spacing-style-spacing-4px-4-16px)',
              display: 'flex',
              alignItems: 'center',
              fontSize: 'var(--fonts-semantic-xs)',
              color: 'var(--semantic-text-secondary)',
              textTransform: 'uppercase',
            }}
          >
            {metric.label}
          </div>
          {/* value cell */}
          <div
            style={{
              flex: 1,
              padding: 'var(--spacing-style-spacing-4px-3-12px) var(--spacing-style-spacing-4px-4-16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              fontSize: 'var(--fonts-semantic-xs)',
              color: isEmpty
                ? 'var(--semantic-text-muted)'
                : metric.error
                  ? 'var(--semantic-feedback-error-base)'
                  : 'var(--semantic-text-primary)',
              fontWeight: metric.critical && !isEmpty
                ? 'var(--font-weight-semibold)'
                : 'var(--font-weight-regular)',
              textAlign: 'right',
            }}
          >
            {displayValue}
          </div>
        </div>
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {/* Sticky Header */}
        <div className="arkem-modal__pane-header">
          <Info className="arkem-modal__pane-header-icon" size={16} />
          <span className="arkem-modal__pane-header-text">Device Information</span>
        </div>

        {/* Content Container */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: 'var(--border-width-thin) solid var(--semantic-border-muted)',
            background: 'var(--semantic-background-raised)',
            flexShrink: 0
          }}>
            {tabs.map((tab, idx) => {
              const [isHovered, setIsHovered] = React.useState(false);
              const isActive = activeTab === tab;
              
              return (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    flex: 1,
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--fonts-semantic-xs)',
                    color: isActive 
                      ? 'var(--semantic-text-primary)' 
                      : isHovered 
                        ? 'var(--semantic-text-hover)' 
                        : 'var(--semantic-text-secondary-ii)',
                    background: isActive 
                      ? 'var(--semantic-background-raised)' 
                      : isHovered 
                        ? 'var(--semantic-background-action-hover)' 
                        : 'var(--semantic-background-base)',
                    borderRight: idx < tabs.length - 1 
                      ? 'var(--border-widths-mode-1-border-width-hairline) solid var(--semantic-border-muted)' 
                      : 'none',
                    cursor: 'pointer',
                    transition: 'color var(--transition-fast), background var(--transition-fast)',
                    fontWeight: isActive 
                      ? 'var(--font-weight-medium)' 
                      : 'var(--font-weight-regular)'
                  }}
                >
                  {tab}
                </div>
              );
            })}
          </div>

          {/* Tab Content - Metric rows */}
          <div style={{ 
            background: 'var(--semantic-background-raised)',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}>
            {tabContent[activeTab].map((metric, idx) => 
              renderMetricRow(metric, idx, tabContent[activeTab].length)
            )}
          </div>
        </div>
      </div>
    );
  };

  root.render(<DeviceInformationContent />);
};

// Helper function to populate Device Timeline pane
const populateDeviceTimeline = (pane: Element) => {
  const container = document.createElement('div');
  pane.appendChild(container);
  const root = createRoot(container);
  
  const timelineEntries = Array.from({ length: 7 }, (_, i) => ({
    date: 'Aug 1, 2025 • 08:11 PM • 75d ago',
    location: 'Phoenix, USA',
    id: '1207472156',
    coords: '33.3366, -111.7307'
  }));

  root.render(
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header */}
      <div className="arkem-modal__pane-header">
        <Clock className="arkem-modal__pane-header-icon" size={16} />
        <span className="arkem-modal__pane-header-text">Device Timeline</span>
        <span className="arkem-modal__pane-header-secondary">7 Observations</span>
      </div>

      {/* Timeline entries */}
      <div className="arkem-modal__pane-content" style={{ 
        flex: 1,
        minHeight: 0 
      }}>
        {timelineEntries.map((entry, idx) => (
          <div
            key={idx}
            style={{
              height: '56px',
              padding: 'var(--spacing-8) var(--spacing-style-spacing-4px-1-5-6px)',
              background: 'var(--color-fill-neutral-800)',
              borderBottom: 'var(--border-width-thin) solid var(--semantic-border-muted)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-4)',
              justifyContent: 'center'
            }}
          >
            <div style={{
              fontSize: 'var(--fonts-semantic-xxs)',
              color: 'var(--semantic-text-secondary)',
              textAlign: 'center'
            }}>
              {entry.date}
            </div>
            <div style={{
              fontSize: 'var(--fonts-semantic-xs)',
              color: 'var(--semantic-text-primary)',
              textAlign: 'center'
            }}>
              {entry.location} • {entry.id} • {entry.coords}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to populate Enrichment Data pane
const populateEnrichmentData = (pane: Element) => {
  const container = document.createElement('div');
  pane.appendChild(container);
  const root = createRoot(container);

  const sections = [
    {
      id: 'threat',
      title: 'Threat Assessment',
      count: 3,
      icon: 'AlertTriangle',
      metrics: [
        { 
          key: 'threat_score',
          label: 'THREAT SCORE:', 
          value: '87/100 [HIGH]', 
          critical: true 
        },
        { 
          key: 'honeypot',
          label: 'HONEYPOT:', 
          value: 'YES',
          critical: true 
        },
        { key: 'honeypot_probability', label: 'HONEYPOT PROBABILITY:', value: '85%' }
      ]
    },
    {
      id: 'intelligence',
      title: 'Threat Intelligence',
      count: 9,
      icon: 'ShieldAlert',
      metrics: [
        { key: 'pulse_count', label: 'PULSE COUNT:', value: '42 reports' },
        { key: 'passive_dns_count', label: 'PASSIVE DNS COUNT:', value: '228 resolutions' },
        { key: 'url_count', label: 'URL COUNT:', value: '34 URLs' },
        { key: 'primary_tag', label: 'PRIMARY TAG:', value: 'malware-distribution' },
        { key: 'tags', label: 'TAGS:', value: 'vpn, proxy +2' },
        { key: 'country', label: 'COUNTRY:', value: 'Iran (IR)' },
        { key: 'city', label: 'CITY:', value: 'Tehran' },
        { key: 'asn', label: 'ASN:', value: 'AS44244' },
        { key: 'malware_samples', label: 'MALWARE SAMPLES:', value: '15 detected' }
      ]
    },
    {
      id: 'network',
      title: 'Network Infrastructure',
      count: 7,
      icon: 'Network',
      metrics: [
        { key: 'organization', label: 'ORGANIZATION:', value: 'Iran Telecom PJS' },
        { key: 'hostname', label: 'HOSTNAME:', value: 'mx.isp.ir' },
        { key: 'network_asn', label: 'ASN:', value: 'AS58224' },
        { key: 'isp', label: 'ISP:', value: 'Iran Telecom PJS' },
        { key: 'network_name', label: 'NETWORK NAME:', value: 'RIPE-ERX-151' },
        { key: 'registration_status', label: 'REGISTRATION STATUS:', value: 'ASSIGNED PA' },
        { key: 'ip_os', label: 'IP OPERATING SYSTEM:', value: 'Linux 5.10' }
      ]
    },
    {
      id: 'services',
      title: 'Services & Exposure',
      count: 5,
      icon: 'Server',
      metrics: [
        { key: 'open_ports', label: 'OPEN PORTS:', value: '[80, 443, 8080]' },
        { key: 'services', label: 'SERVICES:', value: 'HTTP, HTTPS, SSH' },
        { key: 'vulnerabilities', label: 'VULNERABILITIES:', value: '3 CVEs ↗' },
        { key: 'discovered_domains', label: 'DISCOVERED DOMAINS:', value: '2 domains ↗' },
        { key: 'discovered_urls', label: 'DISCOVERED URLS:', value: '4 URLs ↗' }
      ]
    }
  ];

  // Helper function to get color based on threat level
  const getThreatLevelColor = (level?: string, isExpanded?: boolean): string => {
    // For threat-level sections, always use the threat color regardless of state
    if (level) {
      switch (level) {
        case 'critical':
          return 'var(--semantic-feedback-error-base)'; // #C55F5F - Red
        case 'high':
          return 'var(--color-fill-feedback-warning-500)'; // #A88940 - Orange
        case 'medium':
          return 'var(--semantic-brand-base)'; // #E0DD5B - Yellow
        case 'low':
          return 'var(--semantic-text-secondary)'; // #838383 - Grey
        default:
          return 'var(--semantic-text-primary)'; // #E5E5E5 - White
      }
    }
    
    // For non-threat sections, use tab-style active/inactive colors
    return isExpanded 
      ? 'var(--semantic-text-primary)'        // Active - white
      : 'var(--semantic-text-secondary-ii)';  // Inactive - brighter grey
  };

  const EnrichmentContent = () => {
    const [expanded, setExpanded] = React.useState<Set<string>>(new Set(['threat']));

    // Enrichment flags for conditional visibility
    const enrichmentFlags = {
      threat_score: true,
      honeypot: true,
      honeypot_probability: true,
      pulse_count: true,
      passive_dns_count: true,
      url_count: true,
      primary_tag: true,
      tags: true,
      country: true,
      city: true,
      asn: true,
      malware_samples: true,
      organization: true,
      hostname: true,
      network_asn: true,
      isp: true,
      network_name: true,
      registration_status: true,
      ip_os: true,
      open_ports: true,
      services: true,
      vulnerabilities: true,
      discovered_domains: true,
      discovered_urls: true,
    } as const;

    // Metric type definition
    type Metric = { key?: string; label: string; value?: string; error?: boolean; critical?: boolean };

    // Render metric row with conditional visibility
    const renderMetricRow = (
      metric: Metric,
      idx: number,
      total: number,
    ) => {
      const isLast = idx === total - 1;
      const key = metric.key;
      const isAvailable = key ? enrichmentFlags[key as keyof typeof enrichmentFlags] : true;

      const displayValue = isAvailable && metric.value ? metric.value : 'N/A';
      const isEmpty = !isAvailable || !metric.value;

      return (
        <div
          key={idx}
          className={`arkem-modal__metric-row${isEmpty ? ' arkem-modal__metric-row--empty' : ''}`}
          style={{
            display: 'flex',
            height: '42px',
            background: 'var(--semantic-background-raised)',
            borderBottom: !isLast
              ? 'var(--border-widths-mode-1-border-width-hairline) solid var(--semantic-border-muted)'
              : 'none',
          }}
        >
          {/* label cell */}
          <div
            style={{
              width: '180px',
              padding: 'var(--spacing-style-spacing-4px-3-12px) var(--spacing-style-spacing-4px-4-16px)',
              display: 'flex',
              alignItems: 'center',
              fontSize: 'var(--fonts-semantic-xs)',
              color: 'var(--semantic-text-secondary)',
              textTransform: 'uppercase',
            }}
          >
            {metric.label}
          </div>
          {/* value cell */}
          <div
            style={{
              flex: 1,
              padding: 'var(--spacing-style-spacing-4px-3-12px) var(--spacing-style-spacing-4px-4-16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              fontSize: 'var(--fonts-semantic-xs)',
              color: isEmpty
                ? 'var(--semantic-text-muted)'
                : metric.critical
                  ? 'var(--semantic-feedback-error-base)'
                  : 'var(--semantic-text-primary)',
              fontWeight: metric.critical && !isEmpty
                ? 'var(--font-weight-semibold)'
                : 'var(--font-weight-regular)',
              textAlign: 'right',
            }}
          >
            {displayValue}
          </div>
        </div>
      );
    };

    const toggle = (id: string) => {
      setExpanded(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Sticky Header */}
        <div className="arkem-modal__pane-header">
          <Network className="arkem-modal__pane-header-icon" size={16} />
          <span className="arkem-modal__pane-header-text">Device Infrastructure</span>
        </div>

        {/* Sections */}
        <div className="arkem-modal__pane-content">
          {sections.map(section => {
            const isExpanded = expanded.has(section.id);
            const [isHovered, setIsHovered] = React.useState(false);
            
            return (
              <div
                key={section.id}
                style={{
                  borderBottom: 'var(--border-width-thin) solid var(--semantic-border-muted)'
                }}
              >
                {/* Section Header */}
                <div
                  onClick={() => toggle(section.id)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '44px',
                    boxSizing: 'border-box',
                    padding: 'var(--spacing-8) var(--spacing-style-spacing-4px-4-16px)',
                    background: isExpanded 
                      ? 'var(--semantic-background-raised)' 
                      : isHovered 
                        ? 'var(--semantic-background-action-hover)' 
                        : 'var(--semantic-background-base)',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)'
                  }}
                >
                  {/* Left side: Icon (if present), Title and count */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-8)',
                    flex: 1
                  }}>
                    {(section as any).icon && (
                      <>
                        {(section as any).icon === 'AlertTriangle' ? (
                          <AlertTriangle 
                            size={16} 
                            style={{ 
                              color: getThreatLevelColor((section as any).threatLevel, isExpanded),
                              flexShrink: 0
                            }} 
                          />
                        ) : (section as any).icon === 'ShieldAlert' ? (
                          <ShieldAlert 
                            size={16} 
                            style={{ 
                              color: getThreatLevelColor((section as any).threatLevel, isExpanded),
                              flexShrink: 0
                            }} 
                          />
                        ) : (section as any).icon === 'Network' ? (
                          <Network 
                            size={16} 
                            style={{ 
                              color: getThreatLevelColor((section as any).threatLevel, isExpanded),
                              flexShrink: 0
                            }} 
                          />
                        ) : (section as any).icon === 'Server' ? (
                          <Server 
                            size={16} 
                            style={{ 
                              color: getThreatLevelColor((section as any).threatLevel, isExpanded),
                              flexShrink: 0
                            }} 
                          />
                        ) : null}
                      </>
                    )}
                    <span style={{
                      fontSize: 'var(--fonts-semantic-xs)',
                      color: getThreatLevelColor((section as any).threatLevel, isExpanded),
                      fontWeight: isExpanded 
                        ? 'var(--font-weight-medium)' 
                        : 'var(--font-weight-regular)',
                      transition: 'font-weight var(--transition-fast), color var(--transition-fast)'
                    }}>
                      {section.title}
                    </span>
                    <span style={{
                      fontSize: 'var(--fonts-semantic-xs)',
                      color: 'var(--semantic-text-muted)'
                    }}>
                      • {section.count} metrics
                    </span>
                  </div>
                  
                  {/* Right side: Expand/collapse arrow */}
                  <ChevronRight
                    className={`arkem-modal__chevron-icon ${isExpanded ? 'arkem-modal__chevron-icon--expanded' : ''}`}
                    size={16}
                    style={{
                      color: isExpanded 
                        ? 'var(--semantic-text-primary)' 
                        : isHovered 
                          ? 'var(--semantic-text-hover)' 
                          : 'var(--semantic-text-secondary-ii)',
                      marginLeft: 'var(--spacing-8)'
                    }}
                  />
                </div>

                {/* Metrics (when expanded) */}
                {isExpanded && (
                  <div>
                    {section.metrics.map((metric, idx) => 
                      renderMetricRow(metric as Metric, idx, section.metrics.length)
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  root.render(<EnrichmentContent />);
};

export const Default: Story = {
  tags: ["autodocs"],
  args: {
    format: "2+1",
    title: "Device Details",
    showA: true,  // Device Information (top left)
    showB: true,  // Device Timeline (bottom left)
    showC: true,  // Device Infrastructure (right)
  },
  parameters: {
    docs: {
      description: {
        story: `Device details modal demonstrating the enrichment metrics display pattern. The left column contains Device Information (top) and Device Timeline (bottom), while the right column displays comprehensive threat intelligence and network infrastructure data organized into collapsible sections with proper tokenization.`,
      },
    },
  },
  render: (args) => {
    const DeviceDetailsModal = () => {
      const [isOpen, setIsOpen] = useState(true);

      React.useEffect(() => {
        if (isOpen) {
          const timer = setTimeout(() => {
            // Override left-panes grid to allow first pane to wrap content
            const leftPanes = document.querySelector('.arkem-modal__left-panes') as HTMLElement;
            if (leftPanes) {
              leftPanes.style.gridTemplateRows = 'auto 1fr';
            }
            
            const panes = document.querySelectorAll('.arkem-modal__pane');
            if (panes.length === 3) {
              // Pane A: Device Information
              const paneA = panes[0];
              // Pane B: Device Timeline
              const paneB = panes[1];
              // Pane C: Device Infrastructure
              const paneC = panes[2];

              // Populate each pane with content
              populateDeviceInformation(paneA);
              populateDeviceTimeline(paneB);
              populateEnrichmentData(paneC);
            }
          }, 100);
          return () => clearTimeout(timer);
        }
      }, [isOpen]);

      return (
        <ModalWrapper>
          {({ isOpen, onClose }) => (
            <Modal
              {...args}
              isOpen={isOpen}
              onClose={onClose}
              header={
                <header className="arkem-header arkem-header--secondary">
                  <span className="arkem-header__leading-icon">
                    <Smartphone size={24} />
                  </span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <span className="arkem-header__label" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-12)' }}>
                      Device Details
                      <Badge 
                        variant="secondary"
                        style={{ 
                          fontSize: 'var(--fonts-semantic-xs)',
                          paddingTop: 'var(--spacing-style-spacing-4px-1-4px)',
                          paddingBottom: 'var(--spacing-style-spacing-4px-1-4px)',
                          paddingLeft: 'var(--spacing-12)',
                          paddingRight: 'var(--spacing-12)'
                        }}
                      >
                        0251E342-6E4D-4207-A1AD-DD0C3D9BF553
                      </Badge>
                    </span>
                  </div>
                  <div className="arkem-header__slot">
                    <Button
                      size="md"
                      hierarchy="secondary"
                      tone="black"
                      function="action"
                      trailingIconName="Network"
                      showText={false}
                      iconTrailing={true}
                      iconLeading={false}
                      ariaLabel="Network actions"
                      className="device-details-action-btn"
                    />
                    <Button
                      size="md"
                      hierarchy="secondary"
                      tone="black"
                      function="action"
                      trailingIconName="LocateFixed"
                      showText={false}
                      iconTrailing={true}
                      iconLeading={false}
                      ariaLabel="View connections"
                      className="device-details-action-btn"
                    />
                    <Button
                      size="md"
                      hierarchy="secondary"
                      tone="black"
                      function="action"
                      trailingIconName="Brain"
                      showText={false}
                      iconTrailing={true}
                      iconLeading={false}
                      ariaLabel="AI Assistant"
                      className="device-details-action-btn"
                    />
                    <Button
                      size="md"
                      hierarchy="secondary"
                      tone="black"
                      function="close"
                      iconTrailing={true}
                      trailingIconName="X"
                      showText={false}
                      iconLeading={false}
                      ariaLabel="Close"
                      onClick={onClose}
                    />
                  </div>
                </header>
              }
              footer={
                <div style={{ display: 'flex', gap: 'var(--spacing-16)' }}>
                  <div className="arkem-modal__footer-item">
                    <span className="arkem-modal__footer-label">IP UPDATED:</span>
                    <span className="arkem-modal__footer-value">2025-02-10 14:32</span>
                  </div>
                </div>
              }
            />
          )}
        </ModalWrapper>
      );
    };

    return <DeviceDetailsModal />;
  },
};

