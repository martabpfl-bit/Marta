/** A path GSAP can draw (`draw()`), recolour, or run packets along. */
export function AnimatedConnector({
  id,
  d,
  className = "",
}: {
  id: string;
  d: string;
  className?: string;
}) {
  return <path className={`ac ${className}`} data-conn={id} d={d} fill="none" />;
}
