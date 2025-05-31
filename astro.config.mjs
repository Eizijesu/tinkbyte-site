import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// Determine site URL for Cloudflare + GitHub setup
const getSiteURL = () => {
  // For Cloudflare Pages production
  if (process.env.CF_PAGES_URL) {
    return process.env.CF_PAGES_URL;
  }
  // For production (your custom domain)
  if (process.env.NODE_ENV === 'production') {
    return 'https://tinkbyte.com';
  }
  // For local development
  return 'http://127.0.0.1:4321';
};

// https://astro.build/config
export default defineConfig({
  site: getSiteURL(),
  output: 'server', 
  adapter: cloudflare({
    // Add polyfills for APIs that aren't available in the Cloudflare Workers environment
    runtime: {
      mode: 'local',
      type: 'pages',
    }
  }),
  server: {
    host: '127.0.0.1',
    port: 4321,
  },
  integrations: [
    tailwind(), 
    react({
      // Use the basic React renderer instead of server components
      experimentalReactChildren: false,
      include: ['**/react/*']
    }), 
    markdoc(), 
    keystatic()
  ],
  vite: {
    define: {
      'import.meta.env.SPOTIFY_CLIENT_ID': JSON.stringify(process.env.SPOTIFY_CLIENT_ID),
      'import.meta.env.SPOTIFY_CLIENT_SECRET': JSON.stringify(process.env.SPOTIFY_CLIENT_SECRET),
      'import.meta.env.SPOTIFY_REFRESH_TOKEN': JSON.stringify(process.env.SPOTIFY_REFRESH_TOKEN),
    },
    build: {
      chunkSizeWarningLimit: 3000,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Group Keystatic dependencies
            if (id.includes('node_modules/@keystatic')) {
              return 'vendor-keystatic';
            }
            
            // React and related dependencies
            if (id.includes('node_modules/react') || 
                id.includes('node_modules/react-dom') || 
                id.includes('node_modules/scheduler')) {
              return 'vendor-react';
            }
            
            // UI component libraries
            if (id.includes('node_modules/@radix-ui') || 
                id.includes('node_modules/@headlessui')) {
              return 'vendor-ui-components';
            }
            
            // Standard npm dependencies
            if (id.includes('node_modules/') && !id.includes('astro')) {
              return 'vendor-dependencies';
            }
          }
        }
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom']
    },
    // Add polyfills for MessageChannel
    ssr: {
      noExternal: ['react-dom'],
      // Add polyfill
      external: ['node:*'],
    },
    // Add polyfill for MessageChannel in the worker environment
    plugins: [
      {
        name: 'message-channel-polyfill',
        transform(code, id) {
          if (id.includes('react-dom') && code.includes('MessageChannel')) {
            // Insert a simple MessageChannel polyfill
            const polyfill = `
              // MessageChannel polyfill for Cloudflare Workers
              if (typeof MessageChannel === 'undefined') {
                globalThis.MessageChannel = class MessageChannel {
                  constructor() {
                    this.port1 = { postMessage: () => {} };
                    this.port2 = { postMessage: () => {} };
                  }
                };
              }
            `;
            return { code: polyfill + code };
          }
        }
      }
    ]
  },
});
