import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AudioPlayer } from "@/components/AudioPlayer";
import { FinalCTA } from "@/routes/index";
import { EPISODES } from "@/lib/content";

export const Route = createFileRoute("/podcast/$slug")({
  loader: ({ params }) => {
    const ep = EPISODES.find((e) => e.slug === params.slug);
    if (!ep) throw notFound();
    return ep;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Episode"} — Sibiso Growth Podcast` },
      { name: "description", content: loaderData?.summary ?? "" },
      { property: "og:title", content: loaderData?.title ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/podcast/${loaderData?.slug ?? ""}` },
    ],
    links: [{ rel: "canonical", href: `/podcast/${loaderData?.slug ?? ""}` }],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PodcastEpisode",
              name: loaderData.title,
              description: loaderData.summary,
              datePublished: loaderData.date,
              timeRequired: loaderData.duration,
            }),
          },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <h1 className="font-heading text-3xl font-bold">Episode not found</h1>
      <Link to="/podcast" className="mt-4 inline-block text-[var(--gold)]">Back to podcast</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <h1 className="font-heading text-2xl font-bold">This episode didn't load</h1>
      <Link to="/podcast" className="mt-4 inline-block text-[var(--gold)]">Back to podcast</Link>
    </div>
  ),
  component: EpisodePage,
});

function EpisodePage() {
  const ep = Route.useLoaderData();
  const related = EPISODES.filter((e) => e.slug !== ep.slug).slice(0, 2);

  return (
    <div>
      <article className="mx-auto max-w-3xl px-5 py-16 lg:py-24">
        <Link to="/podcast" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to podcast
        </Link>
        <Reveal>
          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-[var(--gold)]/15 px-3 py-1 font-semibold text-[var(--gold)]">{ep.topic}</span>
            <span>{ep.duration}</span>
          </div>
          <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight sm:text-4xl">{ep.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{ep.summary}</p>
          <div className="mt-6">
            <AudioPlayer title={ep.title} />
          </div>
          <h2 className="mt-10 font-heading text-xl font-bold">Episode Summary</h2>
          <div className="mt-4 space-y-5 text-base leading-relaxed text-foreground/90">
            {ep.transcript.map((para: string, i: number) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 border-t border-border pt-10">
          <h3 className="font-heading text-xl font-bold">Related episodes</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/podcast/$slug"
                params={{ slug: r.slug }}
                className="rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <span className="text-xs font-semibold text-[var(--gold)]">{r.topic}</span>
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
