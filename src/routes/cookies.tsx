import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Sibiso Marketing" },
      { name: "description", content: "How Sibiso Marketing uses cookies and similar technologies." },
      { property: "og:title", content: "Cookie Policy — Sibiso Marketing" },
      { property: "og:description", content: "How Sibiso Marketing uses cookies and similar technologies." },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="14 June 2026">
      <p>This policy explains how Sibiso Marketing uses cookies and similar tracking technologies on our website.</p>

      <h2>1. What Are Cookies</h2>
      <p>Cookies are small text files stored on your device by your browser when you visit a website. They allow the site to remember your preferences and how you interact with it.</p>

      <h2>2. Types of Cookies We Use</h2>
      <ul>
        <li><strong>Strictly necessary</strong> — required for the site to function (authentication, security).</li>
        <li><strong>Preference</strong> — remember your theme (light/dark) and other UI choices.</li>
        <li><strong>Analytics</strong> — Google Analytics, used to understand how visitors use the site. IP addresses are anonymised.</li>
      </ul>

      <h2>3. Managing Cookies</h2>
      <p>Most browsers let you control cookies through their settings. Disabling strictly necessary cookies may prevent parts of the site (such as the client portal) from working.</p>

      <h2>4. Third-Party Cookies</h2>
      <p>We use Google Analytics and may embed content from YouTube or Vimeo, which set their own cookies. These providers have their own privacy policies.</p>

      <h2>5. Contact</h2>
      <p>Questions about this policy? Email <a href="mailto:privacy@sibiso.co">privacy@sibiso.co</a>.</p>
    </LegalPage>
  );
}
