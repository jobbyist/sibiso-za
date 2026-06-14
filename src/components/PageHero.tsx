import type { ReactNode } from "react";
import { Eyebrow } from "./ui-kit";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 opacity-40 [background:radial-gradient(55%_50%_at_85%_-10%,rgba(212,175,55,0.22),transparent),radial-gradient(45%_50%_at_0%_10%,rgba(255,122,0,0.16),transparent)]" />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center lg:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-col items-center gap-5">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle && <p className="max-w-2xl text-base text-white/70 sm:text-lg">{subtitle}</p>}
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
