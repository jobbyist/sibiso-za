import { createFileRoute } from "@tanstack/react-router";
import { Check, ArrowUpRight, Rocket, Gauge, Crown } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTAButton } from "@/components/ui-kit";
import { FinalCTA } from "@/routes/index";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Business Growth Solutions — Sibiso Marketing" },
      { name: "description", content: "Growth Starter, Growth Engine and Market Domination packages — strategic systems engineered for credibility, lead generation and scalable growth." },
      { property: "og:title", content: "Business Growth Solutions — Sibiso Marketing" },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: Solutions,
});

const packages = [
  {
    icon: Rocket,
    name: "Growth Starter",
    ideal: "Startups & emerging businesses",
    outcome: "Build credibility and establish market presence.",
    includes: ["Brand positioning", "Visual identity refinement", "Social media strategy", "Content planning", "Marketing consultation"],
    featured: false,
  },
  {
    icon: Gauge,
    name: "Growth Engine",
    ideal: "Businesses seeking consistent lead generation",
    outcome: "Generate qualified leads and increase conversions.",
    includes: ["Social media management", "Content creation", "Paid advertising", "Lead generation systems", "Website optimization"],
    featured: true,
  },
  {
    icon: Crown,
    name: "Market Domination",
    ideal: "Established businesses focused on scaling",
    outcome: "Create a predictable and scalable growth engine.",
    includes: ["Full growth strategy", "Marketing automation", "CRM integration", "Funnel development", "Analytics", "Performance optimization"],
    featured: false,
  },
];

function Solutions() {
  return (
    <div>
      <PageHero
        eyebrow="Solutions"
        title={<>Business Growth <span className="text-gradient-gold">Solutions</span></>}
        subtitle="Three strategic systems engineered for where your business is today — and where it's going next."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-3xl border p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5",
                  p.featured
                    ? "border-transparent gradient-hero text-white shadow-glow"
                    : "border-border bg-card hover:shadow-card",
                )}
              >
                {p.featured && (
                  <span className="mb-4 w-fit rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#111]">
                    Most Popular
                  </span>
                )}
                <span
                  className={cn(
                    "inline-flex h-14 w-14 items-center justify-center rounded-2xl",
                    p.featured ? "bg-white/10 text-[var(--gold)]" : "gradient-cta text-white",
                  )}
                >
                  <p.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-heading text-2xl font-bold">{p.name}</h3>
                <p className={cn("mt-1 text-sm", p.featured ? "text-white/70" : "text-muted-foreground")}>
                  Ideal for: {p.ideal}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <Check className={cn("mt-0.5 h-4 w-4 shrink-0", p.featured ? "text-[var(--gold)]" : "text-[var(--orange)]")} />
                      <span className={p.featured ? "text-white/90" : ""}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className={cn("mt-6 rounded-2xl p-4 text-sm", p.featured ? "bg-white/5" : "bg-accent")}>
                  <span className="font-semibold">Outcome:</span> {p.outcome}
                </div>
                <CTAButton
                  to="/contact"
                  variant={p.featured ? "gold" : "primary"}
                  className="mt-6 w-full"
                >
                  Get Started <ArrowUpRight className="h-4 w-4" />
                </CTAButton>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
