import { copy } from "@/content/copy";

/**
 * Handoff form. Field labels are real; values are abstract bars on purpose
 * (no invented conversation IDs / findings). Each field ticks when GSAP reaches it.
 */
export function EngineeringHandoff() {
  const h = copy.case1.handoff;
  return (
    <div className="eh">
      <p className="eh-title mono">{h.title}</p>
      <ul>
        {h.fields.map((f, i) => (
          <li key={f} data-field={i}>
            <span className="eh-tick" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path data-tick d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" />
              </svg>
            </span>
            <span className="eh-f">{f}</span>
            <i className="eh-bar" style={{ width: `${30 + ((i * 29) % 45)}%` }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
