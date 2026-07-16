// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Site pages are static; only the /keystatic admin + its API route render
  // on-demand (the Keystatic integration opts those routes into SSR).
  integrations: [react(), keystatic()],
  adapter: vercel(),
});
