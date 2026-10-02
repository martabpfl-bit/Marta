"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn, maskOut, typeTo, plainLine, insertContext } from "@/lib/beats";
import { MaskText } from "@/components/MaskText";
import { StatusIndicator } from "@/components/StatusIndicator";
import { PlainWords } from "@/components/PlainWords";
import { ContextBeats } from "@/components/ContextBeats";
import { TroubleshootingSequence } from "@/components/TroubleshootingSequence";

/** ACT IV (b) — the second problem, then a calm, step-by-step investigation. */
export function Act4bTroubleshooting() {
  const c = copy.case1;
  const ref = useScene({
    vh: 520,
    mobileVh: 420,
    build(tl, { q }) {
      const TOTAL = 66;
      gsap.set(q("[data-plain]"), { autoAlpha: 0 });
      gsap.set(q(".ts li"), { opacity: 0.2 });
      gsap.set(q("#a4b-ok, #a4b-resp, #a4b-miss, .cb-line"), { autoAlpha: 0 });

      // ── the system looks healthy; a user asks; the answer is incomplete
      show(tl, "#a4b-chat", 0, 1.2);
      show(tl, "#a4b-plain", 0, 0.4);
      show(tl, "#a4b-ok", 1, 1);
      typeTo(tl, q("#a4b-q")[0], c.second.query, 3, 4);
      typeTo(tl, q("#a4b-s")[0], c.second.searching, 8, 2);
      show(tl, "#a4b-resp", 10.5, 0.6);
      tl.fromTo(q(".cb-line"), { autoAlpha: 0, scaleX: 0, transformOrigin: "left" }, { autoAlpha: 1, scaleX: 1, duration: 0.9, stagger: 1 }, 11);
      tl.to(q("#a4b-ok .si"), { opacity: 0.35, duration: 0.2 }, 15);
      show(tl, "#a4b-miss", 15, 0.1); // sudden: the expected information isn't there
      hide(tl, "#a4b-chat", 23, 1.2);

      show(tl, "#a4b-line", 24, 0.1);
      maskIn(tl, "#a4b-line", 24, 3, 0.1);
      maskOut(tl, "#a4b-line", 31, 0.9);
      hide(tl, "#a4b-line", 32, 0.2);

      // ── troubleshooting, one step at a time
      show(tl, "#a4b-ts", 33, 0.8);
      plainLine(tl, q, 1, 33.5, 62);
      c.troubleshooting.forEach((_, i) => {
        const at = 35 + i * 5;
        tl.to(q(`[data-step="${i}"]`), { opacity: 1, x: 10, duration: 0.7 }, at);
        if (i > 0) tl.to(q(`[data-step="${i - 1}"]`), { opacity: 0.4, x: 0, duration: 0.6 }, at);
      });
      hide(tl, "#a4b-ts", 62, 1.2);
      const N = insertContext(tl, "a4b", c.ctx2.length, 0);
      tl.to({}, { duration: 0.001 }, TOTAL + N);
    },
  });
  const plain = c.plain2;
  return (
    <section id="act-4b" ref={ref} className="scene" aria-label="Act IV — Troubleshooting">
      <div className="stage">
        <ContextBeats prefix="a4b" items={c.ctx2} />
        <PlainWords id="a4b-plain" lines={plain} />
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
