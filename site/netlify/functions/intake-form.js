const RECIPIENT = process.env.NOTIFY_EMAIL || "hello@netherlabs.ai";
const FORM_NAME = process.env.NETLIFY_INTAKE_FORM_NAME || "workflow-diagnostic";
const MAX_BODY_BYTES = 16_384;
const DEFAULT_TIMEOUT_MS = 6000;
const DEFAULT_MAX_ATTEMPTS = 2;

const BLOCK_PATTERNS = [
  /\beos\b/i, /\bvaulta\b/i, /\benf\b/i, /\beos network\b/i, /\beos nation\b/i,
  /\bspam\b/i, /\bscam\b/i, /\brug pull\b/i, /\bpump and dump\b/i,
  /\bget rich quick\b/i, /\bclick here\b/i, /\bunsubscribe\b/i,
  /\bsue you\b/i, /\blawsuit\b/i, /\bi will (sue|prosecute|harm|kill) you\b/i,
];

const FLAG_PATTERNS = [/\bkill\b/i, /\bhate\b/i, /\bthreat\b/i, /\blegal action\b/i];

export async function handler(event, context = {}) {
  if (event.httpMethod === "OPTIONS") return response(204, "", { Allow: "POST, OPTIONS" });
  if (event.httpMethod !== "POST") return json(405, { success: false, message: "Method not allowed." }, { Allow: "POST, OPTIONS" });

  const contentType = header(event.headers, "content-type");
  if (contentType && !contentType.toLowerCase().startsWith("application/json")) {
    return json(415, { success: false, message: "Content type must be application/json." });
  }

  if (Buffer.byteLength(event.body || "", "utf8") > MAX_BODY_BYTES) {
    return json(413, { success: false, message: "Request body is too large." });
  }

  const parsed = parsePayload(event.body);
  if (!parsed.ok) return json(400, { success: false, message: "Invalid JSON payload." });

  const validation = validatePayload(parsed.data);
  if (!validation.ok) return json(validation.statusCode, { success: false, message: validation.message });

  const fields = normalizeFields(parsed.data);
  const classification = classifySubmission(fields);
  if (classification.blocked) return json(202, { success: false, message: "The intake request was not routed to the inquiry sink." });

  const sink = await deliverToNetlifyForms(fields, classification, {
    fetchImpl: context.fetch || globalThis.fetch,
    env: context.env || process.env,
  });

  if (!sink.ok) {
    console.error("[intake-form] sink delivery failed", JSON.stringify({ status: sink.status || null, attempts: sink.attempts, code: sink.code }));
    return json(502, { success: false, message: "The intake sink did not acknowledge the submission." });
  }

  console.info("[intake-form] request acknowledged", JSON.stringify({
    company_present: Boolean(fields.company), workflow_present: Boolean(fields.workflow),
    flagged_for_review: classification.flagged, attempts: sink.attempts,
  }));
  return json(200, { success: true, message: "Form submission received.", recipient: RECIPIENT, sink: "netlify-forms" });
}

export function parsePayload(body) {
  try { return { ok: true, data: JSON.parse(body || "{}") }; }
  catch { return { ok: false }; }
}

export function validatePayload(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return { ok: false, statusCode: 400, message: "Invalid JSON payload." };
  const required = ["name", "email", "challenge"];
  const missing = required.filter((field) => !String(data[field] || "").trim());
  if (missing.length) return { ok: false, statusCode: 422, message: `Missing required fields: ${missing.join(", ")}` };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) return { ok: false, statusCode: 422, message: "Invalid email address." };
  const limits = { name: 120, email: 254, company: 200, timing: 32, workflow: 300, challenge: 4000, source: 32 };
  for (const [field, limit] of Object.entries(limits)) {
    if (String(data[field] || "").length > limit) return { ok: false, statusCode: 422, message: `Field is too long: ${field}` };
  }
  if (!["Now", "This quarter", "Exploring"].includes(String(data.timing || "This quarter"))) {
    return { ok: false, statusCode: 422, message: "Invalid timing value." };
  }
  if (!["contact-page", "homepage-drawer"].includes(String(data.source || ""))) {
    return { ok: false, statusCode: 422, message: "Invalid source value." };
  }
  return { ok: true };
}

