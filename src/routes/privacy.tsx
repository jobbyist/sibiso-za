import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Sibiso Marketing" },
      { name: "description", content: "How Sibiso Marketing collects, uses, and protects your personal information." },
      { property: "og:title", content: "Privacy Policy — Sibiso Marketing" },
      { property: "og:description", content: "How Sibiso Marketing collects, uses, and protects your personal information." },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="14 June 2026">
      <p>Sibiso Marketing is committed to protecting your personal information in accordance with the Protection of Personal Information Act, 2013 (POPIA).</p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>Contact details (name, email, phone, company, address)</li>
        <li>Account credentials and profile information</li>
        <li>Billing and payment information</li>
        <li>Communications with our team and AI assistant</li>
        <li>Website analytics (anonymised page views, device, location)</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To deliver and improve our services</li>
        <li>To process payments and send invoices</li>
        <li>To communicate updates, support, and (with consent) marketing</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>3. Sharing</h2>
      <p>We do not sell your personal information. We share data only with processors necessary to deliver our services (hosting, payments, email) under written processing agreements.</p>

      <h2>4. Storage and Security</h2>
      <p>Data is stored on secure cloud infrastructure with encryption in transit and at rest. We retain personal information only as long as necessary for the purposes set out above or as required by law.</p>

      <h2>5. Your Rights</h2>
      <ul>
        <li>Access the personal information we hold about you</li>
        <li>Request correction or deletion</li>
        <li>Object to processing or withdraw consent</li>
        <li>Lodge a complaint with the Information Regulator</li>
      </ul>

      <h2>6. Contact</h2>
      <p>To exercise any of these rights, contact our Information Officer at <a href="mailto:privacy@sibiso.co">privacy@sibiso.co</a>.</p>
    </LegalPage>
  );
}
