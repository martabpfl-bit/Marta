"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, maskIn, maskOut } from "@/lib/beats";
import { MaskText } from "@/components/MaskText";

/**
 * ACT IV (pre) — CASE 01 context, in plain words, BEFORE any diagram.
 * Every line comes from facts Marta confirmed (see copy.case1.context).
 */
export function Act4pCase1Context() {
  const c = copy.case1;
  const ref = useScene({
    vh: 460,
    mobileVh: 420,
    build(tl, { q }) {
      gsap.set(q("[data-ctx]"), { autoAlpha: 0 });
      // title
      show(tl, "#a4p-k", 0, 0.5);
      show(tl, q("#a4p-k .k-kicker"), 0.3, 0.8);
      maskIn(tl, "#a4p-k", 0.8, 2.6, 0.12);
      maskOut(tl, "#a4p-k", 8.5, 0.9, 0.03);
      hide(tl, "#a4p-k", 9.6, 0.2);

      // four plain-words statements, one at a time
      c.context.forEach((_, i) => {
        const at = 10.5 + i * 9;
        show(tl, `#a4p-c${i}`, at, 0.1);
        tl.fromTo(q(`#a4p-c${i} .ctx-k`), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }, at);
        maskIn(tl, `#a4p-c${i}`, at + 0.6, 2.6, 0.05);
        maskOut(tl, `#a4p-c${i}`, at + 7, 0.8, 0.01);
        hide(tl, `#a4p-c${i}`, at + 7.9, 0.2);
      });
      tl.to({}, { duration: 0.001 }, 10.5 + c.context.length * 9);
    },
  });
  return (
    <section id="act-4p" ref={ref} className="scene" aria-label="Case 01 — in plain words">
      <div className="stage">
        <div className="beat" id="a4p-k" data-beat>
          <p className="mono k-kicker">{c.kicker}</p>
          <MaskText as="h2" className="h-xl" text={c.question} />
        </div>
        {c.context.map((x, i) => (
          <div className="beat" id={`a4p-c${i}`} data-beat data-ctx key={x.k}>
            <p className="mono ctx-k">{x.k}</p>
            <MaskText as="p" className="h-lg ctx-t" text={x.t} />
          </div>
        ))}
      </div>
    </section>
  );
}
