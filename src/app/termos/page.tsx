import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { absoluteUrl } from "@/config/business";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições para utilização do site do Patropi.",
  alternates: { canonical: absoluteUrl("/termos") },
  openGraph: {
    title: "Termos de Uso | Patropi",
    description: "Condições para utilização do site do Patropi.",
    url: absoluteUrl("/termos"),
    images: [absoluteUrl("/images/fachada-patropi.webp")],
  },
};

export default function Page() {
  return (
    <LegalPage eyebrow="Termos" title="Termos de Uso">
      <p>Ao acessar este site, você concorda em utilizá-lo de forma lícita e respeitosa.</p>
      <h2>Informações disponíveis</h2>
      <p>Informações de funcionamento, comodidades, tarifas e disponibilidade podem ser atualizadas. A confirmação de reservas, valores e condições ocorre diretamente com a equipe do Patropi.</p>
      <h2>Propriedade intelectual</h2>
      <p>Marca, textos, design e materiais oficiais pertencem aos seus respectivos titulares. A reprodução depende de autorização, salvo usos permitidos por lei.</p>
      <h2>Links externos</h2>
      <p>Links para mapas, Instagram e plataformas de avaliação conduzem a serviços de terceiros, sujeitos a políticas próprias.</p>
      <h2>Responsabilidades</h2>
      <p>O Patropi trabalha para manter o site seguro e atualizado, mas interrupções técnicas podem ocorrer. Em caso de dúvida sobre alguma informação essencial, use os canais oficiais de atendimento.</p>
      <h2>Atualizações e contato</h2>
      <p>Estes termos podem ser atualizados para acompanhar mudanças no site e nos serviços. Dúvidas podem ser enviadas pela página de contato.</p>
    </LegalPage>
  );
}
