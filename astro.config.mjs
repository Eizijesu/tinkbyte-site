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
  output: 'server', // Changed from 'hybrid' to 'server' for Keystatic compatibility
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
  },
});
