"use client";
import { useState } from "react";
import { audio } from "@/lib/audio";
import { copy } from "@/content/copy";

export function SoundControl() {
  const [on, setOn] = useState(audio.isEnabled());
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
      {on ? copy.ui.soundOn : copy.ui.soundOff}
    </button>
  );
}
