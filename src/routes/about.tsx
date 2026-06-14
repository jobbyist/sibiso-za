import { createFileRoute } from "@tanstack/react-router";
import { Eye, Target, Sparkles, ShieldCheck, Lightbulb, Scale, Users, Trophy } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui-kit";
import { FinalCTA } from "@/routes/index";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Building Businesses Through Strategic Growth Systems" },
      { name: "description", content: "Sibiso Marketing is a strategic business growth partner on a mission to become Africa's most trusted growth and marketing partner." },
      { property: "og:title", content: "About Sibiso Marketing" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { icon: Trophy, title: "Excellence", text: "We hold our work to an executive standard." },
  { icon: ShieldCheck, title: "Integrity", text: "Transparent, honest, accountable partnerships." },
  { icon: Lightbulb, title: "Innovation", text: "We build with the best of strategy and tech." },
  { icon: Scale, title: "Accountability", text: "Measured by your revenue, not our activity." },
  { icon: Users, title: "Collaboration", text: "Embedded in your team as a true partner." },
  { icon: Target, title: "Results", text: "Predictable, sustainable, scalable growth." },
];

const timeline = [
  { year: "Foundation", title: "A different kind of partner", text: "Sibiso was founded to challenge the traditional agency model — leading with strategy, systems and measurable revenue." },
  { year: "Approach", title: "Systems over campaigns", text: "We combined business strategy, marketing, technology, automation and data intelligence into one growth engine." },
  { year: "Today", title: "Scaling businesses across Africa", text: "We partner with ambitious businesses to turn visibility into predictable, sustainable revenue." },
];

function About() {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title={<>Building Businesses Through <span className="text-gradient-gold">Strategic Growth Systems</span></>}
        subtitle="We don't just market businesses. We build systems that drive growth — combining strategy, technology, automation and data intelligence."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-soft">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)]/15 text-[var(--gold)]">
                <Eye className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-heading text-2xl font-bold">Our Vision</h3>
              <p className="mt-3 text-muted-foreground">
                To become Africa's most trusted business growth and marketing partner.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-soft">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-cta text-white">
                <Sparkles className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-heading text-2xl font-bold">Our Mission</h3>
              <p className="mt-3 text-muted-foreground">
                To empower businesses through innovative growth solutions that drive visibility,
                profitability, and long-term growth.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-5xl px-5 pb-8 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Our Story" title="The Sibiso Journey" />
        </Reveal>
        <div className="relative mt-14 space-y-8 before:absolute before:left-[19px] before:top-2 before:h-full before:w-px before:bg-border md:before:left-1/2">
          {timeline.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.1}>
              <div className="relative flex gap-6 md:grid md:grid-cols-2 md:gap-12">
                <div className={i % 2 === 0 ? "md:text-right" : "md:order-2"}>
                  <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                    <span className="font-subheading text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
                      {t.year}
                    </span>
                    <h4 className="mt-2 font-heading text-xl font-bold">{t.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
                  </div>
                </div>
                <span className="absolute left-[12px] top-6 h-4 w-4 rounded-full gradient-gold ring-4 ring-background md:left-1/2 md:-translate-x-1/2" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <Reveal>
          <SectionHeading eyebrow="Core Values" title="What We Stand For" />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="flex h-full gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--orange)]/12 text-[var(--orange)]">
                  <v.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
