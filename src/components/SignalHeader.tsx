"use client";
import { copy } from "@/content/copy";
import { useStore } from "@/lib/store";
import { useLang } from "@/lib/useLang";
import { setLang } from "@/lib/lang";
import { SoundControl } from "./SoundControl";

/** Persistent system chrome: relationship id + the four-part evidence read-out + language + sound. */
export function SignalHeader() {
  const { evidence, chrome } = useStore((s) => s);
  const lang = useLang();
  const n = copy.evidence.keys.filter((k) => evidence[k]).length;
  return (
    <header className="sh" data-visible={chrome}>
      <span className="sh-id mono">VISOR × MARTA</span>
      <ul className="sh-ev mono" aria-label={`Evidence ${n} of 4`}>
        {copy.evidence.keys.map((k) => (
          <li key={k} data-on={evidence[k]}>
            <i aria-hidden="true" />
            <span>{copy.evidence.short[k]}</span>
          </li>
        ))}
        <li className="sh-n">{n} / 4</li>
      </ul>
      <div className="sh-right">
        <div className="lang mono" role="group" aria-label="Language">
          {(["pt", "en"] as const).map((l) => (
            <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <SoundControl />
      </div>
    </header>
  );
}
