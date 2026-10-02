/** A small moving dot (placed by beats.packet). */
export function DataPacket({ id, tone = "neutral" }: { id: string; tone?: "neutral" | "good" | "warn" | "bad" }) {
  return <circle className="dp" data-packet={id} data-tone={tone} r={4.5} cx={0} cy={0} />;
}
