import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

const documents = [
  { label: "Privacidade", href: "/privacidade" },
  { label: "Termos", href: "/termos" },
  { label: "Cookies", href: "/cookies" },
  { label: "Hospedagem", href: "/politica-de-hospedagem" },
  { label: "Acessibilidade", href: "/acessibilidade" },
] as const;

export function LegalPage({ eyebrow, title, updated = "23 de setembro de 2026", children }: { eyebrow: string; title: string; updated?: string; children: React.ReactNode }) {
  return (
    <>
      <section className="relative overflow-hidden bg-ink py-16 text-white sm:py-20">
        <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 font-display text-[clamp(7rem,22vw,20rem)] leading-none text-white/[.025]" aria-hidden="true">P</div>
        <div className="shell relative">
          <nav className="mb-10 flex items-center gap-1 text-xs text-white/70" aria-label="Breadcrumb"><Link href="/">Início</Link><ChevronRight size={13}/><span>{eyebrow}</span></nav>
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl font-display text-display-1-compact">{title}</h1>
          <p className="mt-5 text-sm text-white/70">Modelo informativo · última atualização: {updated}</p>
        </div>
      </section>
      <section className="py-16 sm:py-24">
        <div className="shell grid items-start gap-10 lg:grid-cols-[.32fr_.68fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28">
            <p className="eyebrow text-ember">Documentos</p>
            <nav className="mt-5 grid border-t border-ink/10" aria-label="Documentos institucionais">
              {documents.map((document) => <Link key={document.href} href={document.href} aria-current={document.label === eyebrow ? "page" : undefined} className={`flex items-center justify-between border-b border-ink/10 py-3 text-sm transition hover:pl-1 hover:text-ember ${document.label === eyebrow ? "font-bold text-ember" : "text-ink/75"}`}>{document.label}<ChevronRight size={14}/></Link>)}
            </nav>
          </aside>
          <div>
            <article className="prose-patropi rounded-media border border-border bg-surface p-7 shadow-soft sm:p-12">{children}</article>
            <div className="mt-5 flex flex-col gap-5 rounded-card bg-sand/55 p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-display text-xl">Ainda precisa de ajuda?</p><p className="mt-1 text-sm text-ink/75">Fale diretamente com a equipe do Patropi.</p></div><Link href="/contato" className="btn-secondary self-start">Abrir contato <ArrowRight size={16}/></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
