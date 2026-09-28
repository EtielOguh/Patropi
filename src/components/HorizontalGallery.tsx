"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const photos = [
  { label: "Buffet", src: "/images/buffet-patropi.webp", alt: "Buffet e salão da Churrascaria Patropi" },
  { label: "Churrasco", src: "/images/churrasco-patropi.webp", alt: "Carne assada na churrasqueira da Patropi" },
  { label: "Pratos", src: "/images/prato-buffet.webp", alt: "Pratos quentes no buffet da Patropi" },
  { label: "Hospitalidade", src: "/images/hospitalidade-patropi.webp", alt: "Atendimento no restaurante Patropi" },
  { label: "Sobremesas", src: "/images/sobremesa-chocolate.webp", alt: "Sobremesa de chocolate da Patropi" },
] as const;

export function HorizontalGallery() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          const media = gsap.matchMedia();
          media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
            const distance = () => Math.max(0, (track.current?.scrollWidth || 0) - window.innerWidth + 80);
            gsap.to(track.current, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.7, invalidateOnRefresh: true } });
          });
        });
      });
    }, { rootMargin: "700px" });
    if (section.current) observer.observe(section.current);
    return () => { cancelled = true; observer.disconnect(); context?.revert(); };
  }, []);

  return (
    <section ref={section} className="horizontal-gallery bg-cream py-20 lg:min-h-screen lg:py-0">
      <div ref={track} className="horizontal-track">
        <div className="horizontal-intro">
          <p className="eyebrow text-ember">Em imagens</p>
          <h2 className="mt-5 font-display text-5xl leading-tight">Comida de verdade, registrada pela própria Patropi.</h2>
          <p className="mt-5 max-w-lg leading-7 text-ink/75">Do buffet à hospitalidade, uma seleção de fotografias reais compartilhadas nos canais oficiais.</p>
        </div>
        {photos.map((photo, index) => (
          <figure key={photo.label} className={`horizontal-card ${index % 2 ? "lg:translate-y-10" : "lg:-translate-y-8"}`}>
            <div className="relative h-full min-h-[420px]"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1024px) 100vw, 38vw" className="object-cover" /></div>
            <figcaption><span>0{index + 1}</span>{photo.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
