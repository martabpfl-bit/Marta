"use client";
import { useState } from "react";
import { audio } from "@/lib/audio";

export function SoundControl() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      className="sound mono"
      aria-pressed={on}
      onClick={() => {
        audio.setEnabled(!on);
        setOn(!on);
      }}
    >
      Sound {on ? "on" : "off"}
    </button>
  );
}
