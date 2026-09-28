import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { FAQ, FAQItem } from "@/components/FAQ";
import { RealPhoto } from "@/components/RealPhoto";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, business, whatsappUrl } from "@/config/business";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com o Hotel e Churrascaria Patropi em Casimiro de Abreu.",
  alternates: { canonical: absoluteUrl("/contato") },
  openGraph: { title: "Contato | Patropi", description: "Telefone, WhatsApp e localização do Hotel e Churrascaria Patropi.", url: absoluteUrl("/contato"), images: [{ url: absoluteUrl("/images/fachada-patropi.webp"), width: 1600, height: 645, alt: "Fachada da Patropi" }] },
};

const cards = [
  { title: "WhatsApp", value: business.whatsapp.label, action: "Conversar agora", href: whatsappUrl("Olá! Gostaria de informações sobre a Patropi."), icon: MessageCircle, featured: true },
  { title: "Hotel", value: business.hotel.phone.label, action: "Ligar para o hotel", href: `tel:${business.hotel.phone.href}`, icon: Phone },
  { title: "Restaurante", value: business.restaurant.phone.label, action: "Ligar para o restaurante", href: `tel:${business.restaurant.phone.href}`, icon: Phone },
  { title: "Localização", value: business.location.display, action: "Traçar rota", href: business.location.mapsUrl, icon: MapPin },
  { title: "Instagram", value: business.instagram.handle, action: "Acompanhar a Patropi", href: business.instagram.url, icon: Instagram },
  { title: "E-mail", value: "Endereço oficial pendente", action: "Em configuração", href: null, icon: Mail },
] as const;

const faq: FAQItem[] = [
  { question: "Onde fica a Patropi?", answer: "A Patropi fica às margens da BR-101, no km 206, em Casimiro de Abreu — RJ. Como há divergência pública sobre a numeração, recomendamos abrir a rota pelo mapa ou confirmar por telefone." },
  { question: "Como consultar disponibilidade do hotel?", answer: "Informe as datas e a quantidade de adultos e crianças no formulário de consulta. O site abre o WhatsApp com esses dados prontos para você confirmar diretamente com a equipe da Patropi." },
  { question: "O hotel oferece estacionamento e Wi-Fi?", answer: "Cadastros públicos informam estacionamento e Wi-Fi. Essas comodidades estão sinalizadas como pendentes de validação final pelo estabelecimento." },
  { question: "Qual é o horário do restaurante?", answer: "Os horários públicos encontrados indicam atendimento de segunda a sábado, das 11h às 22h, e domingo, das 11h às 17h. Confirme antes da visita, especialmente em feriados." },
  { question: "Como chegar?", answer: "Use o botão “Traçar rota” para abrir o cadastro da Patropi no Google Maps e navegar até o local." },
];

export default function ContatoPage() {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  return (
    <>
      <StructuredData data={schema}/>
      <section className="relative min-h-[58svh] overflow-hidden bg-ink text-white">
        <RealPhoto src="/images/fachada-patropi.webp" alt="Fachada do Hotel e Churrascaria Patropi" priority sizes="100vw" className="absolute inset-0 h-full min-h-full opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/25" />
        <div className="shell relative flex min-h-[58svh] items-center py-20"><div><p className="eyebrow text-gold">Contato</p><h1 className="mt-5 max-w-3xl font-display text-5xl leading-tight sm:text-7xl">Estamos no caminho para ajudar você.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-white/65">Para hospedagem, restaurante ou localização, escolha o canal mais conveniente.</p></div></div>
      </section>

      <section className="py-24 sm:py-28"><div className="shell"><SectionHeading eyebrow="Fale com a Patropi" title="Um canal para cada necessidade." text="Para respostas rápidas, use o WhatsApp ou fale diretamente com o hotel e o restaurante."/>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ title, value, action, href, icon: Icon, ...card }, index) => <ScrollReveal key={title} delay={(index % 3) * 80}><article className={`flex min-h-60 flex-col rounded-2xl p-7 ${"featured" in card && card.featured ? "bg-olive text-white" : "border border-ink/10 bg-white"}`}><Icon className={"featured" in card && card.featured ? "text-gold" : "text-ember"}/><p className={`mt-9 text-xs font-bold uppercase tracking-widest ${"featured" in card && card.featured ? "text-white/70" : "text-ink/70"}`}>{title}</p><p className="mt-2 flex-1 font-display text-2xl leading-snug">{value}</p>{href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className={`mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${"featured" in card && card.featured ? "text-gold" : "text-ember"}`}>{action}<ArrowUpRight size={15}/></a> : <span className="mt-6 text-xs font-bold uppercase tracking-wider text-ink/60">{action}</span>}</article></ScrollReveal>)}
        </div>
      </div></section>

      <section className="bg-sand/50 py-24 sm:py-28"><div className="shell grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20"><div><SectionHeading eyebrow="Envie uma mensagem" title="Conte o que você precisa." text="Preencha os dados e abra uma mensagem pronta no WhatsApp para falar diretamente com a equipe."/><p className="mt-6 border-l border-gold pl-5 text-sm leading-6 text-ink/75">O envio só é concluído quando você confirma a mensagem no WhatsApp.</p></div><Suspense fallback={<div className="min-h-[520px] rounded-3xl bg-white"/>}><ContactForm/></Suspense></div></section>

      <section className="bg-white py-24 sm:py-28"><div className="shell grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><SectionHeading eyebrow="Dúvidas frequentes" title="Antes de pegar a estrada." text="Respostas objetivas baseadas apenas nas informações públicas que puderam ser verificadas."/><FAQ items={faq}/></div></section>
    </>
  );
}
