"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RealPhoto } from "./RealPhoto";

const items = [
  { category: "Hotel", label: "Fachada do Hotel e Churrascaria Patropi", src: "/images/fachada-patropi.webp", position: "center" },
  { category: "Restaurante", label: "Buffet e salão do restaurante Patropi", src: "/images/buffet-patropi.webp", position: "center" },
  { category: "Quartos", label: "Quarto com cama de casal no Hotel Patropi", src: "/images/quarto-patropi.webp", position: "center 55%" },
  { category: "Gastronomia", label: "Carne assada na churrasqueira do Patropi", src: "/images/churrasco-patropi.webp", position: "center" },
  { category: "Gastronomia", label: "Sobremesa de chocolate servida no Patropi", src: "/images/sobremesa-chocolate.webp", position: "center" },
  { category: "Restaurante", label: "Equipe do Patropi recebendo uma cliente", src: "/images/equipe-patropi.webp", position: "center" },
  { category: "Gastronomia", label: "Pratos quentes do buffet do Patropi", src: "/images/prato-buffet.webp", position: "center" },
  { category: "Gastronomia", label: "Corte assado na churrasqueira", src: "/images/carne-patropi.webp", position: "center" },
  { category: "Restaurante", label: "Atendimento e hospitalidade no restaurante", src: "/images/hospitalidade-patropi.webp", position: "center" },
  { category: "Gastronomia", label: "Fatia de sobremesa do Patropi", src: "/images/sobremesa-patropi.webp", position: "center" },
] as const;

const filters = ["Todos", "Restaurante", "Gastronomia", "Hotel", "Quartos"];

export function GalleryGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState("Todos");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const shown = useMemo(() => (filter === "Todos" ? items : items.filter((item) => item.category === filter)).slice(0, limit), [filter, limit]);
  const selected = selectedIndex === null ? null : shown[selectedIndex];
  const isOpen = selectedIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    const dialogElement = dialog.current;
    const opener = trigger.current;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const backgroundElements = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== dialogElement && !["SCRIPT", "STYLE"].includes(element.tagName))
      .map((element) => ({ element, inert: element.inert, ariaHidden: element.getAttribute("aria-hidden") }));
    const focusable = () => Array.from(dialogElement?.querySelectorAll<HTMLElement>("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])") || [])
      .filter((element) => element.tabIndex >= 0 && element.getAttribute("aria-hidden") !== "true");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setSelectedIndex(null); return; }
      if (shown.length > 1 && event.key === "ArrowRight") { event.preventDefault(); setSelectedIndex((value) => value === null ? null : (value + 1) % shown.length); return; }
      if (shown.length > 1 && event.key === "ArrowLeft") { event.preventDefault(); setSelectedIndex((value) => value === null ? null : (value - 1 + shown.length) % shown.length); return; }
      if (event.key === "Tab") {
        const controls = focusable();
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!dialogElement?.contains(document.activeElement)) { event.preventDefault(); first.focus(); return; }
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    backgroundElements.forEach(({ element }) => { element.inert = true; element.setAttribute("aria-hidden", "true"); });
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${parseFloat(window.getComputedStyle(document.body).paddingRight || "0") + scrollbarWidth}px`;
    document.addEventListener("keydown", onKey, true);
    const focusFrame = window.requestAnimationFrame(() => closeButton.current?.focus({ preventScroll: true }));
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      backgroundElements.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) element.removeAttribute("aria-hidden"); else element.setAttribute("aria-hidden", ariaHidden);
      });
      window.requestAnimationFrame(() => opener?.isConnected && opener.focus({ preventScroll: true }));
    };
  }, [isOpen, shown.length]);

  const open = (index: number, button: HTMLButtonElement) => { trigger.current = button; setSelectedIndex(index); };
  const selectFilter = (value: string) => { setFilter(value); setSelectedIndex(null); };
  const selectRelative = (distance: number) => setSelectedIndex((value) => value === null ? null : (value + distance + shown.length) % shown.length);

  return (
    <>
      {!limit && <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtros da galeria">{filters.map((item) => <button type="button" key={item} onClick={() => selectFilter(item)} aria-pressed={filter === item} className={`min-h-11 rounded-pill px-4 py-2 text-sm font-bold transition-colors ${filter === item ? "bg-ink text-white" : "border border-ink/15 hover:bg-sand/50"}`}>{item}</button>)}</div>}
      <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item, index) => (
          <button type="button" key={item.src} onClick={(event) => open(index, event.currentTarget)} className={`${index === 0 && filter === "Todos" ? "sm:col-span-2 sm:row-span-2" : ""} ${index === 3 ? "sm:row-span-2" : ""} group relative overflow-hidden rounded-media text-left`} aria-label={`Ampliar: ${item.label} — ${item.category}`}>
            <RealPhoto src={item.src} alt={item.label} position={item.position} className="h-full min-h-full" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            <span className="absolute inset-x-0 bottom-0 translate-y-0 bg-gradient-to-t from-ink/80 to-transparent px-5 pb-4 pt-14 text-xs font-bold uppercase tracking-wider text-white opacity-100 transition duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100">{item.category}</span>
          </button>
        ))}
      </div>
      {selected && createPortal(
        <div ref={dialog} data-gallery-dialog className="fixed inset-0 z-[80] grid place-items-center overscroll-contain bg-ink/95 p-3 sm:p-8" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
          <h2 id={titleId} className="sr-only">{selected.label}</h2>
          <p id={descriptionId} className="sr-only" aria-live="polite">Imagem {selectedIndex! + 1} de {shown.length}. {shown.length > 1 ? "Use as setas do teclado para navegar e Escape para fechar." : "Use Escape para fechar."}</p>
          <button type="button" tabIndex={-1} className="absolute inset-0 cursor-default" onClick={() => setSelectedIndex(null)} aria-label="Fechar lightbox pelo fundo" />
          <button type="button" ref={closeButton} className="absolute right-4 top-4 z-10 grid size-12 touch-manipulation place-items-center rounded-pill bg-white text-ink transition-colors hover:bg-cream" onClick={() => setSelectedIndex(null)} aria-label="Fechar lightbox"><X /></button>
          {shown.length > 1 && <button type="button" className="absolute left-3 z-10 grid size-11 touch-manipulation place-items-center rounded-pill bg-white/90 text-ink transition-colors hover:bg-white sm:left-7" onClick={(event) => { event.stopPropagation(); selectRelative(-1); }} aria-label="Fotografia anterior"><ChevronLeft /></button>}
          {shown.length > 1 && <button type="button" className="absolute right-3 z-10 grid size-11 touch-manipulation place-items-center rounded-pill bg-white/90 text-ink transition-colors hover:bg-white sm:right-7" onClick={(event) => { event.stopPropagation(); selectRelative(1); }} aria-label="Próxima fotografia"><ChevronRight /></button>}
          <div className="relative z-[1] h-[78dvh] w-full max-w-5xl"><RealPhoto src={selected.src} alt={selected.label} position={selected.position} className="h-full rounded-media" sizes="100vw" caption={selected.label} /></div>
        </div>,
        document.body,
      )}
    </>
  );
}
