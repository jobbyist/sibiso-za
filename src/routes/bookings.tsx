import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles, Loader2, Calendar, Phone, Mail, MessageCircle, Video } from "lucide-react";
import { CATEGORIES, SERVICES, formatZAR, servicesByCategory } from "@/lib/bookings/services";
import { buildQuote, shouldShowAuditQuestion } from "@/lib/bookings/quote";
import { readTracking } from "@/lib/bookings/tracking";
import { bookingSchema, type BookingPayload } from "@/lib/bookings/schema";
import { submitBooking } from "@/lib/bookings/submit.functions";
import { useServerFn } from "@tanstack/react-start";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "Book Your Free Business Audit — Sibiso Marketing" },
      { name: "description", content: "Answer a few questions and receive a personalised business audit, strategy recommendations, and an optional project estimate in minutes." },
      { property: "og:title", content: "Book Your Free Business Audit — Sibiso Marketing" },
      { property: "og:description", content: "A short, conversational audit that builds a tailored growth plan and quote for your business." },
    ],
    links: [{ rel: "canonical", href: "/bookings" }],
  }),
  component: BookingsPage,
});

type Form = Omit<BookingPayload, "tracking">;

const STORAGE_KEY = "sibiso.bookings.v1";

const EMPTY: Form = {
  firstName: "", lastName: "", email: "", phone: "",
  company: "", jobTitle: "", websiteUrl: "",
  businessType: null, teamSize: null, primaryObjective: null,
  selectedServices: [],
  hasExistingWebsite: null, auditWebsiteUrl: "",
  projectType: null, monthlyBudget: null,
  timeline: null,
  wantsQuote: false,
  contactPreference: null, preferredDate: null, preferredTime: null,
};

const BUSINESS_TYPES = ["Startup","Freelancer","Consultant","Small Business","Growing Company","Enterprise","Agency","E-Commerce Brand","Professional Services","Other"];
const TEAM_SIZES = ["Just Me","2-10","11-50","51-200","200+"];
const OBJECTIVES = ["Generate More Leads","Increase Revenue","Launch A New Brand","Improve Marketing","Improve Operations","Automate Processes","Build Digital Infrastructure","Improve Customer Support","Other"];
const PROJECT_TYPES = ["One-Time Project","Monthly Retainer","Ongoing Partnership","Not Sure Yet"];
const BUDGETS = ["Under R5,000","R5,000 - R10,000","R10,000 - R25,000","R25,000 - R50,000","R50,000 - R100,000","R100,000+"];
const TIMELINES = ["Immediately","Within 30 Days","Within 3 Months","Within 6 Months","Just Exploring"];
const CONTACT_METHODS = [
  { id: "Phone Call", icon: Phone },
  { id: "WhatsApp", icon: MessageCircle },
  { id: "Email", icon: Mail },
  { id: "Video Meeting", icon: Video },
];

