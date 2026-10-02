"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Living background. Each act gets its own mood: a base colour + two drifting lights.
 * Semantic colours (amber = risk/signal, green = resolved) only where they carry that meaning.
 * Hidden in the warm Team act (no dashboard language).
 */
type Mood = { base: string; c1: string; c2: string };
const SLATE = { c1: "rgba(110,130,190,.22)", c2: "rgba(110,130,190,.10)" };
const AMBER = { c1: "rgba(227,163,59,.24)", c2: "rgba(227,163,59,.09)" };
const GREEN = { c1: "rgba(79,180,119,.20)", c2: "rgba(110,130,190,.10)" };
const MOODS: Record<string, Mood> = {
  "act-1": { base: "#0a0908", ...AMBER },
  "act-3": { base: "#0a1020", ...AMBER },
  "act-4a": { base: "#090c12", ...SLATE },
  "act-4b": { base: "#0a0e18", ...SLATE },
  "act-4c": { base: "#07140d", ...GREEN },
  "act-5": { base: "#160e09", ...AMBER },
  "act-5b": { base: "#0a1218", ...SLATE },
  "act-6b": { base: "#0a1410", ...GREEN },
  "act-6": { base: "#0d0a1c", ...AMBER },
  "act-7": { base: "#0a0a0a", ...AMBER },
  "act-9": { base: "#090909", ...SLATE },
  "act-10b": { base: "#0a0f1e", ...SLATE },
};

export function Ambient() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current!;
    const sts = Object.entries(MOODS).map(([id, m]) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => self.isActive && gsap.to(el, { "--base": m.base, "--c1": m.c1, "--c2": m.c2, duration: 1.4, ease: "power2.out" }),
      }),
    );
    const light = ScrollTrigger.create({
      trigger: "#act-8",
      start: "top 60%",
      end: "bottom 40%",
      onToggle: (self) => el.setAttribute("data-off", String(self.isActive)),
    });
    return () => [...sts, light].forEach((s) => s.kill());
  }, []);
  return <div ref={ref} className="amb" aria-hidden="true" />;
}
