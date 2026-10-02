import { copy } from "@/content/copy";

/** The scope line (PHASE 1 + X + Y + Z + ...) and the control that collapses it back. */
export function ScopeController({ onReturn }: { onReturn: () => void }) {
  const { base, extras } = copy.case2.scope;
  return (
    <div className="sco">
      <p className="sco-line display" data-scope>
        <span>{base}</span>
        {extras.map((e) => (
          <span key={e} data-extra className="sco-x">
            {" + "}
            {e}
          </span>
        ))}
      </p>
      <button type="button" className="btn-line mono" data-return onClick={onReturn}>
        {copy.case2.returnAction}
      </button>
    </div>
  );
}
