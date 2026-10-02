"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn } from "@/lib/beats";
import { MaskText } from "@/components/MaskText";

/**
 * FINAL — "How I work" in six words, then the answer to the feedback, then the sign-off.
 * (The earlier zoom-out map of miniatures was removed: it asked the viewer to decode too much.)
 */
export function Act10Reveal() {
  const e = copy.ending;
  const T = 84;
  const ref = useScene({
    vh: 560,
    mobileVh: 500,
    build(tl, { q }) {
      gsap.set(q("[data-red-i], [data-links]"), { autoAlpha: 0 });

      // ── how I work, in six steps
      show(tl, "#a10-red", 0, 0.1);
      show(tl, q("#a10-redk"), 0.2, 0.8);
      tl.to(q("[data-red-i]"), { autoAlpha: 1, duration: 1, stagger: 2.4 }, 1);
      hide(tl, "#a10-red", 20, 1.2);

      // ── "You gave me feedback. I did something with it."
      show(tl, "#a10-lines", 22, 0.1);
      maskIn(tl, "#a10-l1", 22.5, 3, 0.12);
      maskIn(tl, "#a10-l2", 28, 3, 0.12);
      hide(tl, "#a10-lines", 38, 1.2);

      // ── final statement, then the sign-off
      show(tl, "#a10-hero", 40, 0.1);
      maskIn(tl, "#a10-hero", 40.5, 5, 0.14);
      show(tl, "#a10-sign", 56, 2.5);
      show(tl, q("[data-links]"), 58, 1.5);
      tl.to({}, { duration: 0.001 }, T);
    },
  });
  return (
    <section id="act-10b" ref={ref} className="scene" aria-label="Final">
      <div className="stage">
        <div className="beat" id="a10-red" data-beat>
          <p className="mono" id="a10-redk" style={{ marginBottom: "3vh" }}>
            How I work
          </p>
          <ol className="reduce">
            {e.reduction.map((r, i) => (
              <li key={r} data-red-i>
                <span className="reduce-w">{r}</span>
                {i < e.reduction.length - 1 && (
                  <svg viewBox="0 0 10 24" aria-hidden="true">
                    <path d="M5 0V20M1 16l4 5 4-5" fill="none" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </div>
        <div className="beat" id="a10-lines" data-beat>
          <MaskText id="a10-l1" as="h2" className="h-xl" text={e.lines[0]} />
          <MaskText id="a10-l2" as="h2" className="h-xl a10-l2" text={e.lines[1]} />
        </div>
        <div className="beat" id="a10-hero" data-beat>
          <MaskText as="h2" className="display a10-hero" text={e.hero} />
        </div>
        <div className="beat beat--lower a10-sign" id="a10-sign" data-beat>
          <p className="a10-thanks">{e.thanks}</p>
          <p className="a10-name">{e.name}</p>
          <p className="mono a10-role">{e.role}</p>
          <p className="a10-uth" data-links>
            <a href={e.underTheHood.href}>{e.underTheHood.label}</a>
          </p>
          <p className="mono a10-links" data-links>
            {e.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
