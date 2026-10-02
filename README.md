# THE SIGNAL — first cinematic prototype

A scroll-driven microsite for Marta Lopes. Next.js 15 · React 19 · TypeScript · GSAP + ScrollTrigger · inline SVG. No Three.js, no Framer Motion, no UI kit.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Project structure

```
src/
  content/copy.ts        ← ALL copy + the PLACEHOLDERS list. Edit the story here, never in a timeline.
  lib/
    gsap.ts              plugin registration (ScrollTrigger, ScrollToPlugin)
    useScene.ts          one pinned + scrubbed timeline per scene (the core of the architecture)
    beats.ts             timeline helpers: show/hide, maskIn, draw (SVG path), packet (data along a path), typeTo
    store.ts             tiny shared store: evidence 0–4, header visibility, preloader-ready
    audio.ts             opt-in sound manager (file cues with synthesised fallback)
    useMedia.ts          useIsMobile()
  components/            Preloader, SignalHeader, StatusIndicator, InteractiveChoice, EvidenceTracker,
                         SystemNode, AnimatedConnector, DataPacket, ImplementationMap, FailureState,
                         TroubleshootingSequence, EngineeringHandoff, StakeholderChaos, ScopeController,
                         CustomerHealthEngine, RiskSignal, RelationshipStatus, TeamMoment,
                         FinalJourneyMap, SoundControl, MaskText, Experience (narrative route)
  scenes/                Act1Signal … Act10Ending — each owns its own timeline
  styles/                globals.css (tokens/primitives/reduced-motion) · components.css · scenes.css
public/audio/            drop signal|connect|error|complete|tick .mp3 here (see lib/audio.ts)
```

## Scenes implemented (full narrative route, desktop + mobile)

| Scene | Pin | State |
|---|---|---|
| Preloader | – | done (≈2 s, 3 lines, releases scroll) |
| I Signal received | 520vh | **prototype 1/4** – abstract email → 4 phrases fly out and become 4 data points → VISOR × MARTA status |
| II The choice | 180vh | A / B / C are real buttons (keyboard-accessible). C resolves; scrolling through without choosing auto-resolves C so nobody is stuck |
| III Diagnosis | 380vh | **prototype 1/4** – four signals, "evidence surfaced during interview / insufficient" |
| IV-a Case 01 build + blocker | 1150vh | **prototype 2/4** – workflow is constructed node by node, packets flow, ownership appears, API blocker hits suddenly (red), "What now?" → investigation → alternative route. Mobile is a separate vertical map with a scroll-driven camera |
| IV-b Second problem + troubleshooting | 560vh | enquiry simulation → "expected information missing" → 5-step vertical investigation |
| IV-c Handoff / fix / production | 700vh | handoff assembled field by field, the held line, retest → PASS, system reconnects, PRODUCTION, PROJECTS ○→● |
| V Case 02 decisions | 760vh | stakeholder chaos → freeze → 7-step line → "RETURN TO AGREED SCOPE" → payment overdue → DECISIONS ○→● (2/4) |
| VI Customer health | 940vh | **prototype 3/4** – 9 signals converge, ring processes, 🟢🟡🔴 cycle and settle on amber; reactive vs proactive; intervention; "nobody asked me to build this"; RESULTS ○→● (3/4) |
| VII Meta reveal | 480vh | starts inside the Customer Health tile, pulls back, lands on VISOR × MARTA / INTERVIEW FEEDBACK / amber → "Recognise this one?" → hold → "Exactly." |
| VIII Team | 620vh | hard cut to warm off-white, no dashboard language, long holds, TEAM ○→● |
| IX Resolution | 480vh | same system as Act I; 4/4; INTERVENTION COMPLETE; CLOSED / OPEN / FUTURE _ "We’ll see."; fade to black |
| X False ending + reveal | 340 + 1000vh | **prototype 4/4** – "Wait." … camera starts inside the first miniature and pulls back through all eight scenes into a loop around "This website." → six words → "You gave me feedback. I did something with it." → hero line → sign-off |

## Animation architecture

- **One scrubbed timeline per scene** (`useScene`). The section is pinned; scroll distance = timeline length. Timeline positions are plain numbers, so pacing is edited by moving numbers, not rewriting code.
- Every shot is a `[data-beat]` element; `useScene` hides them all, the timeline reveals them. Reduced-motion skips pinning/tweens entirely and CSS (`html[data-motion=reduce]`) lays the beats out as a static column.
- **Interactive moments are the same animation as scrolling.** "Investigate alternative route →" and "RETURN TO AGREED SCOPE" smooth-scroll through the relevant timeline segment (`ctx.scrollTo`) — click and scroll never fight each other, and reverse scrolling stays correct.
- State (evidence 0–4, header, audio cues) is derived from scroll *progress* in `onProgress`, never from timeline callbacks, so scrubbing backwards is safe.
- SVG data movement: `beats.packet()` drives a circle along `path.getPointAtLength()` from a proxy tween (no MotionPath plugin). `beats.draw()` handles stroke-dashoffset.
- Mobile: `useIsMobile` swaps geometry (vertical `ImplementationMap`, two-column `CustomerHealthEngine`, 2×4 `FinalJourneyMap`) and shortens pins; the implementation map pans with a camera tween.

