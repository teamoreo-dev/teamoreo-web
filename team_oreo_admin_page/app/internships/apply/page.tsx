"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Alert from "../../Alert";
import { API_URL } from "../../api";


interface InternshipForm {
  name: string; email: string; phone: string; role: string; experience: string;
  portfolio: string; motivation: string; website: string;
}
const initialForm: InternshipForm = { name: "", email: "", phone: "", role: "", experience: "", portfolio: "", motivation: "", website: "" };

export default function InternshipApplyPage() {
  const [form, setForm] = useState<InternshipForm>(initialForm);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  function update(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    setForm((current) => ({ ...current, [name]: value }));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    try {
      const endpoint = process.env.NEXT_PUBLIC_INTERNSHIP_APPLICATION_ENDPOINT || "/api/internships/apply";
      const response = await fetch(`${API_URL}${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result = await response.json().catch(() => ({})) as { success?: boolean; message?: string; error?: { message?: string } };
      if (!response.ok || result.success === false) throw new Error(result.error?.message || result.message || `Application could not be submitted (${response.status}).`);
      setNotice("Your internship application has been submitted. Thank you for applying."); setForm({ ...initialForm });
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : "Unable to submit your application. Please try again.");
    } finally { setBusy(false); }
  }

  return <><main className="application-page">
    <section className="application-card">
    <a className="application-back" href="/">← Team Oreo home</a><div className="eyebrow">TEAM OREO · CAREERS</div><h1>Internship application</h1>
    <p className="application-intro">Tell us about yourself, the role you’re interested in, and how you’d like to contribute.</p>
    <Alert type="success" message={notice} onDismiss={() => setNotice("")} /><Alert type="error" message={error} onDismiss={() => setError("")} />
    <form className="application-form" onSubmit={submit}>
      <label>Full name *<input name="name" value={form.name} onChange={update} required minLength={2} maxLength={100} autoComplete="name" placeholder="Your full name" /></label>
      <label>Email address *<input name="email" type="email" value={form.email} onChange={update} required maxLength={254} autoComplete="email" placeholder="you@example.com" /></label>
      <label>Phone number<input name="phone" type="tel" value={form.phone} onChange={update} maxLength={30} autoComplete="tel" placeholder="Your contact details" /></label>
      <label>Internship role *<select name="role" value={form.role} onChange={update} required><option value="">Choose a role</option><option value="Frontend Developer">Frontend Developer</option><option value="Backend Developer">Backend Developer</option><option value="UI/UX Designer">UI/UX Designer</option><option value="Content Writer">Content Writer</option><option value="Product / Project Support">Product / Project Support</option><option value="Other">Other</option></select></label>
      <label className="application-wide">Relevant experience or skills *<textarea name="experience" value={form.experience} onChange={update} required minLength={10} maxLength={3000} rows={4} placeholder="Tell us about your skills, projects, or relevant experience." /></label>
      <label className="application-wide">Portfolio, LinkedIn or GitHub link<input name="portfolio" type="url" value={form.portfolio} onChange={update} placeholder="https://…" /></label>
      <label className="application-wide">Why would you like to join Team Oreo? *<textarea name="motivation" value={form.motivation} onChange={update} required minLength={10} maxLength={3000} rows={4} placeholder="Share your motivation and what you hope to learn or contribute." /></label>
      <label className="application-honeypot" aria-hidden="true">Leave this field empty<input tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={update} /></label>
      <button className="btn btn-primary application-submit" type="submit" disabled={busy}>{busy ? "Submitting…" : "Submit application →"}</button>
    </form><p className="application-note">Your information will be used to review your application.</p>
  </section></main>;
  </>
}
