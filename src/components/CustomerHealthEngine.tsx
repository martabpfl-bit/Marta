import { copy } from "@/content/copy";
import { RiskSignal } from "./RiskSignal";
import { DataPacket } from "./DataPacket";

export function healthLayout(mobile: boolean) {
  const s = copy.health.signals;
  if (mobile) {
    // two columns of signals on top, converging downward into the read-out
    const engine = { x: 200, y: 392, r: 58 };
    const cols = [14, 206];
    const items = s.map((label, i) => ({ label, x: cols[i % 2], y: 52 + Math.floor(i / 2) * 38, anchor: "start" as const }));
    // lines run down the outer gutters so they never cross a label
    const paths = items.map((it, i) => `M${i % 2 ? 386 : 6} ${it.y - 4} C ${i % 2 ? 386 : 6} 300, ${engine.x} 280, ${engine.x} ${engine.y - engine.r - 2}`);
    return { vb: { w: 400, h: 580 }, engine, items, paths, risk: { x: engine.x, y: engine.y + engine.r + 52 } };
  }
  const engine = { x: 600, y: 330, r: 78 };
  const items = s.map((label, i) =>
    i < 5
      ? { label, x: 30, y: 100 + i * 120, anchor: "start" as const }
      : { label, x: 1170, y: 160 + (i - 5) * 120, anchor: "end" as const },
  );
  const paths = items.map((it) =>
    it.anchor === "start"
      ? `M250 ${it.y - 4} C 420 ${it.y - 4}, 430 ${engine.y}, ${engine.x - engine.r - 2} ${engine.y}`
      : `M950 ${it.y - 4} C 780 ${it.y - 4}, 770 ${engine.y}, ${engine.x + engine.r + 2} ${engine.y}`,
  );
  return { vb: { w: 1200, h: 640 }, engine, items, paths, risk: { x: engine.x, y: 470 } };
}

/** Nine signals converging into one health read-out. */
export function CustomerHealthEngine({ mobile }: { mobile: boolean }) {
  const L = healthLayout(mobile);
  const circ = 2 * Math.PI * L.engine.r;
  return (
    <svg className="che" viewBox={`0 0 ${L.vb.w} ${L.vb.h}`} role="img" aria-label="Nine customer signals converging into a customer health read-out" preserveAspectRatio="xMidYMid meet">
      {L.items.map((it, i) => (
        <g key={it.label}>
          <text className="che-sig" data-sig={i} x={it.x} y={it.y} textAnchor={it.anchor}>
            {it.label}
          </text>
          <path className="che-line" data-line={i} d={L.paths[i]} fill="none" />
          <DataPacket id={`h-${i}`} />
        </g>
      ))}
      <g data-engine>
        <circle className="che-ring" cx={L.engine.x} cy={L.engine.y} r={L.engine.r} />
        <circle
          className="che-arc"
          data-arc
          cx={L.engine.x}
          cy={L.engine.y}
          r={L.engine.r}
          strokeDasharray={circ}
          strokeDashoffset={circ}
          transform={`rotate(-90 ${L.engine.x} ${L.engine.y})`}
        />
        <text className="che-core" textAnchor="middle" x={L.engine.x} y={L.engine.y - 2}>
          CUSTOMER
        </text>
        <text className="che-core" textAnchor="middle" x={L.engine.x} y={L.engine.y + 14}>
          HEALTH
        </text>
      </g>
      <RiskSignal x={L.risk.x} y={L.risk.y} label={copy.health.risk} />
    </svg>
  );
}
