import { getService, SERVICES } from "./services";

export type QuoteLineItem = {
  serviceId: string;
  name: string;
  starter: number;
  recommended: number;
  growth: number;
  recurring: boolean;
};

export type Quote = {
  starter: number;
  recommended: number;
  growth: number;
  lineItems: QuoteLineItem[];
  hasRecurring: boolean;
};

export function buildQuote(selectedIds: string[]): Quote {
  const lineItems: QuoteLineItem[] = selectedIds
    .map((id) => getService(id))
    .filter((s): s is NonNullable<ReturnType<typeof getService>> => Boolean(s))
    .map((s) => ({
      serviceId: s.id,
      name: s.name,
      starter: s.pricing.starter,
      recommended: s.pricing.recommended,
      growth: s.pricing.growth,
      recurring: Boolean(s.pricing.recurring),
    }));

  return {
    starter: lineItems.reduce((sum, i) => sum + i.starter, 0),
    recommended: lineItems.reduce((sum, i) => sum + i.recommended, 0),
    growth: lineItems.reduce((sum, i) => sum + i.growth, 0),
    lineItems,
    hasRecurring: lineItems.some((i) => i.recurring),
  };
}

export function shouldShowAuditQuestion(selectedIds: string[]): boolean {
  return selectedIds
    .map((id) => SERVICES.find((s) => s.id === id))
    .some((s) => s?.triggersAudit);
}
