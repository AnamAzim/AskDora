import { GADGETS, FACTS, INTENTS } from "./knowledge";

/* ---------- text helpers ---------- */

const STOP = new Set(
  ("a an the is are was were be been am to of in on at for and or but with about me my you your yours it its this that these those " +
    "do does did can could would should will shall what whats how tell please i im we us so if as by from there here some any get got " +
    "want need like just really very much more also which who when where why give show know let lets ok okay hey hi hello doraemon dora " +
    "thing things s t gadget gadgets").split(" ")
);

// Irregular forms -> a common stem, so "flying", "flew" and "fly" all match
const IRREGULAR = {
  flying: "fly", flies: "fly", flew: "fly", flown: "fly",
  travelling: "travel", traveling: "travel", traveled: "travel", travelled: "travel",
  studying: "study", studied: "study", remembering: "remember", remembered: "remember",
  memorizing: "memorize", memorising: "memorize", memorise: "memorize", memorized: "memorize",
  shrinking: "shrink", shrunk: "shrink", translating: "translate", translated: "translate",
  teleporting: "teleport", teleported: "teleport", eating: "eat", ate: "eat",
  bigger: "big", larger: "big", biggest: "big", smaller: "small", smallest: "small",
  younger: "young", older: "old", mice: "mouse", wings: "wing", exams: "exam", tests: "test",
  cooking: "cook", hungry: "hungry", starving: "hungry", enlarging: "enlarge"
};

function stem(word) {
  if (IRREGULAR[word]) return IRREGULAR[word];
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss") && !word.endsWith("us")) {
    return word.slice(0, -1);
  }
  return word;
}

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function tokenize(s) {
  return normalize(s)
    .split(" ")
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem);
}

const hasPhrase = (haystack, phrase) => ` ${haystack} `.includes(` ${normalize(phrase)} `);

/* ---------- index ---------- */

const ENTRIES = [
  ...GADGETS.map((g) => ({ ...g, kind: "gadget" })),
  ...FACTS.map((f) => ({ ...f, kind: "fact" }))
];

const NAME_WEIGHT = 3;
const NEED_WEIGHT = 1.6;

// The longer the exact phrase the user typed, the more specific (and trustworthy) the match.
const wordCount = (p) => normalize(p).split(" ").length;
const phraseBonus = (p) => 4 + 3 * wordCount(p);
const needPhraseBonus = (p) => 3 + 2 * wordCount(p);
const EXACT_BONUS = 12;

// token -> weight per entry; also document frequency for IDF
const df = {};
for (const e of ENTRIES) {
  e.weights = {};
  for (const p of e.names || []) for (const t of tokenize(p)) e.weights[t] = { w: NAME_WEIGHT, name: true };
  // Single-word needs match word-by-word; multi-word needs only count as a whole phrase
  for (const p of e.needs || []) {
    if (p.includes(" ")) continue;
    for (const t of tokenize(p)) if (!e.weights[t]) e.weights[t] = { w: NEED_WEIGHT, name: false };
  }
  for (const t of Object.keys(e.weights)) df[t] = (df[t] || 0) + 1;
}
const idf = (t) => Math.log(1 + ENTRIES.length / (df[t] || 1));

function scoreEntry(entry, tokens, normMsg) {
  let score = 0;
  let named = false;

  for (const t of tokens) {
    const hit = entry.weights[t];
    if (hit) {
      score += hit.w * idf(t);
      if (hit.name) named = true;
    }
  }
  for (const p of [...(entry.names || []), ...(entry.phrases || [])]) {
    if (hasPhrase(normMsg, p)) {
      score += phraseBonus(p);
      named = true;
    }
  }
  for (const p of entry.exact || []) {
    if (normMsg === normalize(p)) {
      score += EXACT_BONUS;
      named = true;
    }
  }
  for (const p of entry.needs || []) {
    if (p.includes(" ") && hasPhrase(normMsg, p)) score += needPhraseBonus(p);
  }
  return { entry, score, named };
}

const CONFIDENT = 4;
const WEAK = 1.5;

/* ---------- analysis ---------- */

export function analyze(text) {
  const lower = text.toLowerCase().trim();

  for (const intent of INTENTS) {
    if (intent.test(lower)) return { type: "intent", intent };
  }

  const tokens = [...new Set(tokenize(text))];
  const normMsg = normalize(text);
  if (tokens.length === 0 && !normMsg) return { type: "none", ranked: [] };

  const ranked = ENTRIES.map((e) => scoreEntry(e, tokens, normMsg))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  const top = ranked[0];
  if (!top || top.score < WEAK) return { type: "none", ranked };
  if (top.score < CONFIDENT) return { type: "weak", ranked, top };

  // Several topics scoring almost the same -> ask which one they meant
  const close = ranked.filter((r) => r.score >= CONFIDENT && r.score >= top.score * 0.85);
  if (close.length > 1) return { type: "ambiguous", ranked, close: close.slice(0, 3) };

  return { type: "match", ranked, top };
}

