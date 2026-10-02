import { copy } from "@/content/copy";

/** The blocker readout. Appears suddenly; red is reserved for exactly this kind of moment. */
export function FailureState() {
  const b = copy.case1.blocker;
  return (
    <div className="fs" data-fail role="alert">
      <span className="fs-k mono">{b.api}</span>
      <span className="fs-load mono" data-fs-load>
        {b.loading}
      </span>
      <span className="fs-denied" data-fs-denied>
        {b.denied}
      </span>
    </div>
  );
}
