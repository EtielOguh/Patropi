"use client";

import { CalendarDays, Minus, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { trackEvent, whatsappUrl } from "@/config/business";

function maskDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function parseDate(value: string) {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const [, day, month, year] = match.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return date;
}

function todayInSaoPaulo() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value || 0);
  return new Date(Date.UTC(get("year"), get("month") - 1, get("day")));
}

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const checkinInput = form.elements.namedItem("checkin") as HTMLInputElement;
    const checkoutInput = form.elements.namedItem("checkout") as HTMLInputElement;
    const entry = parseDate(checkin);
    const exit = parseDate(checkout);

    if (!entry) { checkinInput.setCustomValidity("Informe uma data válida no formato dia/mês/ano."); checkinInput.reportValidity(); return; }
    if (entry < todayInSaoPaulo()) { checkinInput.setCustomValidity("A data de entrada não pode estar no passado."); checkinInput.reportValidity(); return; }
    if (!exit) { checkoutInput.setCustomValidity("Informe uma data válida no formato dia/mês/ano."); checkoutInput.reportValidity(); return; }
    if (exit <= entry) { checkoutInput.setCustomValidity("A saída deve ser posterior à entrada."); checkoutInput.reportValidity(); return; }

    const childrenLine = children > 0 ? `\nCrianças: ${children}` : "";
    const message = `Olá! Gostaria de consultar a disponibilidade.\n\nEntrada: ${checkin}\nSaída: ${checkout}\nAdultos: ${adults}${childrenLine}\n\nPoderiam me informar as opções disponíveis e os valores?`;
    trackEvent("hotel_availability", { adults: String(adults), children: String(children) });
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} className={`booking-form ${compact ? "compact" : ""}`}>
      <label><span>Entrada</span><div className="field-icon"><CalendarDays size={18} /><input required name="checkin" type="text" inputMode="numeric" autoComplete="off" placeholder="dd/mm/aaaa" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" maxLength={10} value={checkin} onChange={(event) => { event.currentTarget.setCustomValidity(""); setCheckin(maskDate(event.target.value)); }} aria-label="Data de entrada no formato dia, mês e ano" /></div></label>
      <label><span>Saída</span><div className="field-icon"><CalendarDays size={18} /><input required name="checkout" type="text" inputMode="numeric" autoComplete="off" placeholder="dd/mm/aaaa" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" maxLength={10} value={checkout} onChange={(event) => { event.currentTarget.setCustomValidity(""); setCheckout(maskDate(event.target.value)); }} aria-label="Data de saída no formato dia, mês e ano" /></div></label>
      <label><span>Adultos</span><div className="guest-control"><button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} aria-label="Remover adulto"><Minus size={16} /></button><strong aria-live="polite">{adults}</strong><button type="button" onClick={() => setAdults(Math.min(12, adults + 1))} aria-label="Adicionar adulto"><Plus size={16} /></button></div></label>
      <label><span>Crianças</span><div className="guest-control"><button type="button" onClick={() => setChildren(Math.max(0, children - 1))} aria-label="Remover criança"><Minus size={16} /></button><strong aria-live="polite">{children}</strong><button type="button" onClick={() => setChildren(Math.min(12, children + 1))} aria-label="Adicionar criança"><Plus size={16} /></button></div></label>
      <button type="submit" className="btn-primary justify-center">Consultar disponibilidade</button>
    </form>
  );
}
