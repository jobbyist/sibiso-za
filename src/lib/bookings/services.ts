// Service catalog & pricing matrix (ZAR). Source of truth for the wizard.

export type PricingTier = {
  starter: number;
  recommended: number;
  growth: number;
  recurring?: boolean; // monthly retainer pricing
  flat?: boolean; // single flat-rate service
};

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  pricing: PricingTier;
  triggersAudit?: boolean;
};

export type ServiceCategory =
  | "AI & Automation"
  | "Communication"
  | "Web & Development"
  | "Marketing & Growth"
  | "Creative Services"
  | "Digital Assets";

export const SERVICES: Service[] = [
  // AI & AUTOMATION
  { id: "ai-workflow", name: "AI Workflow Automation", category: "AI & Automation", pricing: { starter: 5000, recommended: 15000, growth: 75000 } },
  { id: "ai-email", name: "AI-Powered Business Emails", category: "AI & Automation", pricing: { starter: 2500, recommended: 5000, growth: 12000 } },
  { id: "voice-agent", name: "Virtual Voice Call Agents", category: "AI & Automation", pricing: { starter: 5000, recommended: 15000, growth: 50000 } },

  // COMMUNICATION
  { id: "voip", name: "Virtual Landline Numbers (VoIP)", category: "Communication", pricing: { starter: 500, recommended: 1000, growth: 2500 } },

  // WEB & DEVELOPMENT
  { id: "one-page", name: "One-Page Website", category: "Web & Development", pricing: { starter: 3000, recommended: 3000, growth: 3000, flat: true }, triggersAudit: true },
  { id: "business-site", name: "Business Website", category: "Web & Development", pricing: { starter: 5000, recommended: 10000, growth: 25000 }, triggersAudit: true },
  { id: "redesign", name: "Website Redesign", category: "Web & Development", pricing: { starter: 4000, recommended: 8000, growth: 20000 }, triggersAudit: true },
  { id: "ecommerce", name: "E-Commerce Website", category: "Web & Development", pricing: { starter: 10000, recommended: 20000, growth: 50000 }, triggersAudit: true },
  { id: "custom-app", name: "Custom Web Application", category: "Web & Development", pricing: { starter: 15000, recommended: 35000, growth: 100000 } },
  { id: "dashboard", name: "Internal Dashboard", category: "Web & Development", pricing: { starter: 10000, recommended: 20000, growth: 60000 } },
  { id: "crm-integration", name: "CRM Integration", category: "Web & Development", pricing: { starter: 3000, recommended: 8000, growth: 25000 } },
  { id: "site-maintenance", name: "Website Maintenance", category: "Web & Development", pricing: { starter: 1500, recommended: 3500, growth: 8000, recurring: true } },

  // MARKETING & GROWTH
  { id: "social", name: "Social Media Management", category: "Marketing & Growth", pricing: { starter: 2500, recommended: 5000, growth: 15000, recurring: true } },
  { id: "content", name: "Content Creation", category: "Marketing & Growth", pricing: { starter: 2000, recommended: 5000, growth: 15000, recurring: true } },
  { id: "seo", name: "SEO Optimisation", category: "Marketing & Growth", pricing: { starter: 2500, recommended: 5000, growth: 15000, recurring: true }, triggersAudit: true },
  { id: "ads", name: "Paid Advertising Management", category: "Marketing & Growth", pricing: { starter: 2500, recommended: 7500, growth: 20000, recurring: true } },
  { id: "leadgen", name: "Lead Generation Systems", category: "Marketing & Growth", pricing: { starter: 5000, recommended: 12500, growth: 40000 } },
  { id: "email-marketing", name: "Email Marketing", category: "Marketing & Growth", pricing: { starter: 2000, recommended: 5000, growth: 12000, recurring: true } },
  { id: "marketing-consult", name: "Marketing Consulting", category: "Marketing & Growth", pricing: { starter: 1500, recommended: 3500, growth: 10000, recurring: true } },
  { id: "perf-opt", name: "Performance Optimisation", category: "Marketing & Growth", pricing: { starter: 2500, recommended: 5000, growth: 15000 }, triggersAudit: true },

  // CREATIVE
  { id: "graphic-design", name: "Graphic Design", category: "Creative Services", pricing: { starter: 1500, recommended: 5000, growth: 15000 } },
  { id: "brand-identity", name: "Brand Identity Design", category: "Creative Services", pricing: { starter: 3500, recommended: 8500, growth: 25000 } },

  // DIGITAL ASSETS
  { id: "asset-mgmt", name: "Digital Asset Management", category: "Digital Assets", pricing: { starter: 2000, recommended: 5000, growth: 12000, recurring: true } },
  { id: "monetisation", name: "Content Monetisation Systems", category: "Digital Assets", pricing: { starter: 3500, recommended: 8500, growth: 25000 } },
];

export const CATEGORIES: ServiceCategory[] = [
  "AI & Automation",
  "Communication",
  "Web & Development",
  "Marketing & Growth",
  "Creative Services",
  "Digital Assets",
];

export function getService(id: string) {
  return SERVICES.find((s) => s.id === id);
}

export function servicesByCategory(category: ServiceCategory) {
  return SERVICES.filter((s) => s.category === category);
}

export function formatZAR(value: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(value);
}
