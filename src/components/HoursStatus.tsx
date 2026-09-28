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
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wider ${status.isOpen ? "bg-olive text-white" : "bg-ink/10 text-ink"}`}>
      <Clock3 size={14} /> {status.label}
    </span>
  );
}

export function HoursTable() {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(currentStatus().day), []);
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div><p className="eyebrow text-ember">Funcionamento</p><h3 className="mt-2 font-display text-2xl">Horários do restaurante</h3></div>
        <HoursStatus />
      </div>
      <div className="divide-y divide-ink/10">
        {business.restaurant.hours.map((item) => (
          <div key={item.day} className={`flex justify-between rounded-lg px-2 py-2.5 text-sm ${today === item.dayIndex ? "bg-sand/60 font-bold text-olive" : ""}`}><span>{item.day}{today === item.dayIndex && <span className="ml-2 text-[10px] uppercase tracking-wider text-ember">Hoje</span>}</span><span className="font-semibold">{item.open.replace(":", "h")}–{item.close.replace(":", "h")}</span></div>
        ))}
      </div>
      <p className="mt-5 border-l-2 border-gold pl-3 text-xs leading-5 text-ink/75">Horários obtidos em cadastros públicos. Confirme por telefone antes de se deslocar, especialmente em feriados.</p>
    </div>
  );
}
