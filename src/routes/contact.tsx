import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTAButton } from "@/components/ui-kit";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Let's Grow Your Business | Sibiso Marketing" },
      { name: "description", content: "Book a complimentary consultation and discover how Sibiso Marketing can help your business achieve sustainable growth." },
      { property: "og:title", content: "Contact Sibiso Marketing" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  company: z.string().trim().min(1, "Company name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid contact number").max(30),
  industry: z.string().trim().min(1, "Please select an industry"),
  challenges: z.string().trim().min(5, "Tell us a bit more").max(1000),
  budget: z.string().trim().min(1, "Please select a budget range"),
});

const industries = ["Professional Services", "Retail / E-commerce", "Technology / SaaS", "Finance", "Healthcare", "Hospitality", "Other"];
const budgets = ["< R10,000 / mo", "R10,000 – R25,000 / mo", "R25,000 – R50,000 / mo", "R50,000+ / mo"];

const fieldCls =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[var(--gold)]";

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    const body = encodeURIComponent(
      `Full Name: ${data.fullName}\nCompany: ${data.company}\nEmail: ${data.email}\nPhone: ${data.phone}\nIndustry: ${data.industry}\nBudget: ${data.budget}\n\nChallenges:\n${data.challenges}`,
    );
    const subject = encodeURIComponent(`New consultation request from ${data.fullName} (${data.company})`);
    window.location.href = `mailto:hello@sibisomarketing.co.za?subject=${subject}&body=${body}`;
    toast.success("Opening your email client — we'll respond within one business day.");
    e.currentTarget.reset();
  };

  const waMessage = encodeURIComponent("Hi Sibiso Marketing, I'd like to book a free growth consultation.");

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title={<>Let's Grow Your <span className="text-gradient-gold">Business</span></>}
        subtitle="Book a complimentary consultation and discover how Sibiso Marketing can help your business achieve sustainable growth."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <Reveal>
            <form onSubmit={onSubmit} noValidate className="rounded-[2rem] border border-border bg-card p-7 shadow-card sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" name="fullName" error={errors.fullName}>
                  <input name="fullName" className={fieldCls} placeholder="Your name" />
                </Field>
                <Field label="Company Name" name="company" error={errors.company}>
                  <input name="company" className={fieldCls} placeholder="Company" />
                </Field>
                <Field label="Email Address" name="email" error={errors.email}>
                  <input name="email" type="email" className={fieldCls} placeholder="you@company.com" />
                </Field>
                <Field label="Contact Number" name="phone" error={errors.phone}>
                  <input name="phone" className={fieldCls} placeholder="+27 …" />
                </Field>
                <Field label="Industry" name="industry" error={errors.industry}>
                  <select name="industry" defaultValue="" className={fieldCls}>
                    <option value="" disabled>Select industry</option>
                    {industries.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </Field>
                <Field label="Budget Range" name="budget" error={errors.budget}>
                  <select name="budget" defaultValue="" className={fieldCls}>
                    <option value="" disabled>Select budget</option>
                    {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </Field>
              </div>
              <div className="mt-5">
                <Field label="Current Marketing Challenges" name="challenges" error={errors.challenges}>
                  <textarea name="challenges" rows={4} className={fieldCls} placeholder="Tell us what's holding your growth back…" />
                </Field>
              </div>
              <CTAButton variant="primary" className="mt-6 w-full">
                Book A Free Consultation <ArrowUpRight className="h-4 w-4" />
              </CTAButton>
            </form>
          </Reveal>

          {/* Info */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-5">
              {[
                { icon: Mail, label: "Email", value: "hello@sibisomarketing.co.za", href: "mailto:hello@sibisomarketing.co.za" },
                { icon: Phone, label: "Phone", value: "+27 75 381 3495", href: "tel:+27753813495" },
                { icon: MapPin, label: "Office", value: "Johannesburg, South Africa" },
                { icon: Clock, label: "Response Time", value: "Within 1 business day" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold)]/15 text-[var(--gold)]">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="font-subheading font-semibold hover:text-[var(--gold)]">{c.value}</a>
                    ) : (
                      <p className="font-subheading font-semibold">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <a
                href={`https://wa.me/+27753813495?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-3xl bg-[#25D366] px-5 py-4 font-subheading font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </a>

              <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
                <iframe
                  title="Sibiso Marketing location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=27.9%2C-26.3%2C28.2%2C-26.1&layer=mapnik"
                  className="h-56 w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={name} className="block">
      <span className="mb-1.5 block font-subheading text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
