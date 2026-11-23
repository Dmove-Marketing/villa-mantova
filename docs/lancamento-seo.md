# Lançamento e SEO — Villa Mantova

O site está **sem domínio** e com `noindex` de propósito. Este é o roteiro para quando o domínio existir.

## 1. Domínio
- `config.json` → `domain` e `deploy.remote_path` (`/var/www/<dominio>`).
- `astro.config.mjs` → `site: 'https://<dominio>'` (descomentar a linha de comentário).
- `robots.txt` e `sitemap.xml` já são gerados a partir de `config.domain`: sem domínio bloqueiam tudo / saem vazios; com domínio liberam e listam as páginas e os posts.

## 2. Indexação (remover `noIndex={true}`)
| Página | Arquivo | Ação |
|---|---|---|
| Home `/` | `src/pages/index.astro` | remover `noIndex` e adicionar `canonical` |
| Blog `/blog` e posts | `src/pages/blog/*.astro` | remover `noIndex` |
| Política de privacidade | `src/pages/politica-de-privacidade.astro` | remover `noIndex` |
| `/eventos-corporativos` | já indexável | conferir título/descrição próprios (não competir com a home) |
| `/bio` | já indexável | **adicionar `noIndex`** (é só atalho de links do Instagram; já fora do sitemap) |

## 3. Dados estruturados (`index.astro`, bloco `jsonLd`)
- Incluir `url` do site e `telephone` (quando o número existir).
- `aggregateRating` só com uma fonte única da contagem de avaliações (a home e a LP divergiam).

## 4. Outros pendentes
- GTM: `config.json → tracking.gtm_id`.
- Número de WhatsApp: hoje não há redirecionamento (a distribuição é feita pela VOE).
- Grafia do endereço: "Maravilha lll" (copy) ou "III".
- Posts do blog: os 3 iniciais são rascunhos de apoio, revisar antes de publicar (`src/content/blog/*.md`).
- Contraste do botão dourado (branco sobre `#b4904f` = 2,98:1): ajustar o tom se a acessibilidade for prioridade.
