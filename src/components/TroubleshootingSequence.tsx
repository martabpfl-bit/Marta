import { copy } from "@/content/copy";

/**
 * Five-step vertical investigation. Left: the list. Right: a panel per step.
 * Log lines are generic placeholders for the *shape* of a transcript, not real data.
 */
export function TroubleshootingSequence() {
  const t = copy.case1.troubleshooting;
  const logs = ["user_message", "intent_resolved", "lookup_requested", "lookup_returned", "response_generated"];
  return (
    <div className="ts">
      <ol className="ts-steps">
        {t.map((s, i) => (
          <li key={s.n} data-step={i}>
            <span className="mono ts-n">{s.n}</span>
            <span className="ts-l">{s.label}</span>
          </li>
        ))}
      </ol>
      <div className="ts-panels">
        <div className="ts-panel" data-panel={0}>
          <div className="ts-bubble mono">{copy.case1.second.query}</div>
          <div className="ts-wave" aria-hidden="true">
            {Array.from({ length: 28 }, (_, i) => (
              <i key={i} data-bar style={{ height: `${20 + ((i * 37) % 70)}%` }} />
            ))}
          </div>
        </div>
        <div className="ts-panel" data-panel={1}>
          <ul className="ts-log mono">
            {logs.map((l, i) => (
              <li key={l} data-log={i} data-flag={l === "response_generated"}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>{l}</span>
                {l === "response_generated" && <em>fields: incomplete</em>}
              </li>
            ))}
          </ul>
        </div>
        <div className="ts-panel" data-panel={2}>
          <ul className="ts-iso">
            {copy.case1.isolate.map((x, i) => (
              <li key={x} data-iso={i} className="mono">
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="ts-panel" data-panel={3}>
          <div className="ts-hyp">
            <span className="mono">HYPOTHESIS</span>
            <i className="bar b1" />
            <i className="bar b2" />
            <i className="bar b3" />
          </div>
        </div>
        <div className="ts-panel" data-panel={4}>
          <div className="ts-esc mono">
            <span>SUPPORT</span>
            <svg viewBox="0 0 120 12" aria-hidden="true">
              <path data-esc d="M0 6H114M108 1l6 5-6 5" fill="none" />
            </svg>
            <span>ENGINEERING</span>
          </div>
        </div>
      </div>
    </div>
  );
}
