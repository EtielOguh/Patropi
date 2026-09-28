"use client";

import { MapPin, MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { business, trackEvent, whatsappUrl } from "@/config/business";

export function MobileBar() {
  const pathname = usePathname();
  const restaurant = pathname.startsWith("/restaurante");
  const phone = restaurant ? business.restaurant.phone : business.hotel.phone;
  const message = restaurant ? "Olá! Gostaria de informações sobre o restaurante Patropi." : pathname.startsWith("/hotel") ? "Olá! Gostaria de consultar a disponibilidade de hospedagem." : "Olá! Gostaria de informações sobre a Patropi.";
  const actions = [
    { label: "Ligar", href: `tel:${phone.href}`, icon: Phone, event: "click_phone" },
    { label: "WhatsApp", href: whatsappUrl(message), icon: MessageCircle, event: "click_whatsapp" },
    { label: "Rotas", href: business.location.mapsUrl, icon: MapPin, event: "click_maps" },
  ];
  return <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 rounded-2xl border border-white/10 bg-ink/95 p-1.5 text-white shadow-2xl backdrop-blur md:hidden">{actions.map(({ label, href, icon: Icon, event }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} onClick={() => trackEvent(event, { location: "mobile_bar", page: pathname })} className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-white/10"><Icon size={17} />{label}</a>)}</div>;
}
