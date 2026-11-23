// sitemap.xml gerado a partir das páginas de src/pages e dos posts do blog.
// Sem config.domain, sai vazio (o site ainda não é público). Páginas com `_` no início ficam de fora (desativadas).
import config from '../../config.json';
import { getPosts } from '../lib/blog';

// Páginas que não entram no sitemap (ex.: bio do Instagram, que é só um atalho de links).
const EXCLUIR = ['/bio/'];

export function GET() {
  const dominio = (config.domain || '').trim();
  const paginas = Object.keys(import.meta.glob('./**/*.astro'))
    .map((arquivo) => arquivo.replace('./', '').replace(/\.astro$/, ''))
    .filter((p) => !p.split('/').some((parte) => parte.startsWith('_') || parte.startsWith('[')))
    .map((p) => (p === 'index' ? '/' : '/' + p.replace(/\/?index$/, '') + '/'))
    .filter((p) => !EXCLUIR.includes(p) && p !== '/politica-de-privacidade/');
  const itens = dominio
    ? [
        ...paginas.map((p) => ({ loc: p, lastmod: '' })),
        ...getPosts().map((post) => ({ loc: `/blog/${post.slug}/`, lastmod: post.date })),
      ]
    : [];
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    itens.map((i) => `  <url><loc>https://${dominio}${i.loc}</loc>${i.lastmod ? `<lastmod>${i.lastmod}</lastmod>` : ''}</url>`).join('\n') +
    `\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
