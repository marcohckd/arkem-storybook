import type { Meta, StoryObj } from '@storybook/react';
import { 
  Home, 
  Settings, 
  HelpCircle, 
  User, 
  MapPin, 
  BarChart3,
  FileText,
  Search
} from 'lucide-react';

import { NavMenu } from './NavMenu';

const meta: Meta<typeof NavMenu> = {
  title: 'Molecules/NavMenu',
  component: NavMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of navigation menu items',
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether the menu is in collapsed state',
    },
    onItemClick: {
      action: 'clicked',
      description: 'Callback function when a menu item is clicked',
      table: {
        type: { summary: '(id: string) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavMenu>;

// Mock menu items data
const defaultItems = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home />,
    isActive: true,
  },
  {
    id: 'maps',
    label: 'Maps',
    icon: <MapPin />,
    isActive: false,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 />,
    isActive: false,
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: <FileText />,
    isActive: false,
  },
  {
    id: 'search',
    label: 'Search',
    icon: <Search />,
    isActive: false,
  },
];

const itemsWithVariants = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home />,
    isActive: true,
  },
  {
    id: 'support',
    label: 'Support',
    icon: <HelpCircle />,
    variant: 'support' as const,
    isActive: false,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    variant: 'settings' as const,
    isActive: false,
  },
  {
    id: 'user',
    label: 'John Doe',
    email: 'john.doe@example.com',
    variant: 'user' as const,
    status: 'online' as const,
    isActive: false,
  },
];

const userWithAvatar = [
  {
    id: 'user',
    label: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
    variant: 'user' as const,
    status: 'online' as const,
  },
];

const userWithoutAvatar = [
  {
    id: 'user',
    label: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    variant: 'user' as const,
    status: 'online' as const,
  },
];

const userOffline = [
  {
    id: 'user',
    label: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    variant: 'user' as const,
    status: 'offline' as const,
  },
];

// Phase 2: Basic Stories
export const Default: Story = {
  args: {
    items: defaultItems,
    collapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    items: defaultItems,
    collapsed: true,
  },
};

export const WithActiveItem: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        icon: <Home />,
        isActive: true,
      },
      {
        id: 'maps',
        label: 'Maps',
        icon: <MapPin />,
        isActive: false,
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: <BarChart3 />,
        isActive: false,
      },
    ],
    collapsed: false,
  },
};

export const AllVariants: Story = {
  args: {
    items: itemsWithVariants,
    collapsed: false,
  },
};

// Phase 3: User Variant Stories
export const UserWithAvatar: Story = {
  args: {
    items: userWithAvatar,
    collapsed: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'User menu item with avatar image and online status indicator.',
      },
    },
  },
};

export const UserWithoutAvatar: Story = {
  args: {
    items: userWithoutAvatar,
    collapsed: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'User menu item without avatar, showing initials generated from name.',
      },
    },
  },
};

export const UserOffline: Story = {
  args: {
    items: userOffline,
    collapsed: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'User menu item with offline status (no status indicator shown).',
      },
    },
  },
};

export const UserCollapsed: Story = {
  args: {
    items: userWithAvatar,
    collapsed: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'User menu item in collapsed menu state, showing only avatar/initials.',
      },
    },
  },
};

// Phase 4: Interactive Stories
export const WithClickHandler: Story = {
  args: {
    items: defaultItems,
    collapsed: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu with click handler. Check the Actions panel to see clicked items.',
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    items: [],
    collapsed: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu with no items (empty array).',
      },
    },
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        icon: <Home />,
        isActive: true,
      },
    ],
    collapsed: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu with a single item.',
      },
    },
  },
};

// Additional comparison stories
export const ExpandedVsCollapsed: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-style-spacing-4px-8-32px)" }}>
      <div style={{ width: "256px" }}>
        <h3 style={{ color: "var(--semantic-text-primary)", fontSize: "var(--fonts-semantic-sm)", marginBottom: "var(--spacing-16)", fontWeight: "var(--font-weight-semibold)" }}>
          Expanded
        </h3>
        <NavMenu items={defaultItems} collapsed={false} />
      </div>
      <div style={{ width: "64px" }}>
        <h3 style={{ color: "var(--semantic-text-primary)", fontSize: "var(--fonts-semantic-sm)", marginBottom: "var(--spacing-16)", fontWeight: "var(--font-weight-semibold)" }}>
          Collapsed
        </h3>
        <NavMenu items={defaultItems} collapsed={true} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of expanded and collapsed menu states.',
      },
    },
  },
};

export const MixedActiveStates: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        icon: <Home />,
        isActive: true,
      },
      {
        id: 'maps',
        label: 'Maps',
        icon: <MapPin />,
        isActive: false,
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: <BarChart3 />,
        isActive: true,
      },
      {
        id: 'documents',
        label: 'Documents',
        icon: <FileText />,
        isActive: false,
      },
    ],
    collapsed: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu with multiple active items to show active state styling.',
      },
    },
  },
};

