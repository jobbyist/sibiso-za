import { createFileRoute } from "@tanstack/react-router";
import { Quote, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { FinalCTA } from "@/routes/index";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Measurable Growth Outcomes | Sibiso Marketing" },
      { name: "description", content: "Real client results: challenges, strategy, execution and the measurable revenue outcomes Sibiso Marketing delivered." },
      { property: "og:title", content: "Case Studies — Sibiso Marketing" },
      { property: "og:url", content: "/case-studies" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudies,
});

const studies = [
  {
    client: "FinTech Startup",
    industry: "Financial Services",
    challenge: "High traffic but poor conversion and unpredictable, low-quality leads.",
    strategy: "Repositioned the brand, rebuilt the funnel and introduced data-driven lead scoring.",
    execution: "Launched multi-channel demand generation, optimized the website and automated nurture sequences.",
    metrics: [
      { label: "Qualified Leads", value: 312, suffix: "%" },
      { label: "Cost / Acquisition", value: 48, suffix: "%", down: true },
      { label: "Conversion Rate", value: 86, suffix: "%" },
    ],
    testimonial: "Sibiso rebuilt our funnel from the ground up. Qualified leads tripled in one quarter.",
    name: "Thabo M., Founder",
  },
  {
    client: "Professional Services Firm",
    industry: "B2B Consulting",
    challenge: "Inconsistent sales and over-reliance on referrals with no predictable pipeline.",
    strategy: "Built a positioning-led content engine and an inbound lead generation system.",
    execution: "Deployed thought-leadership content, paid amplification and CRM-driven follow-up.",
    metrics: [
      { label: "Pipeline Value", value: 240, suffix: "%" },
      { label: "Booked Calls", value: 175, suffix: "%" },
      { label: "Client Retention", value: 98, suffix: "%" },
    ],
    testimonial: "Finally a partner that talks revenue, not vanity metrics. Predictable, scalable growth.",
    name: "Lerato K., CEO",
  },
];

function CaseStudies() {
  return (
    <div>
      <PageHero
        eyebrow="Case Studies"
        title={<>Growth You Can <span className="text-gradient-gold">Measure</span></>}
        subtitle="A look behind the systems we build — and the measurable revenue outcomes they create."
      />

      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 lg:px-8 lg:py-24">
        {studies.map((s, i) => (
          <Reveal key={s.client} delay={i * 0.05}>
            <article className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-card">
              <div className="grid gap-8 p-8 lg:grid-cols-[1.4fr_1fr] lg:p-10">
                <div>
                  <span className="font-subheading text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
                    {s.industry}
                  </span>
                  <h2 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">{s.client}</h2>
                  <div className="mt-6 space-y-5">
                    {[
                      { h: "The Challenge", t: s.challenge },
                      { h: "The Strategy", t: s.strategy },
                      { h: "The Execution", t: s.execution },
                    ].map((b) => (
                      <div key={b.h}>
                        <h3 className="font-subheading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          {b.h}
                        </h3>
                        <p className="mt-1 text-sm text-foreground/85">{b.t}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl bg-accent p-5">
                    <Quote className="h-6 w-6 text-[var(--gold)]" />
                    <p className="mt-2 text-sm italic">"{s.testimonial}"</p>
                    <p className="mt-2 text-xs font-semibold text-muted-foreground">— {s.name}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-4 rounded-3xl gradient-hero p-7">
                  <h3 className="flex items-center gap-2 font-subheading text-sm font-semibold uppercase tracking-wider text-white/70">
                    <TrendingUp className="h-4 w-4 text-[var(--gold)]" /> Results
                  </h3>
                  {s.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="flex items-end justify-between">
                        <span className="text-sm text-white/80">{m.label}</span>
                        <span className="font-heading text-2xl font-extrabold text-[var(--gold)]">
                          {m.down ? "−" : "+"}
                          <Counter to={m.value} suffix={m.suffix} />
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full gradient-gold" style={{ width: `${Math.min(100, m.value / 3.2)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <FinalCTA />
    </div>
  );
}
