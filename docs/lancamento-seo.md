# Lançamento e SEO — Villa Mantova

Site liberado para indexação em **23/11/2026**, no domínio `villamantova.com.br`.

## O que está configurado
- `config.json` → `domain` = `villamantova.com.br` e `deploy.remote_path` = `/var/www/villamantova.com.br`.
- `astro.config.mjs` → `site: 'https://villamantova.com.br'` (mantenha igual ao `domain`; se o domínio mudar, troque os dois).
- `robots.txt` e `sitemap.xml` são gerados a partir de `config.domain`: com domínio liberam e listam as páginas e os posts (sem domínio, bloqueiam tudo e o sitemap sai vazio).
- Canonical: `Base.astro` gera automaticamente a partir de `site` + caminho da página.
- JSON-LD da home com `url` do site.

## Indexação por página
| Página | Situação |
|---|---|
| Home `/`, `/blog` e posts, `/eventos-corporativos` | indexáveis e no sitemap |
| Política de privacidade | indexável, fora do sitemap |
| `/bio` | `noIndex` (atalho de links do Instagram) e fora do sitemap |

## Depois de publicar
- Cadastrar o site no Google Search Console e enviar `https://villamantova.com.br/sitemap.xml`.
- Pedir a indexação da home e do post do blog.

## Pendentes
- GTM: preencher `config.json → tracking.gtm_id` quando o container existir.
- JSON-LD da home: incluir `telephone` (quando o número existir) e `aggregateRating` (só com uma fonte única da contagem de avaliações; a home e a LP divergiam).
- Número de WhatsApp: hoje não há redirecionamento (a distribuição é feita pela VOE).
- Grafia do endereço: "Maravilha lll" (copy) ou "III".
- Contraste do botão dourado (branco sobre `#b4904f` = 2,98:1): ajustar o tom se a acessibilidade for prioridade.
- Posts do blog: o texto do primeiro post vem do cliente (há um parágrafo repetido aguardando aprovação); novos posts entram em `src/content/blog/<slug>.md`.
