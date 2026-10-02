"use client";
/**
 * Restrained UI sound. NO autoplay: nothing plays until the visitor turns sound on.
 *
 * Add real files later by dropping them into /public/audio and (optionally) editing FILES.
 * If a file is missing we fall back to a very quiet synthesised tone so the toggle still works.
 */
export type Cue = "signal" | "connect" | "error" | "complete" | "tick";

const FILES: Record<Cue, string> = {
  signal: "/audio/signal.mp3",
  connect: "/audio/connect.mp3",
  error: "/audio/error.mp3",
  complete: "/audio/complete.mp3",
  tick: "/audio/tick.mp3",
};

// frequency (Hz), duration (s), gain — deliberately tiny
const SYNTH: Record<Cue, [number, number, number]> = {
  signal: [660, 0.35, 0.03],
  connect: [520, 0.25, 0.025],
  error: [150, 0.4, 0.04],
  complete: [880, 0.5, 0.025],
  tick: [1200, 0.04, 0.012],
};

let enabled = false;
let ctx: AudioContext | null = null;
const missing = new Set<Cue>();
const fired = new Set<string>();

function synth(cue: Cue) {
  try {
    ctx ??= new AudioContext();
    const [f, d, g] = SYNTH[cue];
    const o = ctx.createOscillator();
    const gain = ctx.createGain();
    o.type = "sine";
    o.frequency.value = f;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(g, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + d);
    o.connect(gain).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + d + 0.05);
  } catch {
    /* audio is optional */
  }
}

export const audio = {
  isEnabled: () => enabled,
  setEnabled(v: boolean) {
    enabled = v;
    if (v) audio.play("tick");
  },
  play(cue: Cue) {
    if (!enabled || typeof window === "undefined") return;
    if (missing.has(cue)) return synth(cue);
    const a = new Audio(FILES[cue]);
    a.volume = 0.35;
    a.addEventListener("error", () => {
      missing.add(cue);
      synth(cue);
    });
    a.play().catch(() => {
      missing.add(cue);
      synth(cue);
    });
  },
  /** Fire a cue once per `key` while the visitor moves forward; re-arm when they scroll back. */
  once(key: string, cue: Cue, active: boolean) {
    if (active && !fired.has(key)) {
      fired.add(key);
      audio.play(cue);
    } else if (!active) fired.delete(key);
  },
};
