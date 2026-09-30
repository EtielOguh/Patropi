"use client";

import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";

export type DateField = "checkin" | "checkout";

type DateRangePickerProps = {
  checkin: string;
  checkout: string;
  onCheckinChange: (date: string) => void;
  onCheckoutChange: (date: string) => void;
  error: { field: DateField; message: string } | null;
  onClearError: () => void;
};

type Month = { year: number; month: number };

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function todayInSaoPaulo() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const value = (type: string) => parts.find((part) => part.type === type)?.value || "";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

function partsFromIso(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

function isoFromParts(year: number, month: number, day: number) {
  return `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

function monthFromIso(iso: string): Month {
  const { year, month } = partsFromIso(iso);
  return { year, month };
}

function shiftMonth(value: Month, amount: number): Month {
  const shifted = new Date(Date.UTC(value.year, value.month - 1 + amount, 1));
  return { year: shifted.getUTCFullYear(), month: shifted.getUTCMonth() + 1 };
}

function shiftDate(iso: string, amount: number) {
  const { year, month, day } = partsFromIso(iso);
  const shifted = new Date(Date.UTC(year, month - 1, day + amount));
  return isoFromParts(shifted.getUTCFullYear(), shifted.getUTCMonth() + 1, shifted.getUTCDate());
}

function formatDate(iso: string) {
  if (!iso) return "DD/MM/AAAA";
  const { year, month, day } = partsFromIso(iso);
  return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
}

function accessibleDate(iso: string) {
  const { year, month, day } = partsFromIso(iso);
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}

function monthLabel(value: Month) {
  const label = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(value.year, value.month - 1, 1)),
  );
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function sameMonth(a: Month, b: Month) {
  return a.year === b.year && a.month === b.month;
}

export function DateRangePicker({ checkin, checkout, onCheckinChange, onCheckoutChange, error, onClearError }: DateRangePickerProps) {
  const today = todayInSaoPaulo();
  const [activeField, setActiveField] = useState<DateField | null>(null);
  const [viewMonth, setViewMonth] = useState<Month>(() => monthFromIso(today));
  const [pendingFocus, setPendingFocus] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const checkinRef = useRef<HTMLButtonElement>(null);
  const checkoutRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const helpId = useId();
  const errorId = useId();

  const openCalendar = (field: DateField, clearError = true) => {
    const actualField = field === "checkout" && !checkin ? "checkin" : field;
    const initialDate = actualField === "checkout" ? checkout || shiftDate(checkin, 1) : checkin || today;
    setActiveField(actualField);
    setViewMonth(monthFromIso(initialDate));
    setPendingFocus(initialDate);
    setAnnouncement(field === "checkout" && !checkin ? "Selecione primeiro a data de entrada." : "");
    if (clearError) onClearError();
  };

  const closeCalendar = (restoreFocus = true) => {
    const trigger = activeField === "checkout" ? checkoutRef.current : checkinRef.current;
    setActiveField(null);
    setPendingFocus("");
    if (restoreFocus) requestAnimationFrame(() => trigger?.focus());
  };

  useEffect(() => {
    if (!error) return;
    openCalendar(error.field, false);
    // The error object changes only after an attempted submit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (!activeField) return;
    const previousOverflow = document.body.style.overflow;
    const mobileViewport = window.matchMedia("(max-width: 767px)");
    const syncScrollLock = () => { document.body.style.overflow = mobileViewport.matches ? "hidden" : previousOverflow; };
    syncScrollLock();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeCalendar();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>("button:not(:disabled), [href], [tabindex]:not([tabindex='-1'])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };

    document.addEventListener("keydown", handleKeyDown);
    mobileViewport.addEventListener("change", syncScrollLock);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      mobileViewport.removeEventListener("change", syncScrollLock);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeField]);

  useEffect(() => {
    if (!activeField || !pendingFocus) return;
    const frame = requestAnimationFrame(() => {
      const panel = panelRef.current;
      const day = panelRef.current?.querySelector<HTMLButtonElement>(`[data-date="${pendingFocus}"]`);
      (day || panel?.querySelector<HTMLButtonElement>("button"))?.focus();
      if (panel && window.matchMedia("(min-width: 768px)").matches && panel.getBoundingClientRect().bottom > window.innerHeight - 16) {
        panel.scrollIntoView({ block: "end", inline: "nearest" });
      }
      setPendingFocus("");
    });
    return () => cancelAnimationFrame(frame);
  }, [activeField, pendingFocus, viewMonth]);

  const selectDate = (iso: string) => {
    onClearError();
    if (activeField === "checkin") {
      onCheckinChange(iso);
      if (checkout && checkout <= iso) onCheckoutChange("");
      const nextDate = shiftDate(iso, 1);
      setActiveField("checkout");
      setAnnouncement("Entrada selecionada. Agora escolha a data de saída.");
      if (!sameMonth(viewMonth, monthFromIso(nextDate))) setViewMonth(monthFromIso(nextDate));
      setPendingFocus(nextDate);
      return;
    }
    onCheckoutChange(iso);
    setAnnouncement(`Saída selecionada para ${formatDate(iso)}.`);
    closeCalendar();
  };

  const focusDate = (iso: string) => {
    const month = monthFromIso(iso);
    if (!sameMonth(month, viewMonth)) setViewMonth(month);
    setPendingFocus(iso);
  };

  const handleDayKeyDown = (event: KeyboardEvent<HTMLButtonElement>, iso: string) => {
    const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (event.key in moves) {
      event.preventDefault();
      const candidate = shiftDate(iso, moves[event.key]);
      if (candidate >= today && !(activeField === "checkout" && checkin && candidate <= checkin)) focusDate(candidate);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const utcDay = new Date(`${iso}T12:00:00Z`).getUTCDay();
      const mondayOffset = (utcDay + 6) % 7;
      const candidate = shiftDate(iso, event.key === "Home" ? -mondayOffset : 6 - mondayOffset);
      if (candidate >= today && !(activeField === "checkout" && checkin && candidate <= checkin)) focusDate(candidate);
    } else if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      const targetMonth = shiftMonth(monthFromIso(iso), event.key === "PageUp" ? -1 : 1);
      const day = Math.min(partsFromIso(iso).day, new Date(Date.UTC(targetMonth.year, targetMonth.month, 0)).getUTCDate());
      const candidate = isoFromParts(targetMonth.year, targetMonth.month, day);
      if (candidate >= today && !(activeField === "checkout" && checkin && candidate <= checkin)) focusDate(candidate);
    }
  };

  const firstWeekday = (new Date(Date.UTC(viewMonth.year, viewMonth.month - 1, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(viewMonth.year, viewMonth.month, 0)).getUTCDate();
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const currentMonth = monthFromIso(today);
  const previousDisabled = viewMonth.year < currentMonth.year || (viewMonth.year === currentMonth.year && viewMonth.month <= currentMonth.month);

  return (
    <div className="booking-date-picker">
      <div className={`date-field-group ${error?.field === "checkin" ? "has-error" : ""}`}>
        <span>Entrada</span>
        <button ref={checkinRef} type="button" className="date-field" onClick={() => openCalendar("checkin")} aria-label={`Entrada: ${formatDate(checkin)}${checkin ? "" : ", nenhuma data selecionada"}`} aria-haspopup="dialog" aria-expanded={activeField === "checkin"} aria-describedby={error?.field === "checkin" ? errorId : undefined}>
          <CalendarDays size={18} aria-hidden="true" />
          <span className={checkin ? "" : "is-placeholder"}>{formatDate(checkin)}</span>
        </button>
        <input type="hidden" name="checkin" value={checkin} />
      </div>
      <div className={`date-field-group ${error?.field === "checkout" ? "has-error" : ""}`}>
        <span>Saída</span>
        <button ref={checkoutRef} type="button" className="date-field" onClick={() => openCalendar("checkout")} aria-label={`Saída: ${formatDate(checkout)}${checkout ? "" : ", nenhuma data selecionada"}`} aria-haspopup="dialog" aria-expanded={activeField === "checkout"} aria-describedby={error?.field === "checkout" ? errorId : undefined}>
          <CalendarDays size={18} aria-hidden="true" />
          <span className={checkout ? "" : "is-placeholder"}>{formatDate(checkout)}</span>
        </button>
        <input type="hidden" name="checkout" value={checkout} />
      </div>

      {error && <p id={errorId} className="date-picker-error" role="alert">{error.message}</p>}

      {activeField && (
        <>
          <div className="date-picker-backdrop" aria-hidden="true" onPointerDown={() => closeCalendar()} />
          <div ref={panelRef} className="date-picker-panel" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={helpId}>
            <div className="date-picker-heading">
              <div>
                <p className="date-picker-step">{activeField === "checkin" ? "Escolha a entrada" : "Escolha a saída"}</p>
                <h3 id={titleId}>{monthLabel(viewMonth)}</h3>
              </div>
              <button type="button" className="date-picker-close" onClick={() => closeCalendar()} aria-label="Fechar calendário"><X size={19} /></button>
            </div>

            <div className="date-picker-navigation">
              <button type="button" onClick={() => setViewMonth(shiftMonth(viewMonth, -1))} disabled={previousDisabled} aria-label="Mês anterior"><ChevronLeft size={20} /></button>
              <p id={helpId}>{activeField === "checkin" ? "Selecione o primeiro dia da estadia" : "Selecione um dia posterior à entrada"}</p>
              <button type="button" onClick={() => setViewMonth(shiftMonth(viewMonth, 1))} aria-label="Próximo mês"><ChevronRight size={20} /></button>
            </div>

            <div className="date-picker-weekdays">
              {weekDays.map((day) => <span key={day}>{day}</span>)}
            </div>
            <div className="date-picker-grid">
              {Array.from({ length: cellCount }, (_, index) => {
                const day = index - firstWeekday + 1;
                if (day < 1 || day > daysInMonth) return <span key={`empty-${index}`} aria-hidden="true" />;
                const iso = isoFromParts(viewMonth.year, viewMonth.month, day);
                const disabled = iso < today || (activeField === "checkout" && Boolean(checkin) && iso <= checkin);
                const isToday = iso === today;
                const isCheckin = iso === checkin;
                const isCheckout = iso === checkout;
                const isRange = Boolean(checkin && checkout && iso > checkin && iso < checkout);
                const classNames = [isToday && "is-today", isCheckin && "is-checkin", isCheckout && "is-checkout", isRange && "is-range"].filter(Boolean).join(" ");
                return (
                  <span key={iso} className={isRange ? "is-range" : ""}>
                    <button type="button" data-date={iso} className={classNames} disabled={disabled} aria-label={`${accessibleDate(iso)}${isCheckin ? ", entrada selecionada" : ""}${isCheckout ? ", saída selecionada" : ""}`} aria-pressed={isCheckin || isCheckout} aria-current={isToday ? "date" : undefined} onClick={() => selectDate(iso)} onKeyDown={(event) => handleDayKeyDown(event, iso)}>{day}</button>
                  </span>
                );
              })}
            </div>

            <div className="date-picker-summary" aria-live="polite">
              <span><small>Entrada</small><strong>{formatDate(checkin)}</strong></span>
              <i aria-hidden="true" />
              <span><small>Saída</small><strong>{formatDate(checkout)}</strong></span>
            </div>
            <p className="sr-only" aria-live="polite">{announcement}</p>
          </div>
        </>
      )}
    </div>
  );
}
