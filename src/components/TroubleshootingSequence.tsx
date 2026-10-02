import { copy } from "@/content/copy";

/** Five-step investigation, in plain words. Steps light up one by one (no invented logs or charts). */
export function TroubleshootingSequence() {
  return (
    <ol className="ts">
      {copy.case1.troubleshooting.map((s, i) => (
        <li key={s.n} data-step={i}>
          <span className="mono ts-n">{s.n}</span>
          <span className="ts-l">
            {s.label}
            <small className="ts-x">{s.x}</small>
          </span>
        </li>
      ))}
    </ol>
  );
}
