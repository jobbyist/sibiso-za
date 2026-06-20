import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Sibiso Marketing" },
      { name: "description", content: "The terms and conditions for using Sibiso Marketing services." },
      { property: "og:title", content: "Terms of Service — Sibiso Marketing" },
      { property: "og:description", content: "The terms and conditions for using Sibiso Marketing services." },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="14 June 2026">
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using the Sibiso Marketing website, client portal, or any of our services, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.</p>

      <h2>2. Services</h2>
      <p>Sibiso Marketing provides strategic growth services including marketing strategy, websites, paid advertising, design, and AI services. The specific scope of any engagement is defined in a separate written agreement.</p>

      <h2>3. Client Accounts</h2>
      <p>New accounts must be approved by Sibiso Marketing before gaining access to the client portal. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.</p>

      <h2>4. Payment</h2>
      <p>Fees are invoiced as specified in the relevant service agreement. Payment is accepted via PayFast (Visa, Mastercard, AMEX) or EFT/bank transfer. Late payments may incur interest at the prime rate plus 2%.</p>

      <h2>5. Intellectual Property</h2>
      <p>All content, designs, and code produced by Sibiso Marketing remain our property until full payment is received, after which ownership transfers to the client as set out in the service agreement.</p>

      <h2>6. Limitation of Liability</h2>
      <p>Sibiso Marketing's total liability for any claim arising out of these terms is limited to the fees paid by the client in the three months preceding the claim. We are not liable for indirect or consequential damages.</p>

      <h2>7. Termination</h2>
      <p>Either party may terminate the relationship with 30 days' written notice. Fees for work completed up to the termination date remain payable.</p>

      <h2>8. Governing Law</h2>
      <p>These terms are governed by the laws of the Republic of South Africa. Any disputes will be subject to the exclusive jurisdiction of the courts of Johannesburg.</p>

      <h2>9. Contact</h2>
      <p>For questions about these terms, contact us at <a href="mailto:hello@sibisomarketing.co.za">hello@sibisomarketing.co.za</a>.</p>
    </LegalPage>
  );
}
