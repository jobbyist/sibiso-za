export type TrackingData = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referrer: string | null;
  landing_page: string | null;
  device_type: string | null;
  user_agent: string | null;
};

export function readTracking(): TrackingData {
  if (typeof window === "undefined") {
    return {
      utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, utm_content: null,
      referrer: null, landing_page: null, device_type: null, user_agent: null,
    };
  }
  const params = new URLSearchParams(window.location.search);
  const ua = window.navigator.userAgent;
  const device = /Mobi|Android/i.test(ua) ? "mobile" : /Tablet|iPad/i.test(ua) ? "tablet" : "desktop";
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
    referrer: document.referrer || null,
    landing_page: window.location.pathname + window.location.search,
    device_type: device,
    user_agent: ua,
  };
}
