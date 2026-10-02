"use client";
import { copy } from "@/content/copy";
import { useScene } from "@/lib/useScene";
import { show, hide, contextBeat } from "@/lib/beats";
import { gsap } from "@/lib/gsap";
import { store } from "@/lib/store";
import { ContextBeats } from "@/components/ContextBeats";
import { EvidenceTracker } from "@/components/EvidenceTracker";

/**
 * DECISIONS (part 2): a decision Marta took on her own — opening the Portuguese market —
 * and an honest limit at the end. Closes the DECISIONS pillar.
 */
export function Act5bGrowth() {
  const g = copy.growth;
  const PER = 8;
  const items = [...g.a, ...g.limit];
  const END = items.length * PER;
  const ref = useScene({
    vh: 380,
    mobileVh: 340,
    build(tl, { q }) {
      gsap.set(q("[data-fill]"), { scale: (i: number, el: Element) => (el.getAttribute("data-on") === "true" ? 1 : 0) });
      items.forEach((_, i) => contextBeat(tl, `#a5g-c${i}`, i * PER, PER));
      show(tl, "#a5g-evid", END, 0.8);
      tl.to(q('[data-fill="decisions"]'), { scale: 1, duration: 1.4, ease: "back.out(2)" }, END + 2);
      tl.to(q("[data-count-n]"), { textContent: 2, snap: { textContent: 1 }, duration: 0.1 }, END + 2);
      hide(tl, "#a5g-evid", END + 8, 0.01);
      tl.to({}, { duration: 0.001 }, END + 9);
    },
    onProgress(p) {
      store.setEvidence("decisions", p >= (END + 3) / (END + 9));
    },
  });
  return (
    <section id="act-5b" ref={ref} className="scene" aria-label="Decisions I took on my own">
      <div className="stage">
        <ContextBeats prefix="a5g" items={items} />
        <div className="beat beat--left" id="a5g-evid" data-beat>
          <EvidenceTracker filled={["projects"]} className="et--big" />
        </div>
      </div>
    </section>
  );
}
