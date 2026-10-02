"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "@/lib/useMedia";

export type SceneCtx = {
  root: HTMLElement;
  q: gsap.utils.SelectorFunc;
  mobile: boolean;
  /** Smooth-scroll to a progress (0–1) inside this scene. Used by in-scene "interactive" buttons. */
  scrollTo: (p: number, duration?: number) => void;
};

type Opts = {
  /** pinned length, in viewport-heights of scroll */
  vh: number;
  /** pinned length on mobile (defaults to vh * 0.85) */
  mobileVh?: number;
  /** Build the scrubbed timeline. Positions are arbitrary units; the whole timeline spans the pin. */
  build: (tl: gsap.core.Timeline, c: SceneCtx) => void;
  /** Called on every scroll update with progress 0–1 (direction-safe place for state/audio). */
  onProgress?: (p: number, c: SceneCtx) => void;
};

/**
 * One pinned, scrubbed scene.
 * - Motion path: the section is pinned and a single timeline is scrubbed against scroll.
 * - Reduced-motion path: no pinning, no tweens; CSS (html[data-motion=reduce]) lays the
 *   beats out as a static, readable column.
 */
export function useScene({ vh, mobileVh, build, onProgress }: Opts) {
  const ref = useRef<HTMLElement>(null);
  const mobile = useIsMobile();
  // keep the latest callbacks without re-pinning on every render
  const cb = useRef({ build, onProgress });
  cb.current = { build, onProgress };

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);
      let st: ScrollTrigger | undefined;
      const ctx: SceneCtx = {
        root,
        q,
        mobile,
        scrollTo(p, duration = 2.2) {
          if (!st) return;
          const y = st.start + (st.end - st.start) * p;
          gsap.to(window, { scrollTo: { y, autoKill: true }, duration, ease: "power2.inOut", overwrite: true });
        },
      };
      gsap.set(q("[data-beat]"), { autoAlpha: 0 });
      const len = mobile ? (mobileVh ?? vh * 0.85) : vh;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => "+=" + (len / 100) * window.innerHeight,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => cb.current.onProgress?.(self.progress, ctx),
        },
      });
      st = tl.scrollTrigger as ScrollTrigger;
      cb.current.build(tl, ctx);
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile, vh, mobileVh]);

  return ref;
}

export { ScrollTrigger };
