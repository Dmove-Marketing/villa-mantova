import { defineConfig } from 'astro/config';

// Domínio ainda não definido: quando existir, adicione `site: 'https://<dominio>'`
// (usado em canonical/OG/sitemap) e preencha config.json > domain e deploy.remote_path.
export default defineConfig({
  output: 'static',
  prefetch: true,
  build: {
    inlineStylesheets: 'always',
  },
  server: {
    port: 4321,
  },
});
