import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "gradient-cta animate-gradient text-white shadow-glow hover:shadow-[0_16px_50px_-12px_rgba(255,122,0,0.55)]",
  gold: "gradient-gold animate-gradient text-[#111111] shadow-glow",
  outline: "border border-border bg-transparent text-foreground hover:bg-accent",
  ghost: "bg-transparent text-foreground hover:bg-accent",
};

export function CTAButton({
  children,
  to,
  href,
  variant = "primary",
  className,
  onClick,
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold font-subheading transition-all duration-300 hover:-translate-y-0.5";
  const cls = cn(base, styles[variant], className);

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  );
}
