"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn, draw } from "@/lib/beats";
import { useIsMobile } from "@/lib/useMedia";
import { MaskText } from "@/components/MaskText";
import { FinalJourneyMap, journeyLayout } from "@/components/FinalJourneyMap";

/**
 * ACT X (b) — FINAL REVEAL
 * Prototype 4/4: the camera starts inside the very first miniature (the email) and pulls back
 * through every scene, until the whole journey is one loop around "This website."
 * Then it reduces to six words, and one sentence.
 */
export function Act10Reveal() {
  const e = copy.ending;
  const mobile = useIsMobile();
  const T = 146;
  const ref = useScene({
    vh: 1000,
    mobileVh: 880,
    build(tl, { q, root, mobile }) {
      const L = journeyLayout(mobile);
      const world = root.querySelector<SVGGElement>("[data-world]")!;
      const tiles = q("[data-tile]");
      const path = root.querySelector<SVGGeometryElement>("[data-jpath]");
      gsap.set(tiles.slice(1), { autoAlpha: 0 });
      gsap.set(q("[data-center]"), { autoAlpha: 0 });
      gsap.set(q("[data-red-i], #a10-sign, #a10-hero, #a10-red, #a10-lines, [data-links]"), { autoAlpha: 0 });
      gsap.set(world, { svgOrigin: `${L.pos[0].x} ${L.pos[0].y}`, scale: mobile ? 4.2 : 7 });

      // ── camera pulls back
      show(tl, "#a10-map", 0, 0.01);
      tl.to(world, { scale: 1, duration: 44, ease: "power2.inOut" }, 0.5);
      tiles.slice(1).forEach((el, i) => show(tl, el, 12 + i * 3, 2));
      draw(tl, path, 12, 26, "none");
      show(tl, q("[data-center]"), 42, 4);
      hide(tl, "#a10-map", 62, 3);

      // ── reduced to six words
      show(tl, "#a10-red", 64, 0.1);
      tl.to(q("[data-red-i]"), { autoAlpha: 1, duration: 1.2, stagger: 3.2 }, 65);
      hide(tl, "#a10-red", 88, 1.5);

      // ── "You gave me feedback. I did something with it."
      show(tl, "#a10-lines", 90, 0.1);
      maskIn(tl, "#a10-l1", 90.5, 3.5, 0.12);
      maskIn(tl, "#a10-l2", 97, 3.5, 0.12);
      hide(tl, "#a10-lines", 108, 1.5);

      // ── final statement. Stillness.
      show(tl, "#a10-hero", 111, 0.1);
      maskIn(tl, "#a10-hero", 111.5, 6, 0.16);
      show(tl, "#a10-sign", 129, 3);
      show(tl, q("[data-links]"), 132, 2);
      tl.to({}, { duration: 0.001 }, T);
    },
  });
  return (
    <section id="act-10b" ref={ref} className="scene" aria-label="The final reveal">
      <div className="stage">
        <div className="beat a10-map" id="a10-map" data-beat>
          <FinalJourneyMap mobile={mobile} />
        </div>
        <div className="beat" id="a10-red" data-beat>
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
