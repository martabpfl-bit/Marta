/** Three-light health read-out (SVG group). GSAP cycles the lights and settles on amber. */
export function RiskSignal({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g className="rk" transform={`translate(${x} ${y})`}>
      {(["good", "warn", "bad"] as const).map((t, i) => (
        <circle key={t} data-light={t} data-tone={t} cx={(i - 1) * 34} cy={0} r={9} />
      ))}
      <text data-risk-label textAnchor="middle" y={38}>
        {label}
      </text>
    </g>
  );
}
