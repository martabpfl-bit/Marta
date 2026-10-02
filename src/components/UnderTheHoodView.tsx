"use client";
import { useLayoutEffect } from "react";
import { copy, underTheHood as u } from "@/content/copy";
import { initLang, setLang } from "@/lib/lang";
import { useLang } from "@/lib/useLang";

/** Plain, scannable version of the cases (bilingual). Sections for numbers / reflections only render once real content exists. */
export function UnderTheHoodView() {
  const lang = useLang();
  useLayoutEffect(() => {
    initLang();
  }, []);
  return (
    <main className="uth" key={lang}>
      <div className="uth-in">
        <div className="uth-top">
          <a className="back" href="/">
            {u.back}
          </a>
          <div className="lang lang--light mono" role="group" aria-label="Language">
            {(["pt", "en"] as const).map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <h1>{u.title}</h1>
        <p className="lede">{u.intro}</p>
        {u.cases.map((c) => (
          <section key={c.title}>
            <p className="k">{c.kicker}</p>
            <h2>{c.title}</h2>
            <h3>{copy.ui.uth.problem}</h3>
            <p>{c.problem}</p>
            <h3>{copy.ui.uth.did}</h3>
            <ul>
              {c.did.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            {c.outcome.length > 0 && (
              <>
                <h3>{copy.ui.uth.happened}</h3>
                <ul>
                  {c.outcome.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </>
            )}
            {c.numbers.length > 0 && (
              <>
                <h3>{copy.ui.uth.numbers}</h3>
                <ul>
                  {c.numbers.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </>
            )}
            {c.different && (
              <>
                <h3>{copy.ui.uth.different}</h3>
                <p>{c.different}</p>
              </>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
