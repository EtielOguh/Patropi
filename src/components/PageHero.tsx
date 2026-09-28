import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RealPhoto } from "./RealPhoto";

export function PageHero({ eyebrow, title, text, photo, photoSrc, photoPosition = "center", children }: { eyebrow: string; title: string; text: string; photo: string; photoSrc: string; photoPosition?: string; children?: React.ReactNode }) {
  return (
    <section className="overflow-hidden bg-ink text-white">
      <div className="shell grid min-h-[560px] items-stretch lg:grid-cols-[.9fr_1.1fr]">
        <div className="min-w-0 flex flex-col justify-center py-16 pr-0 lg:pr-16"><nav className="mb-12 flex items-center gap-1 text-xs text-white/70" aria-label="Breadcrumb"><Link href="/">Início</Link><ChevronRight size={13}/><span>{eyebrow}</span></nav><p className="eyebrow text-gold">{eyebrow}</p><h1 className="mt-5 break-words font-display text-[clamp(2.65rem,11vw,3.75rem)] leading-[1.02]">{title}</h1><p className="mt-6 max-w-xl text-lg leading-8 text-white/75">{text}</p>{children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}</div>
        <RealPhoto src={photoSrc} alt={photo} position={photoPosition} priority className="min-h-[420px] lg:-mr-[calc((100vw-min(1180px,100vw-40px))/2)]" sizes="(max-width: 1024px) 100vw, 55vw" />
      </div>
    </section>
  );
}
