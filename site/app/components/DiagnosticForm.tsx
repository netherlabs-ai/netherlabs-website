"use client";
import "./diagnostic-form.css";

import { FormEvent, useEffect, useRef, useState } from "react";
import { buildDiagnosticBrief, IntakePayload, submitIntake } from "../lib/site";

type FormState = "idle" | "submitting" | "sent" | "error";

// Product pages link to /contact/?product=<slug>; prefill the workflow field so
// early-access requests arrive labelled. Only known slugs are accepted.
const earlyAccess: Record<string, string> = {
  nethercommand: "Early access: NetherCommand",
  netherguard: "Early access: NetherGuard",
  // NetherShield Guard was renamed NetherGuard on 2026-11-27; old links keep their label.
  "nethershield-guard": "Early access: NetherGuard",
  netherenvoy: "Early access: NetherEnvoy",
  netherfuse: "Early access: NetherFuse",
  general: "Early access: Nether Labs products",
};

type DiagnosticFormProps = {
  source: IntakePayload["source"];
  className?: string;
};

export default function DiagnosticForm({ source, className }: DiagnosticFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [brief, setBrief] = useState("");
  const workflowField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const product = new URLSearchParams(window.location.search).get("product") ?? "";
    const label = Object.hasOwn(earlyAccess, product) ? earlyAccess[product] : "";
    if (label && workflowField.current && !workflowField.current.value) workflowField.current.value = label;
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: IntakePayload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      timing: String(data.get("timing") || "This quarter") as IntakePayload["timing"],
      workflow: String(data.get("workflow") || ""),
      challenge: String(data.get("challenge") || ""),
      source,
    };
    setBrief(buildDiagnosticBrief(payload));
    setState("submitting");

    try {
      await submitIntake(payload);
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  };

  return (
    <form className={`diagnostic-form ${className || ""}`} onSubmit={handleSubmit}>
      <label><span>Name</span><input name="name" required maxLength={120} autoComplete="name" placeholder="Your name" /></label>
      <label><span>Work email</span><input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@company.com" /></label>
      <label><span>Company <i>OPTIONAL</i></span><input name="company" maxLength={200} autoComplete="organization" placeholder="Company or organization" /></label>
      <label>
        <span>How soon</span>
        <select name="timing" defaultValue="This quarter"><option>Now</option><option>This quarter</option><option>Exploring</option></select>
      </label>
      <label className="full-field"><span>Interested in <i>OPTIONAL</i></span><input name="workflow" ref={workflowField} maxLength={300} placeholder="e.g. NetherGuard on a Mac" /></label>
      <label className="full-field"><span>Which AI tools and agents do you use?</span><textarea name="challenge" required maxLength={4000} rows={source === "contact-page" ? 6 : 5} placeholder="e.g. Claude Desktop with two MCP servers, Cursor, ChatGPT in the browser. Mac or Windows? Just you, or a team?" /></label>
      <button className="button drawer-submit" type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Sending request" : state === "sent" ? "Request sent" : "Request early access"}
        <span aria-hidden="true" className="arrow">↗</span>
      </button>
      <p className="intake-route">Your request goes to Nether Labs for review.</p>
      {state !== "idle" && (
        <p className={`form-note ${state === "error" ? "form-note-error" : ""}`} role={state === "error" ? "alert" : "status"}>
          {state === "error" ? "We could not send your request. Your details are kept here so you can retry or email hello@netherlabs.ai." : state === "submitting" ? "Sending your request." : "Request received. Nether Labs will be in touch as early-access places open."}
        </p>
      )}
      {brief && <label className="full-field brief-output"><span>Your request</span><textarea value={brief} readOnly rows={9} /></label>}
    </form>
  );
}
