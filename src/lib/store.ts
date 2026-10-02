"use client";
import { useSyncExternalStore } from "react";
import type { EvidenceKey } from "@/content/copy";

/**
 * Tiny global store shared between scenes and the persistent header.
 * Scenes derive these values from scroll progress (never from timeline callbacks)
 * so scrubbing backwards stays correct.
 */
type State = {
  evidence: Record<EvidenceKey, boolean>;
  chrome: boolean; // persistent header visible
  ready: boolean; // preloader finished
};

let state: State = {
  evidence: { projects: false, decisions: false, results: false, team: false },
  chrome: false,
  ready: false,
};
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const store = {
  get: () => state,
  set(patch: Partial<State>) {
    state = { ...state, ...patch };
    emit();
  },
  setEvidence(key: EvidenceKey, v: boolean) {
    if (state.evidence[key] === v) return;
    state = { ...state, evidence: { ...state.evidence, [key]: v } };
    emit();
  },
  setChrome(v: boolean) {
    if (state.chrome !== v) store.set({ chrome: v });
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore(
    store.subscribe,
    () => sel(state),
    () => sel(state),
  );
}
