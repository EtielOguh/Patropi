"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { RealPhoto } from "./RealPhoto";

const items = [
  { category: "Hotel", label: "Fachada do Hotel e Churrascaria Patropi", src: "/images/fachada-patropi.webp", position: "center" },
  { category: "Restaurante", label: "Buffet e salão da Churrascaria Patropi", src: "/images/buffet-patropi.webp", position: "center" },
  { category: "Quartos", label: "Quarto com cama de casal no Hotel Patropi", src: "/images/quarto-patropi.webp", position: "center 55%" },
  { category: "Gastronomia", label: "Carne assada na churrasqueira da Patropi", src: "/images/churrasco-patropi.webp", position: "center" },
  { category: "Gastronomia", label: "Sobremesa de chocolate servida na Patropi", src: "/images/sobremesa-chocolate.webp", position: "center" },
  { category: "Restaurante", label: "Equipe da Patropi recebendo uma cliente", src: "/images/equipe-patropi.webp", position: "center" },
  { category: "Gastronomia", label: "Pratos quentes do buffet da Patropi", src: "/images/prato-buffet.webp", position: "center" },
  { category: "Gastronomia", label: "Corte assado na churrasqueira", src: "/images/carne-patropi.webp", position: "center" },
  { category: "Restaurante", label: "Atendimento e hospitalidade no restaurante", src: "/images/hospitalidade-patropi.webp", position: "center" },
  { category: "Gastronomia", label: "Fatia de sobremesa da Patropi", src: "/images/sobremesa-patropi.webp", position: "center" },
] as const;

const filters = ["Todos", "Restaurante", "Gastronomia", "Hotel", "Quartos"];

export function GalleryGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState("Todos");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const shown = useMemo(() => (filter === "Todos" ? items : items.filter((item) => item.category === filter)).slice(0, limit), [filter, limit]);
  const selected = selectedIndex === null ? null : shown[selectedIndex];
  const isOpen = selectedIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") setSelectedIndex((value) => value === null ? null : (value + 1) % shown.length);
      if (event.key === "ArrowLeft") setSelectedIndex((value) => value === null ? null : (value - 1 + shown.length) % shown.length);
      if (event.key === "Tab") {
        const controls = Array.from(dialog.current?.querySelectorAll<HTMLElement>("button") || []);
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = previousOverflow; trigger.current?.focus(); };
  }, [isOpen, shown.length]);

  const open = (index: number, button: HTMLButtonElement) => { trigger.current = button; setSelectedIndex(index); };
  const selectFilter = (value: string) => { setFilter(value); setSelectedIndex(null); };

  return (
    <>
      {!limit && <div className="mb-10 flex flex-wrap gap-2" aria-label="Filtros da galeria">{filters.map((item) => <button key={item} onClick={() => selectFilter(item)} aria-pressed={filter === item} className={`rounded-full px-4 py-2 text-sm font-bold transition ${filter === item ? "bg-ink text-white" : "border border-ink/15 hover:bg-sand/50"}`}>{item}</button>)}</div>}
      <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item, index) => (
          <button key={item.src} onClick={(event) => open(index, event.currentTarget)} className={`${index === 0 && filter === "Todos" ? "sm:col-span-2 sm:row-span-2" : ""} ${index === 3 ? "sm:row-span-2" : ""} group relative overflow-hidden rounded-2xl text-left focus:outline-none focus:ring-4 focus:ring-gold/50`} aria-label={`Ampliar: ${item.label}`}>
            <RealPhoto src={item.src} alt={item.label} position={item.position} className="h-full min-h-full" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/80 to-transparent px-5 pb-4 pt-14 text-xs font-bold uppercase tracking-wider text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">{item.category}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div ref={dialog} className="fixed inset-0 z-[80] grid place-items-center bg-ink/95 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={selected.label} onClick={() => setSelectedIndex(null)}>
          <button ref={closeButton} className="absolute right-4 top-4 z-10 grid size-12 place-items-center rounded-full bg-white text-ink" onClick={() => setSelectedIndex(null)} aria-label="Fechar"><X /></button>
          <button className="absolute left-3 z-10 grid size-11 place-items-center rounded-full bg-white/90 text-ink sm:left-7" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex! - 1 + shown.length) % shown.length); }} aria-label="Fotografia anterior"><ChevronLeft /></button>
          <button className="absolute right-3 z-10 grid size-11 place-items-center rounded-full bg-white/90 text-ink sm:right-7" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex! + 1) % shown.length); }} aria-label="Próxima fotografia"><ChevronRight /></button>
          <div className="h-[78vh] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}><RealPhoto src={selected.src} alt={selected.label} position={selected.position} className="h-full rounded-2xl" sizes="100vw" caption={selected.label} /></div>
        </div>
      )}
    </>
  );
}
