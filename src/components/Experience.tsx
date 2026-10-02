"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { store } from "@/lib/store";
import { useLang } from "@/lib/useLang";
import { initLang } from "@/lib/lang";
import { Preloader } from "./Preloader";
import { SignalHeader } from "./SignalHeader";
import { Ambient } from "./Ambient";
import { Momentum } from "./Momentum";
import { Act1Signal } from "@/scenes/Act1Signal";
import { Act3Diagnosis } from "@/scenes/Act3Diagnosis";
import { Act4pCase1Context } from "@/scenes/Act4pCase1Context";
import { Act4aImplementation } from "@/scenes/Act4aImplementation";
import { Act4bTroubleshooting } from "@/scenes/Act4bTroubleshooting";
import { Act4cResolution } from "@/scenes/Act4cResolution";
import { Act5Decisions } from "@/scenes/Act5Decisions";
import { Act6Health } from "@/scenes/Act6Health";
import { Act7Meta } from "@/scenes/Act7Meta";
import { Act8Team } from "@/scenes/Act8Team";
import { Act9Resolution } from "@/scenes/Act9Resolution";
import { Act10Reveal } from "@/scenes/Act10Ending";

/** Narrative route, in order. Each scene owns its own pinned, scrubbed timeline. */
export function Experience() {
  const lang = useLang();
  // pick the saved / browser language before first paint (the preloader is still covering the page)
  useLayoutEffect(() => {
    initLang();
  }, []);
  return (
    <>
      <Preloader />
      <Stage key={lang} />
    </>
  );
}

/** Everything that depends on the active language. Remounted when it changes so all copy is re-read. */
function Stage() {
  const offRef = useRef(false);
  // header chrome: visible from the diagnosis until the team scene (which removes all dashboard language)
  useLayoutEffect(() => {
    const on = ScrollTrigger.create({
      trigger: "#act-3",
      start: "top 70%",
      end: "max",
      onToggle: (self) => store.setChrome(self.isActive && !offRef.current),
    });
    const off = ScrollTrigger.create({
      trigger: "#act-8",
      start: "top 60%",
      end: "max",
      onToggle: (self) => {
        offRef.current = self.isActive;
        store.setChrome(on.isActive && !self.isActive);
      },
    });
    return () => {
      on.kill();
      off.kill();
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    ScrollTrigger.sort();
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  void gsap;
  return (
    <>
      <Ambient />
      <div className="grain" aria-hidden="true" />
      <Momentum />
      <SignalHeader />
      <main>
        <Act1Signal />
        <Act3Diagnosis />
        <Act4pCase1Context />
        <Act4aImplementation />
        <Act4bTroubleshooting />
        <Act4cResolution />
        <Act5Decisions />
        <Act6Health />
        <Act7Meta />
        <Act8Team />
        <Act9Resolution />
        <Act10Reveal />
      </main>
    </>
  );
}
