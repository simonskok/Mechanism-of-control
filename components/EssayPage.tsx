import { getEntry } from '@/lib/content';
import { renderEntry } from '@/lib/mdx';

/** The shell for the four standing essays: method, east and west, reading paths
    and open questions. One column, no rail, thesis before elaboration. */
export async function EssayPage({ slug }: { slug: string }) {
  const entry = getEntry('essay', slug);
  const { frontmatter } = entry;
  const content = await renderEntry(entry);

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <div className="measure">
        {frontmatter.eyebrow ? <p className="label text-accent">{frontmatter.eyebrow}</p> : null}
        <h1 className="mt-3 text-h1 leading-[1.1] tracking-tight">{frontmatter.title}</h1>
        <p className="mt-5 text-lede leading-snug">{frontmatter.thesis}</p>
      </div>
      <div className="prose mt-9">{content}</div>
    </main>
  );
}

export async function essayMetadata(slug: string) {
  const { frontmatter } = getEntry('essay', slug);
  return { title: frontmatter.title, description: frontmatter.thesis };
}
