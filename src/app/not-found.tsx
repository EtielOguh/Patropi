import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BedDouble, UtensilsCrossed } from "lucide-react";
import { RealPhoto } from "@/components/RealPhoto";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative grid min-h-[calc(100svh-76px)] place-items-center overflow-hidden bg-ink py-20 text-center text-white">
      <RealPhoto src="/images/fachada-patropi.webp" alt="Fachada do Hotel e Churrascaria Patropi" priority sizes="100vw" coverParent className="opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/45" />
      <div className="shell relative"><p className="font-display text-8xl italic text-accent-soft/60 sm:text-9xl">404</p><h1 className="-mt-5 font-display text-display-1-compact">Este caminho não foi encontrado.</h1><p className="mx-auto mt-5 max-w-xl text-body text-white/75">A página pode ter mudado, mas o Patropi continua logo ali, às margens da BR-101.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Link href="/" className="btn-primary btn-gold"><ArrowLeft size={16}/> Voltar ao início</Link><Link href="/restaurante" className="btn-secondary btn-light"><UtensilsCrossed size={16}/> Restaurante</Link><Link href="/hotel" className="btn-secondary btn-light"><BedDouble size={16}/> Hotel</Link></div></div>
    </section>
  );
}
