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
  description: "Hotel às margens da BR-101 em Casimiro de Abreu. Consulte disponibilidade de hospedagem diretamente com a Patropi.",
  alternates: { canonical: absoluteUrl("/hotel") },
  openGraph: { title: "Hotel Patropi", description: "Hospedagem prática e acolhedora às margens da BR-101.", url: absoluteUrl("/hotel"), images: [{ url: absoluteUrl("/images/fachada-patropi.webp"), width: 1600, height: 645, alt: "Fachada do Hotel Patropi" }] },
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
  { src: "/images/quarto-patropi.webp", alt: "Quarto do Hotel Patropi", position: "center 58%" },
] as const;

export default function HotelPage() {
  const schema = { "@context":"https://schema.org", "@type":"Hotel", name:"Hotel Patropi", url:`${business.siteUrl}/hotel`, image:[`${business.siteUrl}/images/fachada-patropi.webp`,`${business.siteUrl}/images/quarto-patropi.webp`], telephone:business.hotel.phone.href, address:{"@type":"PostalAddress",streetAddress:business.location.street,addressLocality:business.location.city,addressRegion:business.location.state,postalCode:business.location.postalCode,addressCountry:"BR"} };

  return (
    <>
      <StructuredData data={schema}/>
      <CinematicPageHero eyebrow="Hotel" title="Descanse agora. Continue o caminho depois." text="Uma hospedagem prática em Casimiro de Abreu, junto ao restaurante e com acesso direto pela BR-101." slides={heroSlides} quiet>
        <a href={whatsappUrl("Olá! Gostaria de consultar a disponibilidade de hospedagem e conhecer as opções disponíveis.")} target="_blank" rel="noreferrer" className="btn-primary btn-gold"><MessageCircle size={16}/> Consultar disponibilidade</a>
      </CinematicPageHero>

      <section className="py-24 sm:py-32">
        <div className="shell grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <ScrollReveal><SectionHeading eyebrow="Uma pausa conveniente" title="O essencial para recuperar as energias." text="Quartos e suítes são apresentados sem promessas exageradas: uma base confortável para quem viaja, trabalha ou visita a região."/></ScrollReveal>
          <ScrollReveal delay={120}><RealPhoto src="/images/quarto-patropi.webp" alt="Quarto com cama de casal no Hotel Patropi" className="service-visual aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 55vw" position="center 58%"/></ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-2"><SectionHeading eyebrow="Estrutura" title="Comodidades para uma estadia prática." text="Os itens informados são apresentados de forma direta, para facilitar a consulta antes da viagem."/><p className="border-l border-gold pl-6 text-sm leading-6 text-ink/75">Comodidades baseadas em cadastros públicos e pendentes de confirmação final pelo estabelecimento.</p></div>
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {amenities.map(({ label, icon: Icon }, index) => <ScrollReveal key={label} delay={index * 80}><div className="min-h-44 rounded-2xl border border-ink/10 bg-cream p-6"><Icon className="text-olive" strokeWidth={1.5}/><p className="mt-10 text-sm font-bold">{label}</p></div></ScrollReveal>)}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="shell"><SectionHeading eyebrow="Acomodações" title="Imagens reais para escolher com mais clareza." text="O acervo disponível apresenta a fachada e uma das acomodações. Categorias, capacidade, camas e tarifas serão incluídas somente após validação oficial."/>
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
            <ScrollReveal><RealPhoto src="/images/quarto-patropi.webp" alt="Acomodação do Hotel Patropi" className="min-h-[580px] rounded-[2rem]" sizes="(max-width: 1024px) 100vw, 62vw" position="center 55%"/></ScrollReveal>
            <ScrollReveal delay={120}><RealPhoto src="/images/fachada-patropi.webp" alt="Fachada iluminada do Hotel Patropi" className="min-h-[580px] rounded-[2rem]" sizes="(max-width: 1024px) 100vw, 38vw"/></ScrollReveal>
          </div>
        </div>
      </section>

      <section id="consultar" className="bg-olive py-24 text-white">
        <div className="shell"><div className="mb-10 max-w-2xl"><p className="eyebrow text-[#efd79f]">Disponibilidade</p><h2 className="mt-4 font-display text-4xl sm:text-5xl">Consulte as datas diretamente com a Patropi.</h2><p className="mt-5 leading-7 text-white/80">Informe o período e a quantidade de adultos e crianças. A consulta será encaminhada pelo WhatsApp para confirmação com a equipe.</p></div><BookingForm/></div>
      </section>

      <section className="bg-ink py-24 text-white"><div className="shell"><SectionHeading eyebrow="Avaliações públicas" title="A localização por quem já se hospedou." light/><div className="mt-12"><ReviewsMarquee compact scope="hotel"/></div><p className="mt-5 text-xs text-white/65">Trecho curto de avaliação pública. A opinião pertence ao seu autor.</p></div></section>

      <RoadLocation />
      <FinalCTA context="hotel" />
    </>
  );
}