function BookingsPage() {
  const submit = useServerFn(submitBooking);
  const [form, setForm] = useState<Form>(EMPTY);
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.form) setForm({ ...EMPTY, ...parsed.form });
        if (typeof parsed?.step === "number") setStep(parsed.step);
      }
    } catch {/* ignore */}
    setHydrated(true);
  }, []);

  // auto-save
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, step })); } catch {/* ignore */}
  }, [form, step, hydrated]);

  const update = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));
  const toggleService = (id: string) =>
    setForm((f) => ({
      ...f,
      selectedServices: f.selectedServices.includes(id)
        ? f.selectedServices.filter((s) => s !== id)
        : [...f.selectedServices, id],
    }));

  const showAuditStep = shouldShowAuditQuestion(form.selectedServices);
  const quote = useMemo(() => buildQuote(form.selectedServices), [form.selectedServices]);

  // Step order (audit step is conditional)
  const steps = useMemo(() => {
    const base = ["welcome", "contact", "profile", "services"];
    if (showAuditStep) base.push("audit");
    base.push("project", "timeline", "quoteOpt");
    if (form.wantsQuote) base.push("quote");
    base.push("consultation", "summary");
    return base;
  }, [showAuditStep, form.wantsQuote]);

  const current = steps[step] ?? "welcome";
  const progress = (step / Math.max(steps.length - 1, 1)) * 100;

  const canAdvance = (() => {
    switch (current) {
      case "welcome": return true;
      case "contact":
        return !!form.firstName && !!form.lastName && /\S+@\S+\.\S+/.test(form.email) && form.phone.length >= 7;
      case "profile": return !!form.businessType && !!form.teamSize && !!form.primaryObjective;
      case "services": return form.selectedServices.length > 0;
      case "audit": return form.hasExistingWebsite !== null && (!form.hasExistingWebsite || !!form.auditWebsiteUrl);
      case "project": return !!form.projectType && !!form.monthlyBudget;
      case "timeline": return !!form.timeline;
      case "quoteOpt": return true;
      case "quote": return true;
      case "consultation": return !!form.contactPreference && !!form.preferredDate && !!form.preferredTime;
      case "summary": return true;
      default: return true;
    }
  })();

  const goNext = async () => {
    if (current === "summary") {
      await handleSubmit();
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const payload: BookingPayload = bookingSchema.parse({ ...form, tracking: readTracking() });
      await submit({ data: payload });
      setDone(true);
      try { localStorage.removeItem(STORAGE_KEY); } catch {/* ignore */}
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Keyboard: Enter advances (except inside textareas)
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        const t = e.target as HTMLElement;
        if (t?.tagName === "TEXTAREA") return;
        if (canAdvance && !submitting && !done) {
          e.preventDefault();
          goNext();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canAdvance, current, submitting, done]);

  if (done) return <SuccessScreen form={form} quote={quote} />;

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      {/* Progress bar */}
      <div className="fixed inset-x-0 top-0 z-40 h-1 bg-border">
        <motion.div
          className="h-full gradient-cta"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        />
      </div>

      {/* Live investment indicator */}
      {form.selectedServices.length > 0 && current !== "welcome" && current !== "summary" && (
        <div className="fixed right-4 top-4 z-30 hidden rounded-2xl border border-border bg-card/80 px-4 py-2 text-xs shadow-soft backdrop-blur md:block">
          <div className="text-muted-foreground">Estimated investment</div>
          <div className="font-subheading font-semibold text-foreground">
            {formatZAR(quote.starter)} – {formatZAR(quote.growth)}{quote.hasRecurring ? " /mo+" : ""}
          </div>
        </div>
      )}

      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 pt-16 pb-32 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 flex-col justify-center"
          >
            {current === "welcome" && <StepWelcome />}
            {current === "contact" && <StepContact form={form} update={update} />}
            {current === "profile" && <StepProfile form={form} update={update} />}
            {current === "services" && <StepServices form={form} toggle={toggleService} quote={quote} />}
            {current === "audit" && <StepAudit form={form} update={update} />}
            {current === "project" && <StepProject form={form} update={update} />}
            {current === "timeline" && <StepTimeline form={form} update={update} />}
            {current === "quoteOpt" && <StepQuoteOpt form={form} update={update} />}
            {current === "quote" && <StepQuote quote={quote} />}
            {current === "consultation" && <StepConsultation form={form} update={update} />}
            {current === "summary" && <StepSummary form={form} quote={quote} />}
          </motion.div>
        </AnimatePresence>

        {error && (
          <div className="mt-4 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Footer nav */}
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
            <div className="text-xs text-muted-foreground tabular-nums">
              Step {Math.min(step + 1, steps.length)} of {steps.length}
            </div>
            <div className="flex items-center gap-2">
              {step > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              )}
              <button
                type="button"
                onClick={goNext}
                disabled={!canAdvance || submitting}
                className={cn(
                  "inline-flex items-center gap-2 rounded-2xl gradient-cta px-6 py-2.5 text-sm font-subheading font-semibold text-white shadow-glow transition disabled:cursor-not-allowed disabled:opacity-50",
                )}
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : current === "summary" ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                {current === "welcome" ? "Start My Free Business Audit" : current === "summary" ? "Submit" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Step components ---------------- */

function StepWelcome() {
  return (
    <div className="text-center">
      <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-cta text-white shadow-glow">
        <Sparkles className="h-6 w-6" />
      </span>
      <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight sm:text-6xl">
        Let's Build Something <span className="bg-gradient-to-r from-[var(--gold)] to-[#ff7a00] bg-clip-text text-transparent">Exceptional</span>
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
        Answer a few questions and receive a personalised business audit, strategy recommendations, and an optional project estimate.
      </p>
      <p className="mt-4 text-xs text-muted-foreground">Takes about 3 minutes • Your progress is saved automatically</p>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-subheading font-semibold uppercase tracking-widest text-muted-foreground">{children}</label>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-base text-foreground outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20",
        props.className,
      )}
    />
  );
}

function StepHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: React.ReactNode; subtitle?: React.ReactNode }) {
  return (
    <div className="mb-8">
      {eyebrow && <div className="mb-3 text-xs font-subheading font-semibold uppercase tracking-widest text-[var(--gold)]">{eyebrow}</div>}
      <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function StepContact({ form, update }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  return (
    <div>
      <StepHeading eyebrow="Step 1 of 8" title="First, let's connect." subtitle="We'll use these to send your audit and personalised recommendations." />
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>First name *</Label><Input autoFocus value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="Michael" /></div>
        <div><Label>Last name *</Label><Input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Smith" /></div>
        <div><Label>Email *</Label><Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" /></div>
        <div><Label>Mobile number *</Label><Input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+27 75 000 0000" /></div>
        <div><Label>Company (optional)</Label><Input value={form.company ?? ""} onChange={(e) => update("company", e.target.value)} placeholder="Acme Inc." /></div>
        <div><Label>Job title (optional)</Label><Input value={form.jobTitle ?? ""} onChange={(e) => update("jobTitle", e.target.value)} placeholder="Founder" /></div>
        <div className="sm:col-span-2"><Label>Website URL (optional)</Label><Input type="url" value={form.websiteUrl ?? ""} onChange={(e) => update("websiteUrl", e.target.value)} placeholder="https://yourcompany.com" /></div>
      </div>
    </div>
  );
}

function PillGroup({ options, value, onSelect, multi = false, selected = [] }: { options: string[]; value?: string | null; onSelect: (v: string) => void; multi?: boolean; selected?: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isActive = multi ? selected.includes(opt) : value === opt;
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onSelect(opt)}
            className={cn(
              "rounded-2xl border px-4 py-2.5 text-sm font-subheading font-medium transition",
              isActive
                ? "border-transparent gradient-cta text-white shadow-glow"
                : "border-border bg-card text-foreground hover:border-[var(--gold)]/40 hover:bg-accent",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function StepProfile({ form, update }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  return (
    <div>
      <StepHeading eyebrow={`Great to meet you${form.firstName ? `, ${form.firstName}` : ""}.`} title="Tell us about your business." />
      <div className="space-y-8">
        <div>
          <Label>What best describes your business?</Label>
          <PillGroup options={BUSINESS_TYPES} value={form.businessType} onSelect={(v) => update("businessType", v)} />
        </div>
        <div>
          <Label>How many people work in your business?</Label>
          <PillGroup options={TEAM_SIZES} value={form.teamSize} onSelect={(v) => update("teamSize", v)} />
        </div>
        <div>
          <Label>What is your primary objective?</Label>
          <PillGroup options={OBJECTIVES} value={form.primaryObjective} onSelect={(v) => update("primaryObjective", v)} />
        </div>
      </div>
    </div>
  );
}

function StepServices({ form, toggle, quote }: { form: Form; toggle: (id: string) => void; quote: ReturnType<typeof buildQuote> }) {
  return (
    <div>
      <StepHeading eyebrow="Step 3 of 8" title="Which services are you exploring?" subtitle="Select all that apply. The investment indicator updates live." />
      <div className="space-y-6">
        {CATEGORIES.map((cat) => (
          <div key={cat}>
            <h3 className="mb-2 text-xs font-subheading font-semibold uppercase tracking-widest text-[var(--gold)]">{cat}</h3>
            <div className="flex flex-wrap gap-2">
              {servicesByCategory(cat).map((s) => {
                const active = form.selectedServices.includes(s.id);
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => toggle(s.id)}
                    className={cn(
                      "rounded-2xl border px-4 py-2.5 text-sm font-subheading font-medium transition",
                      active ? "border-transparent gradient-cta text-white shadow-glow" : "border-border bg-card text-foreground hover:border-[var(--gold)]/40 hover:bg-accent",
                    )}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {form.selectedServices.length > 0 && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-5">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Estimated investment</div>
          <div className="mt-1 font-heading text-2xl font-extrabold">
            {formatZAR(quote.starter)} – {formatZAR(quote.growth)}{quote.hasRecurring ? " /mo+" : ""}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{form.selectedServices.length} service{form.selectedServices.length === 1 ? "" : "s"} selected • Refined throughout the audit</div>
        </div>
      )}
    </div>
  );
}

function StepAudit({ form, update }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  return (
    <div>
      <StepHeading eyebrow="Website audit" title="Do you currently have a website?" subtitle="We'll save the URL and include a complimentary AI-powered website audit with your strategy session." />
      <div className="flex gap-3">
        {(["Yes", "No"] as const).map((opt) => {
          const yes = opt === "Yes";
          const active = form.hasExistingWebsite === yes;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => update("hasExistingWebsite", yes)}
              className={cn(
                "flex-1 rounded-2xl border px-6 py-5 text-base font-subheading font-semibold transition",
                active ? "border-transparent gradient-cta text-white shadow-glow" : "border-border bg-card text-foreground hover:bg-accent",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {form.hasExistingWebsite === true && (
        <div className="mt-6">
          <Label>Website URL</Label>
          <Input
            type="url"
            value={form.auditWebsiteUrl ?? ""}
            onChange={(e) => update("auditWebsiteUrl", e.target.value)}
            placeholder="https://www.yourwebsite.com"
            autoFocus
          />
        </div>
      )}
    </div>
  );
}

function StepProject({ form, update }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  return (
    <div>
      <StepHeading eyebrow="Project shape" title="What type of engagement are you looking for?" />
      <PillGroup options={PROJECT_TYPES} value={form.projectType} onSelect={(v) => update("projectType", v)} />
      <div className="mt-8">
        <Label>What is your estimated monthly budget?</Label>
        <PillGroup options={BUDGETS} value={form.monthlyBudget} onSelect={(v) => update("monthlyBudget", v)} />
      </div>
    </div>
  );
}

function StepTimeline({ form, update }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  return (
    <div>
      <StepHeading eyebrow="Timing" title="When would you like to get started?" />
      <PillGroup options={TIMELINES} value={form.timeline} onSelect={(v) => update("timeline", v)} />
    </div>
  );
}

function StepQuoteOpt({ form, update }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  return (
    <div>
      <StepHeading eyebrow="Instant estimate" title="Would you like an instant estimate?" subtitle="We'll generate a Starter, Recommended, and Growth investment range based on your selected services." />
      <div className="flex gap-3">
        {[true, false].map((opt) => (
          <button
            key={String(opt)}
            type="button"
            onClick={() => update("wantsQuote", opt)}
            className={cn(
              "flex-1 rounded-2xl border px-6 py-5 text-base font-subheading font-semibold transition",
              form.wantsQuote === opt ? "border-transparent gradient-cta text-white shadow-glow" : "border-border bg-card text-foreground hover:bg-accent",
            )}
          >
            {opt ? "Yes, show me" : "No, skip"}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepQuote({ quote }: { quote: ReturnType<typeof buildQuote> }) {
  const tiers = [
    { label: "Starter", value: quote.starter, tone: "border-border bg-card" },
    { label: "Recommended", value: quote.recommended, tone: "border-[var(--gold)]/60 bg-card shadow-glow" },
    { label: "Growth", value: quote.growth, tone: "border-border bg-card" },
  ];
  return (
    <div>
      <StepHeading eyebrow="Your estimate" title="Here's the investment range." subtitle="Based on the services you selected." />
      <div className="grid gap-4 sm:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.label} className={cn("rounded-3xl border p-6", t.tone)}>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.label}</div>
            <div className="mt-2 font-heading text-3xl font-extrabold">{formatZAR(t.value)}{quote.hasRecurring ? <span className="text-base font-medium text-muted-foreground"> /mo+</span> : "+"}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">This estimate is provided for planning purposes only and may change following a detailed consultation and project scoping session.</p>
    </div>
  );
}

function StepConsultation({ form, update }: { form: Form; update: <K extends keyof Form>(k: K, v: Form[K]) => void }) {
  return (
    <div>
      <StepHeading eyebrow="Strategy session" title={`${form.firstName ? form.firstName + ", y" : "Y"}our strategy session is ready.`} subtitle="Pick a preferred way to connect and a slot that works for you." />
      <div className="space-y-6">
        <div>
          <Label>Preferred contact method</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {CONTACT_METHODS.map(({ id, icon: Icon }) => {
              const active = form.contactPreference === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => update("contactPreference", id)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-2xl border px-4 py-4 text-sm font-subheading font-medium transition",
                    active ? "border-transparent gradient-cta text-white shadow-glow" : "border-border bg-card hover:bg-accent",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {id}
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Preferred date</Label>
            <Input type="date" value={form.preferredDate ?? ""} onChange={(e) => update("preferredDate", e.target.value)} min={new Date().toISOString().slice(0, 10)} />
          </div>
          <div>
            <Label>Preferred time</Label>
            <Input type="time" value={form.preferredTime ?? ""} onChange={(e) => update("preferredTime", e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepSummary({ form, quote }: { form: Form; quote: ReturnType<typeof buildQuote> }) {
  const serviceNames = form.selectedServices.map((id) => SERVICES.find((s) => s.id === id)?.name).filter(Boolean);
  return (
    <div>
      <StepHeading eyebrow="Almost there" title={`${form.firstName || "Friend"}, here's your personalised summary.`} subtitle="Review the highlights and submit to lock in your strategy session." />
      <div className="space-y-4 rounded-3xl border border-border bg-card p-6">
        <Row label="Selected services" value={serviceNames.length ? serviceNames.join(", ") : "—"} />
        <Row label="Business goal" value={form.primaryObjective || "—"} />
        <Row label="Budget" value={form.monthlyBudget || "—"} />
        <Row label="Timeline" value={form.timeline || "—"} />
        {form.hasExistingWebsite && form.auditWebsiteUrl && <Row label="Website audit URL" value={form.auditWebsiteUrl} />}
        {form.wantsQuote && (
          <Row label="Estimated investment" value={`${formatZAR(quote.starter)} – ${formatZAR(quote.growth)}${quote.hasRecurring ? " /mo+" : ""}`} />
        )}
        <Row label="Consultation" value={[form.contactPreference, form.preferredDate, form.preferredTime].filter(Boolean).join(" • ") || "—"} />
      </div>
      <p className="mt-4 text-xs text-muted-foreground">By submitting, you agree to be contacted by Sibiso Marketing about your project. We never share your details.</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[180px_1fr]">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="text-sm text-foreground">{value}</div>
    </div>
  );
}

function SuccessScreen({ form, quote }: { form: Form; quote: ReturnType<typeof buildQuote> }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-glow"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 220, damping: 16 }}
          className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-cta text-white shadow-glow"
        >
          <Check className="h-7 w-7" />
        </motion.span>
        <h1 className="mt-6 font-heading text-4xl font-extrabold">You're All Set{form.firstName ? `, ${form.firstName}` : ""}.</h1>
        <p className="mt-3 text-muted-foreground">Thank you for completing your business audit. A member of our team will review your information and contact you shortly via {form.contactPreference || "your preferred channel"}.</p>
        <div className="mt-6 space-y-2 rounded-2xl border border-border bg-background p-5 text-left text-sm">
          {form.wantsQuote && (
            <div className="flex justify-between gap-3"><span className="text-muted-foreground">Estimated investment</span><span className="font-semibold">{formatZAR(quote.starter)} – {formatZAR(quote.growth)}{quote.hasRecurring ? " /mo+" : ""}</span></div>
          )}
          {form.preferredDate && (
            <div className="flex justify-between gap-3"><span className="text-muted-foreground">Consultation</span><span className="font-semibold flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {form.preferredDate} {form.preferredTime}</span></div>
          )}
          <div className="flex justify-between gap-3"><span className="text-muted-foreground">Services</span><span className="text-right font-semibold">{form.selectedServices.length} selected</span></div>
        </div>
        <a href="/" className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-3 text-sm font-subheading font-semibold text-foreground transition hover:bg-accent">
          Back to home
        </a>
      </motion.div>
    </div>
  );
}
