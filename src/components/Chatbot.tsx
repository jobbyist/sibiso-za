import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Msg = { role: "bot" | "user"; text: string };

const OPENING =
  "Hi there! I'm Sibiso, your virtual AI assistant. If you need help with anything — I'd be more than happy to help 🙂";

const PROMPTS = [
  "Do you build websites?",
  "How does the Growth Audit work?",
  "What industries do you serve?",
  "Can you help generate leads?",
  "Tell me about your packages.",
  "Book a free consultation.",
];

function answer(q: string): string {
  const t = q.toLowerCase();
  if (t.includes("website")) return "Absolutely. Website optimization and conversion-focused builds are part of our Growth Engine and Market Domination packages — designed to turn visitors into qualified leads.";
  if (t.includes("audit")) return "Our free Growth Audit reviews your positioning, funnels, and channels, then maps where revenue is leaking. You'll get a clear, actionable growth roadmap. Want me to take you to the booking page?";
  if (t.includes("industr")) return "We partner with startups, SMEs and established enterprises across professional services, retail, tech, finance and more — anywhere predictable growth matters.";
  if (t.includes("lead")) return "Yes — lead generation systems, paid advertising and funnel development are core to what we do. We focus on qualified leads, not vanity metrics.";
  if (t.includes("package")) return "We offer three: Growth Starter (credibility), Growth Engine (lead generation) and Market Domination (scalable automation). Check the Solutions page for details.";
  if (t.includes("consult") || t.includes("book")) return "Great choice! Head to our Contact page to book a complimentary consultation — we'll respond within one business day.";
  return "Thanks for reaching out! For tailored advice, book a free growth audit on our Contact page and a growth consultant will guide you.";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "bot", text: OPENING }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [...m, { role: "user", text: value }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "bot", text: answer(value) }]);
    }, 900);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 z-[90] flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl glass shadow-card"
          >
            <div className="flex items-center gap-3 border-b border-border bg-card/80 px-4 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full gradient-cta text-white">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <p className="font-subheading text-sm font-semibold">Sibiso AI Assistant</p>
                <p className="text-xs text-muted-foreground">Typically replies instantly</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="ml-auto rounded-full p-1.5 hover:bg-accent">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <p
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-primary-foreground"
                        : "max-w-[85%] rounded-2xl rounded-bl-md bg-accent px-3.5 py-2.5 text-sm text-foreground"
                    }
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl bg-accent px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => send(p)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border bg-card/80 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--gold)]"
              />
              <button type="submit" aria-label="Send" className="flex h-10 w-10 items-center justify-center rounded-full gradient-cta text-white">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Sibiso AI Assistant"
        className="fixed bottom-5 right-4 z-[90] inline-flex items-center gap-2 rounded-full p-[2px] gradient-gold animate-gradient shadow-glow"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-3 text-sm font-semibold font-subheading text-foreground">
          {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5 text-[var(--gold)]" />}
          <span className="hidden sm:inline">Sibiso AI Assistant</span>
        </span>
      </button>
    </>
  );
}
