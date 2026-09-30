"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { assetPath } from "@/config/business";

export type HeroSlide = {
  src: string;
  alt: string;
  position?: string;
};

export function HeroSlideshow({ slides }: { slides: readonly HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, slides.length]);

  return (
    <div className="hero-slideshow" role="region" aria-label="Fotografias do Patropi">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`hero-slide ${index === active ? "is-active" : ""}`}
          aria-hidden={index !== active}
        >
          <Image
            src={assetPath(slide.src)}
            alt={index === active ? slide.alt : ""}
            fill
            loading={index === 0 ? "eager" : "lazy"}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: slide.position || "center" }}
          />
        </div>
      ))}
      <div className="hero-controls">
        <div className="flex gap-2" role="group" aria-label="Selecionar fotografia">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className={`hero-dot ${index === active ? "is-active" : ""}`}
              onClick={() => setActive(index)}
              aria-label={`Exibir fotografia ${index + 1}`}
              aria-current={index === active}
            />
          ))}
        </div>
        {!reducedMotion && <button
          type="button"
          className="hero-pause"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Retomar apresentação" : "Pausar apresentação"}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>}
      </div>
    </div>
  );
}
