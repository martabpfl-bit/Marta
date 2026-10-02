"use client";
import { useEffect } from "react";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide } from "@/lib/beats";
import { store, useStore } from "@/lib/store";
import { audio } from "@/lib/audio";
import { MaskText } from "@/components/MaskText";
import { RelationshipStatus } from "@/components/RelationshipStatus";

/**
 * ACT I — SIGNAL RECEIVED
 * Prototype 1/4 (part A): an abstract email gives up four phrases, which leave it and become data points.
 */
export function Act1Signal() {
  const c = copy.act1;
  const ready = useStore((s) => s.ready);

  const ref = useScene({
    vh: 520,
    build(tl, { q, root }) {
      const TOTAL = 42;
      // intro words/date wait for the preloader (auto-played, time-based; not scrubbed)
      if (!store.get().ready) gsap.set(q(".a1-date, .a1-title .mt-i"), { autoAlpha: 0 });
      gsap.set(q("[data-rs]"), { autoAlpha: 0 });

      // email arrives
      tl.to(q(".a1-intro"), { autoAlpha: 0, duration: 2 }, 0.5);
      tl.fromTo(q("#a1-email"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 3 }, 1.5);

      // four phrases are highlighted, one at a time
      tl.fromTo(q(".em-hl"), { scaleX: 0 }, { scaleX: 1, duration: 1.6, stagger: 2.2, ease: "power2.out" }, 5);

      // …then everything except the phrases falls away
      tl.to(q(".em-chrome"), { autoAlpha: 0, duration: 2 }, 14);
      const slots = q(".a1-slot-target");
      tl.to(
        q(".em-ph"),
        {
          x: (i: number, el: Element) => {
            const a = el.getBoundingClientRect();
            const b = slots[i].getBoundingClientRect();
            return b.left + b.width / 2 - (a.left + a.width / 2);
          },
          y: (i: number, el: Element) => {
            const a = el.getBoundingClientRect();
            const b = slots[i].getBoundingClientRect();
            return b.top + b.height / 2 - (a.top + a.height / 2);
          },
          duration: 3.2,
          stagger: 0.6,
          ease: "power2.inOut",
        },
        15,
      );
      tl.to(q(".em-hl"), { autoAlpha: 0, duration: 1 }, 17);
      show(tl, q("#a1-slots"), 19.5, 1.5);

      // hold on four data points, then clear
      hide(tl, q("#a1-email, #a1-slots"), 25, 1.6);

      // VISOR × MARTA
      show(tl, q("#a1-rel"), 27, 1.2);
      show(tl, q('[data-rs="0"]'), 29, 1.2); // CURRENT OPPORTUNITY — CLOSED
      show(tl, q('[data-rs="1"]'), 34, 1.2); // pause — RELATIONSHIP — OPEN
      show(tl, q('[data-rs="signal"]'), 39, 1.2); // pause — SIGNAL
      tl.to({}, { duration: 0.001 }, TOTAL);
      void root;
    },
    onProgress(p) {
      audio.once("a1-signal", "signal", p > 0.04 && p < 0.9);
      store.setChrome(false);
    },
  });

  useEffect(() => {
    if (!ready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current;
    if (!r) return;
    const q = gsap.utils.selector(r);
    gsap
      .timeline()
      .to(q(".a1-date"), { autoAlpha: 1, duration: 1.4, ease: "power1.out" })
      .to(q(".a1-title .mt-i"), { autoAlpha: 1, yPercent: 0, duration: 1.2, stagger: 0.14, ease: "power3.out" }, "+=0.5");
    gsap.set(q(".a1-title .mt-i"), { yPercent: 115 });
  }, [ready, ref]);

  return (
    <section id="act-1" ref={ref} className="scene" aria-label="Act I — Signal received">
      <div className="stage">
        <div className="a1-intro">
          <p className="a1-date mono">{c.date}</p>
          <MaskText as="h1" className="a1-title" text={c.title} />
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
