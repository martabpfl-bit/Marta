"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn, maskOut, draw, typeTo, plainLine } from "@/lib/beats";
import { PlainWords } from "@/components/PlainWords";
import { store } from "@/lib/store";
import { audio } from "@/lib/audio";
import { MaskText } from "@/components/MaskText";
import { EngineeringHandoff } from "@/components/EngineeringHandoff";
import { EvidenceTracker } from "@/components/EvidenceTracker";
import { StatusIndicator } from "@/components/StatusIndicator";


/** ACT IV (c) — handoff, the line that matters, fix + retest, production, and the first piece of evidence. */
export function Act4cResolution() {
  const c = copy.case1;
  const SH = 10; // the strip of squares was removed, so close the gap
  const T = 138;
  const FOUND = 130;
  const TE = T - SH;
  const ref = useScene({
    vh: 700,
    build(tl, { q }) {
      gsap.set(q("[data-field]"), { autoAlpha: 0.2 });
      gsap.set(q(".eh-bar"), { scaleX: 0, transformOrigin: "left" });
      gsap.set(q("[data-plain]"), { autoAlpha: 0 });
      gsap.set(q("#a4c-pass, #a4c-ret, #a4c-retest, #a4c-s, [data-out], #a4c-cav, #a4c-found"), { autoAlpha: 0 });
      gsap.set(q("[data-fill]"), { scale: 0 });

      // ── engineering handoff, assembled field by field
      show(tl, "#a4c-eh", 0, 1.2);
      show(tl, "#a4c-plain", 0, 0.4);
      plainLine(tl, q, 0, 0.8, 29);
      q("[data-field]").forEach((el, i) => {
        const at = 2 + i * 2.6;
        tl.to(el, { autoAlpha: 1, duration: 0.5 }, at);
        tl.to(q(`[data-field="${i}"] .eh-bar`), { scaleX: 1, duration: 1.4, ease: "power2.out" }, at);
        draw(tl, q(`[data-field="${i}"] [data-tick]`)[0] as unknown as SVGGeometryElement, at + 0.4, 0.8);
      });
      hide(tl, "#a4c-eh", 29, 1.5);

      // ── the line (held long, on purpose)
      show(tl, "#a4c-quote", 31, 0.1);
      maskIn(tl, "#a4c-q1", 32, 4, 0.15);
      maskIn(tl, "#a4c-q2", 38, 4.5, 0.15);
      maskOut(tl, "#a4c-quote", 56, 1.2, 0.02);
      hide(tl, "#a4c-quote", 58, 0.4);

      // ── fix → retest → pass
      show(tl, "#a4c-fix", 59, 1);
      plainLine(tl, q, 1, 59.5, 82);
      show(tl, q("#a4c-deployed"), 60, 0.8);
      hide(tl, q("#a4c-deployed"), 65, 0.6);
      show(tl, q("#a4c-retest"), 66, 0.8);
      typeTo(tl, q("#a4c-fq")[0], c.second.query, 67, 4.5);
      show(tl, q("#a4c-s"), 72, 0.2);
      typeTo(tl, q("#a4c-s")[0], c.second.searching, 72, 2);
      hide(tl, q("#a4c-s"), 75, 0.3);
      show(tl, q("#a4c-ret"), 75.5, 0.4);
      show(tl, q("#a4c-pass"), 77.5, 0.3);
      hide(tl, "#a4c-fix", 83, 1.2);

      // ── production
      show(tl, "#a4c-prod", 94, 0.1);
      maskIn(tl, "#a4c-prod-t", 94.5, 4.5, 0.2);
      tl.to(q("#a4c-prod-t"), { yPercent: -60, scale: 0.55, duration: 3, ease: "power2.inOut" }, 101);
      c.production.outcomes.forEach((_, i) => show(tl, q(`[data-out="${i}"]`), 104 + i * 3, 1.2));
      show(tl, q("#a4c-cav"), 114, 1.5);
      hide(tl, "#a4c-prod", 123, 1.5);

      // ── back to the diagnostic: PROJECTS ○ → ●
      show(tl, "#a4c-evid", 125, 1);
      tl.to(q('[data-fill="projects"]'), { scale: 1, duration: 1.4, ease: "back.out(2)" }, FOUND);
      tl.to(q("[data-count-n]"), { textContent: 1, snap: { textContent: 1 }, duration: 0.1 }, FOUND);
      show(tl, q("#a4c-found"), FOUND + 0.5, 1);
      tl.shiftChildren(-SH, false, 93);
      tl.to({}, { duration: 0.001 }, TE);
    },
    onProgress(p) {
      store.setEvidence("projects", p >= (FOUND + 1 - SH) / TE);
      audio.once("a4c-pass", "complete", p >= 77.5 / TE && p < 84 / TE);
    },
  });
  return (
    <section id="act-4c" ref={ref} className="scene" aria-label="Act IV — Fix, retest, production">
      <div className="stage">
        <PlainWords id="a4c-plain" lines={c.plain3} />
        <div className="beat" id="a4c-eh" data-beat>
          <EngineeringHandoff />
        </div>
        <div className="beat" id="a4c-quote" data-beat>
          <MaskText id="a4c-q1" as="p" className="h-xl" text={c.handoff.quote[0]} />
          <MaskText id="a4c-q2" as="p" className="h-xl a4c-q2" text={c.handoff.quote[1]} />
        </div>
        {/* ids for per-line reveal */}
        <div className="beat a4c-fix" id="a4c-fix" data-beat data-return-stage>
          <div className="a4c-steps mono">
            <span id="a4c-deployed">
              <StatusIndicator tone="good">{c.fix.deployed}</StatusIndicator>
            </span>
            <span id="a4c-retest">{c.fix.retesting}</span>
          </div>
          <p className="cb-q mono" id="a4c-fq" />
          <p className="cb-s mono" id="a4c-s" />
          <p className="a4c-ret mono" id="a4c-ret">
            {c.fix.returned}
          </p>
          <p className="a4c-pass" id="a4c-pass">
            <StatusIndicator tone="good">{c.fix.pass}</StatusIndicator>
          </p>
        </div>
        <div className="beat a4c-prod" id="a4c-prod" data-beat>
          <MaskText id="a4c-prod-t" as="h2" className="display" text={c.production.title} />
          <ul>
            {c.production.outcomes.map((o, i) => (
              <li key={o} data-out={i}>
                {o}
              </li>
            ))}
          </ul>
          <p className="a4c-cav" id="a4c-cav">
            {c.production.caveat}
          </p>
        </div>
        <div className="beat beat--left" id="a4c-evid" data-beat>
          <EvidenceTracker filled={[]} className="et--big" />
          <p className="mono found" id="a4c-found">
            <StatusIndicator tone="good">{c.found}</StatusIndicator>
          </p>
        </div>
      </div>
    </section>
  );
}
