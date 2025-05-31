import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// Determine site URL for Cloudflare + GitHub setup
const getSiteURL = () => {
  if (process.env.CF_PAGES_URL) {
    return process.env.CF_PAGES_URL;
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://tinkbyte.com';
  }
  return 'http://127.0.0.1:4321';
};

export default defineConfig({
  site: getSiteURL(),
  output: 'static', // Changed to static to avoid edge runtime issues
  adapter: cloudflare({
    imageService: 'compile',
  }),
  server: {
    host: '127.0.0.1',
    port: 4321,
  },
  integrations: [
    tailwind(), 
    react({
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
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    },
    build: {
      chunkSizeWarningLimit: 3000,
      rollupOptions: {
        external: [
          'stream',
          'util', 
          'fs',
          'path',
          'crypto',
          'buffer',
          'process',
          'node:*'
        ],
        output: {
          manualChunks: (id) => {
            // Keystatic dependencies - keep separate
            if (id.includes('node_modules/@keystatic')) {
              return 'vendor-keystatic';
            }
            
            // React dependencies
            if (id.includes('node_modules/react') || 
                id.includes('node_modules/react-dom') || 
                id.includes('node_modules/scheduler')) {
              return 'vendor-react';
            }
            
            // UI components
            if (id.includes('node_modules/@radix-ui') || 
                id.includes('node_modules/@headlessui')) {
              return 'vendor-ui-components';
            }
            
            // Exclude problematic packages from bundling
            if (id.includes('node_modules/reading-time') ||
                id.includes('node_modules/sanitize-html')) {
              return 'vendor-excluded';
            }
            
            // Standard dependencies
            if (id.includes('node_modules/') && !id.includes('astro')) {
              return 'vendor-dependencies';
            }
          }
        }
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      exclude: [
        '@keystatic/core',
        'reading-time',
        'sanitize-html'
      ],
    },
    ssr: {
      external: [
        'stream',
        'util',
        'fs', 
        'path',
        'crypto',
        'buffer',
        'process',
        'node:*',
        'reading-time',
        'sanitize-html'
      ],
      noExternal: [
        'react-dom',
        '@keystatic/core',
        '@keystatic/astro'
      ],
    },
  },
});
