import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";

const QUOTES = [
  "A brand is no longer what we tell the customer it is. It's what customers tell each other it is.",
  "Marketing without strategy is noise.",
  "Visibility means nothing without conversion.",
  "Growth happens when systems outperform effort.",
  "Great brands create trust before transactions.",
  "Marketing should generate revenue, not vanity metrics.",
  "Attention is earned through value.",
  "Consistency compounds results.",
  "The best marketing feels helpful.",
  "Growth begins with positioning.",
];

export function Preloader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quote, setQuote] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("sibiso-preloaded")) return;
    setShow(true);
    sessionStorage.setItem("sibiso-preloaded", "1");

    const start = Date.now();
    const duration = 3000;
    const tick = setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / duration) * 100));
      setProgress(pct);
      if (pct >= 100) clearInterval(tick);
    }, 40);

    const q = setInterval(() => setQuote((v) => (v + 1) % QUOTES.length), 1500);
    const done = setTimeout(() => setShow(false), duration + 350);

    return () => {
      clearInterval(tick);
      clearInterval(q);
      clearTimeout(done);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Logo className="h-12 w-auto sm:h-14" />
          </motion.div>

          <div className="mt-10 h-1.5 w-64 overflow-hidden rounded-full bg-muted sm:w-80">
            <div
              className="h-full gradient-gold transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 font-subheading text-sm font-semibold tabular-nums text-muted-foreground">
            {progress}%
          </p>

          <div className="mt-8 h-12 max-w-md text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={quote}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="text-sm italic text-muted-foreground"
              >
                "{QUOTES[quote]}"
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
