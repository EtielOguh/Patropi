import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { RealPhoto } from "@/components/RealPhoto";
import { SectionHeading } from "@/components/SectionHeading";
import { absoluteUrl } from "@/config/business";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Galeria de fotografias reais do restaurante, hotel e gastronomia do Patropi.",
  alternates: { canonical: absoluteUrl("/galeria") },
  openGraph: { title: "Galeria Patropi", description: "Restaurante, hotel e gastronomia em imagens reais.", url: absoluteUrl("/galeria"), images: [{ url: absoluteUrl("/images/restaurante/buffet-principal.webp"), width: 2200, height: 1467, alt: "Buffet do Patropi" }] },
  twitter: { card: "summary_large_image", title: "Galeria Patropi", description: "Restaurante, hotel e gastronomia em imagens reais.", images: [absoluteUrl("/images/restaurante/buffet-principal.webp")] },
};

export default function GaleriaPage() {
  return (
    <>
      <section className="relative min-h-[62svh] overflow-hidden bg-ink text-white">
        <RealPhoto src="/images/restaurante/buffet-principal.webp" alt="Buffet e salão do Patropi" priority sizes="100vw" coverParent className="opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/20" />
        <div className="shell relative flex min-h-[62svh] items-center py-section-sm"><div className="max-w-3xl"><p className="eyebrow text-gold">Galeria</p><h1 className="hero-title-compact mt-5 max-w-[14ch] font-display text-display-1-compact">Um acervo para contar a experiência como ela é.</h1><p className="hero-support mt-6 text-white/75">Fotografias reais do hotel, do restaurante e da gastronomia, reunidas pelo próprio Patropi.</p></div></div>
      </section>
      <section className="py-section-sm sm:py-section-lg"><div className="shell"><SectionHeading eyebrow="Restaurante & hotel" title="Explore os espaços, os sabores e a hospitalidade." text="Use os filtros para navegar pelo acervo e selecione uma imagem para ampliar."/><div className="mt-12"><GalleryGrid/></div></div></section>
    </>
  );
}
