/** SVG node: a hard-edged box, mono label, tiny index. Placed by ImplementationMap. */
export function SystemNode({
  id,
  label,
  x,
  y,
  w = 128,
  h = 54,
  index,
}: {
  id: string;
  label: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  index?: string;
}) {
  const lines = label.length > 14 && label.includes(" ") ? splitLabel(label) : [label];
  return (
    <g className="sn" data-node={id} transform={`translate(${x} ${y})`}>
      <rect className="sn-box" x={-w / 2} y={-h / 2} width={w} height={h} />
      {index && (
        <text className="sn-idx" x={-w / 2 + 6} y={-h / 2 + 12}>
          {index}
        </text>
      )}
      <text className="sn-label" textAnchor="middle" y={lines.length > 1 ? 2 : 6}>
        {lines.map((l, i) => (
          <tspan key={l} x={0} dy={i === 0 ? 0 : 13}>
            {l}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function splitLabel(s: string) {
  const parts = s.split(" ");
  const mid = Math.ceil(parts.length / 2);
  return [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")];
}
