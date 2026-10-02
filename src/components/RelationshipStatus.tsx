import { StatusIndicator, type Tone } from "./StatusIndicator";

export type RelRow = { label: string; value: string; tone?: Tone };

/** VISOR × MARTA status block. Used at the beginning (Act I) and again at the end (Act IX). */
export function RelationshipStatus({
  heading,
  rows,
  signal,
  extra,
  className = "",
}: {
  heading: string;
  rows: readonly RelRow[];
  signal?: { label: string; value: string };
  extra?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rs ${className}`}>
      <h2 className="rs-head display" data-rs-head>
        {heading}
      </h2>
      <dl className="rs-rows">
        {rows.map((r, i) => (
          <div className="rs-row" data-rs={i} key={r.label}>
            <dt className="mono">{r.label}</dt>
            <dd>{r.value}</dd>
          </div>
        ))}
        {signal && (
          <div className="rs-row rs-signal" data-rs="signal">
            <dt className="mono">{signal.label}</dt>
            <dd>
              <StatusIndicator tone="warn" pulse>
                {signal.value}
              </StatusIndicator>
            </dd>
          </div>
        )}
        {extra}
      </dl>
    </div>
  );
}
