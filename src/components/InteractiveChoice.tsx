"use client";
import { useEffect, useRef, useState } from "react";
import { copy } from "@/content/copy";

type Id = "A" | "B" | "C";

/**
 * Three genuinely clickable choices. A and B answer, pause, then return.
 * C resolves the scene (`onChoose('C')`). `forced` lets the scene resolve C if a
 * visitor scrolls straight through, so nobody is ever stuck.
 */
export function InteractiveChoice({
  onChoose,
  forced,
}: {
  onChoose: (id: Id) => void;
  forced: boolean;
}) {
  const [reply, setReply] = useState<string[]>([]);
  const [shown, setShown] = useState(0);
  const [picked, setPicked] = useState<Id | null>(null);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  const pick = (id: Id) => {
    if (picked === "C") return;
    clear();
    const c = copy.act2.choices.find((x) => x.id === id)!;
    setPicked(id);
    setReply([...c.reply]);
    setShown(1);
    if (c.reply.length > 1) timers.current.push(window.setTimeout(() => setShown(2), 1500));
    if (id === "C") return onChoose("C");
    // A / B: perfectly reasonable… then return to the choice
    timers.current.push(
      window.setTimeout(() => {
        setShown(0);
        setPicked(null);
        setReply([]);
      }, 4200),
    );
  };

  useEffect(() => {
    if (forced && picked !== "C") pick("C");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forced]);

  return (
    <div className="ic">
      <ul className="ic-list" role="group" aria-label={copy.act2.question}>
        {copy.act2.choices.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              className="ic-btn"
              data-picked={picked === c.id}
              aria-pressed={picked === c.id}
              onClick={() => pick(c.id)}
            >
              <span className="ic-id mono">{c.id}</span>
              <span className="ic-label">{c.label}</span>
              <svg className="ic-check" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M3 10.5l4.5 4.5L17 5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <div className="ic-reply" aria-live="polite">
        {reply.slice(0, shown).map((l, i) => (
          <p key={l} className={i === 0 ? "ic-r1" : "ic-r2"}>
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}
