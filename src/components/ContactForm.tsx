"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { trackEvent } from "@/config/business";

export function ContactForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const children = Number(params.get("children") || 0);
  const prefill = params.get("checkin") ? `Olá! Gostaria de consultar hospedagem.\nEntrada: ${params.get("checkin")}\nSaída: ${params.get("checkout")}\nAdultos: ${params.get("adults") || 1}${children > 0 ? `\nCrianças: ${children}` : ""}` : "";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("loading"); setFeedback("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Não foi possível enviar.");
      setStatus("success"); setFeedback(result.message); form.reset(); trackEvent("contact_form", { subject: String(payload.subject) });
    } catch (error) { setStatus("error"); setFeedback(error instanceof Error ? error.message : "Não foi possível enviar."); }
  }

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-soft sm:p-9" aria-busy={status === "loading"}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="form-label"><span>Nome *</span><input className="form-input" name="name" required minLength={2} autoComplete="name" /></label>
        <label className="form-label"><span>Telefone *</span><input className="form-input" name="phone" required inputMode="tel" autoComplete="tel" /></label>
        <label className="form-label"><span>E-mail</span><input className="form-input" name="email" type="email" autoComplete="email" /></label>
        <label className="form-label"><span>Assunto *</span><select className="form-input" name="subject" required defaultValue={params.get("subject") || ""}><option value="" disabled>Selecione</option>{["Hospedagem", "Restaurante", "Reserva", "Evento", "Dúvida", "Outro"].map(x => <option key={x}>{x}</option>)}</select></label>
        <label className="hidden" aria-hidden="true">Empresa<input name="company" tabIndex={-1} autoComplete="off" /></label>
        <label className="form-label sm:col-span-2"><span>Mensagem *</span><textarea className="form-input min-h-36 resize-y" name="message" required minLength={10} defaultValue={prefill} /></label>
      </div>
      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><button disabled={status === "loading"} className="btn-primary disabled:cursor-wait disabled:opacity-60" type="submit"><Send size={16} />{status === "loading" ? "Enviando..." : "Enviar mensagem"}</button><p className={`text-sm ${status === "error" ? "text-red-700" : "text-olive"}`} role="status" aria-live="polite">{feedback}</p></div>
    </form>
  );
}
