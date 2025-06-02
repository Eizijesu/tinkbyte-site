import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';        // 👈 For rich content
import sitemap from '@astrojs/sitemap'; // 👈 For SEO

const getSiteURL = () => {
  if (process.env.CF_PAGES_URL) {
    return process.env.CF_PAGES_URL;
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://tinkbyte.com';
  }
  return 'http://localhost:4321';
};

export default defineConfig({
  site: getSiteURL(),
  output: 'static',
  integrations: [
    tailwind(),
    react(),
    mdx(),        // 👈 For .mdx articles
    sitemap(),    // 👈 Automatic sitemap generation
  ],
  vite: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
  },
});