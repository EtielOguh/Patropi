import Link from "next/link";
import { ArrowRight, MapPin, Navigation } from "lucide-react";
import { FinalCTA } from "@/components/FinalCTA";
import { GalleryGrid } from "@/components/GalleryGrid";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { RealPhoto } from "@/components/RealPhoto";
import { ReviewsMarquee } from "@/components/ReviewsMarquee";
import { RoadLocation } from "@/components/RoadLocation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StructuredData } from "@/components/StructuredData";
import { business } from "@/config/business";

const heroSlides = [
  { src: "/images/fachada-patropi.webp", alt: "Fachada iluminada do Hotel e Churrascaria Patropi", position: "center" },
  { src: "/images/buffet-patropi.webp", alt: "Buffet e salão do restaurante Patropi", position: "center" },
  { src: "/images/quarto-patropi.webp", alt: "Quarto do Hotel Patropi", position: "center 56%" },
] as const;

export default function HomePage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "Organization", name: business.legalDisplayName, url: business.siteUrl, sameAs: [business.instagram.url] },
    { "@context": "https://schema.org", "@type": "Restaurant", name: "Churrascaria Patropi", url: `${business.siteUrl}/restaurante`, telephone: business.restaurant.phone.href, address: { "@type": "PostalAddress", streetAddress: business.location.street, addressLocality: business.location.city, addressRegion: business.location.state, postalCode: business.location.postalCode, addressCountry: business.location.country } },
    { "@context": "https://schema.org", "@type": "Hotel", name: "Hotel Patropi", url: `${business.siteUrl}/hotel`, telephone: business.hotel.phone.href, address: { "@type": "PostalAddress", streetAddress: business.location.street, addressLocality: business.location.city, addressRegion: business.location.state, postalCode: business.location.postalCode, addressCountry: business.location.country } },
  ];

  return (
    <>
      <StructuredData data={schema} />
      <section className="relative min-h-[calc(100svh-76px)] overflow-hidden bg-ink text-white">
        <HeroSlideshow slides={heroSlides} />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-ink via-ink/80 to-ink/15" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        <div className="shell relative z-[3] flex min-h-[calc(100svh-76px)] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold">Restaurante & hospedagem · BR-101</p>
            <h1 className="hero-title-primary mt-5 max-w-[12ch] font-display text-display-1">Sua parada para comer bem, descansar e seguir viagem.</h1>
            <p className="hero-support mt-6 text-white/75">Restaurante, churrascaria e hotel em Casimiro de Abreu, reunidos em uma parada acolhedora às margens da BR-101.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/restaurante" className="btn-primary btn-gold">Conhecer restaurante <ArrowRight size={16} /></Link>
              <Link href="/hotel" className="btn-secondary btn-light">Conhecer hotel</Link>
              <a href={business.location.mapsUrl} target="_blank" rel="noreferrer" className="btn-secondary btn-light hero-tertiary"><Navigation size={16} /> Como chegar</a>
            </div>
            <div className="mt-10 flex items-center gap-4 text-sm text-white/60"><span className="h-px w-12 bg-gold" /><MapPin size={17} className="text-gold" /> {business.location.display}</div>
          </div>
        </div>
      </section>

      <section className="py-section-sm sm:py-section-lg">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
          <ScrollReveal><RealPhoto src="/images/churrasco-patropi.webp" alt="Carne assada na churrasqueira do Patropi" sizes="(max-width: 1024px) 100vw, 50vw" className="service-visual aspect-[4/4.5]" /></ScrollReveal>
          <ScrollReveal delay={120}>
            <SectionHeading eyebrow="Restaurante & churrascaria" title="Uma parada que vale a refeição." text="Buffet, churrasco e sabores variados em um ambiente preparado para receber viajantes, famílias e quem está por perto." />
            <Link href="/restaurante" className="btn-primary mt-8">Conhecer o restaurante <ArrowRight size={16} /></Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-section-sm sm:py-section-lg">
        <div className="shell grid items-center gap-12 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
          <ScrollReveal className="lg:order-2"><RealPhoto src="/images/quarto-patropi.webp" alt="Quarto com cama de casal no Hotel Patropi" sizes="(max-width: 1024px) 100vw, 55vw" position="center 55%" className="service-visual aspect-[4/4.2]" /></ScrollReveal>
          <ScrollReveal delay={120} className="lg:order-1">
            <SectionHeading eyebrow="Hotel Patropi" title="Uma pausa confortável para seguir viagem." text="Conforto e praticidade às margens da BR-101." />
            <Link href="/hotel" className="btn-primary mt-8">Conhecer o hotel <ArrowRight size={16} /></Link>
          </ScrollReveal>
        </div>
      </section>

      <RoadLocation />

      <section className="overflow-hidden bg-ink py-section-sm text-white sm:py-section-lg" id="avaliacoes">
        <div className="shell"><SectionHeading eyebrow="Avaliações públicas" title="Experiências compartilhadas por quem já parou aqui." text="Comentários públicos destacam a comida, o cuidado com o ambiente e a localização conveniente." light /></div>
        <div className="shell mt-12"><ReviewsMarquee /></div>
        <p className="shell mt-5 text-xs text-white/65">Trechos curtos de avaliações públicas. Opiniões pertencem a seus autores.</p>
      </section>

      <section className="py-section-sm sm:py-section-lg">
        <div className="shell">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow="Galeria" title="Do prato ao descanso." text="Uma seleção de imagens reais publicadas nos canais oficiais do Patropi." /><Link href="/galeria" className="btn-secondary self-start">Ver galeria completa <ArrowRight size={16}/></Link></div>
          <div className="mt-12"><GalleryGrid limit={6} /></div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
