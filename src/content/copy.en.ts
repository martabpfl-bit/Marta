/**
 * THE SIGNAL — central copy & configuration.
 *
 * Every visible string lives here so the story can be edited without
 * touching any GSAP timeline. Anything that needs Marta's input is tagged
 * with `// PLACEHOLDER:` and collected in the `PLACEHOLDERS` list at the bottom.
 *
 * Content-integrity rules (do not break when editing):
 *  - no invented metrics, customer names, quotes or technical ownership
 *  - Marta worked alongside developers; she did not code the technical solution
 *  - Visor never "churned"; the feedback is warm, actionable, not a grievance
 *  - "subsequently renewed" is intentional; no causal claim
 *  - Idealista / Apify are NOT named until legal wording is confirmed
 */

export const en = {
  meta: {
    title: "The Signal — Marta Lopes",
    description: "A signal was received. This is what happened next.",
  },

  preloader: {
    steps: ["INITIALISING CUSTOMER HEALTH...", "CHECKING SIGNALS...", "1 SIGNAL DETECTED"],
  },

  ui: {
    plainWords: "In plain words",
    live: "LIVE · HEALTHY",
    howIWork: "How I work",
    scroll: "Scroll",
    account: "ACCOUNT",
    soundOn: "Sound on",
    soundOff: "Sound off",
    uth: { problem: "The problem", did: "What I did", happened: "What happened", numbers: "Numbers", different: "What I would do differently" },
  },

  evidence: {
    keys: ["projects", "decisions", "results", "team"] as const,
    short: { projects: "PROJECTS", decisions: "DECISIONS", results: "RESULTS", team: "TEAM" },
    labels: {
      projects: "PROJECTS",
      decisions: "DECISIONS",
      results: "RESULTS",
      team: "TEAM CONTRIBUTION",
    },
  },

  // ───────────────────────── ACT I
  act1: {
    date: "02 OCT 2026",
    title: "Hi Catarina.",
    hook: ["You told me what was missing.", "So I did what I do with any account that sends a signal."],
    thanks: "First: thank you. Feedback that specific is a gift.",
    signalTitle: "SIGNAL RECEIVED",
    email: {
      from: "From: Catarina",
      org: "Visor.ai",
      // Abstract email: only the four feedback themes are surfaced, never the full message.
      themes: ["concrete projects", "decisions", "results", "how you contribute to a team"],
    },
    relationship: {
      heading: "VISOR × MARTA",
      rows: [
        { label: "CURRENT OPPORTUNITY", value: "CLOSED", tone: "neutral" as const },
        { label: "RELATIONSHIP", value: "OPEN", tone: "good" as const },
      ],
      signal: { label: "SIGNAL", value: "ACTIONABLE FEEDBACK" },
    },
  },

  // ───────────────────────── ACT III
  act3: {
    signals: ["PROJECTS", "DECISIONS", "RESULTS", "TEAM CONTRIBUTION"],
    intro: "The four things you asked to see.",
    introSub: "I’ll tick them off at the top of the screen as we go.",
    sub: "YOU ASKED TO SEE THIS",
    status: "LET ME SHOW YOU",
    lines: ["I could have replied with a better explanation.", "I thought showing you would be more useful."],
    started: "STARTING NOW",
  },

  // ───────────────────────── ACT IV — CASE 01
  case1: {
    kicker: "CASE 01",
    question: "Can she own an implementation?",
    client: "REAL ESTATE CLIENT",
    // Plain-words context shown BEFORE the diagram. Every line is a fact Marta confirmed.
    context: [
      { k: "THE CLIENT", t: "A small real estate company, a team of five. Around 350 contacts a month on WhatsApp and by phone. Answering each one by hand was slow, and interest went cold." },
      { k: "THE GOAL", t: "An AI agent that answers instantly, finds out if the person is serious, and books a visit." },
      { k: "WHO DID WHAT", t: "I brought the client in and ran discovery, requirements, testing and training. The technical build, I did with a developer." },
      { k: "NOW WATCH IT GET BUILT", t: "A lead writes. The agent answers, checks the available properties, and books a visit with the sales team." },
    ],
    // One-line captions shown while the diagram plays ("in plain words").
    plain: [
      "A lead writes. The agent answers, checks the properties, and books a visit.",
      "Every enquiry follows this path, in seconds.",
      "The agent needs the list of available properties. The listing portal doesn’t give us access to its data (no API). Without it, the agent can’t answer.",
      "I looked at the options and proposed an alternative route to the developers.",
      "It worked. The agent answers with real data again.",
    ],
    need: "Respond to property enquiries and convert qualified interest into action.",
    nodes: [
      { id: "lead", label: "LEAD" },
      { id: "channel", label: "VOICE / WHATSAPP" },
      { id: "agent", label: "AI AGENT" },
      { id: "property", label: "PROPERTY INFORMATION" },
      { id: "qualification", label: "QUALIFICATION" },
      { id: "calendar", label: "CALENDAR" },
      { id: "sales", label: "SALES TEAM" },
    ],
    agentLogic: ["Which development?", "Which property?", "More information needed?", "Ready to visit?"],
    ready: ["CHECK AVAILABILITY", "BOOK"],
    ownership: [
      "Client originated by Marta",
      "Sales / discovery",
      "Requirements",
      "Client communication",
      "Testing",
      "Training",
    ],
    technicalDelivery: { label: "Technical delivery", value: "Marta + Developer" },
    blocker: {
      source: "DATA SOURCE",
      api: "API ACCESS",
      loading: "loading…",
      denied: "DENIED",
      statement: "The original implementation path was no longer available.",
      what: "What now?",
      action: "Investigate alternative route →",
      // Do NOT name the real source/provider here until legal/compliance wording is confirmed.
      altLabel: "ALTERNATIVE DATA ROUTE",
    },
    ctx2: [
      { k: "AFTER GO-LIVE", t: "I stayed the client’s point of contact: a weekly meeting and a shared Slack channel. I also kept using the product myself. Fixes and improvements came from the client’s reports and from what I spotted." },
      { k: "ONE EXAMPLE", t: "A customer asked about a property. The agent’s answer was missing information it should have had." },
      { k: "HOW I TALK TO THE TEAM", t: "Every time something needed fixing or improving, I wrote it up the same way, in Linear and Slack, so the team could act on it fast." },
    ],
    plain2: [
      "After launch, a customer asked about a property. The agent’s answer was missing information it should have had.",
      "Before writing to the team, I prepared every issue the same way:",
    ],
    plain3: [
      "I wrote it up in Linear and Slack, with everything the team needed in one place.",
      "Engineering made the fix. I tested the same question again.",
    ],
    second: {
      searching: "Searching...",
      query: "Is there anything available in this development?", // PLACEHOLDER: replace with a real (anonymised) enquiry if desired
      missing: "EXPECTED INFORMATION MISSING",
      line: "After go-live, I stayed the client’s voice.",
    },
    troubleshooting: [
      { n: "01", label: "REPRODUCE", x: "I ran the same question again, to see it happen." },
      { n: "02", label: "INSPECT", x: "I read the conversation log." },
      { n: "03", label: "ISOLATE", x: "I narrowed down where it could be failing." },
      { n: "04", label: "FORM A HYPOTHESIS", x: "I formed a theory about the cause." },
      { n: "05", label: "ESCALATE WITH CONTEXT", x: "I sent it to the team in Linear and Slack with everything they needed." },
    ],
    isolate: ["DATA RETRIEVAL?", "INTEGRATION?", "PROMPT?", "RULES?"],
    handoff: {
      title: "ENGINEERING HANDOFF",
      fields: [
        "Client and IDs",
        "Link to the conversation",
        "What happened",
        "What was expected",
        "My findings",
        "The likely problem",
        "What I already tried",
        "Why it didn’t fix it",
      ],
      // The field *values* are intentionally abstract bars — real content is not supplied.
      quote: ["I didn’t want to forward problems.", "I wanted to make them easier to solve."],
    },
    fix: {
      deployed: "CHANGE DEPLOYED",
      retesting: "RETESTING",
      returned: "EXPECTED DATA RETURNED",
      pass: "PASS ✓",
    },
    production: {
      title: "PRODUCTION",
      outcomes: ["Real users ✓", "About half of the ~350 monthly contacts handled automatically ✓", "The client continued after the 3-month pilot ✓"],
      caveat: "",
    },
    found: "EVIDENCE FOUND",
  },

  // ───────────────────────── ACT V — CASE 02
  case2: {
    kicker: "CASE 02",
    opener: "Not every implementation problem is technical.",
    client: "PORTUGUESE CONSTRUCTION CLIENT", // company intentionally not named
    statements: [
      "“The process works like this.”",
      "“No, that’s not how we do it.”",
      "“We also need…”",
      "“That needs to happen first.”",
      "“Can we add…”",
    ],
    ctxA: [
      { k: "THE CLIENT", t: "A construction company in the north of Portugal. About ten people and around 700 contacts a month. Nothing was shared between them: everyone did their own thing, and nothing was digitised." },
      { k: "THE PROBLEM", t: "Everyone wanted something different. The scope kept growing." },
    ],
    plain: [
      "Everyone wanted something different, and the project kept growing: Phase 1 became Phase 1 + X + Y + Z…",
      "When that happens, I follow the same steps every time.",
      "Back to what was agreed: Phase 1. The rest can wait.",
    ],
    scope: { base: "PHASE 1", extras: ["X", "Y", "Z", "..."] },
    process: [
      "LISTEN",
      "IDENTIFY THE DECISION",
      "RIGHT PEOPLE",
      "PROPOSE A WORKABLE PATH",
      "CONFIRM",
      "DOCUMENT",
      "REVISIT IF NEEDED",
    ],
    principle: ["A good implementation isn’t everything the customer can imagine.", "It’s knowing what has to happen first, and what’s feasible. Part of my job is teaching the client both."],
    returnAction: "RETURN TO AGREED SCOPE",
  },

  // ───────────────────────── ACT V-b — NOBODY ASKED ME (growth). Figures are approximate, as Marta gave them.
  growth: {
    a: [
      { k: "ON MY OWN", t: "The team wanted clients beyond the US. Nobody asked me to try Portugal. I did." },
      { k: "THE WORK", t: "LinkedIn content, and direct conversations with up to 20 people a day, until LinkedIn’s message limit stopped me." },
    ],
    limit: [
      { k: "AN HONEST LIMIT", t: "For the Portuguese market, voice quality (speech-to-text and text-to-speech) was the limit. Prompts couldn’t fix it. The team met and agreed the model was still weak for Portuguese." },
    ],
    resultsIntro: [{ k: "THE RESULTS", t: "What came out of those decisions." }],
    stats: [
      { n: 20, pre: "", suf: "/day", l: "people contacted on LinkedIn, at my busiest" },
      { n: 33, pre: "~", suf: "%", l: "became a meaningful conversation" },
      { n: 20, pre: "~", suf: "", l: "meetings booked in two months" },
    ],
    b: [
      { k: "BEYOND LINKEDIN", t: "I found a Customer Success summit, reached out to people who implement this, and invited two speakers onto our podcast. They came." },
      { k: "PARTNERS", t: "I also spoke with agencies and consultants. Some of them brought us good potential clients." },
      { k: "HONESTLY", t: "I started in the summer holidays. Conversations went well; closing was slow. A few big prospects reached advanced stages." },
      { k: "THE HEALTH VIEW", t: "The customer health view was approved for use, and a customer I flagged subsequently renewed." },
      { k: "THE RESULT", t: "And that’s what led to my promotion." },
    ],
  },

  // ───────────────────────── ACT VI — CUSTOMER HEALTH
  health: {
    intro: [{ k: "ON MY OWN", t: "Some decisions nobody asked me to make. I made them on my own. The first: knowing about a problem before the customer tells me." }],
    open: ["What if the customer doesn’t tell you they’re unhappy?", "What if you could notice first?"],
    signals: [
      "Usage",
      "Desired outcomes",
      "Appointments",
      "Automation performance",
      "Transcripts",
      "Sentiment",
      "Customer communication",
      "Lifecycle stage",
      "Renewal proximity",
    ],
    ctxA: [{ k: "THE IDEA", t: "Nine signals about each customer, combined into one health status: green, yellow or red." }],
    ctxB: [{ k: "AN EXAMPLE", t: "On one account that turned yellow, I didn’t wait for the customer to complain." }],
    plain: [
      "I built a view that combines nine signals about each customer into one health status: green, yellow or red.",
      "On one account that turned yellow:",
    ],
    engine: "CUSTOMER HEALTH",
    risk: "RISK DETECTED",
    reactive: { title: "REACTIVE", steps: ["Customer complains", "Investigate", "Respond"] },
    proactive: { title: "PROACTIVE", steps: ["Signal changes", "Investigate", "Prepare solution", "Reach out"] },
    quote: "I didn’t want “How is everything going?” to be how I discovered something was wrong.",
    intervention: [
      "ACCOUNT",
      "INVESTIGATE",
      "ADDITIONAL ATTENTION",
      "PROACTIVE OUTREACH",
      "SOLUTIONS PROPOSED",
      "CUSTOMER SUBSEQUENTLY RENEWED",
    ],
    adoption: {
      line: "Nobody asked me to build this.",
      // PLACEHOLDER: confirm exact organisational adoption wording before launch.
      steps: ["First version built proactively", "Presented to leadership", "Approved for implementation/use"],
    },
  },

  // ───────────────────────── ACT VII — META
  meta7: {
    relationship: "VISOR × MARTA",
    input: "INPUT",
    inputValue: "INTERVIEW FEEDBACK",
    recognise: "Recognise this one?",
    exactly: "Exactly.",
    why: ["Your feedback was a signal.", "I handled it the way I handle a customer signal. This whole page is that process."],
  },

  // ───────────────────────── ACT VIII — TEAM
  team: {
    label: "TEAM CONTRIBUTION",
    lines: ["There was one thing I couldn’t put on a dashboard.", "How I work with a team."],
    // Grounded in what the page already showed (all confirmed by Marta) — no new claims.
    recap: [
      "I built the technical solution together with a developer.",
      "I sent problems to engineering with full context.",
      "I took decisions to the right people.",
    ],
    closing: "Implementations don’t succeed alone.",
    excerpts: [] as { text: string; attribution?: string }[],
  },

  // ───────────────────────── ACT IX — RESOLUTION
  resolution: {
    heading: "WHAT YOU ASKED → WHAT I SHOWED",
    relHeading: "VISOR × MARTA",
    // One factual line per request. All from Marta's brief; "approved" wording is flagged in PLACEHOLDERS.
    facts: {
      projects: "AI agent for a small real estate team: about half of ~350 monthly contacts automated. Built with a developer, in production, and the client continued after the 3-month pilot.",
      decisions: "Taught a construction client what is priority and what is feasible. On my own initiative: a customer health view, and opening the Portuguese market.",
      results: "About a third of my outreach became real conversations, ~20 meetings in two months, partners and a podcast: I was promoted. The health view was approved and a flagged customer subsequently renewed.",
      team: "Problems sent to engineering with full context. Solutions built together with a developer.",
    },
    rows: ["PROJECTS", "DECISIONS", "RESULTS", "TEAM CONTRIBUTION"],
    complete: "INTERVENTION COMPLETE",
    status: [
      { label: "CURRENT OPPORTUNITY", value: "CLOSED" },
      { label: "RELATIONSHIP", value: "OPEN" },
    ],
    future: "FUTURE",
    typed: "If another role opens, I’d love to be considered.",
  },

  // ───────────────────────── ACT X — FALSE ENDING + REVEAL
  ending: {
    reduction: ["SIGNAL", "LISTEN", "INVESTIGATE", "UNDERSTAND", "ACT", "PRESERVE THE RELATIONSHIP"],
    lines: ["You gave me feedback.", "I did something with it."],
    hero: "I tend to start before someone asks me to.",
    thanks: "Thank you for the signal, Catarina.",
    like: "I really liked the team and the spirit.",
    name: "Marta Lopes",
    role: "Implementation Specialist · Customer Success",
    underTheHood: { label: "Under the hood →", href: "/under-the-hood" },
    links: [
      // PLACEHOLDER: real URLs required.
      { label: "LinkedIn", href: "#linkedin-placeholder" },
      { label: "Portfolio", href: "https://marta-lopes.vercel.app" },
    ],
  },
} as const;

