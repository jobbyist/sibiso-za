import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { CTAButton } from "./ui-kit";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Solutions", to: "/solutions" },
  { label: "About", to: "/about" },
  { label: "Process", to: "/process" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Blog", to: "/blog" },
  { label: "Podcast", to: "/podcast" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <motion.div
          className="h-0.5 origin-left gradient-gold"
          style={{ scaleX: progress }}
        />
        <div
          className={cn(
            "transition-all duration-300",
            scrolled ? "glass shadow-soft" : "bg-transparent",
          )}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
            <Link to="/" className="flex items-center" aria-label="Sibiso Marketing home">
              <Logo className="h-9 w-auto" />
            </Link>

            <div className="hidden items-center gap-1 xl:flex">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium font-subheading transition-colors",
                    pathname === item.to
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <CTAButton to="/contact" variant="primary" className="hidden px-5 py-2.5 sm:inline-flex">
                Book Free Growth Audit <ArrowUpRight className="h-4 w-4" />
              </CTAButton>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card xl:hidden"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-0 top-[64px] z-40 mx-3 rounded-3xl glass p-4 shadow-card xl:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-medium font-subheading",
                  pathname === item.to ? "bg-accent text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <CTAButton to="/contact" variant="primary" className="mt-2 w-full">
              Book Free Growth Audit <ArrowUpRight className="h-4 w-4" />
            </CTAButton>
          </div>
        </motion.div>
      )}
    </>
  );
}
