import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { LogOut, Clock, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/_authenticated/client-portal")({
  head: () => ({ meta: [{ title: "Client Portal — Sibiso Marketing" }, { name: "robots", content: "noindex" }] }),
  component: ClientPortalPage,
});

type Profile = {
  approved: boolean;
  onboarding_complete: boolean;
  first_name: string | null;
  account_manager_name: string | null;
  account_manager_email: string | null;
  account_manager_phone: string | null;
};

function ClientPortalPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("approved, onboarding_complete, first_name, account_manager_name, account_manager_email, account_manager_phone")
        .eq("id", user.id)
        .single();
      setProfile(data as Profile | null);
      setLoading(false);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (loading) {
    return <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">Loading…</div>;
  }

  // Not onboarded yet
  if (profile && !profile.onboarding_complete) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold">Complete your onboarding</h1>
        <p className="mt-3 text-muted-foreground">Finish the quick 3-step setup so we can activate your account.</p>
        <Link
          to="/client-portal/onboarding"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl gradient-cta px-6 py-3 text-sm font-semibold text-white shadow-glow"
        >
          Continue onboarding <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  // Pending approval screen
  if (profile && !profile.approved) {
    return (
      <div className="relative min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto flex max-w-xl flex-col items-center px-5 py-20 text-center">
          <Logo className="h-10 w-auto" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 w-full rounded-3xl border border-white/10 glass p-8 shadow-card"
          >
            <Clock className="mx-auto h-10 w-10 text-[var(--gold)]" />
            <h1 className="mt-4 font-heading text-2xl font-bold text-white">Account pending approval</h1>
            <p className="mt-3 text-sm text-white/70">
              Thanks {profile.first_name || "for signing up"}! Your account manager <strong className="text-white">{profile.account_manager_name}</strong> will
              review your details and contact you shortly.
            </p>
            <div className="mt-6 rounded-2xl bg-white/5 p-4 text-left text-sm text-white/80">
              <p><strong>Email:</strong> <a className="text-[var(--gold)] hover:underline" href={`mailto:${profile.account_manager_email}`}>{profile.account_manager_email}</a></p>
              <p className="mt-1"><strong>Phone:</strong> <a className="text-[var(--gold)] hover:underline" href={`tel:${profile.account_manager_phone}`}>{profile.account_manager_phone}</a></p>
            </div>
            <button
              onClick={signOut}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Approved — placeholder for full dashboard (Phase 2)
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 lg:py-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-extrabold">Welcome, {profile?.first_name || "Client"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your client portal — Account, Services, Billing, Documents, Support.</p>
        </div>
        <button
          onClick={signOut}
          className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
      <div className="mt-10 rounded-3xl border border-border bg-card p-10 text-center">
        <p className="text-muted-foreground">Full portal dashboard coming in Phase 2 — tabs for Account, Services, Billing, Documents, and Support.</p>
      </div>
    </div>
  );
}