/* ---------- reply building ---------- */

const fmt = (s, name) => s.replace(/\{name\}/g, name);
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Try each list in order; return a line the bot hasn't already said in this chat
function pickFresh(lists, name, used) {
  for (const list of lists) {
    const fresh = list.map((s) => fmt(s, name)).filter((s) => !used.has(s));
    if (fresh.length) return random(fresh);
  }
  const all = lists.flat().map((s) => fmt(s, name));
  return all.length ? random(all) : null;
}

const HOW_RE = /\b(how (do|does|to|can|should)|use|using|works?|operate|activate|instructions?)\b/;
const FUN_RE = /(fun fact|trivia|interesting|did you know|something cool|something fun)/;

function replyForEntry(entry, named, message, name, used) {
  if (entry.kind === "fact") return pickFresh([entry.answers], name, used);

  const lower = message.toLowerCase();

  // They described a problem, not the gadget's name -> recommend it
  if (!named) {
    const rec = `For that, you'll want my ${entry.label}! ${entry.how[0]}`;
    const line = fmt(rec, name);
    return entry.tip ? `${line} ${fmt(entry.tip, name)}` : line;
  }
  if (FUN_RE.test(lower) && entry.fun.length) return pickFresh([entry.fun, entry.what], name, used);
  if (HOW_RE.test(lower)) return pickFresh([entry.how, entry.what, entry.fun], name, used);
  // Asking about the same thing again -> give new details instead of repeating
  return pickFresh([entry.what, entry.how, entry.fun], name, used);
}

function lastTopic(history) {
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].sender !== "user") continue;
    const a = analyze(history[i].message);
    if (a.type === "match") return a.top;
  }
  return null;
}

// "how do I use it?" / "what does that do?" -> refer back to the last topic discussed
const FOLLOW_UP_RE = /\b(it|its|that|this|them)\b/;

const FALLBACKS = [
  "My 4D Pocket came up empty on that one, {name}! I know a lot about my gadgets (Anywhere Door, Time Machine, Bamboo-copter...), my friends, and dorayaki. Want to try one of those?",
  "Hmm, I'm not sure about that, {name}. You could ask me about a gadget, one of my friends like Shizuka or Gian, or where I'm from!",
  "That's a new one for me, {name}! Try something like 'What is the Anywhere Door?' or 'I want to fly'."
];

/**
 * @param {string} text     what the user typed
 * @param {{name?: string, history?: {sender: string, message: string}[]}} ctx
 */
export default function getResponse(text, { name = "friend", history = [] } = {}) {
  const used = new Set(history.filter((m) => m.sender === "bot").map((m) => m.message));
  const a = analyze(text);

  if (a.type === "intent") {
    if (a.intent.id === "more") {
      const topic = lastTopic(history);
      if (!topic) return fmt("Tell me what you're curious about first, {name} - like a gadget or one of my friends!", name);
      const e = topic.entry;
      const pools = e.kind === "gadget" ? [e.what, e.how, e.fun] : [e.answers];
      const fresh = pools.flat().map((s) => fmt(s, name)).filter((s) => !used.has(s));
      return fresh.length ? random(fresh) : fmt("That's everything I know about the " + e.label + ", {name}! Ask me about something else?", name);
    }
    return pickFresh([a.intent.answers], name, used);
  }

  if (a.type === "match") {
    return replyForEntry(a.top.entry, a.top.named, text, name, used);
  }

  if ((a.type === "none" || a.type === "weak") && FOLLOW_UP_RE.test(text.toLowerCase())) {
    const topic = lastTopic(history);
    if (topic) return replyForEntry(topic.entry, true, text, name, used);
  }

  if (a.type === "ambiguous") {
    const labels = a.close.map((r) => r.entry.label);
    const list = labels.length === 2 ? labels.join(" or the ") : labels.slice(0, -1).join(", the ") + " or the " + labels[labels.length - 1];
    return fmt(`Do you mean the ${list}, {name}? Tell me which one and I'll explain!`, name);
  }

  if (a.type === "weak") {
    const e = a.top.entry;
    return fmt(`I'm not totally sure what you mean, {name}. Are you asking about ${e.kind === "gadget" ? "the " : ""}${e.label}? Try asking me directly, like "What is ${e.kind === "gadget" ? "the " : ""}${e.label}?"`, name);
  }

  const pool = FALLBACKS.map((s) => fmt(s, name)).filter((s) => !used.has(s));
  return random(pool.length ? pool : FALLBACKS.map((s) => fmt(s, name)));
}
