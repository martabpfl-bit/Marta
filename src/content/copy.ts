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

export const copy = {
  meta: {
    title: "The Signal — Marta Lopes",
    description: "A signal was received. This is what happened next.",
  },

  preloader: {
    steps: ["INITIALISING CUSTOMER HEALTH...", "CHECKING SIGNALS...", "1 SIGNAL DETECTED"],
  },

  evidence: {
    keys: ["projects", "decisions", "results", "team"] as const,
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
    title: "SIGNAL RECEIVED",
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

  // ───────────────────────── ACT II
  act2: {
    question: "What would you do with this signal?",
    choices: [
      { id: "A", label: "Say thank you.", reply: ["Perfectly reasonable.", "But we wouldn't have a website."] },
      {
        id: "B",
        label: "Ask them to reconsider.",
        reply: ["Tempting.", "But that's not what the feedback asked for."],
      },
      { id: "C", label: "Understand it and act.", reply: ["Let’s investigate."] },
    ],
  },

  // ───────────────────────── ACT III
  act3: {
    signals: ["PROJECTS", "DECISIONS", "RESULTS", "TEAM CONTRIBUTION"],
    sub: "EVIDENCE SURFACED DURING INTERVIEW",
    status: "INSUFFICIENT",
    lines: ["I could have replied with a better explanation.", "I thought showing you would be more useful."],
    started: "INTERVENTION STARTED",
  },

  // ───────────────────────── ACT IV — CASE 01
  case1: {
    kicker: "CASE 01",
    question: "Can she own an implementation?",
    client: "REAL ESTATE CLIENT",
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
    second: {
      searching: "Searching...",
      query: "Is there anything available in this development?", // PLACEHOLDER: replace with a real (anonymised) enquiry if desired
      missing: "EXPECTED INFORMATION MISSING",
      line: "Going live isn’t the end of implementation.",
    },
    troubleshooting: [
      { n: "01", label: "REPRODUCE" },
      { n: "02", label: "INSPECT" },
      { n: "03", label: "ISOLATE" },
      { n: "04", label: "FORM A HYPOTHESIS" },
      { n: "05", label: "ESCALATE WITH CONTEXT" },
    ],
    isolate: ["DATA RETRIEVAL?", "INTEGRATION?", "PROMPT?", "RULES?"],
    handoff: {
      title: "ENGINEERING HANDOFF",
      fields: [
        "Account",
        "Conversation ID",
        "Recording",
        "Reported behaviour",
        "Expected behaviour",
        "Reproduced behaviour",
        "Findings",
        "Possible cause",
        "Additional notes",
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
      outcomes: ["Real users ✓", "Customer continued ✓", "Continuation signed before I left ✓"],
      caveat: "Some product limitations remained, including text-to-speech quality.",
    },
    found: "EVIDENCE FOUND",
  },

  // ───────────────────────── ACT V — CASE 02
  case2: {
    kicker: "CASE 02",
    opener: "Not every implementation problem is technical.",
    client: "PORTUGUESE CONSTRUCTION / BUILDING-SERVICES CLIENT", // company intentionally not named
    statements: [
      "“The process works like this.”",
      "“No, that’s not how we do it.”",
      "“We also need…”",
      "“That needs to happen first.”",
      "“Can we add…”",
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
    principle: ["A good implementation isn’t everything the customer can imagine.", "It’s knowing what needs to happen now — and what can wait."],
    returnAction: "RETURN TO AGREED SCOPE",
    commercial: {
      account: "ACCOUNT",
      overdue: "PAYMENT OVERDUE",
      duration: "2 MONTHS",
      resources: "DEVELOPMENT RESOURCES",
      active: "ACTIVE",
      ask: "What would you recommend?",
      answer:
        "After repeated attempts to reconcile the account, I recommended pausing additional Development work until payment was resolved.",
    },
  },

  // ───────────────────────── ACT VI — CUSTOMER HEALTH
  health: {
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
  },

  // ───────────────────────── ACT VIII — TEAM
  team: {
    label: "TEAM CONTRIBUTION",
    lines: [
      "There was one thing I couldn’t put on a dashboard.",
      "MID-SEPTEMBER 2026",
      "My role at Nedzo ended.",
      "After I left, former teammates reached out.",
    ],
    paraphrase: ["They told me the next meeting felt different without me.", "That the energy in the team wasn’t the same."],
    // PLACEHOLDER: anonymised real message excerpts / screenshots. Leave EMPTY until real wording is supplied.
    excerpts: [] as { text: string; attribution?: string }[],
    proud: "Of everything I contributed at Nedzo, this may be what I’m most proud of.",
  },

  // ───────────────────────── ACT IX — RESOLUTION
  resolution: {
    heading: "VISOR × MARTA",
    rows: ["PROJECTS", "DECISIONS", "RESULTS", "TEAM CONTRIBUTION"],
    complete: "INTERVENTION COMPLETE",
    status: [
      { label: "CURRENT OPPORTUNITY", value: "CLOSED" },
      { label: "RELATIONSHIP", value: "OPEN" },
    ],
    future: "FUTURE",
    typed: "We’ll see.",
  },

  // ───────────────────────── ACT X — FALSE ENDING + REVEAL
  ending: {
    falseEnding: ["Wait.", "There’s one more example.", "One project I haven’t shown you."],
    journey: [
      { id: "feedback", label: "FEEDBACK" },
      { id: "signal", label: "SIGNAL" },
      { id: "architecture", label: "ARCHITECTURE" },
      { id: "blocker", label: "API BLOCKER" },
      { id: "troubleshooting", label: "TROUBLESHOOTING" },
      { id: "stakeholders", label: "STAKEHOLDERS" },
      { id: "health", label: "HEALTH SYSTEM" },
      { id: "team", label: "TEAM" },
    ],
    center: "This website.",
    reduction: ["SIGNAL", "LISTEN", "INVESTIGATE", "UNDERSTAND", "ACT", "PRESERVE THE RELATIONSHIP"],
    lines: ["You gave me feedback.", "I did something with it."],
    hero: "I tend to start before someone asks me to.",
    thanks: "Thank you for the signal, Catarina.",
    name: "Marta Lopes",
    role: "Customer Success · Implementation · Growth",
    links: [
      // PLACEHOLDER: real URLs required.
      { label: "LinkedIn", href: "#linkedin-placeholder" },
      { label: "Portfolio", href: "#portfolio-placeholder" },
    ],
  },
} as const;

export type EvidenceKey = (typeof copy.evidence.keys)[number];

/** Items that still need Marta's input. Surfaced in the build report. */
export const PLACEHOLDERS = [
  "ending.links — LinkedIn + Portfolio URLs",
  "team.excerpts — anonymised real messages / screenshots (empty = nothing shown, nothing fabricated)",
  "health.adoption.steps — exact organisational adoption wording",
  "case1.second.query — real (anonymised) enquiry text, if desired",
  "case1.handoff.fields — real handoff values (currently abstract bars)",
  "case2.client — descriptor wording for the construction client",
  "public/audio/*.mp3 — real UI sounds (see src/lib/audio.ts for cue names)",
] as const;
