import Link from "next/link";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { business, navigation, whatsappUrl } from "@/config/business";
import { Logo } from "./Logo";
import { CookieSettingsButton } from "./CookieSettingsButton";

export function Footer() {
  return (
    <footer className="site-footer bg-ink pt-14 text-white">
      <div className="shell grid gap-10 lg:grid-cols-[1.3fr_.8fr_1fr_1fr]">
        <div><Logo light /><p className="mt-6 max-w-sm text-sm leading-6 text-white/75">Restaurante, churrascaria e hospedagem às margens da BR-101, em Casimiro de Abreu.</p></div>
        <div><p className="footer-title">Navegue</p><ul className="mt-5 space-y-3 text-sm text-white/65">{navigation.slice(1).map((item) => <li key={item.href}><Link href={item.href} className="hover:text-white">{item.label}</Link></li>)}</ul></div>
        <div><p className="footer-title">Contato</p><ul className="mt-5 space-y-4 text-sm text-white/65"><li><a href={`tel:${business.hotel.phone.href}`} className="flex items-center gap-2 hover:text-white"><Phone size={15} /> {business.hotel.phone.label}</a></li><li><a href={whatsappUrl("Olá! Gostaria de informações sobre o Patropi.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white"><MessageCircle size={15} /> WhatsApp {business.whatsapp.label}</a></li><li><a href={business.location.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-white"><MapPin size={15} className="mt-0.5 shrink-0" /> {business.location.display}</a></li><li><a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white"><Instagram size={15} /> {business.instagram.handle}</a></li></ul></div>
        <div><p className="footer-title">Restaurante</p><p className="mt-5 text-sm leading-6 text-white/65">Segunda a sábado · 11h–22h<br />Domingo · 11h–17h</p><p className="mt-4 text-xs text-gold">Horários sujeitos a confirmação</p></div>
      </div>
      <div className="shell mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/65 lg:flex-row lg:items-center lg:justify-between">
        <p>© {new Date().getFullYear()} Patropi. Todos os direitos reservados.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos</Link><Link href="/cookies">Cookies</Link><CookieSettingsButton/><Link href="/politica-de-hospedagem">Política de hospedagem</Link><Link href="/acessibilidade">Acessibilidade</Link></div>
      </div>
    </footer>
  );
}
