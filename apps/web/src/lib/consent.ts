export const CONSENT_STORAGE_KEY = "thaipass-pd-consent-v1";
export const CONSENT_VERSION = "2026-06-11";

export type ConsentRecord = {
  version: string;
  acceptedAt: string;
  analytics: boolean;
};

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(record: ConsentRecord) {
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  window.dispatchEvent(new CustomEvent("thaipass:consent", { detail: record }));
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}
