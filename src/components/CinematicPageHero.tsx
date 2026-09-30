import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HeroSlide, HeroSlideshow } from "./HeroSlideshow";

export function CinematicPageHero({
  eyebrow,
  title,
  text,
  slides,
  children,
  quiet = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  slides: readonly HeroSlide[];
  children?: React.ReactNode;
  quiet?: boolean;
}) {
  return (
    <section className={`relative min-h-[72svh] overflow-hidden bg-ink text-white ${quiet ? "lg:min-h-[78svh]" : "lg:min-h-[86svh]"}`}>
      <HeroSlideshow slides={slides} />
      <div className={`absolute inset-0 z-[2] ${quiet ? "bg-gradient-to-r from-ink/95 via-ink/68 to-ink/20" : "bg-gradient-to-r from-ink via-ink/76 to-transparent"}`} />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-ink/70 via-transparent to-ink/10" />
      <div className={`shell relative z-[3] flex min-h-[72svh] flex-col justify-center py-section-sm ${quiet ? "lg:min-h-[78svh]" : "lg:min-h-[86svh]"}`}>
        <nav className="mb-10 flex items-center gap-1 text-xs text-white/70" aria-label="Breadcrumb"><Link href="/">Início</Link><ChevronRight size={13}/><span>{eyebrow}</span></nav>
        <div className="max-w-3xl">
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h1 className="hero-title-primary mt-5 max-w-[13ch] font-display text-display-1">{title}</h1>
          <p className="hero-support mt-6 text-white/75">{text}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
