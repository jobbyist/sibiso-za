import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { POSTS } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Growth Insights Blog — Sibiso Marketing" },
      { name: "description", content: "Strategy, conversion and growth insights from Sibiso Marketing — actionable thinking for predictable revenue." },
      { property: "og:title", content: "Growth Insights Blog — Sibiso Marketing" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

function Blog() {
  const categories = ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const posts = active === "All" ? POSTS : POSTS.filter((p) => p.category === active);

  return (
    <div>
      <PageHero
        eyebrow="Insights"
        title={<>Growth <span className="text-gradient-gold">Insights</span></>}
        subtitle="Actionable thinking on strategy, conversion and building systems that drive predictable revenue."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium font-subheading transition-colors",
                active === c ? "gradient-cta text-white" : "border border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card"
              >
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-[var(--gold)]/15 px-3 py-1 font-semibold text-[var(--gold)]">{p.category}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {p.readTime}
                  </span>
                </div>
                <h2 className="mt-4 font-heading text-xl font-bold leading-snug">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--gold)]">
                  Read article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
