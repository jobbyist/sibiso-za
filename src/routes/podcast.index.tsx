import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mic, ArrowUpRight, Mail } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { AudioPlayer } from "@/components/AudioPlayer";
import { CTAButton } from "@/components/ui-kit";
import { EPISODES } from "@/lib/content";
import { toast } from "sonner";

export const Route = createFileRoute("/podcast/")({
  head: () => ({
    meta: [
      { title: "The Sibiso Growth Podcast — Marketing, Design, PR & Business" },
      { name: "description", content: "Conversations on marketing, design, PR, business and branding — practical insights for building growth systems." },
      { property: "og:title", content: "The Sibiso Growth Podcast" },
      { property: "og:url", content: "/podcast" },
    ],
    links: [{ rel: "canonical", href: "/podcast" }],
  }),
  component: Podcast,
});

function Podcast() {
  const [email, setEmail] = useState("");
  const [featured, ...rest] = EPISODES;

  return (
    <div>
      <PageHero
        eyebrow="Podcast"
        title={<>The Sibiso <span className="text-gradient-gold">Growth Podcast</span></>}
        subtitle="Conversations on marketing, design, PR, business and branding — built to help you grow."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
        {/* Featured */}
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-card">
            <div className="grid gap-6 p-8 lg:grid-cols-[1fr_1.2fr] lg:p-10">
              <div className="flex flex-col justify-center rounded-3xl gradient-hero p-8">
                <span className="flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[var(--gold)]">
                  <Mic className="h-3.5 w-3.5" /> Featured Episode
                </span>
                <h2 className="mt-4 font-heading text-2xl font-bold text-white sm:text-3xl">{featured.title}</h2>
                <p className="mt-2 text-sm text-white/70">{featured.summary}</p>
              </div>
              <div className="flex flex-col justify-center gap-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-[var(--gold)]/15 px-3 py-1 font-semibold text-[var(--gold)]">{featured.topic}</span>
                  <span>{featured.duration}</span>
                </div>
                <AudioPlayer title={featured.title} />
                <Link
                  to="/podcast/$slug"
                  params={{ slug: featured.slug }}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--gold)]"
                >
                  Read summary & transcript <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Episode list */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {rest.map((ep, i) => (
            <Reveal key={ep.slug} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-[var(--gold)]/15 px-3 py-1 font-semibold text-[var(--gold)]">{ep.topic}</span>
                  <span>{ep.duration}</span>
                </div>
                <h3 className="mt-3 font-heading text-xl font-bold">{ep.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{ep.summary}</p>
                <div className="mt-4">
                  <AudioPlayer title={ep.title} />
                </div>
                <Link
                  to="/podcast/$slug"
                  params={{ slug: ep.slug }}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--gold)]"
                >
                  Summary & transcript <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Newsletter */}
        <Reveal>
          <div className="mt-14 rounded-[2rem] gradient-cta animate-gradient p-10 text-center shadow-glow">
            <h3 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">Never Miss An Episode</h3>
            <p className="mx-auto mt-2 max-w-md text-white/85">Get growth insights and new episodes delivered to your inbox.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) return toast.error("Enter a valid email");
                toast.success("Subscribed! Welcome to the Sibiso community.");
                setEmail("");
              }}
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <div className="flex flex-1 items-center gap-2 rounded-2xl bg-white/15 px-4">
                <Mail className="h-4 w-4 text-white/80" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@company.com"
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-white/60"
                />
              </div>
              <CTAButton variant="gold">Subscribe</CTAButton>
            </form>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
