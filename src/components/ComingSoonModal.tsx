import { useEffect, useState, type MouseEvent } from "react";
import { Sparkles, X } from "lucide-react";

type Listener = (open: boolean) => void;
const listeners = new Set<Listener>();
let isOpen = false;

export function openComingSoon() {
  isOpen = true;
  listeners.forEach((l) => l(true));
}

export function closeComingSoon() {
  isOpen = false;
  listeners.forEach((l) => l(false));
}

/** onClick handler that prevents navigation and opens the coming-soon modal. */
export function comingSoonHandler(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  openComingSoon();
}

export function ComingSoonModal() {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    const l: Listener = (v) => setOpen(v);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeComingSoon();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={closeComingSoon}
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-glow">
        <button
          type="button"
          onClick={closeComingSoon}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-cta text-white shadow-glow">
          <Sparkles className="h-6 w-6" />
        </span>
        <h2 id="coming-soon-title" className="mt-5 font-heading text-2xl font-extrabold">
          Coming Soon
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We're putting the finishing touches on this content. Subscribe to be the first to know when it goes live.
        </p>
        <button
          type="button"
          onClick={closeComingSoon}
          className="mt-6 inline-flex w-full items-center justify-center rounded-2xl gradient-cta px-5 py-3 font-subheading font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
