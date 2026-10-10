import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { LegalPage } from "@/components/LegalPage";
import { absoluteUrl, whatsappUrl } from "@/config/business";

const topics = [
  "Horários de check-in e check-out",
  "Regras de cancelamento e no-show",
  "Política para crianças e acompanhantes",
  "Documentos necessários",
  "Política para animais",
  "Condições de estacionamento",
  "Regras internas",
  "Formas de pagamento",
];

export const metadata: Metadata = {
  title: "Informações de Hospedagem",
  description: "Consulte as condições de hospedagem diretamente com a equipe do Hotel Patropi.",
  alternates: { canonical: absoluteUrl("/politica-de-hospedagem") },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Informações de Hospedagem | Patropi",
    description: "Consulte as condições de hospedagem diretamente com a equipe do Hotel Patropi.",
    url: absoluteUrl("/politica-de-hospedagem"),
    images: [absoluteUrl("/images/hotel/suite-principal.webp")],
  },
};

export default function Page() {
  return (
    <LegalPage eyebrow="Hospedagem" title="Informações para sua hospedagem">
      <p>Para planejar sua estadia, fale diretamente com a equipe do Hotel Patropi e receba orientações atualizadas para as datas desejadas.</p>
      <h2>Consulte com a equipe</h2>
      <ul>{topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
      <h2>Reserva e confirmação</h2>
      <p>O envio de uma consulta pelo site inicia o atendimento no WhatsApp. A reserva, a tarifa e a categoria de acomodação são confirmadas pela equipe durante o atendimento.</p>
      <a href={whatsappUrl("Olá! Gostaria de conhecer as condições de hospedagem do Hotel Patropi.")} target="_blank" rel="noreferrer" className="btn-primary mt-7"><MessageCircle size={16}/> Falar com o hotel</a>
    </LegalPage>
  );
}
