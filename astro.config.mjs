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
  output: 'static', // Static output with Cloudflare adapter
  adapter: cloudflare({
    // Configure for static-only deployment
    mode: 'directory',
    functionPerRoute: false, // Disable function generation
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
      'import.meta.env.SPOTIFY_CLIENT_ID': JSON.stringify(process.env.SPOTIFY_CLIENT_ID || ''),
      'import.meta.env.SPOTIFY_CLIENT_SECRET': JSON.stringify(process.env.SPOTIFY_CLIENT_SECRET || ''),
      'import.meta.env.SPOTIFY_REFRESH_TOKEN': JSON.stringify(process.env.SPOTIFY_REFRESH_TOKEN || ''),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    },
    build: {
      target: 'es2020',
      chunkSizeWarningLimit: 3000,
      rollupOptions: {
        // Prevent Node.js modules from being bundled
        external: [
          'stream',
          'util', 
          'fs',
          'path',
          'crypto',
          'buffer',
          'process',
          'os',
          'child_process',
          'worker_threads',
          'node:*',
          /^node:/
        ],
        output: {
          format: 'es',
          manualChunks: (id) => {
            // Skip Node.js built-ins completely
            if (id.includes('stream') || 
                id.includes('util') || 
                id.includes('fs') ||
                id.includes('path') ||
                id.includes('crypto') ||
                id.includes('buffer')) {
              return null;
            }
            
            // Keystatic
            if (id.includes('@keystatic')) {
              return 'keystatic';
            }
            
            // React
            if (id.includes('react') || id.includes('scheduler')) {
              return 'react';
            }
            
            // Other vendors
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      exclude: [
        '@keystatic/core',
        'stream',
        'util',
        'fs',
        'path',
        'crypto',
        'buffer'
      ],
    },
    ssr: {
      // Since we're using static output, this won't be used
      // but keeping it for safety
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
    },
    resolve: {
      alias: {
        // Provide empty modules for Node.js built-ins
        'stream': 'data:text/javascript,export default {}',
        'util': 'data:text/javascript,export default {}',
        'fs': 'data:text/javascript,export default {}',
        'path': 'data:text/javascript,export default {}',
        'crypto': 'data:text/javascript,export default {}',
        'buffer': 'data:text/javascript,export default {}',
        'process': 'data:text/javascript,export default {}',
      }
    }
  },
});
