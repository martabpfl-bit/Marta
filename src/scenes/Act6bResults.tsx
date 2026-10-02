"use client";
import { copy } from "@/content/copy";
import { gsap } from "@/lib/gsap";
import { useScene } from "@/lib/useScene";
import { show, hide, contextBeat } from "@/lib/beats";
import { store } from "@/lib/store";
import { ContextBeats } from "@/components/ContextBeats";
import { EvidenceTracker } from "@/components/EvidenceTracker";

/**
 * RESULTS: what came out of the decisions. Figures are approximate and exactly as Marta stated them.
 * No names (people, companies, events).
 */
export function Act6bResults() {
  const g = copy.growth;
  const PER = 8;
  const S = g.resultsIntro.length * PER; // stats start
  const B = S + 13; // text beats start
  const END = B + g.b.length * PER;
  const ref = useScene({
    vh: 520,
    mobileVh: 460,
    build(tl, { q }) {
      gsap.set(q("[data-stat]"), { autoAlpha: 0, y: 20 });
      gsap.set(q("[data-fill]"), { scale: (i: number, el: Element) => (el.getAttribute("data-on") === "true" ? 1 : 0) });
      g.resultsIntro.forEach((_, i) => contextBeat(tl, `#a6r-i-c${i}`, i * PER, PER));

      show(tl, "#a6r-stats", S, 0.4);
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
      hide(tl, "#a6r-stats", S + 12, 1);

      g.b.forEach((_, i) => contextBeat(tl, `#a6r-b-c${i}`, B + i * PER, PER));

      show(tl, "#a6r-evid", END, 0.8);
      tl.to(q('[data-fill="results"]'), { scale: 1, duration: 1.4, ease: "back.out(2)" }, END + 2);
      tl.to(q("[data-count-n]"), { textContent: 3, snap: { textContent: 1 }, duration: 0.1 }, END + 2);
      tl.to({}, { duration: 0.001 }, END + 9);
    },
    onProgress(p) {
      store.setEvidence("results", p >= (END + 3) / (END + 9));
    },
  });
  return (
    <section id="act-6b" ref={ref} className="scene" aria-label="Results">
      <div className="stage">
        <ContextBeats prefix="a6r-i" items={g.resultsIntro} />
        <div className="beat" id="a6r-stats" data-beat>
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
        <ContextBeats prefix="a6r-b" items={g.b} />
        <div className="beat beat--left" id="a6r-evid" data-beat>
          <EvidenceTracker filled={["projects", "decisions"]} className="et--big" />
        </div>
      </div>
    </section>
  );
}
