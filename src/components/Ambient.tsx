"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Living background. Colour follows the story: cool slate by default, amber while a risk/signal
 * is on screen, green once something is resolved. Hidden in the warm Team act (no dashboard language).
 * Semantic colours are only used where they carry their real meaning.
 */
const SLATE = ["rgba(110,130,190,.16)", "rgba(110,130,190,.08)"];
const AMBER = ["rgba(227,163,59,.17)", "rgba(227,163,59,.07)"];
const GREEN = ["rgba(79,180,119,.14)", "rgba(110,130,190,.08)"];
const PALETTE: Record<string, string[]> = {
  "act-1": AMBER, "act-2": SLATE, "act-3": AMBER, "act-4a": SLATE, "act-4b": SLATE, "act-4c": GREEN,
  "act-5": SLATE, "act-6": AMBER, "act-7": AMBER, "act-9": SLATE, "act-10a": SLATE, "act-10b": SLATE,
};

export function Ambient() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current!;
    const sts = Object.entries(PALETTE).map(([id, [c1, c2]]) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => self.isActive && gsap.to(el, { "--c1": c1, "--c2": c2, duration: 1.8, ease: "power2.out" }),
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
