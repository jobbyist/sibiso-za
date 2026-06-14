import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui-kit";

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <div className="absolute inset-0 gradient-hero opacity-90" />
      <div className="relative mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col items-start gap-4">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl">{title}</h1>
          <p className="text-sm text-white/60">Last updated: {lastUpdated}</p>
        </div>

        <article className="mt-12 rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10 [&>h2]:font-heading [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-3 [&>p]:mb-4 [&>p]:text-foreground/85 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul>li]:mb-1.5 [&>ul>li]:text-foreground/85 [&_a]:text-[var(--gold)] [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </article>
      </div>
    </div>
  );
}
