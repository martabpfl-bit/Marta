import { copy } from "@/content/copy";

/**
 * Reserved slot for anonymised real message excerpts / screenshots.
 * Renders NOTHING until `copy.team.excerpts` is filled — we never fabricate quotations.
 */
export function TeamMoment() {
  const ex = copy.team.excerpts;
  if (!ex.length) return null;
  return (
    <ul className="tm" data-excerpts>
      {ex.map((e, i) => (
        <li key={i}>
          <blockquote>{e.text}</blockquote>
          {e.attribution && <cite>{e.attribution}</cite>}
        </li>
      ))}
    </ul>
  );
}
