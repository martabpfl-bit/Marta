/* Eat Conscience Professional — prototype workspace.
   Vanilla JS, hash routing, fictional data from data.js.
   Edits are kept only in this browser (localStorage) and are NOT synchronised with the Eat Conscience app. */
(() => {
  const D = window.EC_DATA;
  const KEY = "ec-pro-prototype-v1";
  const root = document.getElementById("root");
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const clone = (o) => JSON.parse(JSON.stringify(o));

  /* ---------- state: fictional data + this browser's prototype edits ---------- */
  const saved = (() => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; } })();
  const clients = clone(D.clients).map((c) => (saved[c.id] ? { ...c, ...saved[c.id] } : c));
  const persist = (c) => {
    saved[c.id] = { care: c.care, messages: c.messages, changes: c.changes, briefReviewed: c.briefReviewed };
    try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch {}
  };
  const byId = (id) => clients.find((c) => c.id === id);
  const recipe = (id) => D.recipes.find((r) => r.id === id);
  let drafts = {}; // unsaved Care Profile edits per client
  let msgFilter = "judgement", clientFilter = "all", clientQuery = "";

  /* ---------- helpers ---------- */
  const fmt = (d) => { if (!d) return "—"; const x = new Date(d.slice(0, 10) + "T12:00:00"); return x.toLocaleDateString("en-GB", { day: "numeric", month: "short" }); };
  const dayDiff = (d) => Math.round((new Date(d + "T12:00:00") - new Date(D.today + "T12:00:00")) / 864e5);
  const when = (d) => { const n = dayDiff(d); return n === 0 ? "Today" : n === 1 ? "Tomorrow" : fmt(d); };
  const STATUS = {
    attention: { label: "Needs your judgement", cls: "amber" },
    checkin: { label: "Worth a check-in", cls: "line" },
    consult: { label: "Consultation soon", cls: "" },
    new: { label: "New connection", cls: "coral" },
    steady: { label: "Steady", cls: "line" },
  };
  const statusTag = (c) => `<span class="tag ${STATUS[c.status].cls}">${STATUS[c.status].label}</span>`;
  const av = (c, lg) => `<span class="av${lg ? " lg" : ""}" style="background:${c.tone}">${esc(c.initials)}</span>`;
  const openQuestions = () => clients.flatMap((c) => c.messages.filter((m) => m.from === "client" && m.judgement && !m.answered).map((m) => ({ c, m })));
  const toast = (t) => { const el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("on"), 3200); };
  const logo = () => `<a class="logo" href="#/today" aria-label="Eat Conscience Professional"><img src="../assets/logo.svg" alt="Eat Conscience" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'placeholder',innerHTML:'Eat Conscience <i>logo</i>'}))" /></a>`;

  /* ---------- layout ---------- */
  const shell = (active, body) => {
    const q = openQuestions().length;
    const nav = [["today", "Today", ""], ["clients", "Clients", ""], ["messages", "Messages", q ? `<span class="count">${q}</span>` : ""]];
    return `<div class="shell">
      <aside class="side">
        <div>${logo()}<div class="eyebrow" style="margin-top:6px;color:var(--sage)">Professional</div></div>
        <nav aria-label="Workspace">
          ${nav.map(([k, l, x]) => `<a href="#/${k}" ${active === k ? 'aria-current="page"' : ""}>${l}${x}</a>`).join("")}
          <span class="sep">Later</span>
          <span class="later">Appointments <i>Later</i></span><span class="later">Events <i>Later</i></span><span class="later">Professional sessions <i>Later</i></span>
        </nav>
        <div class="me"><span class="av">${D.professional.initials}</span><div><b>${esc(D.professional.name)}</b><br /><small>${esc(D.professional.role)} · fictional</small></div></div>
      </aside>
      <div class="main">
        <div class="banner"><b>Prototype</b> · all clients and data are fictional · edits stay in this browser and are <b>not</b> synced with the Eat Conscience app</div>
        <div class="page">${body}</div>
      </div>
    </div>`;
  };

  /* ---------- views ---------- */
  const viewLogin = () => `<div class="login">
    <div class="art">
      <div>${logo()}<div class="eyebrow" style="margin-top:6px;color:#b9c7ad">Professional</div></div>
      <!-- Motion slot: the Eat Conscience app's own animation goes here once its source or a recording is supplied (see README). -->
      <div class="motion-slot" id="appMotion" aria-hidden="true"></div>
      <h2>Care that continues <em>between consultations.</em></h2>
      <p style="color:rgba(248,244,236,.7);max-width:40ch">The workspace for nutritionists connected to the Eat Conscience app.</p>
    </div>
    <form id="loginForm">
      <p class="eyebrow">Sign in</p>
      <h1 class="serif" style="font-weight:400;font-size:2rem;letter-spacing:-.02em">Welcome back.</h1>
      <label>Email<input type="email" id="email" value="ana.ribeiro@example.com" autocomplete="username" /></label>
      <label>Password<input type="password" id="pw" value="prototype" autocomplete="current-password" /></label>
      <button class="btn dark" type="submit" style="justify-content:center">Sign in</button>
      <p class="note">Prototype: no real account or authentication. Any details open the demo workspace with fictional clients.</p>
      <a class="note" href="../">← Back to the website</a>
    </form>
  </div>`;

  const viewToday = () => {
    const attention = clients.filter((c) => c.status === "attention" || c.status === "checkin");
    const appts = clients.filter((c) => c.nextAppointment && dayDiff(c.nextAppointment.date) >= 0 && dayDiff(c.nextAppointment.date) <= 1).sort((a, b) => (a.nextAppointment.date + a.nextAppointment.time).localeCompare(b.nextAppointment.date + b.nextAppointment.time));
    const qs = openQuestions();
    const shared = clients.reduce((n, c) => n + (c.mealsCount || 0), 0);
    return shell("today", `
      <div class="head"><div><p class="eyebrow">${new Date(D.today + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</p><h1>Good morning, <em>${esc(D.professional.name.split(" ").pop())}.</em></h1><p>${qs.length} question${qs.length === 1 ? "" : "s"} for your judgement · ${appts.length} consultation${appts.length === 1 ? "" : "s"} today or tomorrow</p></div></div>
      <div class="cols">
        <div>
          <div class="block"><h2>Questions for your judgement <small>Clients asked; the app didn’t answer</small></h2>
            <div class="rows">${qs.length ? qs.map(({ c, m }) => `<a class="rowi" href="#/client/${c.id}/messages">${av(c)}<div><div class="t">${esc(c.name)}</div><div class="s">“${esc(m.text)}”</div></div><span class="when">${when(m.date.slice(0, 10))}</span></a>`).join("") : `<p class="empty">No open questions. Nice.</p>`}</div>
          </div>
          <div class="block"><h2>May need your attention <small>Context, not a score</small></h2>
            <div class="rows">${attention.map((c) => `<a class="rowi" href="#/client/${c.id}">${av(c)}<div><div class="t">${esc(c.name)}</div><div class="s">${esc(c.patterns[0])}</div></div>${statusTag(c)}</a>`).join("") || `<p class="empty">Nobody needs attention right now.</p>`}</div>
          </div>
        </div>
        <div>
          <div class="block"><h2>Upcoming consultations</h2>
            <div class="rows">${appts.map((c) => `<a class="rowi" href="#/client/${c.id}/brief" style="grid-template-columns:64px 1fr auto"><span class="time">${c.nextAppointment.time}</span><div><div class="t">${esc(c.name)}</div><div class="s">${when(c.nextAppointment.date)} · ${esc(c.nextAppointment.kind)}</div></div><span class="tag">${c.briefReviewed ? "Brief reviewed" : "Brief ready"}</span></a>`).join("") || `<p class="empty">No consultations today or tomorrow.</p>`}</div>
          </div>
          <div class="block panel summary"><h2>This week <span class="draft">AI draft · review</span></h2>
            <p>Clients shared ${shared} meal moments and several reflections. Rui’s workday breakfasts became more regular; Inês reports feeling better on runs when she eats beforehand. Carla has been quieter after a busy-work message. Sofia starts tomorrow.</p>
            <p class="note">Organised from what clients chose to share. Possible patterns, not conclusions. Private Buddy conversations are never included.</p>
          </div>
        </div>
      </div>`);
  };

  const viewClients = () => {
    const list = clients.filter((c) => (clientFilter === "all" || c.status === clientFilter) && c.name.toLowerCase().includes(clientQuery.toLowerCase()));
    const f = [["all", "All"], ["attention", "Needs your judgement"], ["checkin", "Worth a check-in"], ["consult", "Consultation soon"], ["new", "New"], ["steady", "Steady"]];
    return shell("clients", `
      <div class="head"><div><p class="eyebrow">${clients.length} clients · fictional</p><h1>Clients</h1></div></div>
      <div class="tools">
        <label class="search"><span aria-hidden="true">⌕</span><input id="q" type="search" placeholder="Search by name" value="${esc(clientQuery)}" aria-label="Search clients" /></label>
        <div class="seg" role="group" aria-label="Filter by status">${f.map(([k, l]) => `<button type="button" data-filter="${k}" aria-pressed="${clientFilter === k}">${l}</button>`).join("")}</div>
      </div>
      <div class="tablewrap"><table class="table">
        <thead><tr><th>Client</th><th>Status</th><th class="hide-s">Current priority</th><th class="hide-s">Next consultation</th></tr></thead>
        <tbody>${list.map((c) => `<tr data-go="#/client/${c.id}" tabindex="0"><td><div class="who">${av(c)}<div><b>${esc(c.name)}</b><span class="muted">${esc(c.statusNote)}</span></div></div></td><td>${statusTag(c)}</td><td class="hide-s">${esc(c.care.priorities[0] || "Not set yet")}</td><td class="hide-s">${c.nextAppointment ? `${when(c.nextAppointment.date)} · ${c.nextAppointment.time}` : "—"}</td></tr>`).join("") || `<tr><td colspan="4" class="empty">No clients match.</td></tr>`}</tbody>
      </table></div>`);
  };

  const tabs = (c, active) => {
    const t = [["", "Overview"], ["care", "Care Profile"], ["meals", "Meals & reflections"], ["recipes", "Recipes"], ["messages", "Messages"], ["changes", "Changes over time"]];
    return `<nav class="tabs" aria-label="Client sections">${t.map(([k, l]) => `<a href="#/client/${c.id}${k ? "/" + k : ""}" ${active === k ? 'aria-current="page"' : ""}>${l}</a>`).join("")}</nav>`;
  };
  const chips = (arr, cls = "") => arr.length ? `<div class="chipset">${arr.map((x) => `<span class="tag ${cls}">${esc(x)}</span>`).join("")}</div>` : `<span class="muted">Not set</span>`;

  const viewClient = (c, tab) => {
    let body = "";
    if (tab === "") {
      body = `<div class="cols">
        <div>
          <div class="panel"><dl class="kv">
            <dt>Goals</dt><dd>${chips(c.goals)}</dd>
            <dt>Clinical context</dt><dd>${esc(c.clinical)} <span class="tag lock line" style="margin-left:6px">Restricted</span></dd>
            <dt>Connected since</dt><dd>${fmt(c.since)}</dd>
            <dt>Last consultation</dt><dd>${fmt(c.lastConsult)}</dd>
            <dt>Shares with you</dt><dd>${chips(Object.entries(c.sharing).filter(([k, v]) => v && k !== "buddy").map(([k]) => ({ meals: "Meal photos", reflections: "Reflections", recipes: "Recipe preferences" })[k]))}${c.sharing.buddy ? ` <span class="tag coral" style="margin-top:6px">Shared one Buddy conversation</span>` : ` <p class="note">Buddy conversations are private unless ${esc(c.name.split(" ")[0])} chooses to share one.</p>`}</dd>
          </dl></div>
          <div class="block"><h2>Possible patterns <span class="draft">AI · not conclusions</span></h2><ul class="rows">${c.patterns.map((p) => `<li class="rowi" style="grid-template-columns:1fr">${esc(p)}</li>`).join("")}</ul></div>
        </div>
        <div>
          <div class="panel"><h2 class="serif" style="font-weight:500;font-size:1.15rem;display:flex;justify-content:space-between;gap:8px">Active Care Profile <small class="muted" style="font-family:var(--sans);font-size:12.5px;font-weight:400">${c.care.version ? `v${c.care.version} · ${fmt(c.care.updated)}` : "Not created yet"}</small></h2>
            <dl class="kv" style="grid-template-columns:110px 1fr;margin-top:12px"><dt>Priorities</dt><dd>${chips(c.care.priorities)}</dd><dt>Objectives</dt><dd>${chips(c.care.objectives, "line")}</dd><dt>Restrictions</dt><dd>${chips(c.care.restrictions, "line")}</dd></dl>
            <a class="btn small" style="margin-top:14px" href="#/client/${c.id}/care">Edit Care Profile</a>
          </div>
          <div class="panel"><h2 class="serif" style="font-weight:500;font-size:1.15rem">Latest changes</h2><ul class="timeline" style="margin-top:6px">${c.changes.slice(0, 3).map((x) => `<li><time>${fmt(x.date)}</time><span>${esc(x.text)}</span></li>`).join("")}</ul></div>
        </div>
      </div>`;
    } else if (tab === "care") {
      body = careEditor(c);
    } else if (tab === "meals") {
      body = `<p class="muted" style="margin-bottom:14px">${c.mealsCount} meal moments and ${c.reflectionsCount} reflections shared since connecting. Photos are placeholders in the prototype.</p>
        <div class="meals">${c.meals.map((m) => `<article class="meal"><div class="ph">${esc(m.caption)}<small>Photo placeholder</small></div><div class="bd"><span class="eyebrow">${fmt(m.date)} · ${esc(m.meal)}</span>${m.reflection ? `<q>${esc(m.reflection)}</q>` : `<p class="muted" style="margin-top:6px">No reflection added</p>`}</div></article>`).join("")}</div>`;
    } else if (tab === "recipes") {
      const grp = (ids, title) => `<div class="block"><h2>${title}</h2><div class="rows">${ids.length ? ids.map((id) => { const r = recipe(id); return `<div class="rowi" style="grid-template-columns:1fr auto"><div><div class="t">${esc(r.name)}</div><div class="s">${esc(r.meal)} · ${r.mins} min</div></div><div class="chipset">${r.tags.slice(0, 3).map((t) => `<span class="tag line">${esc(t)}</span>`).join("")}</div></div>`; }).join("") : `<p class="empty">Nothing yet.</p>`}</div></div>`;
      body = c.sharing.recipes ? grp(c.recipes.liked, "Liked") + grp(c.recipes.saved, "Saved for later") + grp(c.recipes.skipped, "Skipped") : `<p class="empty">${esc(c.name.split(" ")[0])} hasn’t chosen to share recipe preferences.</p>`;
    } else if (tab === "messages") {
      body = `<div class="thread">${c.messages.slice().reverse().map((m) => `<div class="msg ${m.from === "pro" ? "pro" : ""}">${m.judgement && !m.answered ? `<span class="tag amber" style="margin-bottom:6px">Needs your judgement</span><br />` : ""}${esc(m.text)}${m.sharedBuddy ? `<div class="panel" style="margin-top:10px;background:var(--blush);border:0"><span class="eyebrow" style="color:var(--coral)">Buddy conversation shared by ${esc(c.name.split(" ")[0])}</span><p style="margin-top:6px">“Evenings are when stress hits. Eating earlier seems to help me not graze.” <span class="muted">(fictional excerpt)</span></p></div>` : ""}<small>${m.from === "pro" ? "You" : esc(c.name.split(" ")[0])} · ${esc(m.date)}</small></div>`).join("") || `<p class="empty">No messages yet.</p>`}</div>
        <form class="compose" id="reply" data-id="${c.id}"><textarea id="replyText" placeholder="Reply to ${esc(c.name.split(" ")[0])}…" aria-label="Reply"></textarea><button class="btn dark" type="submit">Send</button></form>
        <p class="note">Prototype: replies stay in this browser. Nothing is delivered to the client.</p>`;
    } else if (tab === "changes") {
      body = `<ul class="timeline">${c.changes.map((x) => `<li><time>${fmt(x.date)}</time><span>${esc(x.text)}</span></li>`).join("")}</ul><p class="note">Changes are described in words. Weight and calories aren’t the organising principle here.</p>`;
    }
    return shell("clients", `
      <a class="crumb" href="#/clients">← Clients</a>
      <div class="profile-head">${av(c, true)}<div><h1>${esc(c.name)}</h1><div class="chipset" style="margin-top:6px">${statusTag(c)}<span class="tag line">${c.age} years</span>${c.nextAppointment ? `<span class="tag line">Next: ${when(c.nextAppointment.date)} · ${c.nextAppointment.time}</span>` : ""}</div></div>
        <div class="profile-actions"><a class="btn dark" href="#/client/${c.id}/brief">Consultation brief</a><a class="btn" href="#/client/${c.id}/messages">Message</a></div></div>
      ${tabs(c, tab)}${body}`);
  };

  const viewBrief = (c) => {
    const since = c.lastConsult ? fmt(c.lastConsult) : "connecting";
    const quotes = c.meals.filter((m) => m.reflection).slice(0, 3);
    const qs = c.messages.filter((m) => m.from === "client" && m.judgement && !m.answered);
    return shell("clients", `
      <a class="crumb" href="#/client/${c.id}">← ${esc(c.name)}</a>
      <div class="head"><div><p class="eyebrow">Consultation brief · ${c.nextAppointment ? `${when(c.nextAppointment.date)} ${c.nextAppointment.time} · ${esc(c.nextAppointment.kind)}` : ""}</p><h1>${esc(c.name.split(" ")[0])}, <em>since ${since}.</em></h1></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="draft" style="align-self:center">AI draft · review before use</span><button class="btn ${c.briefReviewed ? "" : "dark"}" type="button" id="reviewBrief" data-id="${c.id}">${c.briefReviewed ? "Reviewed ✓" : "Mark as reviewed"}</button></div></div>
      <div class="brief">
        <div class="panel">
          <section><h2>What happened</h2><ul><li>Shared ${c.mealsCount} meal moments and ${c.reflectionsCount} reflections.</li>${c.changes.slice(0, 2).map((x) => `<li>${esc(x.text)}</li>`).join("")}</ul></section>
          <section><h2>In ${esc(c.name.split(" ")[0])}’s words</h2>${quotes.length ? quotes.map((m) => `<blockquote>“${esc(m.reflection)}” <span class="muted" style="font-family:var(--sans);font-style:normal;font-size:12px">· ${fmt(m.date)}</span></blockquote>`).join("") : `<p class="muted">No reflections shared yet.</p>`}</section>
          <section><h2>Possible patterns</h2><ul>${c.patterns.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></section>
          <section><h2>Open questions</h2>${qs.length ? `<ul>${qs.map((m) => `<li>“${esc(m.text)}”</li>`).join("")}</ul>` : `<p class="muted">None waiting.</p>`}</section>
          <section><h2>Suggested topics</h2><ul>${c.topics.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></section>
        </div>
        <aside>
          <div class="panel"><h2 class="serif" style="font-weight:500;font-size:1.05rem">Current Care Profile</h2><dl class="kv" style="grid-template-columns:1fr;gap:4px;margin-top:10px"><dt>Priorities</dt><dd>${chips(c.care.priorities)}</dd><dt>Restrictions</dt><dd>${chips(c.care.restrictions, "line")}</dd><dt>Clinical context</dt><dd>${esc(c.clinical)}</dd></dl><a class="btn small" style="margin-top:12px" href="#/client/${c.id}/care">Update after the session</a></div>
          <div class="panel"><p class="note" style="margin:0">Built only from what ${esc(c.name.split(" ")[0])} chose to share. Private Buddy conversations are not included${c.sharing.buddy ? ", except the one they shared with you" : ""}. You decide what’s clinically relevant.</p></div>
        </aside>
      </div>`);
  };

  /* ---------- Care Profile editor + effect preview ---------- */
  const FIELDS = [
    ["priorities", "Current priorities", "Up to 3, in order. The app leads with the first."],
    ["objectives", "Objectives", ""],
    ["needs", "Needs", ""],
    ["preferences", "Preferences", "e.g. vegetarian, quick to prepare"],
    ["restrictions", "Restrictions", "e.g. lactose intolerance, gluten-free"],
  ];
  const getDraft = (c) => (drafts[c.id] ||= { ...clone(c.care), clinical: c.clinical });

  const appPreview = (c, care) => {
    const first = c.name.split(" ")[0];
    const lc = (a) => a.join(" ").toLowerCase();
    const restr = lc(care.restrictions), pref = lc(care.preferences), prio = lc(care.priorities.slice(0, 1));
    let pool = D.recipes.filter((r) => !(restr.includes("lactose") && r.dairy) && !(restr.includes("gluten") && r.gluten));
    if (pref.includes("vegan")) pool = pool.filter((r) => r.tags.includes("vegan"));
    else if (pref.includes("vegetarian")) pool = pool.filter((r) => r.tags.includes("vegetarian"));
    const score = (r) => (prio.includes("breakfast") && r.meal === "breakfast" ? 3 : 0) + (/(dinner|weeknight)/.test(prio) && r.meal === "dinner" ? 3 : 0) + (/(training|run)/.test(prio) && r.tags.includes("pre-training") ? 3 : 0) + (/(protein|filling)/.test(prio + lc(care.needs)) && r.tags.includes("protein") ? 2 : 0) + ((pref.includes("quick") || /(weeknight|busy|simple)/.test(prio)) && r.mins <= 15 ? 1 : 0) + (lc(care.needs).includes("iron") && /(lentil|chickpea|spinach|tofu)/i.test(r.name) ? 1 : 0);
    const recs = pool.slice().sort((a, b) => score(b) - score(a)).slice(0, 3);
    const p = care.priorities[0];
    return `<div class="phone" aria-label="Preview of the client's app"><div class="screen">
      <p class="eyebrow">Eat Conscience app · preview</p>
      <p class="hi">Good morning, ${esc(first)}.</p>
      ${p ? `<div class="focus"><small>This week’s focus · from your nutritionist</small><b>${esc(p)}</b></div>` : `<div class="focus" style="background:var(--cream)"><small>No focus set</small><b>Explore recipes you enjoy</b></div>`}
      <p class="eyebrow">Ideas for you</p>
      ${recs.map((r) => `<div class="rec"><i></i><div><b style="font-weight:600;font-size:13px">${esc(r.name)}</b><small>${esc(r.meal)} · ${r.mins} min</small></div></div>`).join("") || `<p class="muted">No recipes match these restrictions in the sample set.</p>`}
      <div class="companion"><small>Companion</small>${p ? `${esc(first)}, want a small idea that helps with “${esc(p.toLowerCase())}” tomorrow?` : `Tell me what a normal day looks like and I’ll suggest something easy.`}</div>
    </div></div><p class="preview-note">Illustrative preview of how approved priorities could shape the app. Not connected to the real app.</p>`;
  };

  const diffList = (c, d) => {
    const out = [];
    FIELDS.forEach(([k, l]) => {
      d[k].filter((x) => !c.care[k].includes(x)).forEach((x) => out.push(`<li class="plus">${l}: ${esc(x)}</li>`));
      c.care[k].filter((x) => !d[k].includes(x)).forEach((x) => out.push(`<li class="minus">${l}: ${esc(x)}</li>`));
    });
    if (d.priorities[0] !== c.care.priorities[0] && d.priorities.length) out.push(`<li class="plus">The app’s weekly focus becomes “${esc(d.priorities[0])}”</li>`);
    if (d.clinical !== c.clinical) out.push(`<li class="plus">Clinical context updated (restricted, never shown in the app)</li>`);
    return out;
  };

  const careEditor = (c) => {
    const d = getDraft(c);
    const changes = diffList(c, d);
    const chipEdit = (k) => `${d[k].map((x, i) => `<span class="chip-edit">${esc(x)}<button type="button" data-rm="${k}" data-i="${i}" aria-label="Remove ${esc(x)}">×</button></span>`).join(" ")}`;
    const field = ([k, l, h]) => k === "priorities"
      ? `<div class="fieldset"><span class="lbl">${l}<span class="hint">${h}</span></span><ol class="prio">${d.priorities.map((x, i) => `<li><b>${i + 1}</b><span>${esc(x)}</span><span class="ctl"><button type="button" data-up="${i}" aria-label="Move up" ${i === 0 ? "disabled" : ""}>↑</button><button type="button" data-rm="priorities" data-i="${i}" aria-label="Remove">×</button></span></li>`).join("")}</ol>
         ${d.priorities.length < 3 ? `<form class="add" data-add="priorities"><input placeholder="Add a priority" aria-label="Add a priority" /><button class="btn small" type="submit">Add</button></form>` : `<p class="note">Three priorities maximum, so the app stays focused.</p>`}</div>`
      : `<div class="fieldset"><span class="lbl">${l}<span class="hint">${h}</span></span><div class="chipset">${chipEdit(k) || `<span class="muted">None</span>`}</div><form class="add" data-add="${k}"><input placeholder="Add ${l.toLowerCase()}" aria-label="Add ${l.toLowerCase()}" /><button class="btn small" type="submit">Add</button></form></div>`;
    return `<div class="editor">
      <div>
        <p class="muted">Active: ${c.care.version ? `v${c.care.version}, approved ${fmt(c.care.updated)}` : "no Care Profile yet"}. Your edits are a draft until you approve them.</p>
        ${FIELDS.map(field).join("")}
        <div class="fieldset"><label for="clin">Relevant clinical context <span class="tag lock line">Restricted · never shown in the app</span></label><textarea class="clin" id="clin">${esc(d.clinical)}</textarea></div>
        <div class="block"><h2>What changes for ${esc(c.name.split(" ")[0])} <small>${changes.length ? `${changes.length} change${changes.length > 1 ? "s" : ""}` : "No changes yet"}</small></h2>${changes.length ? `<ul class="diff">${changes.join("")}</ul>` : ""}</div>
        <div class="savebar"><button class="btn" type="button" id="discard" ${changes.length ? "" : "disabled"}>Discard draft</button><button class="btn sage" type="button" id="approve" data-id="${c.id}" ${changes.length ? "" : "disabled"}>Approve as v${c.care.version + 1}</button></div>
      </div>
      <div>${appPreview(c, d)}</div>
    </div>`;
  };

  const viewMessages = () => {
    const all = clients.flatMap((c) => c.messages.filter((m) => m.from === "client").map((m) => ({ c, m })))
      .filter(({ m }) => msgFilter === "all" || (m.judgement && !m.answered))
      .sort((a, b) => b.m.date.localeCompare(a.m.date));
    return shell("messages", `
      <div class="head"><div><p class="eyebrow">Messages</p><h1>Messages</h1><p>Questions that need professional judgement are separated from everyday notes.</p></div></div>
      <div class="seg" role="group" aria-label="Filter messages" style="margin-bottom:12px"><button type="button" data-mfilter="judgement" aria-pressed="${msgFilter === "judgement"}">Needs your judgement</button><button type="button" data-mfilter="all" aria-pressed="${msgFilter === "all"}">All messages</button></div>
      <div class="rows">${all.map(({ c, m }) => `<a class="rowi" href="#/client/${c.id}/messages">${av(c)}<div><div class="t">${esc(c.name)} ${m.judgement && !m.answered ? `<span class="tag amber" style="margin-left:6px">Needs your judgement</span>` : ""}${m.sharedBuddy ? `<span class="tag coral" style="margin-left:6px">Shared Buddy chat</span>` : ""}</div><div class="s">${esc(m.text)}</div></div><span class="when">${when(m.date.slice(0, 10))}</span></a>`).join("") || `<p class="empty">Nothing here.</p>`}</div>`);
  };

  /* ---------- router ---------- */
  const signedIn = () => { try { return sessionStorage.getItem("ec-pro-signed-in") === "1"; } catch { return true; } };
  const render = () => {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    if (!signedIn() && parts[0] !== "login") { location.replace("#/login"); return; }
    let html;
    if (parts[0] === "login") html = viewLogin();
    else if (parts[0] === "clients") html = viewClients();
    else if (parts[0] === "messages") html = viewMessages();
    else if (parts[0] === "client" && byId(parts[1])) html = parts[2] === "brief" ? viewBrief(byId(parts[1])) : viewClient(byId(parts[1]), parts[2] || "");
    else html = viewToday();
    root.innerHTML = html;
    const h1 = root.querySelector("h1"); if (h1) document.title = h1.textContent + " — Eat Conscience Professional";
  };
  const rerenderKeepScroll = () => { const y = scrollY; render(); scrollTo(0, y); };
  addEventListener("hashchange", () => { render(); scrollTo(0, 0); });

  /* ---------- events ---------- */
  root.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (f.id === "loginForm") { try { sessionStorage.setItem("ec-pro-signed-in", "1"); } catch {} location.hash = "#/today"; return; }
    if (f.id === "reply") {
      const c = byId(f.dataset.id), t = $("#replyText").value.trim(); if (!t) return;
      c.messages.forEach((m) => { if (m.from === "client") m.answered = true; });
      c.messages.unshift({ from: "pro", date: D.today + " now", text: t });
      persist(c); rerenderKeepScroll(); toast("Saved in the prototype · not delivered to the client"); return;
    }
    if (f.dataset.add) {
      const c = byId(location.hash.split("/")[2]), d = getDraft(c), v = f.querySelector("input").value.trim();
      if (v && !d[f.dataset.add].includes(v)) d[f.dataset.add].push(v);
      rerenderKeepScroll(); const again = root.querySelector(`form[data-add="${f.dataset.add}"] input`); again && again.focus();
    }
  });
  root.addEventListener("input", (e) => {
    if (e.target.id === "q") { clientQuery = e.target.value; const pos = e.target.selectionStart; render(); const q = $("#q"); q.focus(); q.setSelectionRange(pos, pos); }
  });
  root.addEventListener("change", (e) => {
    if (e.target.id === "clin") { const c = byId(location.hash.split("/")[2]); getDraft(c).clinical = e.target.value; rerenderKeepScroll(); }
  });
  root.addEventListener("click", (e) => {
    const t = e.target.closest("button, tr[data-go]"); if (!t) return;
    if (t.dataset.go) { location.hash = t.dataset.go; return; }
    if (t.dataset.filter) { clientFilter = t.dataset.filter; render(); return; }
    if (t.dataset.mfilter) { msgFilter = t.dataset.mfilter; render(); return; }
    const id = location.hash.split("/")[2];
    if (t.dataset.rm) { const d = getDraft(byId(id)); d[t.dataset.rm].splice(+t.dataset.i, 1); rerenderKeepScroll(); return; }
    if (t.dataset.up) { const d = getDraft(byId(id)), i = +t.dataset.up; [d.priorities[i - 1], d.priorities[i]] = [d.priorities[i], d.priorities[i - 1]]; rerenderKeepScroll(); return; }
    if (t.id === "discard") { delete drafts[id]; rerenderKeepScroll(); toast("Draft discarded"); return; }
    if (t.id === "approve") {
      const c = byId(t.dataset.id), d = getDraft(c);
      const { clinical, ...care } = d;
      c.care = { ...care, version: c.care.version + 1, updated: D.today }; c.clinical = clinical;
      c.changes.unshift({ date: D.today, text: `Care Profile v${c.care.version} approved by you (prototype).` });
      delete drafts[c.id]; persist(c); rerenderKeepScroll();
      toast(`Care Profile v${c.care.version} approved in the prototype · not sent to the app`); return;
    }
    if (t.id === "reviewBrief") { const c = byId(t.dataset.id); c.briefReviewed = !c.briefReviewed; persist(c); rerenderKeepScroll(); }
  });
  root.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.matches("tr[data-go]")) location.hash = e.target.dataset.go; });

  render();
})();
