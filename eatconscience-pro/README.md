# Eat Conscience Professional — prototype

The nutritionist’s workspace connected to the Eat Conscience consumer app. This is a **new implementation**: the earlier professional-platform source could not be recovered, and **the consumer app source was not available in this workspace**.

```
eatconscience-pro/
  index.html            Landing page for nutritionists (walnut opens on scroll)
  app/                  Workspace prototype (Today → client → brief → Care Profile → app preview)
    index.html  app.js  data.js (fictional)  styles.css
  assets/
    brand.css           Shared tokens: ivory/cream, walnut, sage, coral (Companion), Fraunces + Figtree
    nut/top.png kernel.png bottom.png   Walnut pieces (see "Motion")
    logo.svg            ← ADD the original Eat Conscience logo here (not included, not redrawn)
```

## Run it

No build step and no dependencies to install. Serve the folder with any static server and open it:

```bash
cd eatconscience-pro
python3 -m http.server 8080      # then open http://localhost:8080
```

External files loaded at runtime: Google Fonts (Fraunces, Figtree, IBM Plex Mono) and GSAP 3.12.5 + ScrollTrigger from cdnjs (landing page only). Deploy as a static site (e.g. a Vercel project with root directory `eatconscience-pro`).

## What works, what is simulated, what is missing

| Area | Status |
|---|---|
| Landing page, walnut scroll animation, responsive layout, reduced-motion support | Works |
| Sign in | **Simulated.** No authentication; any details open the demo. |
| Today: questions needing judgement, clients who may need attention, upcoming consultations, weekly summary | Works on **fictional** data. The summary is a fixed “AI draft” text, no AI call. |
| Clients: search, status filter | Works on fictional data |
| Client profile: goals, clinical context (marked restricted), active Care Profile, meals & reflections, recipe preferences, messages, changes over time | Works on fictional data; meal photos are placeholders |
| Consultation brief (working name from the docs: “Sofia Brief”) | Generated from the fictional client data; patterns and topics are pre-written examples labelled as AI drafts |
| Care Profile editor: priorities (max 3, ordered), objectives, needs, preferences, restrictions, clinical context; draft → approve with version | Works. **Saved only in this browser (localStorage).** Not synced to the app. |
| Preview of the effect on the client’s app | Illustrative phone mock: weekly focus, recipe ideas filtered by restrictions/preferences, Companion prompt. Not the real app UI. |
| Messages: inbox, “needs your judgement” filter, reply | Replies are stored locally only, nothing is delivered |
| Appointments, Events, Professional sessions | Listed as “Later”, not built (no booking/billing assumed) |
| Original logo | **Missing** — add `assets/logo.svg`; a labelled placeholder shows until then |
| Consumer app reuse (styles, auth, data structures, components) | **Not done** — the app source wasn’t available here |

## Motion

The reference is the app’s own walnut transition (screen recording, 4 Oct). In the app it is a **single photographic “exploded walnut” image** shown for about one second between the welcome screen and “Cria a tua conta”. In the recording the image is duplicated during the transition (each shell appears twice), which is the broken look.

What this prototype does instead:
- The three real pieces (top shell, kernel, bottom shell) were cut from a full-resolution frame of that recording (`assets/nut/*.png`, transparent background), so it is the app’s walnut, not a generic substitute.
- On the landing page the walnut starts closed; scrolling separates the shells vertically and reveals the kernel, with the message beside it (scrubbed by scroll with GSAP ScrollTrigger, pinned section).
- `prefers-reduced-motion`: no pinning or scrubbing; the walnut is shown open and all text is readable.

To finish properly: replace the three PNGs with cut-outs from the **original source image** in the app (the frame grab has slight compression and soft edges), and share the app’s animation code so the timing can match exactly. The workspace itself stays calm: the walnut is only on the landing page.

## Product rules built into the prototype

- No adherence scores, no red/punitive states, no calories or weight as the organising principle. Statuses are “Needs your judgement”, “Worth a check-in”, “Consultation soon”, “New connection”, “Steady”.
- AI output is labelled “AI draft · review” and patterns are labelled “possible, not conclusions”. The nutritionist approves Care Profile changes.
- Private Buddy conversations are not shown; one fictional client (Miguel) has explicitly shared one, shown as such.
- Clinical context is marked restricted and never appears in the app preview.

## Before connecting real data (to decide)

1. **Relationship**: the person invites/accepts a nutritionist from the app (code or link); either side can end it; history after ending.
2. **Consent per category**: meal photos, reflections, recipe preferences, messages, Buddy (off by default, per conversation). Revocable at any time; revocation hides past items or not.
3. **Roles & access**: nutritionist sees only connected clients; clinical context visible only to that nutritionist (and clinic colleagues only if the person agrees). Audit log of who viewed and changed what.
4. **Care Profile contract**: which fields the app reads (priorities, preferences, restrictions) and which never leave the workspace (clinical context). Versioning: the app uses the latest *approved* version only.
5. **Data protection (GDPR, health data = special category)**: legal basis (explicit consent), EU hosting, retention, data export/deletion, DPA with the nutritionist as controller or joint controller.

### Data model sketch (matches `app/data.js`)

`Professional` · `Client` (goals, clinical [restricted], sharing settings) · `CareProfile` (version, objectives, needs, preferences, restrictions, priorities[≤3], approvedBy, approvedAt) · `SharedMeal` (photo, meal, caption, reflection, date) · `RecipeSignal` (liked/saved/skipped) · `Message` (from, text, needsJudgement, answered, sharedBuddyRef) · `ChangeEvent` (date, text, source).

The consumer app sends a Supabase account confirmation from `no-reply@eatconscience.com`, so its backend appears to be Supabase. If so, the integration would use the same Supabase project with Row Level Security keyed on the client–nutritionist relationship and consent flags. Confirm against the app code.
