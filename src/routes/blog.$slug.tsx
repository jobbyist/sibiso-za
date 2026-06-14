import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/routes/index";
import { POSTS } from "@/lib/content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Article"} — Sibiso Marketing` },
      { name: "description", content: loaderData?.excerpt ?? "" },
      { property: "og:title", content: loaderData?.title ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/blog/${loaderData?.slug ?? ""}` },
    ],
    links: [{ rel: "canonical", href: `/blog/${loaderData?.slug ?? ""}` }],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: loaderData.title,
              description: loaderData.excerpt,
              datePublished: loaderData.date,
              author: { "@type": "Organization", name: "Sibiso Marketing" },
            }),
          },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <h1 className="font-heading text-3xl font-bold">Article not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-[var(--gold)]">Back to blog</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <h1 className="font-heading text-2xl font-bold">This article didn't load</h1>
      <Link to="/blog" className="mt-4 inline-block text-[var(--gold)]">Back to blog</Link>
    </div>
  ),
  component: Article,
});

function Article() {
  const post = Route.useLoaderData();
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div>
      <article className="mx-auto max-w-3xl px-5 py-16 lg:py-24">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
        <Reveal>
          <div className="mt-6 flex items-center gap-3 text-xs">
            <span className="rounded-full bg-[var(--gold)]/15 px-3 py-1 font-semibold text-[var(--gold)]">{post.category}</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>
          <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/90">
            {post.content.map((para: string, i: number) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 border-t border-border pt-10">
          <h3 className="font-heading text-xl font-bold">Related reading</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/blog/$slug"
                params={{ slug: r.slug }}
                className="rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <span className="text-xs font-semibold text-[var(--gold)]">{r.category}</span>
                <p className="mt-1 font-heading font-bold">{r.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </article>
      <FinalCTA />
    </div>
  );
}
