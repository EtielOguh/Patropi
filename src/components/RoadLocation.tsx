"use client";

import { Navigation } from "lucide-react";
import { useEffect, useRef } from "react";
import { business } from "@/config/business";
import { SectionHeading } from "./SectionHeading";

export function RoadLocation({ dark = false }: { dark?: boolean }) {
  const section = useRef<HTMLElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let context: { revert: () => void } | undefined;
    let cancelled = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
        if (cancelled) return;
        const gsap = gsapModule.default;
        const ScrollTrigger = triggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        context = gsap.context(() => {
          gsap.fromTo(line.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: line.current, start: "top 90%", end: "top 35%", scrub: true } });
        }, section);
      });
    }, { rootMargin: "500px" });
    if (section.current) observer.observe(section.current);
    return () => { cancelled = true; observer.disconnect(); context?.revert(); };
  }, []);

  return (
    <section ref={section} id="localizacao" className={dark ? "bg-ink py-section text-white sm:py-section-lg" : "py-section sm:py-section-lg"}>
      <div className="shell grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow="Localização" title="No caminho de quem passa pela BR-101." text="Restaurante e hospedagem reunidos em uma parada prática, às margens da rodovia, em Casimiro de Abreu." light={dark} />
          <div className={`road-line mt-10 ${dark ? "bg-white/15" : "bg-ink/10"}`} aria-hidden="true">
            <span ref={line} />
            <i />
          </div>
          <p className={`mt-6 text-sm ${dark ? "text-white/70" : "text-ink/75"}`}>{business.location.display}</p>
          <a href={business.location.mapsUrl} target="_blank" rel="noreferrer" className={`btn-primary mt-7 ${dark ? "btn-gold" : ""}`}><Navigation size={16} /> Traçar rota</a>
        </div>
        <div className={`aspect-[4/3] overflow-hidden rounded-media border ${dark ? "border-white/10 bg-white/5" : "border-ink/10 bg-white"}`}>
          <iframe src={business.location.embedUrl} title="Mapa da localização do Patropi" className="h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}
