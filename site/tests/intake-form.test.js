import assert from "node:assert/strict";
import test from "node:test";
import { handler, resolveFormsEndpoint } from "../netlify/functions/intake-form.js";

const validPayload = {
  name: "Avery Stone",
  email: "avery@example.com",
  company: "Example Co",
  timing: "This quarter",
  workflow: "Document intake",
  challenge: "The review path takes too long and exceptions get lost.",
  source: "contact-page",
};

const event = (payload, overrides = {}) => ({
  httpMethod: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(payload),
  ...overrides,
});

const env = (overrides = {}) => ({
  NETLIFY_FORMS_SUBMISSION_URL: "https://deploy-preview.netlify.app/",
  INTAKE_SINK_RETRY_ATTEMPTS: "2",
  INTAKE_SINK_TIMEOUT_MS: "1000",
  ...overrides,
});

test("acknowledged Netlify Forms sink returns success without logging submitted content", async () => {
  const calls = [];
  const logs = [];
  const original = console.info;
  console.info = (...args) => logs.push(args.join(" "));
  try {
    const result = await handler(event(validPayload), {
      env: env(),
      fetch: async (url, init) => { calls.push({ url, init }); return { status: 200 }; },
    });
    assert.equal(result.statusCode, 200);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://deploy-preview.netlify.app/");
    assert.match(calls[0].init.body, /form-name=workflow-diagnostic/);
    assert.match(calls[0].init.body, /recipient=hello%40netherlabs.ai/);
    assert.equal(logs.join(" ").includes(validPayload.email), false);
    assert.equal(logs.join(" ").includes(validPayload.challenge), false);
  } finally { console.info = original; }
});

test("invalid requests fail before sink delivery", async () => {
  for (const [payload, status] of [
    [{ ...validPayload, email: "invalid" }, 422],
    [{ ...validPayload, name: "" }, 422],
    [{ ...validPayload, source: "unknown" }, 422],
    [{ ...validPayload, timing: "Someday" }, 422],
  ]) {
    let called = false;
    const result = await handler(event(payload), { env: env(), fetch: async () => { called = true; return { status: 200 }; } });
    assert.equal(result.statusCode, status);
    assert.equal(called, false);
  }
});

test("method, content type and body size gates fail closed", async () => {
  assert.equal((await handler({ httpMethod: "GET", headers: {}, body: "" })).statusCode, 405);
  assert.equal((await handler(event(validPayload, { headers: { "content-type": "text/plain" } }))).statusCode, 415);
  assert.equal((await handler({ httpMethod: "POST", headers: {}, body: "x".repeat(16_385) })).statusCode, 413);
});

test("blocked content does not reach the sink", async () => {
  let called = false;
  const result = await handler(event({ ...validPayload, challenge: "This is spam. Click here." }), {
    env: env(), fetch: async () => { called = true; return { status: 200 }; },
  });
  assert.equal(result.statusCode, 202);
  assert.equal(called, false);
});

test("sink errors retry twice and fail closed", async () => {
  let attempts = 0;
  const result = await handler(event(validPayload), {
    env: env(), fetch: async () => { attempts += 1; return { status: 503 }; },
  });
  assert.equal(result.statusCode, 502);
  assert.equal(attempts, 2);
});

test("sink endpoint validation rejects non-HTTPS and foreign hosts", () => {
  assert.equal(resolveFormsEndpoint({ URL: "http://netherlabs.ai/" }), null);
  assert.equal(resolveFormsEndpoint({ URL: "https://attacker.example/" }), null);
  assert.equal(resolveFormsEndpoint({ URL: "https://netherlabs.ai/path?query=1" }), "https://netherlabs.ai/");
});
