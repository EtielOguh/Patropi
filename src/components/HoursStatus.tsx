"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import { business } from "@/config/business";

function currentStatus() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const get = (type: string) => parts.find((part) => part.type === type)?.value || "0";
  const day = dayMap[get("weekday")];
  const now = Number(get("hour")) * 60 + Number(get("minute"));
  const schedule = business.restaurant.hours.find((entry) => entry.dayIndex === day)!;
  const [oh, om] = schedule.open.split(":").map(Number);
  const [ch, cm] = schedule.close.split(":").map(Number);
  const isOpen = now >= oh * 60 + om && now < ch * 60 + cm;
  return { isOpen, day, label: isOpen ? `Aberto agora · até ${schedule.close.replace(":", "h")}` : `Fechado · abre às ${schedule.open.replace(":", "h")}` };
}

export function HoursStatus() {
  const [status, setStatus] = useState<{ isOpen: boolean; day: number; label: string } | null>(null);
  useEffect(() => setStatus(currentStatus()), []);
  if (!status) return null;
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.08em] ${status.isOpen ? "text-olive" : "text-ink/65"}`}>
      <Clock3 size={14} /> {status.label}
    </span>
  );
}

export function HoursTable() {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(currentStatus().day), []);
  return (
    <div className="border-y border-ink/15 py-6 sm:py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="eyebrow text-ember">Funcionamento</p><h3 className="mt-2 font-display text-2xl">Horários do restaurante</h3></div>
        <HoursStatus />
      </div>
      <div>
        {business.restaurant.hours.map((item) => (
          <div key={item.day} className={`grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-t border-ink/10 py-3 text-sm ${today === item.dayIndex ? "border-l-2 border-l-olive pl-3 font-bold text-olive" : ""}`}><span>{item.day}{today === item.dayIndex && <span className="ml-2 text-[10px] uppercase tracking-wider text-ember">Hoje</span>}</span><span className="font-semibold">{item.open.replace(":", "h")}–{item.close.replace(":", "h")}</span></div>
        ))}
      </div>
      <p className="mt-6 border-l-2 border-gold pl-3 text-xs leading-5 text-ink/75">Horários obtidos em cadastros públicos. Confirme por telefone antes de se deslocar, especialmente em feriados.</p>
    </div>
  );
}
