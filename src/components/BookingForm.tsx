"use client";

import { Minus, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { trackEvent, whatsappUrl } from "@/config/business";
import { DateField, DateRangePicker } from "@/components/DateRangePicker";

function displayDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [dateError, setDateError] = useState<{ field: DateField; message: string } | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!checkin) { setDateError({ field: "checkin", message: "Selecione a data de entrada." }); return; }
    if (!checkout) { setDateError({ field: "checkout", message: "Selecione uma saída posterior à entrada." }); return; }

    const childrenLine = children > 0 ? `\nCrianças: ${children}` : "";
    const message = `Olá! Gostaria de consultar a disponibilidade.\n\nEntrada: ${displayDate(checkin)}\nSaída: ${displayDate(checkout)}\nAdultos: ${adults}${childrenLine}\n\nPoderiam me informar as opções disponíveis e os valores?`;
    trackEvent("hotel_availability", { adults: String(adults), children: String(children) });
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} className={`booking-form ${compact ? "compact" : ""}`}>
      <DateRangePicker checkin={checkin} checkout={checkout} onCheckinChange={setCheckin} onCheckoutChange={setCheckout} error={dateError} onClearError={() => setDateError(null)} />
      <label><span>Adultos</span><div className="guest-control"><button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} aria-label="Remover adulto"><Minus size={16} /></button><strong aria-live="polite">{adults}</strong><button type="button" onClick={() => setAdults(Math.min(12, adults + 1))} aria-label="Adicionar adulto"><Plus size={16} /></button></div></label>
      <label><span>Crianças</span><div className="guest-control"><button type="button" onClick={() => setChildren(Math.max(0, children - 1))} aria-label="Remover criança"><Minus size={16} /></button><strong aria-live="polite">{children}</strong><button type="button" onClick={() => setChildren(Math.min(12, children + 1))} aria-label="Adicionar criança"><Plus size={16} /></button></div></label>
      <button type="submit" className="btn-primary justify-center">Consultar disponibilidade</button>
    </form>
  );
}
