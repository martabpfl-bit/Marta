"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn } from "@/lib/beats";
import { store } from "@/lib/store";
import { MaskText } from "@/components/MaskText";
import { TeamMoment } from "@/components/TeamMoment";

/**
 * ACT VIII — TEAM
 * A hard cut out of the dashboard language: warm off-white, one ring, almost no motion.
 * No diagrams, no nodes, no metrics. Held frames are long on purpose.
 */
export function Act8Team() {
  const t = copy.team;
  const T = 110;
  const ref = useScene({
    vh: 620,
    mobileVh: 540,
    build(tl, { q }) {
      gsap.set(q(".a8-fill"), { scale: 0 });
      show(tl, "#a8-label", 0, 3);
      maskIn(tl, "#a8-l1", 8, 5, 0.15);
      show(tl, "#a8-l1", 8, 0.1);
      hide(tl, "#a8-l1", 21, 2.5);

      show(tl, "#a8-l2", 25, 0.1);
      show(tl, q(".a8-date"), 25, 2.5);
      maskIn(tl, "#a8-l2", 30, 4, 0.15);
      hide(tl, "#a8-l2", 41, 2.5);

      show(tl, "#a8-l3", 45, 0.1);
      maskIn(tl, "#a8-l3", 45, 4.5, 0.15);
      hide(tl, "#a8-l3", 56, 2.5);

      if (t.excerpts.length) {
        show(tl, "#a8-ex", 58, 2);
        hide(tl, "#a8-ex", 72, 2);
      }
      show(tl, "#a8-p1", 60, 0.1);
      maskIn(tl, "#a8-pp1", 60, 4.5, 0.12);
      maskIn(tl, "#a8-p2", 67, 4.5, 0.12);
      hide(tl, "#a8-p1, #a8-p2", 78, 2.5);

      show(tl, "#a8-proud", 82, 0.1);
      maskIn(tl, "#a8-proud", 82, 7, 0.2);
      // the longest hold in the film: 90 → 103
      hide(tl, "#a8-proud", 103, 2.5);
      tl.to(q(".a8-fill"), { scale: 1, duration: 2.5, ease: "power2.out" }, 105);
      tl.to({}, { duration: 0.001 }, T);
    },
    onProgress(p) {
      store.setChrome(false);
      store.setEvidence("team", p >= 107 / T);
    },
  });
  return (
    <section id="act-8" ref={ref} className="scene scene--light" aria-label="Act VIII — Team">
      <div className="stage">
        <div className="beat a8-label" id="a8-label" data-beat>
          <p className="a8-tag">
            {t.label}
            <span className="a8-ring" aria-hidden="true">
              <i className="a8-fill" />
            </span>
          </p>
        </div>
        <div className="beat" id="a8-l1" data-beat>
          <MaskText as="h2" className="h-xl" text={t.lines[0]} />
        </div>
        <div className="beat" id="a8-l2" data-beat>
          <p className="a8-date">{t.lines[1]}</p>
          <MaskText as="h2" className="h-xl" text={t.lines[2]} />
        </div>
        <div className="beat" id="a8-l3" data-beat>
          <MaskText as="h2" className="h-xl" text={t.lines[3]} />
        </div>
        <div className="beat" id="a8-ex" data-beat>
          <TeamMoment />
        </div>
        <div className="beat" id="a8-p1" data-beat>
          <MaskText id="a8-pp1" as="p" className="h-lg" text={t.paraphrase[0]} />
          <MaskText id="a8-p2" as="p" className="h-lg a8-p2" text={t.paraphrase[1]} />
        </div>
        <div className="beat" id="a8-proud" data-beat>
          <MaskText as="h2" className="h-xl" text={t.proud} />
        </div>
      </div>
    </section>
  );
}
