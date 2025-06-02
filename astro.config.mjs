import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

const getSiteURL = () => {
  if (process.env.CF_PAGES_URL || process.env.NODE_ENV === 'production') {
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
  ],
  vite: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
  },
});
