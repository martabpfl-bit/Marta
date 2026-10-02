import { gsap } from "@/lib/gsap";

type T = gsap.TweenTarget;

/** Fade a beat in (opacity + visibility). Elements start hidden via [data-beat]. */
export const show = (tl: gsap.core.Timeline, t: T, at: number, dur = 1, vars: gsap.TweenVars = {}) =>
  tl.to(t, { autoAlpha: 1, duration: dur, ...vars }, at);

export const hide = (tl: gsap.core.Timeline, t: T, at: number, dur = 0.8, vars: gsap.TweenVars = {}) =>
  tl.to(t, { autoAlpha: 0, duration: dur, ...vars }, at);

/** Mask-reveal the words of a <MaskText>. */
export const maskIn = (tl: gsap.core.Timeline, scope: string, at: number, dur = 1.2, stagger = 0.12) =>
  tl.fromTo(`${scope} .mt-i`, { yPercent: 115 }, { yPercent: 0, duration: dur, stagger, ease: "power3.out" }, at);

export const maskOut = (tl: gsap.core.Timeline, scope: string, at: number, dur = 0.8, stagger = 0.04) =>
  tl.to(`${scope} .mt-i`, { yPercent: -115, duration: dur, stagger, ease: "power2.in" }, at);

/** Draw an SVG path/line by animating stroke-dashoffset. */
export function draw(tl: gsap.core.Timeline, path: SVGGeometryElement | null, at: number, dur = 1, ease = "none") {
  if (!path) return;
  const len = path.getTotalLength();
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  tl.to(path, { strokeDashoffset: 0, duration: dur, ease }, at);
}

/** Move a circle/element along a path. Scrub-safe (driven by a proxy, re-applied on rewind). */
export function packet(
  tl: gsap.core.Timeline,
  dot: SVGElement | null,
  path: SVGGeometryElement | null,
  at: number,
  dur: number,
  opts: { from?: number; to?: number; fade?: boolean } = {},
) {
  if (!dot || !path) return;
  const { from = 0, to = 1, fade = true } = opts;
  const len = path.getTotalLength();
  const proxy = { t: from };
  const place = () => {
    const p = path.getPointAtLength(proxy.t * len);
    dot.setAttribute("cx", String(p.x));
    dot.setAttribute("cy", String(p.y));
  };
  place();
  gsap.set(dot, { autoAlpha: 0 });
  tl.set(dot, { autoAlpha: 1 }, at);
  tl.fromTo(proxy, { t: from }, { t: to, duration: dur, ease: "power1.inOut", onUpdate: place }, at);
  if (fade) tl.set(dot, { autoAlpha: 0 }, at + dur);
}

/** Type text into an element, scrubbed. */
export function typeTo(tl: gsap.core.Timeline, el: Element | null, text: string, at: number, dur: number) {
  if (!el) return;
  el.textContent = "";
  const p = { n: 0 };
  tl.fromTo(
    p,
    { n: 0 },
    {
      n: text.length,
      duration: dur,
      ease: "none",
      onUpdate: () => {
        el.textContent = text.slice(0, Math.round(p.n));
      },
    },
    at,
  );
}

/** Reveal beat A, then swap to beat B. */
export function swap(tl: gsap.core.Timeline, out: T, inn: T, at: number, dur = 0.8) {
  hide(tl, out, at, dur);
  show(tl, inn, at + dur * 0.6, dur);
}