export function normalizeFields(data) {
  return {
    name: String(data.name || "").trim(), email: String(data.email || "").trim(),
    company: String(data.company || "").trim(), timing: String(data.timing || "This quarter").trim(),
    workflow: String(data.workflow || "").trim(), challenge: String(data.challenge || "").trim(),
    source: String(data.source || "").trim(), recipient: RECIPIENT,
  };
}

export function classifySubmission(fields) {
  const text = Object.values(fields).join(" ");
  if (BLOCK_PATTERNS.some((pattern) => pattern.test(text))) return { blocked: true, flagged: false, matchedPatterns: [] };
  const matchedPatterns = FLAG_PATTERNS.filter((pattern) => pattern.test(text)).map(String);
  return { blocked: false, flagged: matchedPatterns.length > 0, matchedPatterns };
}

export async function deliverToNetlifyForms(fields, classification, options = {}) {
  const env = options.env || process.env;
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  const endpoint = resolveFormsEndpoint(env);
  const attemptsAllowed = boundedInteger(env.INTAKE_SINK_RETRY_ATTEMPTS, DEFAULT_MAX_ATTEMPTS, 1, 3);
  const timeoutMs = boundedInteger(env.INTAKE_SINK_TIMEOUT_MS, DEFAULT_TIMEOUT_MS, 1000, 10000);
  if (!endpoint) return { ok: false, attempts: 0, code: "sink_missing" };

  const body = new URLSearchParams({
    "form-name": FORM_NAME, "bot-field": "", name: fields.name, email: fields.email,
    company: fields.company, timing: fields.timing, workflow: fields.workflow,
    challenge: fields.challenge, source: fields.source, recipient: RECIPIENT,
    flagged_for_review: String(classification.flagged),
    flagged_patterns: classification.matchedPatterns.join(", "), brief: buildBrief(fields),
  });

  let lastStatus = null;
  for (let attempt = 1; attempt <= attemptsAllowed; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const result = await fetchImpl(endpoint, {
        method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(), redirect: "manual", signal: controller.signal,
      });
      lastStatus = result.status;
      if (result.status >= 200 && result.status < 300) return { ok: true, status: result.status, attempts: attempt, code: "acknowledged" };
    } catch {
      lastStatus = null;
    } finally {
      clearTimeout(timer);
    }
  }
  return { ok: false, status: lastStatus, attempts: attemptsAllowed, code: "sink_unavailable" };
}

export function resolveFormsEndpoint(env = {}) {
  for (const candidate of [env.NETLIFY_FORMS_SUBMISSION_URL, env.URL, env.DEPLOY_PRIME_URL, env.DEPLOY_URL]) {
    if (!candidate) continue;
    try {
      const url = new URL(candidate);
      if (url.protocol !== "https:") continue;
      if (url.hostname !== "netherlabs.ai" && !url.hostname.endsWith(".netlify.app")) continue;
      url.pathname = "/";
      url.search = "";
      url.hash = "";
      return url.toString();
    } catch { continue; }
  }
  return null;
}

function buildBrief(fields) {
  return [
    "NETHER LABS | WORKFLOW DIAGNOSTIC REQUEST", "", `Name: ${fields.name}`,
    `Work email: ${fields.email}`, `Company: ${fields.company || "Not provided"}`,
    `Timing: ${fields.timing}`, `Workflow or process: ${fields.workflow || "Not provided"}`,
    `Source: ${fields.source}`, "", "What makes this workflow difficult today:", fields.challenge,
  ].join("\n");
}

function boundedInteger(value, fallback, min, max) {
  const parsed = Number.parseInt(String(value || ""), 10);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

function header(headers = {}, name) {
  const key = Object.keys(headers).find((candidate) => candidate.toLowerCase() === name);
  return key ? String(headers[key]) : "";
}

function response(statusCode, body, extraHeaders = {}) {
  return { statusCode, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...extraHeaders }, body };
}

function json(statusCode, payload, extraHeaders = {}) {
  return response(statusCode, JSON.stringify(payload), { "Content-Type": "application/json; charset=utf-8", ...extraHeaders });
}
