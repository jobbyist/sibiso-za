import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  Target,
  Repeat,
  Magnet,
  AlertTriangle,
  Filter,
  LineChart,
  Wallet,
  BarChart3,
  Layers,
  ShieldCheck,
  Handshake,
  Star,
  Quote,
} from "lucide-react";
import { CTAButton, SectionHeading, Eyebrow } from "@/components/ui-kit";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sibiso Marketing — Turn Your Visibility Into Revenue" },
      {
        name: "description",
        content:
          "Sibiso Marketing builds strategic growth systems that attract, convert, and retain customers — helping businesses achieve measurable, sustainable growth.",
      },
      { property: "og:title", content: "Turn Your Visibility Into Revenue — Sibiso Marketing" },
      { property: "og:description", content: "Strategic growth systems for predictable revenue outcomes." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const fails = [
  { icon: Filter, title: "Low-Quality Leads", text: "Traffic that never converts because targeting and positioning are misaligned." },
  { icon: LineChart, title: "Poor Conversion Rates", text: "Visitors arrive but funnels leak — interest never becomes revenue." },
  { icon: AlertTriangle, title: "Inconsistent Sales", text: "Revenue that spikes and stalls because growth relies on effort, not systems." },
  { icon: Wallet, title: "Wasted Marketing Spend", text: "Budget burned on vanity metrics instead of measurable business outcomes." },
];

const framework = [
  { icon: Magnet, step: "01", title: "Attract", text: "Position your brand and capture qualified attention through strategic, multi-channel demand generation." },
  { icon: Target, step: "02", title: "Convert", text: "Engineer funnels, offers and journeys that turn attention into booked revenue — predictably." },
  { icon: Repeat, step: "03", title: "Retain", text: "Build loyalty loops, automation and data systems so growth compounds long after the first sale." },
];

const why = [
  { icon: BarChart3, title: "Data-Driven Decisions", text: "Every move backed by analytics, not guesswork." },
  { icon: Layers, title: "Tailored Solutions", text: "Strategies engineered around your business model." },
  { icon: TrendingUp, title: "Multi-Channel Expertise", text: "Cohesive growth across every relevant channel." },
  { icon: ShieldCheck, title: "Proven Methodologies", text: "Frameworks refined for repeatable outcomes." },
  { icon: LineChart, title: "Transparent Reporting", text: "Clear dashboards tied to revenue, not vanity." },
  { icon: Handshake, title: "Long-Term Partnership", text: "We grow as your growth partner, not a vendor." },
];

const testimonials = [
  { name: "Thabo M.", role: "Founder, FinTech Startup", text: "Sibiso rebuilt our funnel from the ground up. Qualified leads tripled in one quarter and our cost per acquisition halved." },
  { name: "Lerato K.", role: "CEO, Professional Services", text: "Finally a partner that talks revenue, not vanity metrics. Their systems gave us predictable, scalable growth." },
  { name: "Daniel R.", role: "Director, E-commerce", text: "The strategic depth is on another level. We went from inconsistent sales to a reliable growth engine." },
];

function Home() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(60%_50%_at_80%_-10%,rgba(212,175,55,0.25),transparent),radial-gradient(50%_50%_at_0%_20%,rgba(255,122,0,0.18),transparent)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Strategic Growth Partner</Eyebrow>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl"
            >
              Turn Your Visibility Into <span className="text-gradient-gold">Revenue</span>
            </motion.h1>
            <p className="max-w-xl text-base text-white/70 sm:text-lg">
              At Sibiso Marketing, we build strategic growth systems that attract, convert, and retain
              customers — helping businesses achieve measurable and sustainable growth.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CTAButton to="/bookings" variant="primary">
                Book A Free Business Audit <ArrowUpRight className="h-4 w-4" />
              </CTAButton>
              <CTAButton to="/bookings" variant="outline" className="border-white/25 text-white hover:bg-white/10">
                Speak To A Growth Consultant
              </CTAButton>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4 text-white/70">
              {[
                { v: 3, suffix: "x", label: "Avg. lead growth" },
                { v: 98, suffix: "%", label: "Client retention" },
                { v: 12, suffix: "M+", label: "Revenue influenced" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-heading text-2xl font-extrabold text-white">
                    <Counter to={s.v} suffix={s.suffix} />
                  </div>
                  <div className="text-xs uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="animate-floaty rounded-3xl glass p-5 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60">Growth Dashboard</p>
                  <p className="font-heading text-2xl font-bold text-white">Revenue Engine</p>
                </div>
                <span className="rounded-full bg-[var(--gold)]/15 px-3 py-1 text-xs font-semibold text-[var(--gold)]">
                  +<Counter to={42} suffix="%" /> QoQ
                </span>
              </div>
              <div className="mt-5 flex h-40 items-end gap-2">
                {[35, 48, 40, 62, 55, 78, 70, 92].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
                    className="flex-1 rounded-t-lg gradient-gold"
                  />
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: "Leads", value: 1240 },
                  { label: "Converted", value: 318 },
                  { label: "ROI", value: 4.7 },
                ].map((m) => (
                  <div key={m.label} className="rounded-2xl bg-white/5 p-3 text-center">
                    <p className="font-heading text-lg font-bold text-white">
                      <Counter to={m.value} decimals={m.label === "ROI" ? 1 : 0} suffix={m.label === "ROI" ? "x" : ""} />
                    </p>
                    <p className="text-[11px] uppercase tracking-wider text-white/60">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY MOST MARKETING FAILS */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="The Problem"
            title="Why Most Marketing Fails"
            subtitle="Most businesses don't have a traffic problem — they have a systems problem. Here's where growth quietly leaks away."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fails.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--orange)]/12 text-[var(--orange)]">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* THREE STEP FRAMEWORK */}
      <section className="relative">
        <div className="absolute inset-0 gradient-primary opacity-[0.04] dark:opacity-100" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Our Framework"
              title={<>The Three-Step <span className="text-gradient-gold">Growth Framework</span></>}
              subtitle="A repeatable system that compounds — not a one-off campaign."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {framework.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="group h-full rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-cta text-white transition-transform duration-300 group-hover:scale-110">
                      <f.icon className="h-7 w-7" />
                    </span>
                    <span className="font-heading text-4xl font-extrabold text-muted-foreground/30">{f.step}</span>
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold">{f.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Why Sibiso"
            title="Why Choose Sibiso Marketing"
            subtitle="We operate as your strategic growth partner — combining business strategy, technology, automation and data intelligence."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <div className="flex h-full gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--gold)]/15 text-[var(--gold)]">
                  <w.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold">{w.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="relative">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <Reveal>
            <div className="flex flex-col items-center gap-4 text-center">
              <Eyebrow>Social Proof</Eyebrow>
              <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
                Trusted To Drive Real Results
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-3xl glass p-7 shadow-card">
                  <Quote className="h-8 w-8 text-[var(--gold)]" />
                  <p className="mt-4 flex-1 text-sm text-white/85">{t.text}</p>
                  <div className="mt-5 flex items-center gap-1 text-[var(--gold)]">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <div className="mt-3">
                    <p className="font-subheading font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/60">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] gradient-cta animate-gradient p-10 text-center shadow-glow sm:p-16">
          <div className="absolute inset-0 opacity-30 [background:radial-gradient(50%_60%_at_50%_0%,rgba(255,255,255,0.35),transparent)]" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              Ready To Unlock Your Growth Potential?
            </h2>
            <p className="text-white/85 sm:text-lg">Book a complimentary business growth audit today.</p>
            <CTAButton to="/bookings" variant="gold" className="mt-2">
              Book A Free Business Audit <ArrowUpRight className="h-4 w-4" />
            </CTAButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
