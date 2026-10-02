"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn } from "@/lib/beats";
import { store } from "@/lib/store";
import { MaskText } from "@/components/MaskText";

/**
 * ACT VIII — TEAM
 * A hard cut out of the dashboard language: warm off-white, one ring, almost no motion.
 * The proof is other people's own words, verbatim (public LinkedIn recommendations), never paraphrased.
 */
export function Act8Team() {
  const t = copy.team;
  const Q = 11; // units per quote
  const QS = 40; // quotes start
  const END = QS + t.excerpts.length * Q;
  const T = END + 17;
  const ref = useScene({
    vh: 620,
    mobileVh: 560,
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

      // others' words, verbatim, one at a time
      t.excerpts.forEach((_, i) => {
        const at = QS + i * Q;
        show(tl, `#a8-q${i}`, at, 0.8);
        tl.fromTo(q(`#a8-q${i} .qt`), { y: 16 }, { y: 0, duration: 1.2, ease: "power3.out" }, at);
        hide(tl, `#a8-q${i}`, at + Q - 1.2, 0.9);
      });

      show(tl, "#a8-close", END + 1, 0.1);
      maskIn(tl, "#a8-close", END + 1, 3.5, 0.16);
      tl.to(q(".a8-fill"), { scale: 1, duration: 2, ease: "power2.out" }, END + 12);
      tl.to({}, { duration: 0.001 }, T);
    },
    onProgress(p) {
      store.setChrome(false);
      store.setEvidence("team", p >= (END + 13) / T);
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
        {t.excerpts.map((e, i) => (
          <div className="beat" id={`a8-q${i}`} data-beat key={e.text}>
            <p className="a8-qlabel">{t.quotesLabel}</p>
            <figure className="qt">
              <blockquote>“{e.text}”</blockquote>
              <figcaption>{e.attribution}</figcaption>
            </figure>
          </div>
        ))}
        <div className="beat" id="a8-close" data-beat>
          <MaskText as="h2" className="h-xl" text={t.closing} />
        </div>
      </div>
    </section>
  );
}
