import Link from "next/link";
import { ArrowLeft, BedDouble, UtensilsCrossed } from "lucide-react";
import { RealPhoto } from "@/components/RealPhoto";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[calc(100svh-76px)] place-items-center overflow-hidden bg-ink py-20 text-center text-white">
      <RealPhoto src="/images/fachada-patropi.webp" alt="Fachada do Hotel e Churrascaria Patropi" sizes="100vw" className="absolute inset-0 h-full min-h-full opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/45" />
      <div className="shell relative"><p className="font-display text-8xl italic text-[#d8bd7d]/60 sm:text-9xl">404</p><h1 className="-mt-5 font-display text-5xl leading-tight sm:text-6xl">Este caminho não foi encontrado.</h1><p className="mx-auto mt-5 max-w-xl leading-7 text-white/75">A página pode ter mudado, mas a Patropi continua logo ali, às margens da BR-101.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Link href="/" className="btn-primary btn-gold"><ArrowLeft size={16}/> Voltar ao início</Link><Link href="/restaurante" className="btn-secondary btn-light"><UtensilsCrossed size={16}/> Restaurante</Link><Link href="/hotel" className="btn-secondary btn-light"><BedDouble size={16}/> Hotel</Link></div></div>
    </section>
  );
}
