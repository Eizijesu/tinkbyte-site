import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// Determine site URL based on environment
const getSiteURL = () => {
  // For production on tinkbyte.com
  if (process.env.CF_PAGES_URL || process.env.NODE_ENV === 'production') {
    return 'https://tinkbyte.com';
  }
  // For Cloudflare preview deployments
  if (process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== 'main') {
    return process.env.CF_PAGES_URL || 'https://preview.tinkbyte.com';
  }
  // For local development
  return 'http://localhost:4321';
};

// https://astro.build/config
export default defineConfig({
  site: getSiteURL(),
  output: 'static', // Perfect for Cloudflare Pages + Keystatic
  integrations: [
    tailwind(),
    react(),
    markdoc(),
    keystatic(),
  ],
  vite: {
    define: {
      // Public environment variables for client-side
      'import.meta.env.PUBLIC_SITE_URL': JSON.stringify(getSiteURL()),
    },
  },
  // Optimize for static deployment
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
  },
  // Image optimization for static builds
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});