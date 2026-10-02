"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn, maskOut, typeTo, draw } from "@/lib/beats";
import { MaskText } from "@/components/MaskText";
import { StatusIndicator } from "@/components/StatusIndicator";
import { TroubleshootingSequence } from "@/components/TroubleshootingSequence";

/** ACT IV (b) — the second problem, then a vertical, precise investigation. */
export function Act4bTroubleshooting() {
  const c = copy.case1;
  const ref = useScene({
    vh: 560,
    build(tl, { q }) {
      const TOTAL = 88;
      gsap.set(q(".ts-steps li"), { opacity: 0.22 });
      gsap.set(q("[data-panel]"), { autoAlpha: 0 });
      gsap.set(q("[data-log], [data-iso], .ts-hyp .bar"), { autoAlpha: 0 });
      gsap.set(q(".ts-hyp .bar"), { scaleX: 0, transformOrigin: "left" });
      gsap.set(q("#a4b-ok, #a4b-resp, #a4b-miss, .cb-line"), { autoAlpha: 0 });

      // ── the system looks healthy; a user asks
      show(tl, "#a4b-chat", 0, 1.5);
      show(tl, "#a4b-ok", 1, 1);
      typeTo(tl, q("#a4b-q")[0], c.second.query, 3, 5);
      typeTo(tl, q("#a4b-s")[0], c.second.searching, 9, 2.4);
      show(tl, "#a4b-resp", 12.5, 0.6);
      tl.fromTo(q(".cb-line"), { autoAlpha: 0, scaleX: 0, transformOrigin: "left" }, { autoAlpha: 1, scaleX: 1, duration: 1, stagger: 1.2 }, 13);
      tl.to(q("#a4b-ok .si"), { opacity: 0.35, duration: 0.2 }, 18);
      show(tl, "#a4b-miss", 18, 0.1); // sudden: the expected information isn't there
      hide(tl, "#a4b-chat", 26, 1.5);

      maskIn(tl, "#a4b-line", 28, 3.2);
      show(tl, "#a4b-line", 28, 0.1);
      maskOut(tl, "#a4b-line", 37, 1);

      // ── troubleshooting
      show(tl, "#a4b-ts", 39, 1);
      const step = (i: number, at: number) => {
        tl.to(q(`[data-step="${i}"]`), { opacity: 1, x: 10, duration: 0.5 }, at);
        if (i > 0) tl.to(q(`[data-step="${i - 1}"]`), { opacity: 0.45, x: 0, duration: 0.5 }, at);
        if (i > 0) hide(tl, q(`[data-panel="${i - 1}"]`), at - 0.2, 0.5);
        show(tl, q(`[data-panel="${i}"]`), at, 0.6);
      };
      // 01 reproduce
      step(0, 40);
      tl.fromTo(q("[data-bar]"), { scaleY: 0.15 }, { scaleY: 1, duration: 0.5, stagger: { each: 0.08, repeat: 2, yoyo: true } }, 41);
      // 02 inspect
      step(1, 49);
      show(tl, q("[data-log]"), 50, 0.6, { stagger: 1 });
      tl.to(q('[data-log][data-flag="true"]'), { color: "#E3A33B", duration: 0.5 }, 55);
      // 03 isolate — every possibility is examined in turn
      step(2, 58);
      show(tl, q("[data-iso]"), 58.6, 0.6, { stagger: 0.5 });
      q("[data-iso]").forEach((el, i) => {
        tl.to(el, { color: "#F4F3EF", borderColor: "#F4F3EF", duration: 0.5 }, 62 + i * 2.2);
        tl.to(el, { color: "#8B8B86", borderColor: "rgba(244,243,239,.18)", duration: 0.5 }, 63.7 + i * 2.2);
      });
      // 04 hypothesis
      step(3, 72);
      tl.to(q(".ts-hyp .bar"), { autoAlpha: 1, scaleX: 1, duration: 1.6, stagger: 1 }, 73);
      // 05 escalate with context
      step(4, 78);
      draw(tl, q("[data-esc]")[0] as unknown as SVGGeometryElement, 79, 2.5);
      hide(tl, "#a4b-ts", 84, 1.5);
      tl.to({}, { duration: 0.001 }, TOTAL);
    },
  });
  return (
    <section id="act-4b" ref={ref} className="scene" aria-label="Act IV — Troubleshooting">
      <div className="stage">
        <div className="beat a4b-chat" id="a4b-chat" data-beat>
          <p className="a4b-status mono" id="a4b-ok">
            <StatusIndicator tone="good">LIVE · HEALTHY</StatusIndicator>
          </p>
          <div className="cb">
            <p className="cb-q mono" id="a4b-q" />
            <p className="cb-s mono" id="a4b-s" />
            <div className="cb-resp" id="a4b-resp">
              <i className="bar cb-line" style={{ width: "72%" }} />
              <i className="bar cb-line" style={{ width: "54%" }} />
              <i className="bar cb-line cb-gap" style={{ width: "36%" }} />
            </div>
          </div>
          <p className="a4b-miss mono" id="a4b-miss">
            <StatusIndicator tone="warn">{c.second.missing}</StatusIndicator>
          </p>
        </div>
        <div className="beat" id="a4b-line" data-beat>
          <MaskText as="h2" className="h-xl" text={c.second.line} />
        </div>
        <div className="beat a4b-ts" id="a4b-ts" data-beat>
          <TroubleshootingSequence />
        </div>
      </div>
    </section>
  );
}
