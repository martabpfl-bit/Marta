"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn, draw, packet, plainLine, insertContext } from "@/lib/beats";
import { PlainWords } from "@/components/PlainWords";
import { ContextBeats } from "@/components/ContextBeats";
import { useRef } from "react";
import { audio } from "@/lib/audio";
import { useIsMobile } from "@/lib/useMedia";
import { MaskText } from "@/components/MaskText";
import { CustomerHealthEngine } from "@/components/CustomerHealthEngine";
import { StatusIndicator } from "@/components/StatusIndicator";

const AMBER = "#E3A33B";

/**
 * ACT VI — CUSTOMER HEALTH
 * Prototype 3/4: nine signals converge, the engine processes, three lights cycle and settle on amber.
 */
export function Act6Health() {
  const h = copy.health;
  const mobile = useIsMobile();
  const T = 151;
  const marks = useRef({ total: T, results: 157, risk: 53.4 });
  const ref = useScene({
    vh: 940,
    mobileVh: 800,
    build(tl, { q, root }) {
      const n = h.signals.length;
      const circ = (id: string) => root.querySelector<SVGGeometryElement>(id);
      gsap.set(q("[data-plain]"), { autoAlpha: 0 });
      gsap.set(q("[data-sig], [data-engine], [data-risk-label], .rk circle, [data-step-r], [data-step-p], [data-int], [data-adopt]"), { autoAlpha: 0 });
      gsap.set(q(".rk circle"), { autoAlpha: 0.18 });

      // ── two questions, with a pause between
      show(tl, "#a6-o1", 0, 0.5);
      maskIn(tl, "#a6-o1", 1, 4, 0.1);
      hide(tl, "#a6-o1", 11, 1.5);
      show(tl, "#a6-o2", 14, 0.5);
      maskIn(tl, "#a6-o2", 15, 3.5, 0.12);
      hide(tl, "#a6-o2", 25, 1.5);

      // ── convergence
      show(tl, "#a6-plain", 26.5, 0.4);
      plainLine(tl, q, 0, 27, 66);
      show(tl, "#a6-engine", 27, 0.6);
      show(tl, q("[data-engine]"), 27, 1.5);
      for (let i = 0; i < n; i++) {
        const at = 28 + i * 1.3;
        show(tl, q(`[data-sig="${i}"]`), at, 0.8);
        draw(tl, q(`[data-line="${i}"]`)[0] as unknown as SVGGeometryElement, at + 0.2, 1.6, "power1.inOut");
        packet(tl, root.querySelector(`[data-packet="h-${i}"]`), q(`[data-line="${i}"]`)[0] as unknown as SVGGeometryElement, at + 1.6, 3.2);
      }
      // processing
      const arc = root.querySelector<SVGGeometryElement>("[data-arc]");
      if (arc) {
        const len = arc.getTotalLength();
        gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(arc, { strokeDashoffset: 0, duration: 9, ease: "power1.inOut" }, 38);
      }
      // 🟢 🟡 🔴 → settles on 🟡
      const light = (t: string) => q(`[data-light="${t}"]`);
      tl.to(light("good"), { autoAlpha: 1, duration: 0.3 }, 48.5);
      tl.to(light("good"), { autoAlpha: 0.18, duration: 0.3 }, 50);
      tl.to(light("warn"), { autoAlpha: 1, duration: 0.3 }, 50);
      tl.to(light("warn"), { autoAlpha: 0.18, duration: 0.3 }, 51.5);
      tl.to(light("bad"), { autoAlpha: 1, duration: 0.3 }, 51.5);
      tl.to(light("bad"), { autoAlpha: 0.18, duration: 0.3 }, 53);
      tl.to(light("warn"), { autoAlpha: 1, duration: 0.6 }, 53.4);
      tl.to(circ(".che-arc"), { stroke: AMBER, duration: 0.6 }, 53.4);
      show(tl, q("[data-risk-label]"), 55, 1);
      hide(tl, "#a6-engine", 66, 1.5);

      // ── reactive vs proactive
      show(tl, "#a6-split", 68, 0.8);
      q("[data-step-r]").forEach((el, i) => tl.to(el, { autoAlpha: 1, duration: 0.8 }, 69 + i * 1.5));
      q("[data-step-p]").forEach((el, i) => tl.to(el, { autoAlpha: 1, duration: 0.8 }, 74 + i * 1.5));
      tl.to(q(".split-r"), { opacity: 0.25, duration: 1.5 }, 83);
      tl.to(q(".split-p"), { borderColor: "#F4F3EF", duration: 1.5 }, 83);
      show(tl, "#a6-quote", 89, 0.1);
      maskIn(tl, "#a6-quote", 90, 5, 0.08);
      hide(tl, "#a6-split, #a6-quote", 104, 1.5);

      // ── the real intervention (wording is factual: "subsequently renewed", no causal claim)
      show(tl, "#a6-int", 106, 0.6);
      q("[data-int]").forEach((el, i) => tl.to(el, { autoAlpha: 1, duration: 0.9 }, 107 + i * 3.3));
      hide(tl, "#a6-int", 128, 1.5);

      // ── nobody asked me to build this
      show(tl, "#a6-adopt", 130, 0.1);
      maskIn(tl, "#a6-adopt-l", 131, 3.2, 0.1);
      q("[data-adopt]").forEach((el, i) => tl.to(el, { autoAlpha: 1, duration: 0.9 }, 137 + i * 2.8));
      hide(tl, "#a6-adopt", 150, 1.5);

      const n2 = insertContext(tl, "a6b", h.ctxB.length, 105.5);
      const n1 = insertContext(tl, "a6a", h.ctxA.length, 26);
      const n0 = insertContext(tl, "a6i", h.intro.length, 0);
      marks.current = { total: T + n0 + n1 + n2, results: 0, risk: 53.4 + n0 + n1 };
      tl.to({}, { duration: 0.001 }, T + n0 + n1 + n2);
      void mobile;
    },
    onProgress(p) {
      audio.once("a6-risk", "signal", p >= marks.current.risk / marks.current.total && p < (marks.current.risk + 12) / marks.current.total);
    },
  });

  return (
    <section id="act-6" ref={ref} className="scene" aria-label="Act VI — Customer health">
      <div className="stage">
        <div className="beat" id="a6-o1" data-beat>
          <MaskText as="h2" className="h-xl" text={h.open[0]} />
        </div>
        <div className="beat" id="a6-o2" data-beat>
          <MaskText as="h2" className="h-xl" text={h.open[1]} />
        </div>

        <ContextBeats prefix="a6i" items={h.intro} />
        <ContextBeats prefix="a6a" items={h.ctxA} />
        <ContextBeats prefix="a6b" items={h.ctxB} />
        <PlainWords id="a6-plain" lines={h.plain} />
        <div className="beat a6-engine" id="a6-engine" data-beat>
          <CustomerHealthEngine mobile={mobile} />
        </div>

        <div className="beat a6-split" id="a6-split" data-beat>
          <div className="split">
            <div className="split-r">
              <p className="mono split-t">{h.reactive.title}</p>
              <ol>
                {h.reactive.steps.map((s) => (
                  <li key={s} data-step-r>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <div className="split-p">
              <p className="mono split-t">{h.proactive.title}</p>
              <ol>
                {h.proactive.steps.map((s) => (
                  <li key={s} data-step-p>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="beat beat--lower" id="a6-quote" data-beat>
          <MaskText as="p" className="h-lg" text={h.quote} />
        </div>

        <div className="beat a6-int" id="a6-int" data-beat>
          <ol>
            {h.intervention.map((s, i) => (
              <li key={s} data-int>
                {i === 0 && <StatusIndicator tone="warn" />}
                {i === h.intervention.length - 1 && <StatusIndicator tone="good" />}
                <span className="mono">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="beat" id="a6-adopt" data-beat>
          <MaskText id="a6-adopt-l" as="h2" className="h-xl" text={h.adoption.line} />
          <ol className="adopt">
            {h.adoption.steps.map((s) => (
              <li key={s} data-adopt className="mono">
                {s}
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}
