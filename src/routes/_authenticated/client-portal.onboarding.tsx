import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/client-portal/onboarding")({
  head: () => ({ meta: [{ title: "Onboarding — Sibiso Marketing" }, { name: "robots", content: "noindex" }] }),
  component: OnboardingPlaceholder,
});

function OnboardingPlaceholder() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 text-center">
      <h1 className="font-heading text-3xl font-bold">Onboarding flow</h1>
      <p className="mt-3 text-muted-foreground">The Typeform-style 3-step onboarding (Profile → Services → Activation) ships in Phase 2.</p>
    </div>
  );
}
