"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/config/business";

const chapters = [
  { title: "Buffet / self-service", text: "Uma escolha prática para montar a refeição no próprio ritmo, com a variedade que faz parte da experiência da casa.", src: "/images/buffet-patropi.webp", alt: "Buffet e salão da Churrascaria Patropi" },
  { title: "Churrasco", text: "O churrasco ocupa um lugar central na identidade da Patropi e transforma a parada em parte da viagem.", src: "/images/carne-patropi.webp", alt: "Corte assado na churrasqueira da Patropi" },
  { title: "Cozinha brasileira", text: "Sabores conhecidos e uma refeição acolhedora para quem está na estrada, em família ou passando pela região.", src: "/images/prato-buffet.webp", alt: "Pratos quentes servidos no buffet da Patropi" },
  { title: "Culinária japonesa", text: "Uma das opções descritas nos canais públicos da Patropi, somando variedade à experiência do buffet.", src: "/images/buffet-patropi.webp", alt: "Vista do buffet da Churrascaria Patropi" },
] as const;

export function RestaurantStory() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers = steps.current.map((step, index) => {
      if (!step) return null;
      const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setActive(index), { rootMargin: "-35% 0px -45%", threshold: 0 });
      observer.observe(step);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <div className="restaurant-story">
      <div className="story-stage" aria-hidden="true">
        {chapters.map((chapter, index) => (
          <Image key={chapter.title} src={assetPath(chapter.src)} alt="" fill sizes="50vw" className={`object-cover transition duration-700 ${active === index ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`} />
        ))}
        <div className="story-counter"><span>0{active + 1}</span><i /><span>0{chapters.length}</span></div>
      </div>
      <div>
        {chapters.map((chapter, index) => (
          <article key={chapter.title} ref={(node) => { steps.current[index] = node; }} className={`story-step ${active === index ? "is-active" : ""}`}>
            <div className="story-mobile-image"><Image src={assetPath(chapter.src)} alt={chapter.alt} fill sizes="100vw" className="object-cover" /></div>
            <p className="eyebrow text-gold">0{index + 1}</p>
            <h3 className="mt-5 font-display text-4xl sm:text-5xl">{chapter.title}</h3>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/75">{chapter.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
