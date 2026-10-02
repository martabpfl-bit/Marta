import { copy } from "@/content/copy";

// scattered start positions (% of stage). Echoes repeat the same lines so the screen overlaps.
const POS = [
  { l: 8, t: 18 }, { l: 52, t: 12 }, { l: 22, t: 46 }, { l: 62, t: 40 }, { l: 38, t: 70 },
  { l: 58, t: 66 }, { l: 6, t: 64 }, { l: 44, t: 28 }, { l: 70, t: 22 }, { l: 28, t: 82 },
];

/** Statements arriving from every direction, then reorganised. Quotes here are *characterisations*, not real quotes. */
export function StakeholderChaos() {
  const s = copy.case2.statements;
  return (
    <div className="sc" aria-hidden="true">
      {POS.map((p, i) => (
        <span key={i} className="sc-stmt mono" data-stmt={i} style={{ left: `${p.l}%`, top: `${p.t}%` }}>
          {s[i % s.length]}
        </span>
      ))}
    </div>
  );
}
