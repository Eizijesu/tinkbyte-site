import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

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
  output: 'static', // This MUST be static
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
      'import.meta.env.SPOTIFY_CLIENT_ID': JSON.stringify(process.env.SPOTIFY_CLIENT_ID || ''),
      'import.meta.env.SPOTIFY_CLIENT_SECRET': JSON.stringify(process.env.SPOTIFY_CLIENT_SECRET || ''),
      'import.meta.env.SPOTIFY_REFRESH_TOKEN': JSON.stringify(process.env.SPOTIFY_REFRESH_TOKEN || ''),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    },
  },
});
