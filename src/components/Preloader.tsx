"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { copy } from "@/content/copy";
import { store } from "@/lib/store";

/** ~2s black boot sequence; never waits longer than the page needs. Releases scroll when done. */
export function Preloader() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = reduce ? 250 : 650;
    const timers = [window.setTimeout(() => setI(1), step), window.setTimeout(() => setI(2), step * 2)];
    const finish = () => {
      const el = ref.current;
      const done = () => {
        html.style.overflow = "";
        if (el) el.style.display = "none";
        store.set({ ready: true });
      };
      el ? gsap.to(el, { autoAlpha: 0, duration: reduce ? 0.01 : 0.5, onComplete: done }) : done();
    };
    const doneAt = window.setTimeout(() => {
      const go = () => window.setTimeout(finish, reduce ? 200 : 500);
      if (document.readyState === "complete") go();
      else window.addEventListener("load", go, { once: true });
    }, step * 2);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(doneAt);
      html.style.overflow = "";
    };
  }, []);

  return (
    <div ref={ref} className="pre" role="status" aria-live="polite">
      <p className="mono" data-last={i === 2}>
        {copy.preloader.steps[i]}
        <span className="cursor" aria-hidden="true" />
      </p>
    </div>
  );
}
