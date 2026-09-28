"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, trackEvent, whatsappUrl } from "@/config/business";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menu = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const focusable = () => Array.from(menu.current?.querySelectorAll<HTMLElement>("a, button") || []);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const items = focusable();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    window.requestAnimationFrame(() => focusable()[0]?.focus());
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", handleKey); menuButton.current?.focus(); };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/95 backdrop-blur-md">
      <div className="shell flex h-[76px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Navegação principal">
          {navigation.filter((item) => item.href !== "/").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href !== "/#localizacao" && (pathname === item.href || pathname.startsWith(`${item.href}/`)) ? "page" : undefined}
              className={`nav-link ${item.href !== "/#localizacao" && (pathname === item.href || pathname.startsWith(`${item.href}/`)) ? "text-ember" : "text-ink/75"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={whatsappUrl("Olá! Gostaria de consultar a disponibilidade de hospedagem e conhecer as opções disponíveis.")}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("click_whatsapp", { location: "header" })}
          className="btn-primary !hidden lg:!inline-flex"
        >
          <MessageCircle size={16} /> Consultar disponibilidade
        </a>
        <button
          ref={menuButton}
          className="grid size-11 place-items-center rounded-full border border-ink/15 xl:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav ref={menu} id="mobile-menu" className="fixed inset-x-0 top-[76px] z-50 flex h-[calc(100dvh-76px)] overflow-y-auto bg-cream xl:hidden" aria-label="Menu mobile">
          <div className="shell flex flex-1 flex-col justify-center py-10">
            <p className="eyebrow mb-8 text-ember">Navegação</p>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-ink/10 py-4 font-display text-3xl leading-none transition hover:pl-2 hover:text-ember">
                {item.label}
              </Link>
            ))}
            <a href={whatsappUrl("Olá! Gostaria de consultar a disponibilidade de hospedagem e conhecer as opções disponíveis.")} target="_blank" rel="noreferrer" className="btn-primary mt-8 justify-center">
              <MessageCircle size={17} /> Consultar disponibilidade
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
