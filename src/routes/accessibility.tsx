import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility Statement — Sibiso Marketing" },
      { name: "description", content: "Sibiso Marketing's commitment to digital accessibility." },
      { property: "og:title", content: "Accessibility Statement — Sibiso Marketing" },
      { property: "og:description", content: "Sibiso Marketing's commitment to digital accessibility." },
    ],
    links: [{ rel: "canonical", href: "/accessibility" }],
  }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility Statement" lastUpdated="14 June 2026">
      <p>Sibiso Marketing is committed to making our website accessible to everyone, including people with disabilities.</p>

      <h2>1. Our Standard</h2>
      <p>We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. We continuously test and improve our site to support assistive technologies.</p>

      <h2>2. Features</h2>
      <ul>
        <li>Semantic HTML and ARIA landmarks for screen readers</li>
        <li>Keyboard navigation for all interactive elements</li>
        <li>High-contrast colour palette and dark mode</li>
        <li>Alt text on meaningful images</li>
        <li>Scalable text and responsive layouts</li>
      </ul>

      <h2>3. Known Limitations</h2>
      <p>Some embedded third-party content (analytics widgets, social embeds) may not fully meet our accessibility standards. We're working with our providers to improve this.</p>

      <h2>4. Feedback</h2>
      <p>If you encounter an accessibility barrier on our site, please email <a href="mailto:hello@sibiso.co">hello@sibiso.co</a> with the page URL and a description. We aim to respond within 5 business days.</p>
    </LegalPage>
  );
}
