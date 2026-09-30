"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackEvent, whatsappUrl } from "@/config/business";

export function WhatsAppButton() {
  const pathname = usePathname();
  const message = pathname.startsWith("/hotel")
    ? "Olá! Gostaria de consultar a disponibilidade de hospedagem."
    : pathname.startsWith("/restaurante")
      ? "Olá! Gostaria de informações sobre o restaurante."
      : "Olá! Gostaria de informações sobre o Patropi.";

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent("click_whatsapp", { location: "floating_button", page: pathname })}
      className="fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-pill bg-whatsapp-hover px-5 py-3 text-sm font-bold text-white shadow-elevated transition-[filter] hover:brightness-105 md:flex"
      aria-label="Falar com o Patropi pelo WhatsApp"
    >
      <MessageCircle size={21} /> WhatsApp
    </a>
  );
}
