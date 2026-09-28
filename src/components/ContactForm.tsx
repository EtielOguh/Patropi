"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { MessageCircle } from "lucide-react";
import { trackEvent, whatsappUrl } from "@/config/business";

export function ContactForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [feedback, setFeedback] = useState("");
  const children = Number(params.get("children") || 0);
  const prefill = params.get("checkin") ? `Olá! Gostaria de consultar hospedagem.\nEntrada: ${params.get("checkin")}\nSaída: ${params.get("checkout")}\nAdultos: ${params.get("adults") || 1}${children > 0 ? `\nCrianças: ${children}` : ""}` : "";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setFeedback("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    const message = [
      "Olá! Gostaria de falar com a Patropi.",
      "",
      `Nome: ${payload.name}`,
      `Telefone: ${payload.phone}`,
      payload.email ? `E-mail: ${payload.email}` : "",
      `Assunto: ${payload.subject}`,
      "",
      `Mensagem: ${payload.message}`,
    ].filter(Boolean).join("\n");

    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    setStatus("success");
    setFeedback("Mensagem preparada. Conclua o envio no WhatsApp.");
    trackEvent("contact_form_whatsapp", { subject: String(payload.subject) });
  }

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-soft sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="form-label"><span>Nome *</span><input className="form-input" name="name" required minLength={2} autoComplete="name" /></label>
        <label className="form-label"><span>Telefone *</span><input className="form-input" name="phone" required inputMode="tel" autoComplete="tel" /></label>
        <label className="form-label"><span>E-mail</span><input className="form-input" name="email" type="email" autoComplete="email" /></label>
        <label className="form-label"><span>Assunto *</span><select className="form-input" name="subject" required defaultValue={params.get("subject") || ""}><option value="" disabled>Selecione</option>{["Hospedagem", "Restaurante", "Reserva", "Evento", "Dúvida", "Outro"].map(x => <option key={x}>{x}</option>)}</select></label>
        <label className="form-label sm:col-span-2"><span>Mensagem *</span><textarea className="form-input min-h-36 resize-y" name="message" required minLength={10} defaultValue={prefill} /></label>
      </div>
      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><button className="btn-primary" type="submit"><MessageCircle size={16} />Abrir no WhatsApp</button><p className="text-sm text-olive" role="status" aria-live="polite">{status === "success" ? feedback : ""}</p></div>
    </form>
  );
}
