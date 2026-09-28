import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/config/business";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="Patropi — início">
      <span className={`grid size-14 shrink-0 place-items-center overflow-hidden rounded-full ${light ? "bg-white" : "bg-white/80"}`}>
        <Image src={assetPath("/images/logo-patropi.webp")} alt="Logo oficial Patropi" width={150} height={150} className="size-full object-cover" priority />
      </span>
      <span className={`hidden border-l pl-3 text-[9px] font-bold uppercase leading-[1.45] tracking-[.18em] sm:block ${light ? "border-white/20 text-white/75" : "border-olive/20 text-olive/75"}`}>
        Hotel<br />& Churrascaria
      </span>
    </Link>
  );
}
