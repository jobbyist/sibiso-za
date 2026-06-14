// Idempotent admin user seeder. Safe to call multiple times.
// Creates admin@sibisomarketing.co.za if missing and grants the admin role.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "admin@sibisomarketing.co.za";
const ADMIN_PASSWORD = "Sibiso101$";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Find existing user
    const { data: list, error: listErr } = await admin.auth.admin.listUsers();
    if (listErr) throw listErr;
    let user = list.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);

    if (!user) {
      const { data: created, error: createErr } = await admin.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
        user_metadata: { first_name: "Sibiso", last_name: "Admin" },
      });
      if (createErr) throw createErr;
      user = created.user!;
    }

    // Ensure admin role
    const { error: roleErr } = await admin
      .from("user_roles")
      .upsert({ user_id: user.id, role: "admin" }, { onConflict: "user_id,role" });
    if (roleErr) throw roleErr;

    // Auto-approve and mark onboarding complete
    const { error: profErr } = await admin
      .from("profiles")
      .update({
        approved: true,
        onboarding_complete: true,
        first_name: "Sibiso",
        last_name: "Admin",
        company: "Sibiso Marketing",
      })
      .eq("id", user.id);
    if (profErr) throw profErr;

    return new Response(
      JSON.stringify({ ok: true, user_id: user.id, email: ADMIN_EMAIL }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("seed-admin failed", err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
