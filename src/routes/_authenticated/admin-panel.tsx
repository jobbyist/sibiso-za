import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Shield } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin-panel")({
  head: () => ({ meta: [{ title: "Admin Panel — Sibiso Marketing" }, { name: "robots", content: "noindex" }] }),
  beforeLoad: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw redirect({ to: "/auth" });
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
    if (!isAdmin) throw redirect({ to: "/client-portal" });
  },
  component: AdminPanelPage,
});

function AdminPanelPage() {
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("approved", false)
      .then(({ count }) => setPendingCount(count ?? 0));
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-7 w-7 text-[var(--gold)]" />
          <div>
            <h1 className="font-heading text-3xl font-extrabold">Admin Panel</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage clients, approvals, support, and site insights.</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Pending approvals</p>
          <p className="mt-2 font-heading text-4xl font-extrabold text-[var(--gold)]">{pendingCount}</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Support tickets</p>
          <p className="mt-2 font-heading text-4xl font-extrabold">—</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Referrals</p>
          <p className="mt-2 font-heading text-4xl font-extrabold">—</p>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground">
        Full admin workspace (approvals queue, client list, ticket inbox, GA insights, referrals) ships in Phase 3.
      </div>
    </div>
  );
}
