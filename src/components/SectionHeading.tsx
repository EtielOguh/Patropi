export function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className="max-w-2xl">
      <p className={`eyebrow ${light ? "text-gold" : "text-ember"}`}>{eyebrow}</p>
      <h2 className={`mt-4 font-display text-4xl leading-[1.08] sm:text-5xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {text && <p className={`mt-5 text-base leading-7 sm:text-lg ${light ? "text-white/75" : "text-ink/75"}`}>{text}</p>}
    </div>
  );
}
