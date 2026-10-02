import { copy } from "@/content/copy";

/** A one-line explanation, in everyday words, pinned to the top of a scene. Lines are revealed by the timeline. */
export function PlainWords({ id, lines }: { id: string; lines: readonly string[] }) {
  return (
    <div className="beat plain" id={id} data-beat>
      <p className="mono">{copy.ui.plainWords}</p>
      {lines.map((t) => (
        <p className="plain-t" data-plain={lines.indexOf(t)} key={t}>
          {t}
        </p>
      ))}
    </div>
  );
}
