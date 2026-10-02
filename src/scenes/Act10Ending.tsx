"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn } from "@/lib/beats";
import { MaskText } from "@/components/MaskText";

/**
 * FINAL — the answer to the feedback, then the sign-off. Short on purpose: the six-step "how I work" slide
 * and the zoom-out map were removed (they explained too much).
 */
export function Act10Reveal() {
  const e = copy.ending;
  const ref = useScene({
    vh: 340,
    mobileVh: 320,
    build(tl, { q }) {
      gsap.set(q("[data-links]"), { autoAlpha: 0 });

      // ── "You gave me feedback. I did something with it."
      show(tl, "#a10-lines", 0, 0.1);
      maskIn(tl, "#a10-l1", 0.5, 3, 0.12);
      maskIn(tl, "#a10-l2", 6, 3, 0.12);
      hide(tl, "#a10-lines", 16, 1.2);

      // ── final statement, then the sign-off
      show(tl, "#a10-hero", 18, 0.1);
      maskIn(tl, "#a10-hero", 18.5, 5, 0.14);
      show(tl, "#a10-sign", 34, 2.5);
      show(tl, q("[data-links]"), 36, 1.5);
      tl.to({}, { duration: 0.001 }, 44);
    },
  });
  return (
    <section id="act-10b" ref={ref} className="scene" aria-label="Final">
      <div className="stage">
        <div className="beat" id="a10-lines" data-beat>
          <MaskText id="a10-l1" as="h2" className="h-xl" text={e.lines[0]} />
          <MaskText id="a10-l2" as="h2" className="h-xl a10-l2" text={e.lines[1]} />
        </div>
        <div className="beat" id="a10-hero" data-beat>
          <MaskText as="h2" className="display a10-hero" text={e.hero} />
        </div>
        <div className="beat beat--lower a10-sign" id="a10-sign" data-beat>
          <p className="a10-thanks">{e.thanks}</p>
          <p className="a10-thanks">{e.like}</p>
          <p className="a10-name">{e.name}</p>
          <p className="mono a10-role">{e.role}</p>
          <p className="a10-uth" data-links>
            <a href={e.underTheHood.href}>{e.underTheHood.label}</a>
          </p>
          <p className="mono a10-links" data-links>
            {e.links
              .filter((l) => l.href.startsWith("http"))
              .map((l) => (
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
