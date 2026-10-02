import { copy, type EvidenceKey } from "@/content/copy";

/**
 * Four-row diagnostic board. Dots are hollow rings with a fill that GSAP scales 0 → 1
 * (`[data-fill="projects"]` etc). `filled` sets the initial state for return visits.
 * Wording is about *evidence surfaced*, never about competence.
 */
export function EvidenceTracker({
  filled = [],
  detail = false,
  statusText = copy.act3.status,
  className = "",
}: {
  filled?: EvidenceKey[];
  detail?: boolean;
  statusText?: string;
  className?: string;
}) {
  const count = filled.length;
  return (
    <div className={`et ${className}`} role="group" aria-label="Evidence tracker">
      <ul className="et-list">
        {copy.evidence.keys.map((k) => (
          <li key={k} className="et-row" data-row={k}>
            <span className="et-dot" aria-hidden="true">
              <i className="et-ring" />
              <i className="et-fill" data-fill={k} data-on={filled.includes(k)} />
            </span>
            <span className="et-label">{copy.evidence.labels[k]}</span>
            {detail && (
              <>
                <span className="et-sub mono" data-sub>
                  {copy.act3.sub}
                </span>
                <span className="et-status mono" data-status={k}>
                  {statusText}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
      <p className="et-count mono" data-count>
        <span data-count-n>{count}</span> / 4
      </p>
    </div>
  );
}
