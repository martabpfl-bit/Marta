"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn } from "@/lib/beats";
import { MaskText } from "@/components/MaskText";
import { EvidenceTracker } from "@/components/EvidenceTracker";

/**
 * ACT III — DIAGNOSIS
 * Prototype 1/4 (part B): the feedback becomes four system signals.
 * Copy is deliberate: "evidence surfaced during interview", never "lacks competence".
 */
export function Act3Diagnosis() {
  const ref = useScene({
    vh: 380,
    build(tl, { q }) {
      gsap.set(q("[data-row]"), { autoAlpha: 0 });
      gsap.set(q(".a3-fill"), { scaleX: 0 });
      show(tl, "#a3-board", 0, 0.5);
      tl.fromTo(q("[data-row]"), { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 1.4, stagger: 2.5, ease: "power2.out" }, 1);
      tl.to(q("#a3-board"), { opacity: 0.1, duration: 2 }, 15);
      maskIn(tl, "#a3-l1", 17, 3);
      maskIn(tl, "#a3-l2", 22, 3);
      show(tl, "#a3-l1, #a3-l2", 17, 0.1);
      hide(tl, "#a3-l1, #a3-l2", 30, 1.5);
      show(tl, "#a3-go", 31, 1);
      tl.to(q(".a3-fill"), { scaleX: 1, duration: 5, ease: "power1.inOut" }, 32);
      tl.to({}, { duration: 0.001 }, 40);
    },
  });
  return (
    <section id="act-3" ref={ref} className="scene" aria-label="Act III — Diagnosis">
      <div className="stage">
        <div className="beat beat--left" id="a3-board" data-beat>
          <EvidenceTracker detail className="et--big" />
        </div>
        <div className="beat" id="a3-l1" data-beat>
          <MaskText as="p" className="h-lg" text={copy.act3.lines[0]} />
        </div>
        <div className="beat beat--lower" id="a3-l2" data-beat>
          <MaskText as="p" className="h-lg" text={copy.act3.lines[1]} />
        </div>
        <div className="beat" id="a3-go" data-beat>
          <p className="mono started">{copy.act3.started}</p>
          <span className="a3-bar">
            <i className="a3-fill" />
          </span>
        </div>
      </div>
    </section>
  );
}
