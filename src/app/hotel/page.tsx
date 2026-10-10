import type { Metadata } from "next";
import { Car, Coffee, MessageCircle, Snowflake, Tv, Wifi } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { CinematicPageHero } from "@/components/CinematicPageHero";
import { FinalCTA } from "@/components/FinalCTA";
import { RealPhoto } from "@/components/RealPhoto";
import { ReviewsMarquee } from "@/components/ReviewsMarquee";
import { RoadLocation } from "@/components/RoadLocation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, business, whatsappUrl } from "@/config/business";

export const metadata: Metadata = {
  title: "Hotel",
  description: "Hotel às margens da BR-101 em Casimiro de Abreu. Consulte disponibilidade de hospedagem diretamente com o Patropi.",
  alternates: { canonical: absoluteUrl("/hotel") },
  openGraph: { title: "Hotel Patropi", description: "Hospedagem prática e acolhedora às margens da BR-101.", url: absoluteUrl("/hotel"), images: [{ url: absoluteUrl("/images/fachada-patropi.webp"), width: 1600, height: 645, alt: "Fachada do Hotel Patropi" }] },
  twitter: { card: "summary_large_image", title: "Hotel Patropi", description: "Hospedagem prática e acolhedora às margens da BR-101.", images: [absoluteUrl("/images/fachada-patropi.webp")] },
};

const amenities = [
  { label: "Wi-Fi", description: "Conexão para manter sua rotina.", icon: Wifi },
  { label: "Café da manhã colonial", description: "Variedade para começar bem o dia.", icon: Coffee },
  { label: "Estacionamento", description: "Praticidade para quem chega pela estrada.", icon: Car },
  { label: "Ar-condicionado", description: "Mais conforto para o seu descanso.", icon: Snowflake },
  { label: "TV", description: "Comodidade nos momentos de pausa.", icon: Tv },
] as const;

const heroSlides = [
  { src: "/images/fachada-patropi.webp", alt: "Fachada do Hotel e Churrascaria Patropi" },
  { src: "/images/hotel/suite-principal.webp", alt: "Suíte principal do Hotel Patropi", position: "center 58%" },
  { src: "/images/hotel/cafe-da-manha-buffet.webp", alt: "Café da manhã servido no Hotel Patropi", position: "center" },
] as const;

