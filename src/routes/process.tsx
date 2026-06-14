import { createFileRoute } from "@tanstack/react-router";
import { Search, PenTool, Rocket, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FinalCTA } from "@/routes/index";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process — How Sibiso Drives Growth" },
      { name: "description", content: "Discovery & Audit, Strategy Development, Implementation and Optimization — a performance-efficient growth journey." },
      { property: "og:title", content: "Our Process — Sibiso Marketing" },
      { property: "og:url", content: "/process" },
    ],
    links: [{ rel: "canonical", href: "/process" }],
  }),
  component: Process,
});

const stages = [
  { icon: Search, title: "Discovery & Audit", text: "We deep-dive into your business, market, funnel and data to uncover exactly where growth is leaking." },
  { icon: PenTool, title: "Strategy Development", text: "We design a tailored growth system — positioning, channels, offers and conversion architecture." },
  { icon: Rocket, title: "Implementation", text: "We execute across channels with marketing, technology and automation built for measurable outcomes." },
  { icon: TrendingUp, title: "Optimization", text: "We continuously test, measure and refine so growth compounds and revenue stays predictable." },
];

export function ProcessJourney() {
  return (
    <div className="relative mt-14 grid gap-6 md:grid-cols-4">
      <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent md:block" />
      {stages.map((s, i) => (
        <Reveal key={s.title} delay={i * 0.12}>
          <div className="relative h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-glow">
            <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-cta text-white ring-8 ring-background">
              <s.icon className="h-7 w-7" />
            </span>
            <span className="absolute right-6 top-6 font-heading text-3xl font-extrabold text-muted-foreground/25">
              0{i + 1}
            </span>
            <h3 className="mt-5 font-heading text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Process() {
  return (
    <div>
      <PageHero
        eyebrow="Our Process"
        title={<>A Clear Path To <span className="text-gradient-gold">Predictable Growth</span></>}
        subtitle="Every engagement follows a proven, performance-efficient journey — built for clarity and compounding results."
      />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <ProcessJourney />
      </section>
      <FinalCTA />
    </div>
  );
}
