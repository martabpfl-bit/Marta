"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useStore } from "@/lib/store";

/** Journey progress line, first-scroll cue, and headlines that lean into the scroll. */
export function Momentum() {
  const ready = useStore((s) => s.ready);
  const [scrolled, setScrolled] = useState(false);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const set = gsap.quickSetter(".pbar", "scaleX");
    const skewTo = gsap.quickTo(document.documentElement, "--lean", { duration: 0.5, ease: "power3.out" });
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        set(self.progress);
        const v = gsap.utils.clamp(-6, 6, self.getVelocity() / -700);
        skewTo(v);
      },
    });
    const idle = () => skewTo(0);
    window.addEventListener("scrollend", idle);
    return () => {
      st.kill();
      window.removeEventListener("scrollend", idle);
    };
  }, []);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <i className="pbar" aria-hidden="true" />
      <p className="cue mono" data-hide={scrolled || !ready} aria-hidden="true">
        Scroll
        <i />
      </p>
    </>
  );
}
