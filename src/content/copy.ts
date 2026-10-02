import { en, underTheHoodEn, PLACEHOLDERS } from "./copy.en";
import { pt, underTheHoodPt } from "./copy.pt";
import { getLang } from "@/lib/lang";

/**
 * `copy` / `underTheHood` always read the ACTIVE language, so every scene keeps importing them unchanged.
 * Switching language remounts the experience (see Experience.tsx) so everything re-reads the copy.
 * English is the source of truth for the shape; Portuguese must match it (copy.pt.ts).
 */
export type EvidenceKey = (typeof en.evidence.keys)[number];

function active<T extends object>(a: T, b: T): T {
  return new Proxy({} as T, { get: (_t, k) => (getLang() === "pt" ? b : a)[k as keyof T] });
}

export const copy = active(en, pt as unknown as typeof en);
export const underTheHood = active(underTheHoodEn, underTheHoodPt as unknown as typeof underTheHoodEn);
export { PLACEHOLDERS };
