import { MaskText } from "./MaskText";

/** Large centred sentences that explain what the next visual is about. Timed by beats.insertContext(). */
export function ContextBeats({ prefix, items }: { prefix: string; items: readonly { k: string; t: string }[] }) {
  return (
    <>
      {items.map((x, i) => (
        <div className="beat" id={`${prefix}-c${i}`} data-beat key={x.k + i}>
          <p className="mono ctx-k">{x.k}</p>
          <MaskText as="p" className="h-lg ctx-t" text={x.t} />
        </div>
      ))}
    </>
  );
}
