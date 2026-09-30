export function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className="max-w-2xl">
      <p className={`eyebrow ${light ? "text-gold" : "text-ember"}`}>{eyebrow}</p>
      <h2 className={`mt-4 max-w-[22ch] font-display text-display-2 ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {text && <p className={`mt-5 max-w-[62ch] text-body sm:text-body-lg ${light ? "text-white/75" : "text-ink/75"}`}>{text}</p>}
    </div>
  );
}