export default function HotelPage() {
  const schema = { "@context":"https://schema.org", "@type":"Hotel", name:"Hotel Patropi", url:`${business.siteUrl}/hotel`, image:[`${business.siteUrl}/images/fachada-patropi.webp`,`${business.siteUrl}/images/hotel/suite-principal.webp`,`${business.siteUrl}/images/hotel/cafe-da-manha-buffet.webp`], telephone:business.hotel.phone.href, address:{"@type":"PostalAddress",streetAddress:business.location.street,addressLocality:business.location.city,addressRegion:business.location.state,postalCode:business.location.postalCode,addressCountry:"BR"}, sameAs:[business.hotelInstagram.url,business.reviews.tripadvisorHotelUrl] };

  return (
    <>
      <StructuredData data={schema}/>
      <CinematicPageHero eyebrow="Hotel" title="Descanse agora. Continue o caminho depois." text="Uma hospedagem prática em Casimiro de Abreu, junto ao restaurante e com acesso direto pela BR-101." slides={heroSlides} quiet>
        <a href={whatsappUrl("Olá! Gostaria de consultar a disponibilidade de hospedagem e conhecer as opções disponíveis.")} target="_blank" rel="noreferrer" className="btn-primary btn-gold"><MessageCircle size={16}/> Consultar disponibilidade</a>
      </CinematicPageHero>

      <section className="py-section-sm sm:py-section-lg">
        <div className="shell grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <ScrollReveal><SectionHeading eyebrow="Uma pausa conveniente" title="O essencial para recuperar as energias." text="Quartos e suítes preparados para oferecer uma base confortável a quem viaja, trabalha ou visita a região."/></ScrollReveal>
          <ScrollReveal delay={120}><RealPhoto src="/images/hotel/quarto-standard.webp" alt="Quarto standard do Hotel Patropi" className="service-visual aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 55vw" position="center 58%"/></ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-section-sm sm:py-section-lg">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            <SectionHeading eyebrow="Estrutura" title="Conforto essencial para descansar e seguir viagem." text="Wi-Fi, café da manhã, estacionamento e quartos climatizados para tornar sua parada mais confortável."/>
            <div className="self-start border-l border-gold pl-6 lg:mt-2">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-olive">Planeje sua estadia</p>
              <h3 className="mt-3 font-display text-2xl leading-tight text-ink">Tire suas dúvidas com nossa equipe.</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-ink/70">Fale conosco sobre comodidades, datas e opções de hospedagem.</p>
              <a href={whatsappUrl("Olá! Gostaria de confirmar as comodidades disponíveis no Hotel Patropi.")} target="_blank" rel="noreferrer" className="btn-secondary mt-5"><MessageCircle size={16}/> Falar com o hotel</a>
            </div>
          </div>
          <ul className="amenities-list mt-14" aria-label="Comodidades do Hotel Patropi">
            {amenities.map(({ label, description, icon: Icon }) => (
              <li key={label} className="amenity-item">
                <div className="amenity-content">
                  <Icon aria-hidden="true" className="shrink-0 text-olive" size={28} strokeWidth={1.5}/>
                  <div>
                    <p className="text-sm font-bold text-ink">{label}</p>
                    <p className="mt-2 text-xs leading-5 text-ink/65">{description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-section-sm sm:py-section-lg">
        <div className="shell"><SectionHeading eyebrow="Acomodações" title="Imagens reais para escolher com mais clareza." text="Conheça quartos, suítes e áreas do hotel por diferentes perspectivas. Para informações sobre categorias, capacidade e tarifas, fale com nossa equipe."/>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:auto-rows-[280px] lg:grid-cols-12">
            <ScrollReveal className="md:col-span-2 lg:col-span-7 lg:row-span-2"><RealPhoto src="/images/hotel/suite-principal.webp" alt="Suíte principal do Hotel Patropi" className="h-full min-h-[440px] rounded-media lg:min-h-0" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 58vw" position="center 55%"/></ScrollReveal>
            <ScrollReveal delay={80} className="lg:col-span-5"><RealPhoto src="/images/hotel/quarto-standard.webp" alt="Quarto standard do Hotel Patropi" className="h-full min-h-[280px] rounded-media lg:min-h-0" sizes="(max-width: 768px) 100vw, 50vw"/></ScrollReveal>
            <ScrollReveal delay={120} className="lg:col-span-5"><RealPhoto src="/images/hotel/suite-hidromassagem.webp" alt="Hidromassagem da suíte do Hotel Patropi" className="h-full min-h-[280px] rounded-media lg:min-h-0" sizes="(max-width: 768px) 100vw, 42vw"/></ScrollReveal>
            <ScrollReveal className="lg:col-span-4"><RealPhoto src="/images/hotel/suite-banheiro.webp" alt="Banheiro da suíte do Hotel Patropi" className="h-full min-h-[280px] rounded-media lg:min-h-0" sizes="(max-width: 768px) 100vw, 33vw"/></ScrollReveal>
            <ScrollReveal delay={80} className="lg:col-span-4"><RealPhoto src="/images/hotel/corredor.webp" alt="Corredor interno do Hotel Patropi" className="h-full min-h-[280px] rounded-media lg:min-h-0" sizes="(max-width: 768px) 100vw, 33vw"/></ScrollReveal>
            <ScrollReveal delay={120} className="lg:col-span-4"><RealPhoto src="/images/hotel/recepcao.webp" alt="Recepção do Hotel Patropi" className="h-full min-h-[280px] rounded-media lg:min-h-0" sizes="(max-width: 768px) 100vw, 33vw"/></ScrollReveal>
          </div>
        </div>
      </section>

      <section id="consultar" className="bg-olive py-section-sm text-white sm:py-section-lg">
        <div className="shell"><div className="mb-10 max-w-2xl"><p className="eyebrow text-accent-light">Disponibilidade</p><h2 className="mt-4 font-display text-display-2">Consulte as datas diretamente com o Patropi.</h2><p className="mt-5 text-body text-white/80">Informe o período e a quantidade de adultos e crianças. A consulta será encaminhada pelo WhatsApp para confirmação com a equipe.</p></div><BookingForm/></div>
      </section>

      <section className="bg-ink py-section-sm text-white sm:py-section-lg"><div className="shell"><SectionHeading eyebrow="Avaliações públicas" title="A localização por quem já se hospedou." light/><div className="mt-12"><ReviewsMarquee compact scope="hotel"/></div><p className="mt-5 text-xs text-white/65">Trecho curto de avaliação pública. A opinião pertence ao seu autor.</p></div></section>

      <RoadLocation />
      <FinalCTA context="hotel" />
    </>
  );
}
