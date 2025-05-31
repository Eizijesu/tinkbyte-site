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
  adapter: cloudflare(),
  server: {
    host: '127.0.0.1',
    port: 4321,
  },
  integrations: [
    tailwind(), 
    react(), 
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
      // Set a higher warning limit since Keystatic admin is inherently large
      chunkSizeWarningLimit: 3000, 
      rollupOptions: {
        output: {
          // Configure manual chunks to better split your code
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
            
            // Editor related dependencies
            if (id.includes('node_modules/@lexical') || 
                id.includes('node_modules/slate') ||
                id.includes('node_modules/rich-text')) {
              return 'vendor-editor';
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
    // Optimize Keystatic specifically
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  },
});
