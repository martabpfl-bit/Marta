"use client";
import { copy } from "@/content/copy";
import { useStore } from "@/lib/store";
import { SoundControl } from "./SoundControl";

/** Persistent system chrome: relationship id + the four-part evidence read-out + sound. */
export function SignalHeader() {
  const { evidence, chrome } = useStore((s) => s);
  const n = copy.evidence.keys.filter((k) => evidence[k]).length;
  return (
    <header className="sh" data-visible={chrome}>
      <span className="sh-id mono">VISOR × MARTA</span>
      <ul className="sh-ev mono" aria-label={`Evidence ${n} of 4`}>
        {copy.evidence.keys.map((k) => (
          <li key={k} data-on={evidence[k]}>
            <i aria-hidden="true" />
            <span>{copy.evidence.labels[k].replace(" CONTRIBUTION", "")}</span>
          </li>
        ))}
        <li className="sh-n">{n} / 4</li>
      </ul>
      <SoundControl />
    </header>
  );
}
