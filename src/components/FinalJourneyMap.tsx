import { copy } from "@/content/copy";

export function journeyLayout(mobile: boolean) {
  const n = copy.ending.journey.length;
  if (mobile) {
    const vb = { w: 400, h: 680 };
    const pos = Array.from({ length: n }, (_, i) =>
      i < 4 ? { x: 88, y: 76 + i * 150 } : { x: 312, y: 76 + (7 - i) * 150 },
    );
    return { vb, pos, tw: 140, th: 96, center: { x: 200, y: 340 } };
  }
  const vb = { w: 1200, h: 700 };
  const pos = Array.from({ length: n }, (_, i) => {
    const a = ((-135 + i * 45) * Math.PI) / 180;
    return { x: 600 + Math.cos(a) * 470, y: 350 + Math.sin(a) * 255 };
  });
  return { vb, pos, tw: 150, th: 96, center: { x: 600, y: 350 } };
}

function Glyph({ id }: { id: string }) {
  switch (id) {
    case "feedback":
      return (
        <g className="gl">
          <path d="M-40 -22H40M-40 -10H22M-40 2H34M-40 14H10" />
          <circle cx={40} cy={14} r={3.5} data-tone="warn" />
        </g>
      );
    case "signal":
      return (
        <g className="gl">
          <circle cx={0} cy={-4} r={18} />
          <circle cx={0} cy={-4} r={6} data-tone="warn" />
        </g>
      );
    case "architecture":
      return (
        <g className="gl">
          <rect x={-52} y={-14} width={20} height={20} />
          <rect x={-22} y={-14} width={20} height={20} />
          <rect x={8} y={-14} width={20} height={20} />
          <rect x={38} y={-14} width={20} height={20} />
          <path d="M-32 -4H-22M-2 -4H8M28 -4H38" />
        </g>
      );
    case "blocker":
      return (
        <g className="gl">
          <rect x={-46} y={-14} width={20} height={20} />
          <rect x={26} y={-14} width={20} height={20} />
          <path d="M-26 -4H-6" />
          <path d="M-4 -12l10 16M6 -12l-10 16" data-tone="bad" />
        </g>
      );
    case "troubleshooting":
      return (
        <g className="gl">
          <path d="M-44 -22H44M-44 -11H30M-44 0H40M-44 11H18M-44 22H34" />
        </g>
      );
    case "stakeholders":
      return (
        <g className="gl">
          <rect x={-46} y={-22} width={50} height={26} />
          <rect x={-18} y={-12} width={50} height={26} />
          <rect x={-2} y={-4} width={50} height={26} />
        </g>
      );
    case "health":
      return (
        <g className="gl">
          <path d="M-48 -20C-20 -20 -20 -4 -12 -4M-48 12C-20 12 -20 -4 -12 -4M48 -20C20 -20 20 -4 12 -4M48 12C20 12 20 -4 12 -4" />
          <circle cx={0} cy={-4} r={11} />
          <circle cx={0} cy={-4} r={4} data-tone="warn" />
        </g>
      );
    default:
      return (
        <g className="gl gl--warm">
          <circle cx={0} cy={-4} r={14} />
        </g>
      );
  }
}

/** Miniatures of every scene, connected into one loop around "This website." */
export function FinalJourneyMap({ mobile }: { mobile: boolean }) {
  const L = journeyLayout(mobile);
  const d = L.pos.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");
  return (
    <div className="fjm">
      <svg className="fjm-svg" viewBox={`0 0 ${L.vb.w} ${L.vb.h}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Miniature map of the whole journey">
        <g data-world>
          <path className="fjm-path" data-jpath d={d} fill="none" />
          {copy.ending.journey.map((j, i) => (
            <g key={j.id} className={`fjm-tile${j.id === "team" ? " is-warm" : ""}`} data-tile={i} transform={`translate(${L.pos[i].x} ${L.pos[i].y})`}>
              <rect x={-L.tw / 2} y={-L.th / 2} width={L.tw} height={L.th} />
              <Glyph id={j.id} />
              <text className="fjm-lab" textAnchor="middle" y={L.th / 2 - 10}>
                {String(i + 1).padStart(2, "0")} · {j.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <p className="fjm-center" data-center>
        {copy.ending.center}
      </p>
    </div>
  );
}
