import type { StorybookConfig } from '@storybook/react-vite';
import type { UserConfig } from 'vite';

const config: StorybookConfig & { autodocs?: string } = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    // Disable a11y addon in dev for faster startup (can re-enable when needed)
    // '@storybook/addon-a11y',
    // Note: @storybook/addon-vitest is installed but only used for testing (vitest.setup.js)
    // Follower errors for 'storybook/status' and 'storybook/test-provider' are typically
    // harmless warnings that resolve after cache clear. They don't affect Storybook functionality.
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Enable autodocs globally for all stories with 'autodocs' tag
  // Type intersection needed as StorybookConfig types may not include this in v10
  autodocs: 'tag',
  typescript: {
    check: false,
    // Disable react-docgen in dev for faster startup (can re-enable if needed)
    reactDocgen: false,
    // Alternative: Use faster react-docgen if docs are needed
    // reactDocgen: 'react-docgen-typescript',
    // reactDocgenTypescriptOptions: {
    //   shouldExtractLiteralValuesFromEnum: true,
    //   propFilter: (prop) => {
    //     if (prop.parent) {
    //       if (/node_modules/.test(prop.parent.fileName)) return false;
    //       if (prop.parent.name === 'React') return false;
    //     }
    //     return true;
    //   },
    //   skipChildrenPropWithoutDoc: true,
    // },
  },
  async viteFinal(config: UserConfig) {
    // Determine the correct mode based on NODE_ENV
    const isProduction = process.env.NODE_ENV === 'production';
    const mode = isProduction ? 'production' : 'development';
    
    // Set mode appropriately
    config.mode = mode;
    
    // Ensure React runs in the correct mode
    // React checks both process.env.NODE_ENV and __DEV__ internally
    config.define = {
      ...config.define,
      'process.env.NODE_ENV': JSON.stringify(mode),
      '__DEV__': JSON.stringify(!isProduction),
      'global': 'globalThis',
    };
    
    // Configure build settings based on mode
    config.build = config.build || {};
    if (isProduction) {
      // Production: Enable minification and tree-shaking for dead code elimination
      config.build.minify = 'esbuild';
      config.build.terserOptions = undefined; // Use esbuild for faster builds
    } else {
      // Development: Disable minification for better debugging
      config.build.minify = false;
    }

    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = [
      ...(config.optimizeDeps.include || []),
      'lucide-react',
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-visually-hidden',
      // Include React and React-DOM to ensure proper NODE_ENV injection
      // This prevents the "React is running in production mode" error
      'react',
      'react-dom',
    ];
    
    // Exclude incompatible Storybook packages from optimization
    // These have version mismatches (v8 vs v10) and cause optimization errors
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps.exclude || []),
      '@storybook/theming',
      '@storybook/manager-api',
      // Note: React and React-DOM are now included (not excluded) to ensure
      // proper NODE_ENV injection and dead code elimination
    ];
    
    // Add resolve aliases to handle @storybook/theming v8 shim issues
    // The v8 shim tries to import from 'storybook/internal/theming' which doesn't exist in v10
    // We need to resolve these to work around the version mismatch
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      // Map internal/theming imports to the theming package itself
      // This allows the v8 shim to work with Storybook v10 by bypassing the shim
      'storybook/internal/theming': '@storybook/theming',
      'storybook/internal/theming/create': '@storybook/theming/create',
    };
    
    // Performance: Only force optimization when explicitly requested or cache is stale
    // This prevents lag from re-bundling on every startup
    // Use STORYBOOK_FORCE_OPTIMIZE=true to force, or storybook:clean script
    if (process.env.STORYBOOK_FORCE_OPTIMIZE === 'true') {
      config.optimizeDeps.force = true;
    }
    
    // Configure esbuild options for dependency optimization
    // Use the same mode as the main build to ensure consistency
    config.optimizeDeps.esbuildOptions = {
      ...config.optimizeDeps.esbuildOptions,
      target: 'esnext',
      // Reduce processing overhead
      legalComments: 'none',
      // Ensure React is optimized with the correct mode settings
      // This prevents React from detecting the wrong mode during pre-bundling
      define: {
        ...config.optimizeDeps.esbuildOptions?.define,
        'process.env.NODE_ENV': JSON.stringify(mode),
        '__DEV__': JSON.stringify(!isProduction),
        'process.env': '{}', // Prevent process.env from being replaced incorrectly
      },
      // Match minification settings to the build mode
      minify: isProduction,
      // Enable tree shaking in production for dead code elimination
      treeShaking: isProduction,
    };
    
    // Cache optimization results more aggressively
    config.optimizeDeps.holdUntilCrawlEnd = false;

    // Performance optimizations
    config.build = config.build || {};
    config.build.chunkSizeWarningLimit = 1000;
    // Source maps: disabled in dev for faster builds, enabled in production for debugging
    config.build.sourcemap = isProduction ? 'hidden' : false;
    // Improve build performance
    config.build.rollupOptions = {
      ...config.build.rollupOptions,
      output: {
        ...config.build.rollupOptions?.output,
        // Reduce chunking overhead
        manualChunks: undefined,
      },
    };
    
    // Faster HMR with optimized settings
    config.server = config.server || {};
    config.server.hmr = {
      ...(typeof config.server.hmr === 'object' && config.server.hmr ? config.server.hmr : {}),
      overlay: false, // Disable error overlay for faster HMR
      // Reduce HMR latency
      clientPort: 6006,
    };
    
    // Additional server performance optimizations
    config.server.fs = {
      ...config.server.fs,
      // Restrict file system access for better performance
      allow: ['..'],
      deny: ['.git', 'node_modules/.cache'],
    };
    
    // Performance: Reduce file watching overhead
    config.server.watch = {
      ...config.server.watch,
      // Ignore node_modules, build outputs, and common non-source files
      ignored: [
        '**/node_modules/**',
        '**/dist/**',
        '**/storybook-static/**',
        '**/.git/**',
        '**/coverage/**',
        '**/*.md',
        '**/sandbox/**',
        '**/audits/**',
      ],
      // Use polling only if native watching fails (slower but more reliable)
      usePolling: false,
      // Reduce watch interval
      interval: 1000,
    };

    // Configure base path for GitHub Pages deployment
    // This will be /arkem-design-system/ when deployed to GitHub Pages
    if (process.env.GITHUB_PAGES) {
      config.base = '/arkem-design-system/';
    }

    return config;
  },
};

export default config;

