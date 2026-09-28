import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle, UtensilsCrossed } from "lucide-react";
import { RealPhoto } from "@/components/RealPhoto";
import { business, whatsappUrl } from "@/config/business";

export const metadata: Metadata = {
  title: "Cardápio",
  description: "Área preparada para o cardápio oficial da Churrascaria Patropi.",
  alternates: { canonical: "/restaurante/cardapio" },
  robots: { index: false, follow: true },
  openGraph: { title: "Cardápio | Churrascaria Patropi", description: "Área preparada para receber o cardápio oficial da Patropi.", url: "/restaurante/cardapio", images: [{ url: "/images/prato-buffet.webp", width: 360, height: 640, alt: "Pratos quentes do buffet da Patropi" }] },
};

export default function CardapioPage() {
  return (
    <>
      <section className="bg-ink py-16 text-white sm:py-20"><div className="shell"><Link href="/restaurante" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 transition hover:text-white"><ArrowLeft size={15}/> Restaurante</Link><p className="eyebrow mt-12 text-gold">Cardápio digital</p><h1 className="mt-5 max-w-3xl font-display text-5xl leading-tight sm:text-7xl">A experiência está pronta. O cardápio oficial está a caminho.</h1></div></section>
      <section className="py-20 sm:py-28"><div className="shell grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="relative"><RealPhoto src="/images/prato-buffet.webp" alt="Pratos quentes no buffet da Patropi" className="aspect-[4/5] rounded-[2rem]" sizes="(max-width: 1024px) 100vw, 45vw"/><span className="absolute left-5 top-5 rounded-full bg-cream px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-ink shadow-lg">Em preparação</span></div>
        <div><UtensilsCrossed className="text-ember" size={34} strokeWidth={1.4}/><h2 className="mt-7 font-display text-4xl leading-tight sm:text-5xl">Publicação responsável, sem itens ou preços presumidos.</h2><p className="mt-6 max-w-xl text-lg leading-8 text-ink/75">Categorias, pratos, preços e disponibilidade serão publicados somente após o envio e a validação do cardápio oficial da Patropi.</p>
          <div className="mt-8 flex flex-wrap gap-2">{business.restaurant.services.map((service) => <span key={service} className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold">{service}</span>)}</div>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/restaurante" className="btn-secondary"><ArrowLeft size={16}/> Voltar ao restaurante</Link><a href={whatsappUrl("Olá! Gostaria de informações sobre o cardápio e o funcionamento do restaurante Patropi.")} target="_blank" rel="noreferrer" className="btn-primary"><MessageCircle size={16}/> Consultar restaurante</a></div>
        </div>
      </div></section>
    </>
  );
}
