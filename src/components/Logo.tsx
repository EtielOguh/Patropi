import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/config/business";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="Patropi — Hotel & Churrascaria — início">
      <span className={`grid size-14 shrink-0 place-items-center overflow-hidden rounded-full ${light ? "bg-white" : "bg-white/80"}`}>
        <Image src={assetPath("/images/logo-patropi.webp")} alt="Logo oficial Patropi" width={150} height={150} className="size-full object-cover" loading="eager" />
      </span>
      <span className={`hidden border-l pl-3 text-label font-bold uppercase tracking-[.14em] sm:block ${light ? "border-white/20 text-white/80" : "border-olive/20 text-olive"}`}>
        Hotel<br />& Churrascaria
      </span>
    </Link>
  );
}
