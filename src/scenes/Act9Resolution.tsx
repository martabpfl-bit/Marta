"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn, typeTo } from "@/lib/beats";
import { audio } from "@/lib/audio";
import { MaskText } from "@/components/MaskText";
import { EvidenceTracker } from "@/components/EvidenceTracker";
import { RelationshipStatus } from "@/components/RelationshipStatus";

/** ACT IX — RESOLUTION. The same visual system as Act I. Reality, without manipulation. */
export function Act9Resolution() {
  const r = copy.resolution;
  const T = 70;
  const ref = useScene({
    vh: 480,
    build(tl, { q }) {
      gsap.set(q("[data-fill]"), { scale: 0 });
      gsap.set(q("[data-rs]"), { autoAlpha: 0 });

      show(tl, "#a9-board", 0, 1.5);
      q("[data-fill]").forEach((el, i) => tl.to(el, { scale: 1, duration: 0.8, ease: "back.out(2)" }, 3 + i * 1.8));
      tl.to(q("[data-count-n]"), { textContent: 4, snap: { textContent: 1 }, duration: 0.1 }, 3 + 3 * 1.8);
      tl.to(q("#a9-board"), { opacity: 0.12, duration: 2 }, 15);
      hide(tl, "#a9-board", 25, 1.2);
      show(tl, "#a9-done", 16, 0.1);
      maskIn(tl, "#a9-done", 16, 3.5, 0.2);
      hide(tl, "#a9-done", 26, 1.5);

      show(tl, "#a9-rel", 28, 0.8);
      show(tl, q('[data-rs="0"]'), 29, 1);
      show(tl, q('[data-rs="1"]'), 34, 1);
      show(tl, q('[data-rs="future"]'), 40, 0.1);
      typeTo(tl, q("#a9-type")[0], r.typed, 43, 3.2);

      // fade to black — this should feel like the ending
      tl.to(q("#a9-stage"), { opacity: 0, duration: 7, ease: "power1.in" }, 56);
      tl.to({}, { duration: 0.001 }, T);
    },
    onProgress(p) {
      audio.once("a9-done", "complete", p > 16 / T && p < 30 / T);
    },
  });
  return (
    <section id="act-9" ref={ref} className="scene" aria-label="Act IX — Resolution">
      <div className="stage" id="a9-stage">
        <div className="beat beat--left" id="a9-board" data-beat>
          <p className="mono recap-h">{r.heading}</p>
          <EvidenceTracker filled={[]} facts={r.facts} className="et--big et--marks et--recap" />
        </div>
        <div className="beat" id="a9-done" data-beat>
          <MaskText as="h2" className="display" text={r.complete} />
        </div>
        <div className="beat" id="a9-rel" data-beat>
          <RelationshipStatus
            heading={r.relHeading}
            rows={[
              { label: r.status[0].label, value: r.status[0].value },
              { label: r.status[1].label, value: r.status[1].value },
            ]}
            extra={
              <div className="rs-row" data-rs="future">
                <dt className="mono">{r.future}</dt>
                <dd>
                  <span id="a9-type" />
                  <span className="cursor cursor--big" aria-hidden="true" />
                </dd>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
