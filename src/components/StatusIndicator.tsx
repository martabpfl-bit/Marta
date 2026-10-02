export type Tone = "good" | "warn" | "bad" | "neutral";

/** Semantic status only: green = resolved, amber = attention, red = blocker. Never decorative. */
export function StatusIndicator({
  tone,
  children,
  className = "",
  pulse = false,
}: {
  tone: Tone;
  children?: React.ReactNode;
  className?: string;
  pulse?: boolean;
}) {
  return (
    <span className={`si ${className}`} data-tone={tone}>
      <i className={`si-dot${pulse ? " is-pulse" : ""}`} aria-hidden="true" />
      {children}
    </span>
  );
}
