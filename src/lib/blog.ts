// Posts do blog: arquivos Markdown em src/content/blog/<slug>.md (o nome do arquivo vira a URL /blog/<slug>).
// Frontmatter: title, description, date (AAAA-MM-DD), image (URL do CDN), imageAlt, category.
export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  imageAlt: string;
  category: string;
  Content: any;
}

const modulos = import.meta.glob<any>('../content/blog/*.md', { eager: true });

export function getPosts(): Post[] {
  return Object.entries(modulos)
    .map(([caminho, m]) => ({
      slug: caminho.split('/').pop()!.replace(/\.md$/, ''),
      title: m.frontmatter.title,
      description: m.frontmatter.description,
      date: String(m.frontmatter.date).slice(0, 10),
      image: m.frontmatter.image,
      imageAlt: m.frontmatter.imageAlt ?? '',
      category: m.frontmatter.category ?? 'Blog',
      Content: m.Content,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Partes da data para o selo do card ("23" + "nov") e para o texto ("23 de novembro de 2026"). */
export function formatarData(iso: string) {
  const d = new Date(iso + 'T12:00:00');
  return {
    dia: String(d.getDate()).padStart(2, '0'),
    mes: d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
    extenso: d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
  };
}
