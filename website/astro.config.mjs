import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

import node from '@astrojs/node';

export default defineConfig({
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
    adapter: vercel(),
});