import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { FAQ, FAQItem } from "@/components/FAQ";
import { RealPhoto } from "@/components/RealPhoto";
import { SectionHeading } from "@/components/SectionHeading";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, business, whatsappUrl } from "@/config/business";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com o Hotel e Churrascaria Patropi em Casimiro de Abreu.",
  alternates: { canonical: absoluteUrl("/contato") },
  openGraph: { title: "Contato | Patropi", description: "Telefone, WhatsApp e localização do Hotel e Churrascaria Patropi.", url: absoluteUrl("/contato"), images: [{ url: absoluteUrl("/images/fachada-patropi.webp"), width: 1600, height: 645, alt: "Fachada do Patropi" }] },
  twitter: { card: "summary_large_image", title: "Contato | Patropi", description: "Telefone, WhatsApp e localização do Hotel e Churrascaria Patropi.", images: [absoluteUrl("/images/fachada-patropi.webp")] },
};

const cards = [
  { title: "WhatsApp", value: business.whatsapp.label, action: "Conversar agora", href: whatsappUrl("Olá! Gostaria de informações sobre o Patropi."), icon: MessageCircle, featured: true },
  { title: "Hotel", value: business.hotel.phone.label, action: "Ligar para o hotel", href: `tel:${business.hotel.phone.href}`, icon: Phone },
  { title: "Restaurante", value: business.restaurant.phone.label, action: "Ligar para o restaurante", href: `tel:${business.restaurant.phone.href}`, icon: Phone },
  { title: "Localização", value: business.location.display, action: "Traçar rota", href: business.location.mapsUrl, icon: MapPin },
  { title: "Instagram", value: business.instagram.handle, action: "Acompanhar o Patropi", href: business.instagram.url, icon: Instagram },
  { title: "E-mail", value: "Endereço oficial pendente", action: "Em configuração", href: null, icon: Mail },
] as const;

const faq: FAQItem[] = [
  { question: "Onde fica o Patropi?", answer: "O Patropi fica às margens da BR-101, no km 206, em Casimiro de Abreu — RJ. Como há divergência pública sobre a numeração, recomendamos abrir a rota pelo mapa ou confirmar por telefone." },
  { question: "Como consultar disponibilidade do hotel?", answer: "Informe as datas e a quantidade de adultos e crianças no formulário de consulta. O site abre o WhatsApp com esses dados prontos para você confirmar diretamente com a equipe do Patropi." },
  { question: "O hotel oferece estacionamento e Wi-Fi?", answer: "Cadastros públicos informam estacionamento e Wi-Fi. Essas comodidades estão sinalizadas como pendentes de validação final pelo estabelecimento." },
  { question: "Qual é o horário do restaurante?", answer: "Os horários públicos encontrados indicam atendimento de segunda a sábado, das 11h às 22h, e domingo, das 11h às 17h. Confirme antes da visita, especialmente em feriados." },
  { question: "Como chegar?", answer: "Use o botão “Traçar rota” para abrir o cadastro do Patropi no Google Maps e navegar até o local." },
];

export default function ContatoPage() {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  const [primaryChannel, ...secondaryChannels] = cards;
  const PrimaryIcon = primaryChannel.icon;

  return (
    <>
      <StructuredData data={schema}/>
      <section className="relative min-h-[58svh] overflow-hidden bg-ink text-white">
        <RealPhoto src="/images/fachada-patropi.webp" alt="Fachada do Hotel e Churrascaria Patropi" priority sizes="100vw" coverParent className="opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/25" />
        <div className="shell relative flex min-h-[58svh] items-center py-section-sm"><div className="max-w-3xl"><p className="eyebrow text-gold">Contato</p><h1 className="hero-title-compact mt-5 max-w-[14ch] font-display text-display-1-compact">Estamos no caminho para ajudar você.</h1><p className="hero-support mt-6 text-white/75">Para hospedagem, restaurante ou localização, escolha o canal mais conveniente.</p></div></div>
      </section>

      <section className="py-section-sm sm:py-section-lg"><div className="shell"><SectionHeading eyebrow="Fale com o Patropi" title="Um canal para cada necessidade." text="Para respostas rápidas, use o WhatsApp ou fale diretamente com o hotel e o restaurante."/>
        <div className="mt-12 grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
          <article className="flex min-h-72 flex-col rounded-card bg-olive p-7 text-white sm:p-9"><PrimaryIcon className="text-gold"/><p className="mt-10 text-xs font-bold uppercase tracking-widest text-white/70">{primaryChannel.title}</p><p className="mt-2 font-display text-3xl leading-snug">{primaryChannel.value}</p><a href={primaryChannel.href} target="_blank" rel="noreferrer" className="btn-primary btn-gold mt-auto self-start">{primaryChannel.action}<ArrowUpRight size={15}/></a></article>
          <div className="border-y border-ink/15">
            {secondaryChannels.map(({ title, value, action, href, icon: Icon }) => <article key={title} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-b border-ink/10 py-5 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)_auto]"><Icon className="text-ember" size={21}/><div className="min-w-0"><p className="text-xs font-bold uppercase tracking-widest text-ink/75">{title}</p><p className="mt-1 break-words font-display text-xl leading-snug sm:text-2xl">{value}</p></div>{href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="col-start-2 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-wider text-ember sm:col-start-auto">{action}<ArrowUpRight size={15}/></a> : <span className="col-start-2 text-xs font-bold uppercase tracking-wider text-ink/75 sm:col-start-auto">{action}</span>}</article>)}
          </div>
        </div>
      </div></section>

      <section className="bg-sand/50 py-section-sm sm:py-section-lg"><div className="shell grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20"><div><SectionHeading eyebrow="Envie uma mensagem" title="Conte o que você precisa." text="Preencha os dados e abra uma mensagem pronta no WhatsApp para falar diretamente com a equipe."/><p className="mt-6 border-l border-gold pl-5 text-sm leading-6 text-ink/75">O envio só é concluído quando você confirma a mensagem no WhatsApp.</p></div><Suspense fallback={<div className="min-h-[520px] rounded-card bg-white"/>}><ContactForm/></Suspense></div></section>

      <section className="bg-white py-section-sm sm:py-section-lg"><div className="shell grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><SectionHeading eyebrow="Dúvidas frequentes" title="Antes de pegar a estrada." text="Respostas objetivas baseadas apenas nas informações públicas que puderam ser verificadas."/><FAQ items={faq}/></div></section>
    </>
  );
}
