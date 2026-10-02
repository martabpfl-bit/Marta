import type { Metadata } from "next";
import { underTheHood as u } from "@/content/copy";

export const metadata: Metadata = { title: "Under the hood — Marta Lopes", robots: { index: false, follow: false } };

/** Plain, scannable version of the cases. Sections for numbers / reflections only render once real content exists. */
export default function UnderTheHood() {
  return (
    <main className="uth">
      <div className="uth-in">
        <a className="back" href="/">
          {u.back}
        </a>
        <h1>{u.title}</h1>
        <p className="lede">{u.intro}</p>
        {u.cases.map((c) => (
          <section key={c.title}>
            <p className="k">{c.kicker}</p>
            <h2>{c.title}</h2>
            <h3>The problem</h3>
            <p>{c.problem}</p>
            <h3>What I did</h3>
            <ul>
              {c.did.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            {c.outcome.length > 0 && (
              <>
                <h3>What happened</h3>
                <ul>
                  {c.outcome.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </>
            )}
            {c.numbers.length > 0 && (
              <>
                <h3>Numbers</h3>
                <ul>
                  {c.numbers.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </>
            )}
            {c.different && (
              <>
                <h3>What I would do differently</h3>
                <p>{c.different}</p>
              </>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
