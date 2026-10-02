"use client";
import { useRef, useState } from "react";
import { copy } from "@/content/copy";
import { useScene, type SceneCtx } from "@/lib/useScene";
import { show, maskIn } from "@/lib/beats";
import { MaskText } from "@/components/MaskText";
import { InteractiveChoice } from "@/components/InteractiveChoice";

/** ACT II — THE CHOICE. Almost nothing on screen; three real buttons. */
export function Act2Choice() {
  const [forced, setForced] = useState(false);
  const chosen = useRef(false);
  const ctxRef = useRef<SceneCtx | null>(null);

  const ref = useScene({
    vh: 180,
    build(tl, ctx) {
      ctxRef.current = ctx;
      maskIn(tl, "#a2-q", 1, 3, 0.2);
      show(tl, "#a2-c", 6, 2);
      tl.to({}, { duration: 0.001 }, 20);
    },
    onProgress(p) {
      // scrolled straight through without choosing → resolve as C so nobody is stuck
      if (p > 0.97 && !chosen.current) {
        chosen.current = true;
        setForced(true);
      }
    },
  });

  return (
    <section id="act-2" ref={ref} className="scene" aria-label="Act II — The choice">
      <div className="stage">
        <div className="beat beat--upper" id="a2-q" data-beat>
          <MaskText as="h2" className="h-xl" text={copy.act2.question} />
        </div>
        <div className="beat beat--lower" id="a2-c" data-beat>
          <InteractiveChoice
            forced={forced}
            onChoose={() => {
              chosen.current = true;
              window.setTimeout(() => ctxRef.current?.scrollTo(1, 2.2), 1500);
            }}
          />
        </div>
      </div>
    </section>
  );
}
