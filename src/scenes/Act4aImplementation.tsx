"use client";
import { useRef } from "react";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene, type SceneCtx } from "@/lib/useScene";
import { show, hide, maskIn, maskOut, draw, packet } from "@/lib/beats";
import { audio } from "@/lib/audio";
import { useIsMobile } from "@/lib/useMedia";
import { MaskText } from "@/components/MaskText";
import { ImplementationMap, mapLayout } from "@/components/ImplementationMap";
import { FailureState } from "@/components/FailureState";

const RED = "#E5484D";
const GREEN = "#4FB477";

/**
 * ACT IV (a) — CASE 01 / IMPLEMENTATION
 * Prototype 2/4: the real-estate workflow is *constructed*, data flows through it,
 * then the data source refuses access. The visitor can trigger the investigation, or just scroll.
 *
 * Interaction model: one scrubbed timeline. The "Investigate alternative route →" button
 * smooth-scrolls through the investigation segment — so click and scroll are the same animation.
 */
export function Act4aImplementation() {
  const c = copy.case1;
  const loop = useRef<gsap.core.Timeline | null>(null);
  const gate = useRef({ start: 0, end: 1 });
  const ctxRef = useRef<SceneCtx | null>(null);
  const mobile = useIsMobile();

  const ref = useScene({
    vh: 960,
    mobileVh: 840,
    build(tl, ctx: SceneCtx) {
      ctxRef.current = ctx;
      const { q, mobile, root } = ctx;
      const TOTAL = 114;
      const SHIFT = 21; // the title + context now live in the scene before this one
      const L = mapLayout(mobile);
      const $ = <T extends Element = SVGElement>(s: string) => root.querySelector(s) as unknown as T | null;
      const conn = (id: string) => $<SVGPathElement>(`[data-conn="${id}"]`);
      const pk = (id: string) => $<SVGCircleElement>(`[data-packet="${id}"]`);
      const node = (id: string) => $(`[data-node="${id}"]`);

      // ── initial state
      gsap.set(q(".sn, .chip, .im-x, .scan, [data-plain]"), { autoAlpha: 0 });
      gsap.set(q("[data-fs-load], [data-fs-denied], [data-own], [data-tech]"), { autoAlpha: 0 });
      const segs = L.pos.slice(0, -1).map((_, i) => conn(`seg-${i}`));
      segs.forEach((s) => s && gsap.set(s, { autoAlpha: 1 }));

      // mobile "camera": follow the flow down the vertical map
      const camY = (y: number) => {
        const inner = root.querySelector<HTMLElement>(".a4-mapinner");
        if (!mobile || !inner) return 0;
        const scale = inner.clientWidth / L.vb.w;
        const H = L.vb.h * scale;
        const view = window.innerHeight * 0.78;
        return -Math.max(0, Math.min(H - view, y * scale - view * 0.42));
      };
      const cam = (y: number, at: number, dur = 2) => mobile && tl.to(q(".a4-mapinner"), { y: () => camY(y), duration: dur, ease: "power2.inOut" }, at);

      // ── build the system
      show(tl, "#a4a-map", 21.5, 0.8);
      show(tl, "#a4a-cap", 21.5, 1);
      c.nodes.forEach((n, i) => {
        const at = 22 + i * 2.2;
        show(tl, node(n.id), at, 0.9);
        if (i < c.nodes.length - 1) draw(tl, segs[i] as unknown as SVGGeometryElement, at + 1, 1.2);
        if (i === 3) {
          show(tl, node("source"), at + 0.4, 0.9);
          draw(tl, conn("feed"), at + 1.2, 1.2);
        }
        if (mobile) cam(L.pos[i].y, at, 1.6);
      });

      // ── data flows lead → sales team
      const T0 = 38;
      segs.forEach((_, i) => packet(tl, pk(`pk-${i}`), segs[i] as unknown as SVGGeometryElement, T0 + i * 2.4, 2.2));
      // agent logic
      c.agentLogic.forEach((_, i) => show(tl, q(`[data-chip="${i}"]`), T0 + 2.6 + i * 1.1, 0.8));
      tl.to(q('[data-chip="3"] rect'), { stroke: GREEN, duration: 0.6 }, T0 + 7.4);
      // ready → check availability → book
      c.ready.forEach((_, i) => show(tl, q(`[data-cal="${i}"]`), T0 + 10.2 + i * 1.5, 0.8));
      if (mobile) {
        cam(L.pos[2].y, T0 + 2, 2);
        cam(L.pos[5].y, T0 + 9, 2);
      }

      // ── "in plain words" captions
      const plain = (i: number, at: number, until: number) => {
        show(tl, q(`[data-plain="${i}"]`), at, 0.8);
        hide(tl, q(`[data-plain="${i}"]`), until, 0.8);
      };
      show(tl, "#a4a-plain", 21.5, 0.5);
      plain(0, 22.5, 36);
      plain(1, 38.5, 52);

      // ── ownership, introduced quietly while the flow runs
      show(tl, "#a4a-own", 54, 1);
      c.ownership.forEach((_, i) => show(tl, q(`[data-own="${i}"]`), 54.5 + i * 1.3, 1));
      show(tl, q("[data-tech]"), 54.5 + c.ownership.length * 1.3 + 0.5, 1.2);

      // ── THE BLOCKER — sudden
      const B = 68;
      if (mobile) cam(L.pos[3].y, B - 3, 2);
      packet(tl, pk("pk-feed"), conn("feed"), B, 2.2, { from: 1, to: 0, fade: false });
      const hit = B + 2.2;
      tl.set(pk("pk-feed"), { autoAlpha: 0 }, hit);
      show(tl, q(".im-x"), hit, 0.1);
      tl.to(conn("feed"), { stroke: RED, duration: 0.1 }, hit);
      tl.to(q('[data-node="source"] .sn-box'), { stroke: RED, duration: 0.1 }, hit);
      tl.to(q('[data-layer="main"] > .sn:not([data-node="source"]):not([data-node="property"]), .chip, [data-conn^="seg"]'), { opacity: 0.18, duration: 0.25 }, hit);
      show(tl, "#a4a-fail", hit, 0.1);
      // the system *hurts*: red flash + shake
      tl.fromTo(q("#a4a-flash"), { opacity: 0 }, { opacity: 0.6, duration: 0.12 }, hit);
      tl.to(q("#a4a-flash"), { opacity: 0, duration: 1.6, ease: "power2.out" }, hit + 0.12);
      tl.to(q(".stage"), { x: "random(-16,16)", y: "random(-10,10)", duration: 0.06, repeat: 7, yoyo: true, ease: "none" }, hit);
      tl.set(q(".stage"), { x: 0, y: 0 }, hit + 0.6);
      show(tl, q("[data-fs-load]"), hit + 0.1, 0.1);
      hide(tl, q("[data-fs-load]"), hit + 2.2, 0.1);
      show(tl, q("[data-fs-denied]"), hit + 2.6, 0.1); // hard cut, no easing
      plain(2, hit + 0.6, 85);

      // ── statement + decision
      hide(tl, "#a4a-own", 73, 1.6);
      tl.to(q("#a4a-map"), { opacity: 0.1, duration: 2 }, 76);
      hide(tl, "#a4a-fail", 77, 1);
      show(tl, "#a4a-stmt", 77, 0.1);
      maskIn(tl, "#a4a-stmt", 78, 3, 0.1);
      hide(tl, "#a4a-stmt", 86, 1.2);
      show(tl, "#a4a-what", 88, 1.5);
      show(tl, "#a4a-act", 91, 1.2);

      // ── investigation (click or scroll)
      const I = 95;
      hide(tl, "#a4a-what, #a4a-act", I, 1);
      tl.to(q("#a4a-map"), { opacity: 1, duration: 2 }, I);
      show(tl, q('[data-scan="0"]'), I + 1, 0.2);
      draw(tl, q('[data-scan="0"]')[0] as unknown as SVGGeometryElement, I + 1, 3, "power1.inOut");
      hide(tl, q('[data-scan="0"]'), I + 4.2, 1);
      show(tl, q('[data-scan="1"]'), I + 3, 0.2);
      draw(tl, q('[data-scan="1"]')[0] as unknown as SVGGeometryElement, I + 3, 3, "power1.inOut");
      hide(tl, q('[data-scan="1"]'), I + 6.2, 1);
      show(tl, node("alt-node"), I + 7.5, 1);
      tl.to(conn("alt"), { stroke: GREEN, duration: 0.01 }, I + 7.5);
      draw(tl, conn("alt"), I + 8.5, 2.2, "power1.inOut");
      packet(tl, pk("pk-alt"), conn("alt"), I + 11, 1.8, { fade: false });
      tl.to(q('[data-layer="main"] > .sn, .chip, [data-conn^="seg"]'), { opacity: 1, duration: 1.5 }, I + 11);
      hide(tl, q(".im-x"), I + 11, 0.5);
      tl.to(q('[data-node="source"] .sn-box'), { stroke: "rgba(244,243,239,.35)", duration: 0.5 }, I + 11);
      tl.to(conn("feed"), { opacity: 0.25, duration: 0.5 }, I + 11);
      gate.current.end = (I + 13 - SHIFT) / (TOTAL - SHIFT);

      plain(3, I + 4, I + 10.5);
      plain(4, I + 11.5, 112);

      // ── ambient flow once the new route is live (driven by onProgress)
      const lp = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: "none" } });
      segs.forEach((_, i) => {
        packet(lp, pk("pk-loop-a"), segs[i] as unknown as SVGGeometryElement, i * 0.9, 0.85, { fade: false });
        packet(lp, pk("pk-loop-b"), segs[i] as unknown as SVGGeometryElement, 2.7 + i * 0.9, 0.85, { fade: false });
      });
      lp.set([pk("pk-loop-a"), pk("pk-loop-b")], { autoAlpha: 0 }, 8.1);
      loop.current = lp;

      tl.shiftChildren(-SHIFT, false, SHIFT - 1);
      tl.to({}, { duration: 0.001 }, TOTAL - SHIFT);
    },
    onProgress(p) {
      const live = p >= gate.current.end;
      if (live) loop.current?.play();
      else {
        loop.current?.pause(0);
      }
      audio.once("a4-error", "error", p > 0.6 && p < 0.7);
      audio.once("a4-connect", "connect", p >= gate.current.end);
    },
  });

  return (
    <section id="act-4a" ref={ref} className="scene" aria-label="Act IV — Case 01: implementation">
      <div className="stage">
        <div className="beat a4-map" id="a4a-map" data-beat>
          <div className={`a4-mapinner${mobile ? " is-mobile" : ""}`}>
            <ImplementationMap mobile={mobile} />
          </div>
        </div>
        <p className="beat mono a4-cap" id="a4a-cap" data-beat>
          {c.kicker} · {c.client}
        </p>
        <div className="beat a4-plain" id="a4a-plain" data-beat>
          <p className="mono">{copy.ui.plainWords}</p>
          {c.plain.map((t, i) => (
            <p className="a4-plain-t" data-plain={i} key={t}>
              {t}
            </p>
          ))}
        </div>
        <div className="a4-flash" id="a4a-flash" aria-hidden="true" />
        <div className="beat a4-fail" id="a4a-fail" data-beat>
          <FailureState />
        </div>

        <div className="beat a4-own" id="a4a-own" data-beat>
          <ul>
            {c.ownership.map((o, i) => (
              <li key={o} data-own={i}>
                {o}
              </li>
            ))}
          </ul>
          <p className="a4-tech mono" data-tech>
            {c.technicalDelivery.label} <b>{c.technicalDelivery.value}</b>
          </p>
        </div>

        <div className="beat" id="a4a-stmt" data-beat>
          <MaskText as="h2" className="h-xl" text={c.blocker.statement} />
        </div>
        <div className="beat beat--upper" id="a4a-what" data-beat>
          <p className="h-lg">{c.blocker.what}</p>
        </div>
        <div className="beat beat--lower" id="a4a-act" data-beat>
          {/* Interactive: smooth-scrolls through the investigation segment (click == scroll) */}
          <button type="button" className="btn-line mono" onClick={() => ctxRef.current?.scrollTo(gate.current.end, 3.2)}>
            {c.blocker.action}
          </button>
        </div>
      </div>
    </section>
  );
}
