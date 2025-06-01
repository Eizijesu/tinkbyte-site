// astro.config.mjs - MINIMAL VERSION
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';

const getSiteURL = () => {
  if (process.env.CF_PAGES_URL || process.env.NODE_ENV === 'production') {
    return 'https://tinkbyte.com';
  }
  if (process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== 'main') {
    return process.env.CF_PAGES_URL || 'https://preview.tinkbyte.com';
  }
  return 'http://localhost:4321';
};

export default defineConfig({
  site: getSiteURL(),
  output: 'static',
  integrations: [
    tailwind(),
    react(),
    markdoc(),
    // keystatic(), // Temporarily removed
  ],
  vite: {
    define: {
      'import.meta.env.PUBLIC_SITE_URL': JSON.stringify(getSiteURL()),
    },
  },
});
