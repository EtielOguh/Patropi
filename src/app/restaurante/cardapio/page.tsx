import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle, UtensilsCrossed } from "lucide-react";
import { RealPhoto } from "@/components/RealPhoto";
import { absoluteUrl, business, whatsappUrl } from "@/config/business";

export const metadata: Metadata = {
  title: "Cardápio",
  description: "Conheça os sabores do buffet, do churrasco e da cozinha do Patropi.",
  alternates: { canonical: absoluteUrl("/restaurante/cardapio") },
  robots: { index: false, follow: true },
  openGraph: { title: "Cardápio | Churrascaria Patropi", description: "Conheça os sabores do buffet, do churrasco e da cozinha do Patropi.", url: absoluteUrl("/restaurante/cardapio"), images: [{ url: absoluteUrl("/images/restaurante/cozinha-brasileira.webp"), width: 2200, height: 1467, alt: "Pratos do buffet do Patropi" }] },
  twitter: { card: "summary_large_image", title: "Cardápio | Churrascaria Patropi", description: "Conheça os sabores do buffet, do churrasco e da cozinha do Patropi.", images: [absoluteUrl("/images/restaurante/cozinha-brasileira.webp")] },
};

export default function CardapioPage() {
  return (
    <>
      <section className="bg-ink py-section-sm text-white sm:py-20"><div className="shell"><Link href="/restaurante" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 transition hover:text-white"><ArrowLeft size={15}/> Restaurante</Link><p className="eyebrow mt-10 text-gold">Sabores do Patropi</p><h1 className="hero-title-compact mt-5 max-w-4xl font-display text-display-1-compact">Do buffet ao churrasco, opções para aproveitar cada pausa.</h1></div></section>
      <section className="py-section-sm sm:py-section-lg"><div className="shell grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div><RealPhoto src="/images/restaurante/cozinha-brasileira.webp" alt="Pratos da cozinha brasileira no buffet do Patropi" className="aspect-[4/5] rounded-media" sizes="(max-width: 1024px) 100vw, 45vw"/></div>
        <div><UtensilsCrossed className="text-ember" size={34} strokeWidth={1.4}/><h2 className="mt-7 font-display text-display-2">Quer conhecer as opções disponíveis?</h2><p className="mt-6 max-w-xl text-body-lg text-ink/75">Fale com nossa equipe para saber mais sobre o buffet, o churrasco e os pratos disponíveis.</p>
          <div className="mt-8 flex flex-wrap gap-2">{business.restaurant.services.map((service) => <span key={service} className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold">{service}</span>)}</div>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/restaurante" className="btn-secondary"><ArrowLeft size={16}/> Voltar ao restaurante</Link><a href={whatsappUrl("Olá! Gostaria de conhecer as opções disponíveis no cardápio do restaurante Patropi.")} target="_blank" rel="noreferrer" className="btn-primary"><MessageCircle size={16}/> Perguntar pelo cardápio</a></div>
        </div>
      </div></section>
    </>
  );
}