/** Items that still need Marta's input. Surfaced in the build report. */
export const PLACEHOLDERS = [
  "ending.links — LinkedIn URL (hidden until a real https:// URL is set)",
  "team.excerpts — anonymised real messages / screenshots, only with consent (empty = nothing shown)",
  "underTheHood — real tools, timelines, results and a short \"what I would do differently\" per case",
  "health.adoption.steps — exact organisational adoption wording",
  "case1.second.query — real (anonymised) enquiry text, if desired",
  "case1.handoff.fields — real handoff values (currently abstract bars)",
  "case1.context[0] — \"a team of five\" assumed to be the real-estate client's team (confirm)",
  "case2 — what the client approved, and the scope problem you mentioned (not used yet)",
  "public/audio/*.mp3 — real UI sounds (see src/lib/audio.ts for cue names)",
] as const;

/** Under-the-hood page. Only facts from Marta's own brief. Add `numbers` / `different` when real data exists. */
export const underTheHoodEn = {
  title: "Under the hood",
  intro: "The same cases, without the animation. What the problem was, what I did, what happened.",
  cases: [
    {
      kicker: "CASE 01 · PROJECTS",
      title: "AI agent for a small real estate team",
      problem: "Respond to property enquiries (voice / WhatsApp) and convert qualified interest into action.",
      did: [
        "Originated the client; ran sales / discovery, requirements, client communication, testing and training.",
        "Technical delivery together with a developer.",
        "When access to the original data source was lost, I investigated alternatives and we moved to a different data route.",
        "After go-live I stayed the client’s point of contact: a weekly meeting and a shared Slack channel.",
        "When an enquiry returned incomplete information, I reproduced it, inspected the conversation, isolated the possibilities and wrote it up for the team in Linear and Slack: client and IDs, link to the conversation, what happened, what was expected, my findings, the likely problem, what I had already tried and why it didn’t fix it.",
      ],
      outcome: ["Real users in production.", "About half of the contacts handled automatically.", "The client continued after the 3-month pilot."],
      numbers: ["About 350 contacts a month (approximate).", "About 50% of them handled automatically (approximate)."],
      different: "", // PLACEHOLDER: what you would do differently
    },
    {
      kicker: "CASE 02 · DECISIONS",
      title: "Getting a team to agree on scope, construction client",
      problem: "A team of about ten people, around 700 contacts a month, nothing shared or digitised, and everyone with a different idea of the process and of what the project should include.",
      did: [
        "Listened, identified the actual decision, brought in the right people, proposed a workable path, confirmed it and documented it.",
        "Returned the project to the agreed Phase 1 and kept the rest for later.",
      ],
      outcome: ["The client approved the agreed Phase 1."],
      numbers: [] as string[],
      different: "",
    },
    {
      kicker: "CASE 02b · DECISIONS",
      title: "An honest limit",
      problem: "For the Portuguese market, voice quality (speech-to-text and text-to-speech) was the limit.",
      did: ["Prompts couldn’t fix it. The team met and we agreed the model was still weak for Portuguese."],
      outcome: [] as string[],
      numbers: [] as string[],
      different: "",
    },
    {
      kicker: "CASE 03 · RESULTS",
      title: "Opening the Portuguese market, before anyone asked",
      problem: "The team wanted clients beyond the US. Nobody had asked me to try Portugal.",
      did: [
        "Created LinkedIn content and ran direct outreach (up to ~20 conversations a day, within LinkedIn’s message limits), to people on our target list and others.",
        "Found a Customer Success summit, reached out to people who implement this, and invited two speakers onto our podcast. They came.",
        "Spoke with agencies and consultants; some brought us good potential clients.",
      ],
      outcome: ["About a third of the conversations became meaningful ones.", "About 20 meetings booked in two months, more booked for later.", "A few big prospects reached advanced stages (I started in the summer holidays, so closing was slow).", "This is what led to my promotion."],
      numbers: [] as string[],
      different: "",
    },
    {
      kicker: "CASE 04 · RESULTS",
      title: "A customer health view, built before anyone asked",
      problem: "I didn’t want “How is everything going?” to be how I found out something was wrong.",
      did: [
        "Combined signals (usage, desired outcomes, appointments, automation performance, transcripts, sentiment, communication, lifecycle stage, renewal proximity) into one health read-out.",
        "On an account flagged yellow: investigated, gave it extra attention, reached out proactively and proposed solutions.",
        "Built the first version on my own initiative, presented it to leadership, and it was approved.", // PLACEHOLDER: confirm exact adoption wording
      ],
      outcome: ["The customer subsequently renewed."],
      numbers: [] as string[],
      different: "",
    },
  ],
  back: "← Back to the story",
} as const;
