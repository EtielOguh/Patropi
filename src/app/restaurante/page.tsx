import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { CinematicPageHero } from "@/components/CinematicPageHero";
import { FinalCTA } from "@/components/FinalCTA";
import { HorizontalGallery } from "@/components/HorizontalGallery";
import { HoursTable } from "@/components/HoursStatus";
import { RestaurantStory } from "@/components/RestaurantStory";
import { ReviewsMarquee } from "@/components/ReviewsMarquee";
import { RoadLocation } from "@/components/RoadLocation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, business, whatsappUrl } from "@/config/business";

export const metadata: Metadata = {
  title: "Restaurante e Churrascaria",
  description: "Restaurante e churrascaria às margens da BR-101 em Casimiro de Abreu, com buffet, churrasco e sabores variados.",
  alternates: { canonical: absoluteUrl("/restaurante") },
  openGraph: { title: "Restaurante e Churrascaria Patropi", description: "Buffet, churrasco e sabores variados às margens da BR-101.", url: absoluteUrl("/restaurante"), images: [{ url: absoluteUrl("/images/buffet-patropi.webp"), width: 1600, height: 900, alt: "Buffet do restaurante Patropi" }] },
  twitter: { card: "summary_large_image", title: "Restaurante e Churrascaria Patropi", description: "Buffet, churrasco e sabores variados às margens da BR-101.", images: [absoluteUrl("/images/buffet-patropi.webp")] },
};

const heroSlides = [
  { src: "/images/buffet-patropi.webp", alt: "Buffet completo do restaurante Patropi" },
  { src: "/images/churrasco-patropi.webp", alt: "Churrasco preparado no Patropi", position: "center" },
  { src: "/images/sobremesa-chocolate.webp", alt: "Sobremesa servida no Patropi", position: "center" },
] as const;

export default function RestaurantePage() {
  const schema = { "@context": "https://schema.org", "@type": "Restaurant", name: "Churrascaria Patropi", url: `${business.siteUrl}/restaurante`, image: [`${business.siteUrl}/images/buffet-patropi.webp`, `${business.siteUrl}/images/churrasco-patropi.webp`], telephone: business.restaurant.phone.href, servesCuisine: ["Brasileira", "Churrasco", "Japonesa"], address: { "@type": "PostalAddress", streetAddress: business.location.street, addressLocality: business.location.city, addressRegion: business.location.state, postalCode: business.location.postalCode, addressCountry: "BR" }, sameAs: [business.instagram.url, business.reviews.tripadvisorRestaurantUrl] };

  return (
    <>
      <StructuredData data={schema}/>
      <CinematicPageHero eyebrow="Restaurante" title="Sabores para transformar a pausa em parte da viagem." text="Buffet, churrasco e opções variadas em um endereço prático para quem está em Casimiro de Abreu ou seguindo pela BR-101." slides={heroSlides}>
        <a href={business.location.mapsUrl} target="_blank" rel="noreferrer" className="btn-primary btn-gold"><MapPin size={16}/> Como chegar</a>
        <a href={whatsappUrl("Olá! Gostaria de informações sobre o restaurante Patropi.")} target="_blank" rel="noreferrer" className="btn-secondary btn-light"><MessageCircle size={16}/> Falar com o restaurante</a>
      </CinematicPageHero>

      <section className="py-section-sm sm:py-section-lg">
        <div className="shell grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
          <ScrollReveal><SectionHeading eyebrow="À mesa" title="Variedade, praticidade e uma pausa sem pressa." /></ScrollReveal>
          <ScrollReveal delay={100}><p className="max-w-[62ch] text-body-lg text-ink/75">Fontes públicas descrevem uma operação com buffet/self-service, churrasco e culinárias brasileira e japonesa. A experiência é apresentada com clareza, sem promessas sobre cardápio, preços ou disponibilidade.</p><Link href="/restaurante/cardapio" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ember">Consultar área do cardápio <ArrowRight size={15}/></Link></ScrollReveal>
        </div>
      </section>

      <section className="bg-ink py-section-sm text-white sm:py-section-lg">
        <div className="shell mb-10 lg:mb-0"><p className="eyebrow text-gold">A experiência</p><h2 className="mt-5 max-w-3xl font-display text-display-2">Quatro sabores do Patropi, apresentados no ritmo da sua visita.</h2></div>
        <div className="shell mt-12"><RestaurantStory /></div>
      </section>

      <section className="bg-white py-section-sm sm:py-section-lg">
        <div className="shell grid items-start gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
          <div><SectionHeading eyebrow="Planeje sua visita" title="Horários claros, sem surpresa no caminho." text="Consulte o funcionamento indicado e confirme por telefone antes de sair, especialmente em feriados e datas especiais."/><a href={`tel:${business.restaurant.phone.href}`} className="btn-secondary mt-7"><Phone size={16}/> Ligar para o restaurante</a></div>
          <HoursTable />
        </div>
      </section>

      <HorizontalGallery />

      <section className="bg-ink py-section-sm text-white sm:py-section-lg"><div className="shell"><SectionHeading eyebrow="Avaliações públicas" title="O que os visitantes contam sobre a experiência." light/><div className="mt-12"><ReviewsMarquee compact/></div><p className="mt-5 text-xs text-white/65">Trechos curtos de avaliações públicas. Opiniões pertencem a seus autores.</p></div></section>

      <RoadLocation />
      <FinalCTA context="restaurante" />
    </>
  );
}
