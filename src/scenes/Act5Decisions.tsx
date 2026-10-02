"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn, maskOut } from "@/lib/beats";
import { store } from "@/lib/store";
import { useRef } from "react";
import type { SceneCtx } from "@/lib/useScene";
import { MaskText } from "@/components/MaskText";
import { StakeholderChaos } from "@/components/StakeholderChaos";
import { ScopeController } from "@/components/ScopeController";
import { EvidenceTracker } from "@/components/EvidenceTracker";
import { StatusIndicator } from "@/components/StatusIndicator";

/**
 * ACT V — CASE 02 / DECISIONS
 * Stakeholders arrive from every direction and overlap, scope inflates, then everything freezes
 * and reorganises around a seven-step line. The scope control is another click-or-scroll gate.
 */
export function Act5Decisions() {
  const c = copy.case2;
  const T = 118;
  const GATE = { at: 56, end: 63 };
  const ctxRef = useRef<SceneCtx | null>(null);
  const ref = useScene({
    vh: 760,
    mobileVh: 640,
    build(tl, ctx) {
      ctxRef.current = ctx;
      const { q } = ctx;
      const stmts = q("[data-stmt]");
      gsap.set(q("[data-stmt], [data-extra], [data-return], [data-proc], [data-line], #a5-ans, [data-com]"), { autoAlpha: 0 });
      gsap.set(q("[data-line]"), { scaleY: 0, transformOrigin: "top" });
      gsap.set(q("[data-fill]"), { scale: (i: number, el: Element) => (el.getAttribute("data-on") === "true" ? 1 : 0) });

      // ── opener
      show(tl, "#a5-open", 0, 0.5);
      show(tl, q("#a5-open .k-kicker"), 0.4, 1);
      maskIn(tl, "#a5-open", 1, 3.2, 0.12);
      show(tl, q("#a5-client"), 6, 1.5);
      hide(tl, "#a5-open", 13, 1.2);

      // ── chaos: slow at first, then stacking up
      show(tl, "#a5-chaos", 15, 0.4);
      show(tl, "#a5-scope", 15, 0.4);
      const times = [15, 18, 20.5, 22.5, 24, 25.2, 26.2, 27, 27.7, 28.3];
      stmts.forEach((el, i) => {
        tl.to(el, { autoAlpha: 1, duration: 0.5 }, times[i]);
        const d = 30 - times[i];
        tl.to(el, { x: `random(-60,60)`, y: `random(-40,40)`, rotation: `random(-3,3)`, duration: d, ease: "sine.inOut" }, times[i]);
      });
      q("[data-extra]").forEach((el, i) => tl.to(el, { autoAlpha: 1, duration: 0.4 }, 18 + i * 3.4));
      tl.to(q("[data-scope]"), { scale: 1.18, duration: 15, ease: "power1.in" }, 15);

      // ── freeze → structure
      tl.to(stmts, { opacity: 0.3, duration: 0.2 }, 30.4);
      tl.to(q("[data-scope]"), { scale: 1.18, duration: 0.01 }, 30.4);
      show(tl, "#a5-proc", 31.5, 0.3);
      tl.to(q("[data-line]"), { autoAlpha: 1, scaleY: 1, duration: 4, ease: "power1.inOut" }, 31.5);
      tl.to(q("[data-proc]"), { autoAlpha: 1, duration: 0.8, stagger: 1.15 }, 32.5);
      // chaos reorganises around the structure: tidy, small, aligned
      stmts.forEach((el, i) => {
        tl.to(
          el,
          { x: 0, y: 0, rotation: 0, left: i % 2 ? "76%" : "3%", top: `${12 + Math.floor(i / 2) * 15}%`, scale: 0.85, duration: 5, ease: "power3.inOut" },
          32 + i * 0.15,
        );
      });
      hide(tl, "#a5-proc", 42, 1);
      hide(tl, "#a5-chaos", 42, 1);

      // ── principle
      show(tl, "#a5-principle", 43, 0.1);
      maskIn(tl, "#a5-p1", 44, 3.2, 0.1);
      maskIn(tl, "#a5-p2", 49, 3.2, 0.1);

      // ── return to agreed scope (gate)
      hide(tl, "#a5-principle", 54, 1.2);
      show(tl, q("[data-return]"), 55, 1);
      tl.to(q("[data-extra]"), { autoAlpha: 0, maxWidth: 0, duration: 1.1, stagger: 0.7 }, GATE.at + 2);
      tl.to(q("[data-scope]"), { scale: 1, duration: 4, ease: "power2.out" }, GATE.at + 2);
      hide(tl, q("[data-return]"), GATE.end, 0.8);
      hide(tl, "#a5-scope", 70, 1.2);

      // ── commercial judgment — calm and factual
      show(tl, "#a5-com", 71.5, 0.8);
      tl.to(q("[data-com]"), { autoAlpha: 1, duration: 1, stagger: 1.4 }, 72);
      show(tl, "#a5-ask", 79, 0.1);
      maskIn(tl, "#a5-ask", 79.5, 3, 0.1);
      tl.to(q("#a5-com"), { opacity: 0.2, duration: 1.2 }, 80);
      hide(tl, "#a5-ask", 88, 1);
      show(tl, "#a5-ans", 89, 2);
      hide(tl, "#a5-com, #a5-ans", 101, 1.5);

      // ── DECISIONS ○ → ●
      show(tl, "#a5-evid", 103, 1);
      tl.to(q('[data-fill="decisions"]'), { scale: 1, duration: 1.4, ease: "back.out(2)" }, 106);
      tl.to(q("[data-count-n]"), { textContent: 2, snap: { textContent: 1 }, duration: 0.1 }, 106);
      tl.to({}, { duration: 0.001 }, T);
    },
    onProgress(p) {
      store.setEvidence("decisions", p >= 107 / T);
    },
  });
  return (
    <section id="act-5" ref={ref} className="scene" aria-label="Act V — Case 02: decisions">
      <div className="stage">
        <div className="beat" id="a5-open" data-beat>
          <p className="mono k-kicker">{c.kicker}</p>
          <MaskText as="h2" className="h-xl" text={c.opener} />
          <p className="mono a5-client" id="a5-client">
            {c.client}
          </p>
        </div>

        <div className="beat a5-chaos" id="a5-chaos" data-beat>
          <StakeholderChaos />
        </div>
        <div className="beat a5-scope" id="a5-scope" data-beat>
          <ScopeController onReturn={() => ctxRef.current?.scrollTo(GATE.end / T, 2.4)} />
        </div>

        <div className="beat a5-proc" id="a5-proc" data-beat>
          <div className="proc">
            <i className="proc-line" data-line />
            <ol>
              {c.process.map((p) => (
                <li key={p} data-proc className="mono">
                  {p}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="beat" id="a5-principle" data-beat>
          <MaskText id="a5-p1" as="p" className="h-lg" text={c.principle[0]} />
          <MaskText id="a5-p2" as="p" className="h-lg a5-p2" text={c.principle[1]} />
        </div>

        <div className="beat a5-com" id="a5-com" data-beat>
          <div className="com-col" data-com>
            <p className="mono">{c.commercial.account}</p>
            <StatusIndicator tone="bad" className="com-big">
              {c.commercial.overdue}
            </StatusIndicator>
            <p className="mono">{c.commercial.duration}</p>
          </div>
          <div className="com-col" data-com>
            <p className="mono">{c.commercial.resources}</p>
            <StatusIndicator tone="good" className="com-big">
              {c.commercial.active}
            </StatusIndicator>
          </div>
        </div>
        <div className="beat beat--upper" id="a5-ask" data-beat>
          <MaskText as="h2" className="h-xl" text={c.commercial.ask} />
        </div>
        <div className="beat beat--lower" id="a5-ans" data-beat>
          <p className="a5-ans">{c.commercial.answer}</p>
        </div>

        <div className="beat beat--left" id="a5-evid" data-beat>
          <EvidenceTracker filled={["projects"]} className="et--big" />
        </div>
      </div>
    </section>
  );
}
