import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { RealPhoto } from "@/components/RealPhoto";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Galeria de fotografias reais do restaurante, hotel e gastronomia da Patropi.",
  alternates: { canonical: "/galeria" },
  openGraph: { title: "Galeria Patropi", description: "Restaurante, hotel e gastronomia em imagens reais.", url: "/galeria", images: [{ url: "/images/buffet-patropi.webp", width: 1600, height: 900, alt: "Buffet da Patropi" }] },
};

export default function GaleriaPage() {
  return (
    <>
      <section className="relative min-h-[62svh] overflow-hidden bg-ink text-white">
        <RealPhoto src="/images/buffet-patropi.webp" alt="Buffet e salão da Patropi" priority sizes="100vw" className="absolute inset-0 h-full min-h-full opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/20" />
        <div className="shell relative flex min-h-[62svh] items-center py-20"><div><p className="eyebrow text-gold">Galeria</p><h1 className="mt-5 max-w-3xl font-display text-5xl leading-tight sm:text-7xl">Um acervo para contar a experiência como ela é.</h1><p className="mt-6 max-w-2xl leading-7 text-white/65">Fotografias reais do hotel, do restaurante e da gastronomia, publicadas nos canais oficiais da Patropi.</p></div></div>
      </section>
      <section className="py-24 sm:py-32"><div className="shell"><SectionHeading eyebrow="Restaurante & hotel" title="Explore os espaços, os sabores e a hospitalidade." text="Use os filtros para navegar pelo acervo e selecione uma imagem para ampliar."/><div className="mt-12"><GalleryGrid/></div></div></section>
    </>
  );
}