## Unresolved technical issues / honest notes

1. **Sound** is wired (toggle, cues fired at the blocker, reconnect, pass, risk detected, completion) but there are no audio files yet — it falls back to very quiet synthesised tones. Needs real assets and a listen.
2. **Mobile is structurally redesigned for Acts I, IV-a, VI, VII and X** but the other scenes are only responsive CSS (no per-scene simplification of scrub sequences yet). Needs a real-iPhone pass (Safari URL-bar resize, `100svh`, touch scrolling feel). I only checked an emulated 390×844 viewport.
3. **"Pause" = scroll hold.** Long pauses ("Recognise this one?", "Exactly.", the team line) are timeline holds, so their real duration depends on scroll speed. If you want guaranteed seconds, those moments should become time-based auto-plays.
4. Total scroll is ≈ 94 screens at 900px. That is the "4–5 minute" budget at a moderate pace; probably worth tightening Act IV once we've watched it.
5. The Act IV-b isolate step deliberately names no root cause and the handoff shows abstract bars, not data (nothing invented).
6. Fonts load from Google Fonts at build/run via `next/font` (Instrument Sans + IBM Plex Mono). Fine online; self-host if the site must build offline.
7. No Lighthouse run yet (no throttled profile available here). First-load JS is 168 kB (gsap ≈ 70 kB of that).
8. Verified in headless Chromium only: full desktop route, 390×844 mobile on the main scenes, reduced-motion column, no console errors. Not tested: Safari, Firefox, real touch devices.

## Placeholders needing Marta’s input

All also listed in `PLACEHOLDERS` at the bottom of `src/content/copy.ts`:

- LinkedIn + Portfolio URLs (`ending.links` — currently `#…-placeholder`)
- Anonymised real team message excerpts / screenshots (`team.excerpts` — empty, so **nothing is shown**; paraphrase only)
- Exact organisational adoption wording (`health.adoption.steps`)
- A real (anonymised) property enquiry for the retest (`case1.second.query`)
- Real handoff field values (currently abstract bars)
- Descriptor wording for the construction client (`case2.client`)
- Audio files in `public/audio/`
- Data source is **not** named (Idealista/Apify abstracted as "DATA SOURCE" / "ALTERNATIVE DATA ROUTE") until legal/compliance wording is confirmed.

## Content-integrity guardrails (enforced in `copy.ts`)

No invented metrics, customers, quotes or screenshots · Marta + Developer for technical delivery · Visor never "churned" · "subsequently renewed" (no causal claim) · evidence "insufficient *surfaced*", never "lacks".

## Performance notes

Static prerender; fonts via `next/font` (swap); no video/images; SVG only. Watch: many simultaneous ScrollTriggers (13 pins) — refresh cost on resize; Act IV-a has the heaviest timeline (~150 tweens). `will-change` is limited to masked text. Next step if needed: lazy-mount scenes far from the viewport and reuse one ambient packet loop.

---

## v2 — story rewrite + more life (latest)

- **Hook first:** "Hi Catarina. / You told me what was missing. / So I did what I do with any account that sends a signal." + a thank-you, before anything abstract.
- **Act II (A/B/C) removed.** Act III is now "the four things you asked to see" (positive framing, no "insufficient").
- **Team act rewritten** without "after I left / they missed me". Its three principles are **placeholders, not facts** — replace with a real example (`team.principles` in `copy.ts`).
- **False ending removed.** Closing line: "Available for the next opportunity." + **Under the hood →** (`/under-the-hood`, plain-text cases using only facts from Marta's brief; `numbers` / `different` sections appear once filled).
- **Stronger motion:** per-act mood (base colour + drifting lights), grain, progress line, scroll cue, velocity lean on headlines, red flash + screen shake at the API blocker, shorter pacing (`PACE` in `useScene.ts`).
- Images: Unsplash reachable from the build environment, search is not. No photos used yet; backgrounds are code-generated.

## v3 — clarity pass

- Case 01 gets plain-words context screens before the diagram + "In plain words" captions while it plays.
- Centred explanatory sentences added before the construction case, the customer-health view and the second problem; small captions kept for step-level detail.
- Removed: Act II choice, false ending, final zoom-out map, fake logs/charts in troubleshooting, unlabeled squares in the retest.
- Team act now only recaps what the page already showed (confirm: it ends with "Happy to share references" — `team.closing`).
- Act IX is a "what you asked → what I showed" list, one factual line per request (`resolution.facts`; confirm the "presented to leadership" wording).
- Act VII explains the reveal: "Your feedback was a signal. I handled it the way I handle a customer signal."

## v4 — bilingual + real facts

- PT | EN toggle (saved choice, else browser language). English is the source shape (`copy.en.ts`); Portuguese in `copy.pt.ts`.
- Removed the overdue-payment segment (no outcome, read as a dispute). No client names anywhere.
- Real-estate case: small team of five (**assumed to be the client's team — confirm**), ~350 contacts/month, ~50% automated (approximate, as given).
- Construction case: ~10 people, ~700 contacts/month, nothing digitised; client approved the agreed Phase 1.
- Positioned for Implementation Specialist; close: "If another role opens, I'd love to be considered. I really liked the team and the spirit."
