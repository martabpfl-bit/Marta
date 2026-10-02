import { copy } from "@/content/copy";
import { SystemNode } from "./SystemNode";
import { AnimatedConnector } from "./AnimatedConnector";
import { DataPacket } from "./DataPacket";

/** Geometry for the real-estate workflow. Desktop = horizontal; mobile = a vertical flow (not a shrunk desktop). */
export function mapLayout(mobile: boolean) {
  const n = copy.case1.nodes;
  if (mobile) {
    const vb = { w: 360, h: 830 };
    const pos = n.map((_, i) => ({ x: 82, y: 56 + i * 116 }));
    const prop = pos[3];
    return {
      vb,
      pos,
      w: 124,
      source: { x: 278, y: prop.y },
      alt: { x: 278, y: prop.y + 64 },
      chips: { x: 256, y0: pos[2].y - 36, step: 26, w: 190 },
      calChips: { x: 256, y0: pos[5].y - 14, step: 28, w: 190 },
      feed: `M278 ${prop.y - 0} L${prop.x + 62} ${prop.y}`,
      alt_d: `M278 ${prop.y + 64 - 20} C 278 ${prop.y + 30}, ${prop.x + 100} ${prop.y + 10}, ${prop.x + 62} ${prop.y + 8}`,
    };
  }
  const vb = { w: 1200, h: 560 };
  const pos = n.map((_, i) => ({ x: 96 + i * 168, y: 330 }));
  const prop = pos[3];
  return {
    vb,
    pos,
    w: 136,
    source: { x: prop.x, y: 130 },
    alt: { x: prop.x + 230, y: 130 },
    chips: { x: pos[2].x, y0: pos[2].y + 62, step: 30, w: 168 },
    calChips: { x: pos[5].x, y0: pos[5].y + 62, step: 30, w: 168 },
    feed: `M${prop.x} ${130 + 28} L${prop.x} ${prop.y - 27}`,
    alt_d: `M${prop.x + 230} ${130 + 28} C ${prop.x + 230} 250, ${prop.x + 120} ${prop.y - 20}, ${prop.x + 70} ${prop.y - 8}`,
  };
}

export function ImplementationMap({ mobile }: { mobile: boolean }) {
  const L = mapLayout(mobile);
  const nodes = copy.case1.nodes;
  const seg = (i: number) => {
    const a = L.pos[i];
    const b = L.pos[i + 1];
    return mobile
      ? `M${a.x} ${a.y + 27} L${b.x} ${b.y - 27}`
      : `M${a.x + L.w / 2} ${a.y} L${b.x - L.w / 2} ${b.y}`;
  };
  return (
    <svg
      className="im"
      viewBox={`0 0 ${L.vb.w} ${L.vb.h}`}
      role="img"
      aria-label="Implementation architecture: lead, channel, AI agent, property information, qualification, calendar, sales team"
      preserveAspectRatio="xMidYMid meet"
    >
      <g data-layer="main">
        {nodes.slice(0, -1).map((_, i) => (
          <AnimatedConnector key={i} id={`seg-${i}`} d={seg(i)} />
        ))}
        <AnimatedConnector id="feed" d={L.feed} className="ac--feed" />
        <AnimatedConnector id="alt" d={L.alt_d} className="ac--alt" />
        {nodes.map((nd, i) => (
          <SystemNode key={nd.id} id={nd.id} label={nd.label} x={L.pos[i].x} y={L.pos[i].y} w={L.w} index={`N0${i + 1}`} />
        ))}
        <SystemNode id="source" label={copy.case1.blocker.source} x={L.source.x} y={L.source.y} w={L.w} index="EXT" />
        <SystemNode id="alt-node" label={copy.case1.blocker.altLabel} x={L.alt.x} y={L.alt.y} w={L.w + 24} index="ALT" />

        {/* agent logic — the questions the agent works through */}
        {copy.case1.agentLogic.map((t, i) => (
          <g className="chip" data-chip={i} key={t} transform={`translate(${L.chips.x} ${L.chips.y0 + i * L.chips.step})`}>
            <rect x={-L.chips.w / 2} y={-11} width={L.chips.w} height={22} />
            <text textAnchor="middle" y={4}>
              {t}
            </text>
          </g>
        ))}
        {copy.case1.ready.map((t, i) => (
          <g className="chip chip--go" data-cal={i} key={t} transform={`translate(${L.calChips.x} ${L.calChips.y0 + i * L.calChips.step})`}>
            <rect x={-L.calChips.w / 2} y={-11} width={L.calChips.w} height={22} />
            <text textAnchor="middle" y={4}>
              {t}
            </text>
          </g>
        ))}

        {/* packets — one per segment + feed + alt + ambient loop */}
        {nodes.slice(0, -1).map((_, i) => (
          <DataPacket key={i} id={`pk-${i}`} />
        ))}
        <DataPacket id="pk-feed" />
        <DataPacket id="pk-alt" tone="good" />
        <DataPacket id="pk-loop-a" tone="good" />
        <DataPacket id="pk-loop-b" tone="good" />
        <g data-x className="im-x" transform={`translate(${L.source.x} ${L.source.y + (mobile ? 0 : 0)})`}>
          <path d="M-9 -9L9 9M9 -9L-9 9" />
        </g>
      </g>
      {/* investigation: false routes that are tried and dropped */}
      <g data-layer="scan">
        <path data-scan="0" className="scan" d={mobile ? `M278 ${L.source.y + 20} C 340 ${L.source.y + 80}, 330 ${L.source.y + 200}, 300 ${L.source.y + 260}` : `M${L.source.x + 60} 140 C ${L.source.x + 100} 60, ${L.source.x + 190} 40, ${L.source.x + 330} 70`} fill="none" />
        <path data-scan="1" className="scan" d={mobile ? `M240 ${L.source.y - 20} C 160 ${L.source.y - 90}, 120 ${L.source.y - 160}, 140 ${L.source.y - 230}` : `M${L.source.x - 70} 135 C ${L.source.x - 200} 90, ${L.source.x - 330} 80, ${L.source.x - 440} 120`} fill="none" />
      </g>
    </svg>
  );
}
