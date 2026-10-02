"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, contextBeat } from "@/lib/beats";
import { ContextBeats } from "@/components/ContextBeats";

/**
 * ACT V-b — "Nobody asked me". Opening the Portuguese market on her own initiative.
 * All figures are approximate and exactly as Marta stated them; no names (people, companies, events).
 */
export function Act5bGrowth() {
  const g = copy.growth;
  const PER = 8;
  const ref = useScene({
    vh: 560,
    mobileVh: 500,
    build(tl, { q }) {
      gsap.set(q("[data-stat]"), { autoAlpha: 0, y: 20 });
      // 1) the opening + the work
      g.a.forEach((_, i) => contextBeat(tl, `#a5g-a-c${i}`, i * PER, PER));

      // 2) the numbers, counting up
      const S = g.a.length * PER;
      show(tl, "#a5g-stats", S, 0.4);
      q("[data-stat]").forEach((el, i) => {
        const at = S + 0.8 + i * 2.6;
        tl.to(el, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, at);
        const num = el.querySelector<HTMLElement>("[data-num]")!;
        const n = Number(el.getAttribute("data-n"));
        const pre = el.getAttribute("data-pre") ?? "";
        const suf = el.getAttribute("data-suf") ?? "";
        const o = { v: 0 };
        num.textContent = `${pre}0${suf}`;
        tl.fromTo(o, { v: 0 }, { v: n, duration: 2.2, ease: "power2.out", onUpdate: () => (num.textContent = `${pre}${Math.round(o.v)}${suf}`) }, at);
      });
      hide(tl, "#a5g-stats", S + 12, 1);

      // 3) beyond LinkedIn, partners, honesty, result
      g.b.forEach((_, i) => contextBeat(tl, `#a5g-b-c${i}`, S + 13 + i * PER, PER));
      tl.to({}, { duration: 0.001 }, S + 13 + g.b.length * PER);
    },
  });
  return (
    <section id="act-5b" ref={ref} className="scene" aria-label="Nobody asked me">
      <div className="stage">
        <ContextBeats prefix="a5g-a" items={g.a} />
        <div className="beat" id="a5g-stats" data-beat>
          <ul className="stats">
            {g.stats.map((s) => (
              <li key={s.l} data-stat data-n={s.n} data-pre={s.pre} data-suf={s.suf}>
                <span className="stat-n display" data-num>
                  {s.pre}
                  {s.n}
                  {s.suf}
                </span>
                <span className="mono">{s.l}</span>
              </li>
            ))}
          </ul>
        </div>
        <ContextBeats prefix="a5g-b" items={g.b} />
      </div>
    </section>
  );
}
