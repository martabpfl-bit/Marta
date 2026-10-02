import type { ElementType } from "react";

/** Splits text into masked words so GSAP can reveal them (see beats.maskIn). */
export function MaskText({
  text,
  as: Tag = "h2",
  className = "",
  id,
}: {
  id?: string;
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag id={id} className={`mt ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="mt-w">
            <span className="mt-i">{w}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
