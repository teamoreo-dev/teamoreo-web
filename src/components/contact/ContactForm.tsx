"use client";

import { useState } from "react";
import { api, ApiError } from "@/lib/admin/api";

type Fields = { name: string; companyName: string; email: string; phone: string; message: string; website: string };
const initial: Fields = { name: "", companyName: "", email: "", phone: "", message: "", website: "" };

export function LegacyContactForm() {
  const [fields, setFields] = useState(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function update(key: keyof Fields, value: string) { setFields((current) => ({ ...current, [key]: value })); }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending"); setError("");
    try {
      await api("/api/contact", { method: "POST", body: fields });
      setFields(initial); setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof ApiError ? err.message : "We couldn’t send your message. Please try again.");
    }
  }

  const input = "min-h-12 w-full rounded-xl border border-[#e3e9f1] bg-[#f8fafc] px-4 text-sm text-ink outline-none placeholder:text-[#8b9ab0] focus:border-brand focus:ring-2 focus:ring-brand/15";
  return (
    <form onSubmit={submit} className="rounded-2xl border border-[#e3e9f1] bg-white p-6 shadow-[0_12px_32px_rgba(24,21,28,0.06)] sm:p-8">
      {status === "success" ? <div role="status" className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">Thanks, we received your message. We’ll be in touch soon.</div> : null}
      {status === "error" ? <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">Name<input required minLength={2} maxLength={100} value={fields.name} onChange={(e) => update("name", e.target.value)} className={`${input} mt-2`} placeholder="Name" /></label>
        <label className="text-sm font-semibold">Company Name<input maxLength={150} value={fields.companyName} onChange={(e) => update("companyName", e.target.value)} className={`${input} mt-2`} placeholder="Company Name" /></label>
        <label className="text-sm font-semibold">Email<input required type="email" maxLength={254} value={fields.email} onChange={(e) => update("email", e.target.value)} className={`${input} mt-2`} placeholder="Email" /></label>
        <label className="text-sm font-semibold">Phone<input maxLength={30} value={fields.phone} onChange={(e) => update("phone", e.target.value)} className={`${input} mt-2`} placeholder="Phone" /></label>
      </div>
      <label className="mt-4 block text-sm font-semibold">Message<textarea required minLength={10} maxLength={5000} rows={5} value={fields.message} onChange={(e) => update("message", e.target.value)} className={`${input} mt-2 resize-y py-3`} placeholder="Message" /></label>
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={fields.website} onChange={(e) => update("website", e.target.value)} className="absolute -left-[9999px] h-px w-px" />
      <button type="submit" disabled={status === "sending"} className="mt-6 min-h-12 rounded-xl bg-brand px-6 text-sm font-bold text-white shadow-[0_8px_18px_rgba(232,25,114,0.22)] hover:bg-brand-dark disabled:cursor-wait disabled:opacity-60">{status === "sending" ? "Sending…" : "Send Message"}</button>
    </form>
  );
}

export function ContactForm() {
  const [fields, setFields] = useState(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  function update(key: keyof Fields, value: string) { setFields((current) => ({ ...current, [key]: value })); }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending"); setError("");
    try { await api("/api/contact", { method: "POST", body: fields }); setFields(initial); setStatus("success"); }
    catch (err) { setStatus("error"); setError(err instanceof ApiError ? err.message : "We could not send your message. Please try again."); }
  }
  const input = "min-h-12 w-full rounded-xl border border-[#e3e9f1] bg-[#f8fafc] px-4 text-sm text-ink outline-none placeholder:text-[#8b9ab0] focus:border-brand focus:ring-2 focus:ring-brand/15";
  return <form onSubmit={submit} className="rounded-2xl border border-[#dce5ef] bg-white p-6 shadow-[0_12px_32px_rgba(24,21,28,0.06)] sm:p-10">
    {status === "success" ? <div role="status" className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">Thanks, we received your message. We will be in touch soon.</div> : null}
    {status === "error" ? <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div> : null}
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block"><span className="sr-only">Name</span><input required minLength={2} maxLength={100} value={fields.name} onChange={(e) => update("name", e.target.value)} className={input} placeholder="Name" /></label>
      <label className="block"><span className="sr-only">Company Name</span><input maxLength={150} value={fields.companyName} onChange={(e) => update("companyName", e.target.value)} className={input} placeholder="Company Name" /></label>
      <label className="block"><span className="sr-only">Email</span><input required type="email" maxLength={254} value={fields.email} onChange={(e) => update("email", e.target.value)} className={input} placeholder="Email" /></label>
      <label className="block"><span className="sr-only">Phone</span><input maxLength={30} value={fields.phone} onChange={(e) => update("phone", e.target.value)} className={input} placeholder="Phone" /></label>
    </div>
    <label className="mt-4 block"><span className="sr-only">Message</span><textarea required minLength={10} maxLength={5000} rows={5} value={fields.message} onChange={(e) => update("message", e.target.value)} className={`${input} resize-y py-3`} placeholder="Message" /></label>
    <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={fields.website} onChange={(e) => update("website", e.target.value)} className="absolute -left-[9999px] h-px w-px" />
    <button type="submit" disabled={status === "sending"} className="mt-6 min-h-12 rounded-xl bg-brand px-6 text-sm font-bold text-white shadow-[0_8px_18px_rgba(232,25,114,0.22)] hover:bg-brand-dark disabled:cursor-wait disabled:opacity-60">{status === "sending" ? "Sending..." : "Send Message"}</button>
  </form>;
}
