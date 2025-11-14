// src/components/molecules/Accordion/Accordion.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { 
  AlertTriangle, 
  ShieldAlert, 
  Network, 
  Server 
} from "lucide-react";

import { Accordion, AccordionSection } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Molecules/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
    backgrounds: { default: "arkem-base" },
    docs: {
      description: {
        component: `Accordion component for collapsible sections with expand/collapse functionality. Built with ARKEM Design System tokens.

## Features

- **Expand/Collapse**: Click headers to toggle section visibility
- **Keyboard Navigation**: Enter/Space to toggle sections
- **Threat Level Colors**: Optional color coding for threat levels
- **Metric Counts**: Display count of items in collapsed state
- **Accessibility**: Full ARIA support for screen readers

## Usage

\`\`\`tsx
<Accordion
  sections={[
    {
      id: "section1",
      title: "Section Title",
      count: 5,
      icon: AlertTriangle,
      children: <div>Section content</div>
    }
  ]}
  defaultExpanded={["section1"]}
/>
\`\`\`

## Token Usage

All styling uses semantic design tokens:
- Colors: \`var(--semantic-background-base)\`, \`var(--semantic-text-primary)\`, etc.
- Spacing: \`var(--spacing-8)\`, \`var(--spacing-12)\`, etc.
- Typography: \`var(--fonts-semantic-xs)\`, \`var(--fonts-semantic-sm)\`, etc.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    sections: {
      control: false,
      description: "Array of accordion sections",
    },
    defaultExpanded: {
      control: false,
      description: "Initially expanded section IDs",
    },
    expanded: {
      control: false,
      description: "Controlled expanded section IDs",
    },
    onExpandedChange: {
      action: "expanded changed",
      description: "Callback when expand/collapse state changes",
    },
    className: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// Helper function to render metric rows
type Metric = { 
  key?: string; 
  label: string; 
  value?: string; 
  error?: boolean; 
  critical?: boolean 
};

const renderMetricRow = (
  metric: Metric,
  idx: number,
  total: number,
) => {
  const isLast = idx === total - 1;
  const displayValue = metric.value || 'N/A';
  const isEmpty = !metric.value;

  return (
    <div
      key={idx}
      style={{
        display: 'flex',
        height: '42px',
        background: 'var(--semantic-background-raised)',
        borderBottom: !isLast
          ? 'var(--border-widths-mode-1-border-width-hairline) solid var(--semantic-border-muted)'
          : 'none',
      }}
    >
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
          fontStyle: isEmpty ? 'italic' : 'normal',
        }}
      >
        {displayValue}
      </div>
    </div>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default accordion with collapsible sections showing metric rows. Click section headers to expand or collapse content.",
      },
    },
  },
  render: () => {
    const sections: AccordionSection[] = [
      {
        id: "section1",
        title: "Threat Assessment",
        count: 3,
        icon: AlertTriangle,
        children: (
          <div>
            {[
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
              { 
                key: 'honeypot_probability', 
                label: 'HONEYPOT PROBABILITY:', 
                value: '85%' 
              },
            ].map((metric, idx) => 
              renderMetricRow(metric, idx, 3)
            )}
          </div>
        ),
      },
      {
        id: "section2",
        title: "Threat Intelligence",
        count: 9,
        icon: ShieldAlert,
        children: (
          <div>
            {[
              { key: 'pulse_count', label: 'PULSE COUNT:', value: '42 reports' },
              { key: 'passive_dns_count', label: 'PASSIVE DNS COUNT:', value: '228 resolutions' },
              { key: 'url_count', label: 'URL COUNT:', value: '34 URLs' },
              { key: 'primary_tag', label: 'PRIMARY TAG:', value: 'malware-distribution' },
              { key: 'tags', label: 'TAGS:', value: 'vpn, proxy +2' },
              { key: 'country', label: 'COUNTRY:', value: 'Iran (IR)' },
              { key: 'city', label: 'CITY:', value: 'Tehran' },
              { key: 'asn', label: 'ASN:', value: 'AS44244' },
              { key: 'malware_samples', label: 'MALWARE SAMPLES:', value: '15 detected' },
            ].map((metric, idx) => 
              renderMetricRow(metric, idx, 9)
            )}
          </div>
        ),
      },
      {
        id: "section3",
        title: "Network Infrastructure",
        count: 7,
        icon: Network,
        children: (
          <div>
            {[
              { key: 'organization', label: 'ORGANIZATION:', value: 'Iran Telecom PJS' },
              { key: 'hostname', label: 'HOSTNAME:', value: 'mx.isp.ir' },
              { key: 'network_asn', label: 'ASN:', value: 'AS58224' },
              { key: 'isp', label: 'ISP:', value: 'Iran Telecom PJS' },
              { key: 'network_name', label: 'NETWORK NAME:', value: 'RIPE-ERX-151' },
              { key: 'registration_status', label: 'REGISTRATION STATUS:', value: 'ASSIGNED PA' },
              { key: 'ip_os', label: 'IP OPERATING SYSTEM:', value: 'Linux 5.10' },
            ].map((metric, idx) => 
              renderMetricRow(metric, idx, 7)
            )}
          </div>
        ),
      },
    ];

    return (
      <div style={{ width: "500px" }}>
        <Accordion sections={sections} defaultExpanded={["section1"]} />
      </div>
    );
  },
};

export const DeviceInfrastructure: Story = {
  tags: ['!dev'],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Device Infrastructure variant extracted from the Device Details modal. Shows collapsible sections with threat assessment data, including metric counts in collapsed state and detailed metric rows when expanded. Demonstrates both collapsed (showing metric counts like '• 3 metrics' with chevron) and expanded states (showing actual metric data like 'THREAT SCORE: 87/100 [HIGH]').",
      },
    },
  },
  render: () => {
    const sections: AccordionSection[] = [
      {
        id: "threat",
        title: "Threat Assessment",
        count: 3,
        icon: AlertTriangle,
        children: (
          <div>
            {[
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
              { 
                key: 'honeypot_probability', 
                label: 'HONEYPOT PROBABILITY:', 
                value: '85%' 
              },
            ].map((metric, idx) => 
              renderMetricRow(metric, idx, 3)
            )}
          </div>
        ),
      },
      {
        id: "intelligence",
        title: "Threat Intelligence",
        count: 9,
        icon: ShieldAlert,
        children: (
          <div>
            {[
              { key: 'pulse_count', label: 'PULSE COUNT:', value: '42 reports' },
              { key: 'passive_dns_count', label: 'PASSIVE DNS COUNT:', value: '228 resolutions' },
              { key: 'url_count', label: 'URL COUNT:', value: '34 URLs' },
              { key: 'primary_tag', label: 'PRIMARY TAG:', value: 'malware-distribution' },
              { key: 'tags', label: 'TAGS:', value: 'vpn, proxy +2' },
              { key: 'country', label: 'COUNTRY:', value: 'Iran (IR)' },
              { key: 'city', label: 'CITY:', value: 'Tehran' },
              { key: 'asn', label: 'ASN:', value: 'AS44244' },
              { key: 'malware_samples', label: 'MALWARE SAMPLES:', value: '15 detected' },
            ].map((metric, idx) => 
              renderMetricRow(metric, idx, 9)
            )}
          </div>
        ),
      },
      {
        id: "network",
        title: "Network Infrastructure",
        count: 7,
        icon: Network,
        children: (
          <div>
            {[
              { key: 'organization', label: 'ORGANIZATION:', value: 'Iran Telecom PJS' },
              { key: 'hostname', label: 'HOSTNAME:', value: 'mx.isp.ir' },
              { key: 'network_asn', label: 'ASN:', value: 'AS58224' },
              { key: 'isp', label: 'ISP:', value: 'Iran Telecom PJS' },
              { key: 'network_name', label: 'NETWORK NAME:', value: 'RIPE-ERX-151' },
              { key: 'registration_status', label: 'REGISTRATION STATUS:', value: 'ASSIGNED PA' },
              { key: 'ip_os', label: 'IP OPERATING SYSTEM:', value: 'Linux 5.10' },
            ].map((metric, idx) => 
              renderMetricRow(metric, idx, 7)
            )}
          </div>
        ),
      },
      {
        id: "services",
        title: "Services & Exposure",
        count: 5,
        icon: Server,
        children: (
          <div>
            {[
              { key: 'open_ports', label: 'OPEN PORTS:', value: '[80, 443, 8080]' },
              { key: 'services', label: 'SERVICES:', value: 'HTTP, HTTPS, SSH' },
              { key: 'vulnerabilities', label: 'VULNERABILITIES:', value: '3 CVEs ↗' },
              { key: 'discovered_domains', label: 'DISCOVERED DOMAINS:', value: '2 domains ↗' },
              { key: 'discovered_urls', label: 'DISCOVERED URLS:', value: '4 URLs ↗' },
            ].map((metric, idx) => 
              renderMetricRow(metric, idx, 5)
            )}
          </div>
        ),
      },
    ];

    return (
      <div style={{ 
        width: "500px",
        border: 'var(--border-width-thin) solid var(--semantic-border-subtle)',
        background: 'var(--semantic-background-base)',
      }}>
        <Accordion sections={sections} defaultExpanded={["threat"]} />
      </div>
    );
  },
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Controlled accordion where expanded state is managed externally. Use the expanded prop and onExpandedChange callback to control which sections are open.",
      },
    },
  },
  render: () => {
    const [expanded, setExpanded] = useState<string[]>(["section1"]);

    const sections: AccordionSection[] = [
      {
        id: "section1",
        title: "Threat Assessment",
        count: 3,
        icon: AlertTriangle,
        children: (
          <div>
            {[
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
              { 
                key: 'honeypot_probability', 
                label: 'HONEYPOT PROBABILITY:', 
                value: '85%' 
              },
            ].map((metric, idx) => 
              renderMetricRow(metric, idx, 3)
            )}
          </div>
        ),
      },
      {
        id: "section2",
        title: "Threat Intelligence",
        count: 9,
        icon: ShieldAlert,
        children: (
          <div>
            {[
              { key: 'pulse_count', label: 'PULSE COUNT:', value: '42 reports' },
              { key: 'passive_dns_count', label: 'PASSIVE DNS COUNT:', value: '228 resolutions' },
              { key: 'url_count', label: 'URL COUNT:', value: '34 URLs' },
              { key: 'primary_tag', label: 'PRIMARY TAG:', value: 'malware-distribution' },
              { key: 'tags', label: 'TAGS:', value: 'vpn, proxy +2' },
              { key: 'country', label: 'COUNTRY:', value: 'Iran (IR)' },
              { key: 'city', label: 'CITY:', value: 'Tehran' },
              { key: 'asn', label: 'ASN:', value: 'AS44244' },
              { key: 'malware_samples', label: 'MALWARE SAMPLES:', value: '15 detected' },
            ].map((metric, idx) => 
              renderMetricRow(metric, idx, 9)
            )}
          </div>
        ),
      },
    ];

    return (
      <div style={{ width: "500px" }}>
        <Accordion 
          sections={sections} 
          expanded={expanded}
          onExpandedChange={setExpanded}
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: "Accordion sections with icons and threat level color coding. Icons are displayed next to section titles and sections are color-coded based on threat levels.",
      },
    },
  },
  render: () => {
    const sections: AccordionSection[] = [
      {
        id: "critical",
        title: "Critical Alerts",
        count: 5,
        icon: AlertTriangle,
        threatLevel: "critical",
        children: (
          <div>
            {[
              { 
                key: 'alert_1',
                label: 'ALERT TYPE:', 
                value: 'Malware Detected', 
                critical: true 
              },
              { 
                key: 'alert_2',
                label: 'SEVERITY:', 
                value: 'CRITICAL',
                critical: true 
              },
              { 
                key: 'alert_3',
                label: 'AFFECTED SYSTEMS:', 
                value: '15 systems' 
              },
              { 
                key: 'alert_4',
                label: 'LAST DETECTED:', 
                value: '2 minutes ago' 
              },
              { 
                key: 'alert_5',
                label: 'STATUS:', 
                value: 'Active' 
              },
            ].map((metric, idx) => 
              renderMetricRow(metric, idx, 5)
            )}
          </div>
        ),
      },
      {
        id: "high",
        title: "High Priority",
        count: 3,
        icon: ShieldAlert,
        threatLevel: "high",
        children: (
          <div>
            {[
              { 
                key: 'priority_1',
                label: 'PRIORITY TYPE:', 
                value: 'Security Warning' 
              },
              { 
                key: 'priority_2',
                label: 'AFFECTED SYSTEMS:', 
                value: '8 systems' 
              },
              { 
                key: 'priority_3',
                label: 'LAST DETECTED:', 
                value: '1 hour ago' 
              },
            ].map((metric, idx) => 
              renderMetricRow(metric, idx, 3)
            )}
          </div>
        ),
      },
      {
        id: "normal",
        title: "Normal",
        count: 2,
        icon: Network,
        children: (
          <div>
            {[
              { 
                key: 'normal_1',
                label: 'SYSTEM STATUS:', 
                value: 'Operational' 
              },
              { 
                key: 'normal_2',
                label: 'LAST CHECKED:', 
                value: '5 minutes ago' 
              },
            ].map((metric, idx) => 
              renderMetricRow(metric, idx, 2)
            )}
          </div>
        ),
      },
    ];

    return (
      <div style={{ width: "500px" }}>
        <Accordion sections={sections} defaultExpanded={["critical"]} />
      </div>
    );
  },
};

