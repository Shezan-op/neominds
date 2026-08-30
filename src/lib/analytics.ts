/**
 * Production Analytics event tracking dispatcher.
 * Safely dispatches events if Google Analytics / custom analytics provider is mounted,
 * while preventing errors when running in dev, server-side, or when tracking is blocked.
 */

type AnalyticsEvent = {
  action: string;
  category: "cta" | "contact_form" | "service_inspection" | "case_study" | "case_study_inspection" | "industry_inspection" | "navigation" | "interaction";
  label?: string;
  value?: number;
};

export function trackEvent({ action, category, label, value }: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  // Dispatch to window.gtag if present
  if (typeof (window as unknown as { gtag?: Function }).gtag === "function") {
    (window as unknown as { gtag: Function }).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Log in development for testing
  if (process.env.NODE_ENV === "development") {
    console.debug(`[Analytics Event] ${category} -> ${action}`, { label, value });
  }
}
