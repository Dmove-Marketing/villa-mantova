import { defineConfig } from 'astro/config';

// Domínio ainda não definido: quando existir, adicione `site: 'https://<dominio>'`
// (usado em canonical/OG/sitemap) e preencha config.json > domain e deploy.remote_path.
export default defineConfig({
  output: 'static',
  prefetch: true,
  build: {
    inlineStylesheets: 'always',
  },
  // Um único funil por enquanto: a raiz leva à LP. Com mais funis, trocar por home de triagem (docs/home-triagem.md).
  redirects: {
    '/': '/eventos-corporativos',
  },
  server: {
    port: 4321,
  },
});
