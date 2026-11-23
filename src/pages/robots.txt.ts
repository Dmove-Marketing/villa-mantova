// robots.txt gerado a partir do config.json: sem domínio, o site é tratado como não público (bloqueia tudo).
// Quando config.domain for preenchido, passa a permitir tudo e aponta para o sitemap.
import config from '../../config.json';

export function GET() {
  const dominio = (config.domain || '').trim();
  const corpo = dominio
    ? `User-agent: *\nAllow: /\n\nSitemap: https://${dominio}/sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
