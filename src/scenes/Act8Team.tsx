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
 * Principles are placeholders (see copy.ts) — nothing here is presented as a fact about anyone else.
 */
export function Act8Team() {
  const t = copy.team;
  const T = 70;
  const ref = useScene({
    vh: 480,
    mobileVh: 420,
    build(tl, { q }) {
      gsap.set(q(".a8-fill"), { scale: 0 });
      gsap.set(q("[data-pr]"), { autoAlpha: 0 });
      show(tl, "#a8-label", 0, 2);
      show(tl, "#a8-l1", 4, 0.1);
      maskIn(tl, "#a8-l1", 4, 3.5, 0.14);
      hide(tl, "#a8-l1", 14, 1.8);

      show(tl, "#a8-l2", 17, 0.1);
      maskIn(tl, "#a8-l2", 17, 2.8, 0.14);
      show(tl, "#a8-pr", 22, 0.1);
      q("[data-pr]").forEach((el, i) => tl.to(el, { autoAlpha: 1, y: 0, duration: 1.4, ease: "power3.out" }, 22 + i * 4));
      hide(tl, "#a8-l2, #a8-pr", 38, 1.8);

      if (t.excerpts.length) {
        show(tl, "#a8-ex", 40, 1.5);
        hide(tl, "#a8-ex", 50, 1.5);
      }
      show(tl, "#a8-close", 42, 0.1);
      maskIn(tl, "#a8-close", 42, 3.5, 0.16);
      tl.to(q(".a8-fill"), { scale: 1, duration: 2, ease: "power2.out" }, 56);
      tl.to({}, { duration: 0.001 }, T);
    },
    onProgress(p) {
      store.setChrome(false);
      store.setEvidence("team", p >= 58 / T);
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
          <MaskText as="h2" className="h-xl" text={t.lines[1]} />
        </div>
        <div className="beat beat--lower a8-pr" id="a8-pr" data-beat>
          <ul>
            {t.recap.map((p) => (
              <li key={p} data-pr>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="beat" id="a8-ex" data-beat>
          <TeamMoment />
        </div>
        <div className="beat" id="a8-close" data-beat>
          <MaskText as="h2" className="h-xl" text={t.closing} />
        </div>
      </div>
    </section>
  );
}
