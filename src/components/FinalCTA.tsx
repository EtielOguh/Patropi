import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { business, whatsappUrl } from "@/config/business";

export function FinalCTA({ context = "geral" }: { context?: "geral" | "restaurante" | "hotel" }) {
  const hotel = context === "hotel";
  const restaurant = context === "restaurante";
  const eyebrow = hotel ? "Hotel Patropi" : restaurant ? "Restaurante Patropi" : "Hotel & Churrascaria";
  const title = hotel ? "Seu descanso começa com uma conversa." : restaurant ? "Venha conhecer os sabores da casa." : "O Patropi está pronto para receber você.";

  return (
    <section className="relative overflow-hidden bg-wine py-20 text-white sm:py-24">
      <div className="shell relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl"><p className="eyebrow text-accent-soft">{eyebrow}</p><h2 className="mt-4 max-w-[18ch] font-display text-display-2">{title}</h2></div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          {hotel && <a href={whatsappUrl("Olá! Gostaria de consultar a disponibilidade de hospedagem no Hotel Patropi.")} target="_blank" rel="noreferrer" className="btn-primary btn-gold"><MessageCircle size={16}/> Consultar disponibilidade</a>}
          {restaurant && <a href={business.location.mapsUrl} target="_blank" rel="noreferrer" className="btn-primary btn-gold"><MapPin size={16}/> Como chegar</a>}
          {!hotel && !restaurant && <Link href="/restaurante" className="btn-primary btn-gold">Conhecer restaurante <ArrowRight size={16}/></Link>}
          <Link href={hotel || restaurant ? "/galeria" : "/hotel"} className="btn-secondary btn-light">{hotel || restaurant ? "Ver galeria" : "Conhecer hotel"}</Link>
        </div>
      </div>
    </section>
  );
}
