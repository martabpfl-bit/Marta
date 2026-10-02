"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn } from "@/lib/beats";
import { MaskText } from "@/components/MaskText";
import { StatusIndicator } from "@/components/StatusIndicator";

const TONES = ["good", "good", "warn", "good", "good", "good", "warn", "good", "good", "good", "good", "good"] as const;

/**
 * ACT VII — META REVEAL
 * Starts inside the Customer Health interface, then pulls back until the monitored account is Visor × Marta.
 * Other tiles are abstract (no names, no numbers).
 */
export function Act7Meta() {
  const m = copy.meta7;
  const T = 84;
  const ref = useScene({
    vh: 480,
    build(tl, { q, root }) {
      const world = root.querySelector<HTMLElement>(".a7-world")!;
      const visor = root.querySelector<HTMLElement>(".a7-visor")!;
      const center = root.querySelector<HTMLElement>(".a7-center")!;
      gsap.set(q(".a7-tile:not(.a7-center)"), { autoAlpha: 0 });
      gsap.set(world, { scale: 4.2, transformOrigin: "50% 50%" });
      gsap.set(q("#a7-q, #a7-x"), { autoAlpha: 0 });

      // pull back
      show(tl, q(".a7-world"), 0, 0.01);
      tl.to(world, { scale: 1, duration: 28, ease: "power2.inOut" }, 1);
      tl.to(q(".a7-tile:not(.a7-center)"), { autoAlpha: 1, duration: 3, stagger: { each: 0.5, from: "center" } }, 14);
      // glide to the one that matters
      const fx = () => {
        const w = world.getBoundingClientRect();
        const v = visor.getBoundingClientRect();
        return { x: w.left + w.width / 2 - (v.left + v.width / 2), y: w.top + w.height / 2 - (v.top + v.height / 2) };
      };
      tl.to(world, { scale: 1.9, x: () => fx().x * 1.9, y: () => fx().y * 1.9, duration: 10, ease: "power2.inOut" }, 38);
      tl.to(q(".a7-tile:not(.a7-visor)"), { opacity: 0.18, duration: 3 }, 44);
      tl.fromTo(q(".a7-visor"), { boxShadow: "0 0 0 0 rgba(227,163,59,0)" }, { boxShadow: "0 0 0 10px rgba(227,163,59,0.12)", duration: 2, yoyo: true, repeat: 3 }, 49);

      // "Recognise this one?"  … long pause …  "Exactly."
      show(tl, "#a7-q", 55, 0.1);
      maskIn(tl, "#a7-q", 55, 3.5, 0.12);
      hide(tl, "#a7-q", 70, 1.2);
      show(tl, "#a7-x", 72, 0.1);
      maskIn(tl, "#a7-x", 72, 2.2, 0.12);
      tl.to({}, { duration: 0.001 }, T);
      void center;
    },
  });
  return (
    <section id="act-7" ref={ref} className="scene" aria-label="Act VII — Recognise this one?">
      <div className="stage">
        <div className="a7-world" aria-hidden="true">
          {Array.from({ length: 15 }, (_, i) =>
            i === 7 ? (
              <div className="a7-tile a7-center" key={i}>
                <p className="mono">{copy.health.engine}</p>
                <StatusIndicator tone="warn" pulse />
              </div>
            ) : i === 12 ? (
              <div className="a7-tile a7-visor" key={i}>
                <p className="mono a7-vh">{m.relationship}</p>
                <p className="mono a7-in">
                  {m.input}
                  <b>{m.inputValue}</b>
                </p>
                <StatusIndicator tone="warn" pulse />
              </div>
            ) : (
              <Tile key={i} tone={TONES[i % TONES.length]} />
            ),
          )}
        </div>
        <div className="beat a7-text" id="a7-q" data-beat>
          <MaskText as="h2" className="h-xl" text={m.recognise} />
        </div>
        <div className="beat a7-text" id="a7-x" data-beat>
          <MaskText as="h2" className="display" text={m.exactly} />
        </div>
      </div>
    </section>
  );
}

function Tile({ tone, className = "" }: { tone: (typeof TONES)[number]; className?: string }) {
  return (
    <div className={`a7-tile ${className}`}>
      <i className="bar" style={{ width: "58%" }} />
      <i className="bar" style={{ width: "34%" }} />
      <StatusIndicator tone={tone} />
    </div>
  );
}
