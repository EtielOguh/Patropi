import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { absoluteUrl, business } from "@/config/business";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Entenda como os dados pessoais são tratados no site do Patropi.",
  alternates: { canonical: absoluteUrl("/privacidade") },
  openGraph: {
    title: "Política de Privacidade | Patropi",
    description: "Informações sobre tratamento de dados pessoais no site do Patropi.",
    url: absoluteUrl("/privacidade"),
    images: [absoluteUrl("/images/fachada-patropi.webp")],
  },
};

export default function Page() {
  return (
    <LegalPage eyebrow="Privacidade" title="Política de Privacidade">
      <p>Esta política explica como os dados pessoais são tratados durante o uso do site do Patropi.</p>
      <h2>Dados informados pelo visitante</h2>
      <p>Os formulários preparam uma mensagem no seu dispositivo e abrem o WhatsApp. O site não envia nome, telefone, e-mail, assunto, mensagem ou informações de hospedagem para um banco de dados próprio. Esses dados são compartilhados quando você confirma o envio no WhatsApp, conforme as regras dessa plataforma.</p>
      <h2>Finalidades</h2>
      <ul>
        <li>Facilitar solicitações sobre hospedagem, restaurante, eventos e reservas pelo WhatsApp.</li>
        <li>Manter a segurança e o funcionamento do site.</li>
        <li>Produzir métricas de uso somente quando houver consentimento para cookies opcionais.</li>
      </ul>
      <h2>Serviços de terceiros</h2>
      <p>WhatsApp, mapas, Instagram e plataformas de avaliação possuem políticas próprias e podem tratar dados quando seus links ou recursos são acessados. O Patropi não comercializa dados pessoais.</p>
      <h2>Seus direitos</h2>
      <p>O titular pode solicitar confirmação do tratamento, acesso, correção, anonimização, bloqueio, exclusão, portabilidade, informações sobre compartilhamento e revogação do consentimento, quando aplicável.</p>
      <h2>Contato sobre privacidade</h2>
      <p>Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, envie uma mensagem para <a href={`mailto:${business.email}`}>{business.email}</a>.</p>
      <h2>Cookies</h2>
      <p>Consulte a Política de Cookies para entender as categorias utilizadas e como alterar sua preferência.</p>
    </LegalPage>
  );
}
