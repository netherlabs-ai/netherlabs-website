/**
 * diagnostic-form.js — Netlify Function for the Website Repositioning v1
 * "Request a Diagnostic" contact form (reposition/contact.html).
 *
 * Receives diagnostic-request submissions, applies the same block-list
 * safety checks used by the legacy intake-form.js, and delivers clean
 * submissions to the configured notification email.
 *
 * STAGING NOTE: This function is deployed alongside the reposition/ pages
 * for internal review only. It uses the same NOTIFY_EMAIL env var pattern
 * as intake-form.js — configure in Netlify UI before any production use.
 * No third-party email provider is wired yet; delivery is logged to
 * Netlify function logs pending an approved provider (SendGrid/Postmark/SES).
 *
 * Environment variables:
 *   NOTIFY_EMAIL — destination email for clean submissions
 *
 * Author: Zeus (CTO) — triage-1783579772.932602
 */

// ─── Block lists (reused from intake-form.js content policy) ──────────────

const EOS_VAULTA_PATTERNS = [
  /\beos\b/i,
  /\bvaulta\b/i,
  /\benf\b/i,
  /\beos network\b/i,
  /\beos nation\b/i,
  /\bweb3 banking\b/i,
];

const SPAM_PATTERNS = [
  /\bspam\b/i,
  /\bscam\b/i,
  /\brug pull\b/i,
  /\bpump and dump\b/i,
  /\bmake \$\d+ (fast|quick|easy)\b/i,
  /\bclick here\b/i,
  /\bunsubscribe\b/i,
  /\byou have been selected\b/i,
  /\bcongratulations you won\b/i,
];

const HOSTILE_PATTERNS = [
  /\bthreat\b/i,
  /\bsue you\b/i,
  /\blegal action\b/i,
  /\blawsuit\b/i,
  /\bhate\b/i,
  /\bkill\b/i,
];

const REQUIRED_FIELDS = ['name', 'email', 'company', 'problem_area', 'problem'];

// ─── Classification ─────────────────────────────────────────────────────────

function classifySubmission(fields) {
  const allText = Object.values(fields).join(' ');

  for (const pattern of EOS_VAULTA_PATTERNS) {
    if (pattern.test(allText)) {
      return { blocked: true, reason: 'blocked_eos_vaulta', category: 'EOS/Vaulta reference' };
    }
  }
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(allText)) {
      return { blocked: true, reason: 'blocked_spam', category: 'Spam pattern' };
    }
  }
  for (const pattern of HOSTILE_PATTERNS) {
    if (pattern.test(allText)) {
      return { blocked: true, reason: 'blocked_hostile', category: 'Hostile content' };
    }
  }
  return { blocked: false };
}

// ─── Handler ──────────────────────────────────────────────────────────────

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders(), body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders(),
      body: JSON.stringify({ success: false, message: 'Method not allowed' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ success: false, message: 'Invalid request body' }),
    };
  }

  const {
    name, email, company, role, company_size, industry,
    problem_area, problem, tried, timeline, referral,
  } = body;

  const missing = REQUIRED_FIELDS.filter((f) => !body[f] || String(body[f]).trim() === '');
  if (missing.length) {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ success: false, message: `Missing required field(s): ${missing.join(', ')}` }),
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ success: false, message: 'Invalid email address' }),
    };
  }

  const fields = {
    name, email, company, role: role || '', company_size: company_size || '',
    industry: industry || '', problem_area, problem, tried: tried || '',
    timeline: timeline || '', referral: referral || '',
  };

  const classification = classifySubmission(fields);
  if (classification.blocked) {
    console.log(`[diagnostic-form] BLOCKED submission from ${email}: ${classification.category}`);
    // Return success to the client so hostile actors can't probe the filter.
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({ success: true, message: 'Thank you for your submission.' }),
    };
  }

  const submissionText = [
    `New Diagnostic Request — Nether Labs (Website Repositioning v1 / staging)`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Role: ${role || 'Not provided'}`,
    `Company size: ${company_size || 'Not provided'}`,
    `Industry: ${industry || 'Not provided'}`,
    `Problem area: ${problem_area}`,
    ``,
    `Problem description:`,
    problem,
    ``,
    `What they've tried:`,
    tried || '(not provided)',
    ``,
    `Timeline: ${timeline || 'Not provided'}`,
    `Referral source: ${referral || 'Not provided'}`,
    ``,
    `---`,
    `Received: ${new Date().toISOString()}`,
  ].join('\n');

  // Delivery: log to Netlify function logs (visible in Netlify dashboard).
  // TODO before production: wire NOTIFY_EMAIL to an approved email provider
  // (SendGrid/Postmark/SES) or switch to Netlify Forms native handling.
  // Do not add a third-party analytics/email vendor without Yves/Puck approval
  // per reposition.js staging-safe policy note.
  const notifyEmail = process.env.NOTIFY_EMAIL || 'ops@netherlabs.ai';
  console.log(`[diagnostic-form] CLEAN submission from ${email}. Would notify: ${notifyEmail}`);
  console.log('[diagnostic-form] Submission:\n' + submissionText);

  return {
    statusCode: 200,
    headers: corsHeaders(),
    body: JSON.stringify({
      success: true,
      message: 'Thank you. We received your request and will be in touch shortly.',
    }),
  };
};

function corsHeaders() {
  return {
    'Content-Type': 'application/json',
    // Staging: allow both the Netlify staging domain and localhost previews.
    // Tighten to the final staging/production origin before any wider review.
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
