"use client";
import "./diagnostic-form.css";

import { FormEvent, useState } from "react";
import { buildDiagnosticBrief, IntakePayload, submitIntake } from "../lib/site";

type FormState = "idle" | "submitting" | "sent" | "error";

type DiagnosticFormProps = {
  source: IntakePayload["source"];
  className?: string;
};

export default function DiagnosticForm({ source, className }: DiagnosticFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [brief, setBrief] = useState("");

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
        <span>Timing</span>
        <select name="timing" defaultValue="This quarter"><option>Now</option><option>This quarter</option><option>Exploring</option></select>
      </label>
      <label className="full-field"><span>Workflow or process <i>OPTIONAL</i></span><input name="workflow" maxLength={300} placeholder="e.g. document intake and review" /></label>
      <label className="full-field"><span>What makes it difficult today?</span><textarea name="challenge" required maxLength={4000} rows={source === "contact-page" ? 6 : 5} placeholder="The handoffs, delays, repeated work, exceptions or risk you want to understand..." /></label>
      <button className="button drawer-submit" type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Submitting request" : state === "sent" ? "Request submitted" : "Submit diagnostic request"}
        <span aria-hidden="true" className="arrow">↗</span>
      </button>
      <p className="intake-route">Your request goes to Nether Labs for review.</p>
      {state !== "idle" && (
        <p className={`form-note ${state === "error" ? "form-note-error" : ""}`} role={state === "error" ? "alert" : "status"}>
          {state === "error" ? "We could not send your request. Your details are kept here so you can retry or email hello@netherlabs.ai." : state === "submitting" ? "Sending your request." : "Request received. Nether Labs will review the workflow brief."}
        </p>
      )}
      {brief && <label className="full-field brief-output"><span>Prepared diagnostic brief</span><textarea value={brief} readOnly rows={9} /></label>}
    </form>
  );
}
