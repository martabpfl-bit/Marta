"use client";
import { useEffect } from "react";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn, maskOut } from "@/lib/beats";
import { store, useStore } from "@/lib/store";
import { audio } from "@/lib/audio";
import { MaskText } from "@/components/MaskText";
import { RelationshipStatus } from "@/components/RelationshipStatus";

/**
 * ACT I — the hook, then SIGNAL RECEIVED.
 * Opens with a direct line to Catarina (so the premise is clear in 10 seconds), says thank you,
 * then the abstract email gives up four phrases that become four data points.
 */
export function Act1Signal() {
  const c = copy.act1;
  const ready = useStore((s) => s.ready);

  const ref = useScene({
    vh: 560,
    build(tl, { q }) {
      const O = 17; // hook + thanks come first; everything below is offset by O
      const TOTAL = O + 42;
      if (!store.get().ready) gsap.set(q(".a1-date, .a1-title .mt-i"), { autoAlpha: 0 });
      gsap.set(q("[data-rs]"), { autoAlpha: 0 });

      // ── hook: "Hi Catarina." is already on screen. Scroll delivers the rest.
      tl.to(q(".a1-intro"), { y: -40, autoAlpha: 0, duration: 1.6, ease: "power2.in" }, 0.6);
      show(tl, "#a1-h2", 2, 0.1);
      maskIn(tl, "#a1-h2", 2, 1.8, 0.1);
      maskOut(tl, "#a1-h2", 6.2, 0.9, 0.03);
      hide(tl, "#a1-h2", 7.2, 0.2);
      show(tl, "#a1-h3", 7.6, 0.1);
      maskIn(tl, "#a1-h3", 7.6, 2, 0.08);
      maskOut(tl, "#a1-h3", 12, 0.9, 0.02);
      hide(tl, "#a1-h3", 13, 0.2);
      show(tl, "#a1-thanks", 13.4, 0.1);
      maskIn(tl, "#a1-thanks", 13.4, 1.8, 0.07);
      hide(tl, "#a1-thanks", O - 0.6, 0.6);

      // ── SIGNAL RECEIVED
      show(tl, "#a1-sig", O, 0.1);
      maskIn(tl, "#a1-sig", O, 1.4, 0.12);
      hide(tl, "#a1-sig", O + 3.4, 0.7);

      // email arrives
      tl.fromTo(q("#a1-email"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 2.4 }, O + 4);

      // four phrases are highlighted, one at a time
      tl.fromTo(q(".em-hl"), { scaleX: 0 }, { scaleX: 1, duration: 1.4, stagger: 1.8, ease: "power2.out" }, O + 6.5);

      // …then everything except the phrases falls away
      tl.to(q(".em-chrome"), { autoAlpha: 0, duration: 1.6 }, O + 14);
      const slots = q(".a1-slot-target");
      const d = (axis: "x" | "y") => (i: number, el: Element) => {
        const a = el.getBoundingClientRect();
        const b = slots[i].getBoundingClientRect();
        return axis === "x" ? b.left + b.width / 2 - (a.left + a.width / 2) : b.top + b.height / 2 - (a.top + a.height / 2);
      };
      tl.to(q(".em-ph"), { x: d("x"), y: d("y"), duration: 2.8, stagger: 0.5, ease: "power2.inOut" }, O + 15);
      tl.to(q(".em-hl"), { autoAlpha: 0, duration: 1 }, O + 17);
      show(tl, q("#a1-slots"), O + 19, 1.2);
      hide(tl, q("#a1-email, #a1-slots"), O + 24, 1.2);

      // VISOR × MARTA
      show(tl, q("#a1-rel"), O + 25.5, 1);
      show(tl, q('[data-rs="0"]'), O + 27, 1);
      show(tl, q('[data-rs="1"]'), O + 31, 1);
      show(tl, q('[data-rs="signal"]'), O + 35, 1);
      tl.to({}, { duration: 0.001 }, TOTAL);
    },
    onProgress(p) {
      audio.once("a1-signal", "signal", p > 0.3 && p < 0.95);
      store.setChrome(false);
    },
  });

  useEffect(() => {
    if (!ready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current;
    if (!r) return;
    const q = gsap.utils.selector(r);
    gsap.set(q(".a1-title .mt-i"), { yPercent: 115 });
    gsap
      .timeline()
      .to(q(".a1-date"), { autoAlpha: 1, duration: 1, ease: "power1.out" })
      .to(q(".a1-title .mt-i"), { autoAlpha: 1, yPercent: 0, duration: 1.1, stagger: 0.14, ease: "power4.out" }, "-=0.4");
  }, [ready, ref]);

  return (
    <section id="act-1" ref={ref} className="scene" aria-label="Act I — Signal received">
      <div className="stage">
        <div className="a1-intro">
          <p className="a1-date mono">{c.date}</p>
          <MaskText as="h1" className="a1-title" text={c.title} />
        </div>
        <div className="beat" id="a1-h2" data-beat>
          <MaskText as="h2" className="h-xl" text={c.hook[0]} />
        </div>
        <div className="beat" id="a1-h3" data-beat>
          <MaskText as="h2" className="h-xl" text={c.hook[1]} />
        </div>
        <div className="beat" id="a1-thanks" data-beat>
          <MaskText as="h2" className="h-xl" text={c.thanks} />
        </div>
        <div className="beat" id="a1-sig" data-beat>
          <MaskText as="h2" className="display" text={c.signalTitle} />
        </div>

        <div className="beat a1-email" id="a1-email" data-beat>
          <div className="em">
            <div className="em-frame em-chrome" />
            <div className="em-head em-chrome mono">
              <span>{c.email.from}</span>
              <span>{c.email.org}</span>
            </div>
            <div className="em-body">
              <i className="bar em-chrome" style={{ width: "64%" }} />
              <i className="bar em-chrome" style={{ width: "88%" }} />
              {c.email.themes.map((t, i) => (
                <div className="em-line" key={t}>
                  <span className="em-ph mono" data-ph={i}>
                    <i className="em-hl" />
                    <span>{t}</span>
                  </span>
                  <i className="bar em-chrome" style={{ width: `${26 + ((i * 17) % 30)}%` }} />
                </div>
              ))}
              <i className="bar em-chrome" style={{ width: "76%" }} />
              <i className="bar em-chrome" style={{ width: "40%" }} />
            </div>
          </div>
        </div>

        <div className="beat" id="a1-slots" data-beat>
          <ol className="a1-slots">
            {c.email.themes.map((t, i) => (
              <li key={t}>
                <span className="mono a1-slot-id">SIG-0{i + 1}</span>
                <span className="a1-slot-target" />
              </li>
            ))}
          </ol>
        </div>

        <div className="beat" id="a1-rel" data-beat>
          <RelationshipStatus heading={c.relationship.heading} rows={c.relationship.rows} signal={c.relationship.signal} />
        </div>
      </div>
    </section>
  );
}
