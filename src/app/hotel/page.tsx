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
  { label: "Wi-Fi", icon: Wifi },
  { label: "Café da manhã", icon: Coffee },
  { label: "Estacionamento", icon: Car },
  { label: "Ar-condicionado", icon: Snowflake },
  { label: "TV", icon: Tv },
] as const;

const heroSlides = [
  { src: "/images/fachada-patropi.webp", alt: "Fachada do Hotel e Churrascaria Patropi" },
  { src: "/images/hotel/suite-principal.webp", alt: "Suíte principal do Hotel Patropi", position: "center 58%" },
  { src: "/images/hotel/cafe-da-manha-buffet.webp", alt: "Café da manhã servido no Hotel Patropi", position: "center" },
] as const;

export default function HotelPage() {
  const schema = { "@context":"https://schema.org", "@type":"Hotel", name:"Hotel Patropi", url:`${business.siteUrl}/hotel`, image:[`${business.siteUrl}/images/fachada-patropi.webp`,`${business.siteUrl}/images/hotel/suite-principal.webp`,`${business.siteUrl}/images/hotel/cafe-da-manha-buffet.webp`], telephone:business.hotel.phone.href, address:{"@type":"PostalAddress",streetAddress:business.location.street,addressLocality:business.location.city,addressRegion:business.location.state,postalCode:business.location.postalCode,addressCountry:"BR"} };

  return (
    <>
      <StructuredData data={schema}/>
      <CinematicPageHero eyebrow="Hotel" title="Descanse agora. Continue o caminho depois." text="Uma hospedagem prática em Casimiro de Abreu, junto ao restaurante e com acesso direto pela BR-101." slides={heroSlides} quiet>
        <a href={whatsappUrl("Olá! Gostaria de consultar a disponibilidade de hospedagem e conhecer as opções disponíveis.")} target="_blank" rel="noreferrer" className="btn-primary btn-gold"><MessageCircle size={16}/> Consultar disponibilidade</a>
      </CinematicPageHero>

      <section className="py-section-sm sm:py-section-lg">
        <div className="shell grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <ScrollReveal><SectionHeading eyebrow="Uma pausa conveniente" title="O essencial para recuperar as energias." text="Quartos e suítes são apresentados sem promessas exageradas: uma base confortável para quem viaja, trabalha ou visita a região."/></ScrollReveal>
          <ScrollReveal delay={120}><RealPhoto src="/images/hotel/quarto-standard.webp" alt="Quarto standard do Hotel Patropi" className="service-visual aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 55vw" position="center 58%"/></ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-section-sm sm:py-section-lg">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-2"><SectionHeading eyebrow="Estrutura" title="Comodidades para uma estadia prática." text="Os itens informados são apresentados de forma direta, para facilitar a consulta antes da viagem."/><p className="border-l border-gold pl-6 text-sm leading-6 text-ink/75">Comodidades baseadas em cadastros públicos e pendentes de confirmação final pelo estabelecimento.</p></div>
          <div className="amenities-list mt-14">
            {amenities.map(({ label, icon: Icon }) => <div key={label} className="amenity-item"><div className="amenity-content"><Icon className="text-olive" strokeWidth={1.5}/><p className="text-sm font-bold">{label}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="py-section-sm sm:py-section-lg">
        <div className="shell"><SectionHeading eyebrow="Acomodações" title="Imagens reais para escolher com mais clareza." text="Quartos, suíte e áreas do hotel apresentados em diferentes perspectivas. Categorias, capacidade, camas e tarifas serão incluídas somente após validação oficial."/>
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
