import { defineConfig } from 'astro/config';

// `site` é usado em canonical e dados estruturados; mantenha igual ao config.json > domain.
export default defineConfig({
  site: 'https://villamantova.com.br',
  output: 'static',
  prefetch: true,
  build: {
    inlineStylesheets: 'always',
  },
  server: {
    port: 4321,
  },
});
