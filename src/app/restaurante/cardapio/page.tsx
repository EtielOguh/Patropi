import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle, UtensilsCrossed } from "lucide-react";
import { RealPhoto } from "@/components/RealPhoto";
import { absoluteUrl, business, whatsappUrl } from "@/config/business";

export const metadata: Metadata = {
  title: "Cardápio",
  description: "Área preparada para o cardápio oficial do Patropi.",
  alternates: { canonical: absoluteUrl("/restaurante/cardapio") },
  robots: { index: false, follow: true },
  openGraph: { title: "Cardápio | Churrascaria Patropi", description: "Área preparada para receber o cardápio oficial do Patropi.", url: absoluteUrl("/restaurante/cardapio"), images: [{ url: absoluteUrl("/images/restaurante/cozinha-brasileira.webp"), width: 2200, height: 1467, alt: "Pratos do buffet do Patropi" }] },
  twitter: { card: "summary_large_image", title: "Cardápio | Churrascaria Patropi", description: "Área preparada para receber o cardápio oficial do Patropi.", images: [absoluteUrl("/images/restaurante/cozinha-brasileira.webp")] },
};

export default function CardapioPage() {
  return (
    <>
      <section className="bg-ink py-section-sm text-white sm:py-20"><div className="shell"><Link href="/restaurante" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 transition hover:text-white"><ArrowLeft size={15}/> Restaurante</Link><p className="eyebrow mt-10 text-gold">Cardápio digital</p><h1 className="hero-title-compact mt-5 max-w-4xl font-display text-display-1-compact">A experiência está pronta. O cardápio oficial está a caminho.</h1></div></section>
      <section className="py-section-sm sm:py-section-lg"><div className="shell grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="relative"><RealPhoto src="/images/restaurante/cozinha-brasileira.webp" alt="Pratos da cozinha brasileira no buffet do Patropi" className="aspect-[4/5] rounded-media" sizes="(max-width: 1024px) 100vw, 45vw"/><span className="absolute left-5 top-5 rounded-pill bg-cream px-4 py-2 text-label font-bold uppercase tracking-[.12em] text-ink shadow-soft">Em preparação</span></div>
        <div><UtensilsCrossed className="text-ember" size={34} strokeWidth={1.4}/><h2 className="mt-7 font-display text-display-2">Publicação responsável, sem itens ou preços presumidos.</h2><p className="mt-6 max-w-xl text-body-lg text-ink/75">Categorias, pratos, preços e disponibilidade serão publicados somente após o envio e a validação do cardápio oficial do Patropi.</p>
          <div className="mt-8 flex flex-wrap gap-2">{business.restaurant.services.map((service) => <span key={service} className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold">{service}</span>)}</div>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/restaurante" className="btn-secondary"><ArrowLeft size={16}/> Voltar ao restaurante</Link><a href={whatsappUrl("Olá! Gostaria de informações sobre o cardápio e o funcionamento do restaurante Patropi.")} target="_blank" rel="noreferrer" className="btn-primary"><MessageCircle size={16}/> Consultar restaurante</a></div>
        </div>
      </div></section>
    </>
  );
}
