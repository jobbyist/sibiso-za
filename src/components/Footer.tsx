import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { CTAButton } from "./ui-kit";
import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Instagram, Facebook } from "lucide-react";

const cols = [
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Process", to: "/process" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Solutions", to: "/solutions" },
      { label: "Blog", to: "/blog" },
      { label: "Podcast", to: "/podcast" },
      { label: "Book Audit", to: "/bookings" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <Logo className="h-10 w-auto" />
            <p className="max-w-xs text-sm text-muted-foreground">
              We don't just market businesses. We build systems that drive growth — combining strategy,
              technology, and data intelligence into predictable revenue.
            </p>
            <div className="flex gap-2">
              {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="font-subheading text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {col.title}
              </h4>
              {col.links.map((l) => (
                <Link key={l.label} to={l.to} className="text-sm text-foreground/80 transition-colors hover:text-[var(--gold)]">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}

          <div className="flex flex-col gap-4">
            <h4 className="font-subheading text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Get in touch
            </h4>
            <a href="mailto:hello@sibisomarketing.co.za" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-[var(--gold)]">
              <Mail className="h-4 w-4 text-[var(--gold)]" /> hello@sibisomarketing.co.za
            </a>
            <a href="tel:+27753813495" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-[var(--gold)]">
              <Phone className="h-4 w-4 text-[var(--gold)]" /> +27 75 381 3495
            </a>
            <span className="flex items-center gap-2 text-sm text-foreground/80">
              <MapPin className="h-4 w-4 text-[var(--gold)]" /> Johannesburg, South Africa
            </span>
            <CTAButton to="/bookings" variant="gold" className="mt-2">
              Book Free Growth Audit <ArrowUpRight className="h-4 w-4" />
            </CTAButton>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Sibiso Marketing. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link to="/terms" className="transition-colors hover:text-[var(--gold)]">Terms</Link>
            <Link to="/privacy" className="transition-colors hover:text-[var(--gold)]">Privacy</Link>
            <Link to="/cookies" className="transition-colors hover:text-[var(--gold)]">Cookies</Link>
            <Link to="/accessibility" className="transition-colors hover:text-[var(--gold)]">Accessibility</Link>
          </div>
          <p>Powered by Gravitas</p>
        </div>
      </div>
    </footer>
  );
}
