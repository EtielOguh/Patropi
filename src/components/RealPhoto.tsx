import Image from "next/image";
import { assetPath } from "@/config/business";

export function RealPhoto({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  position = "center",
  caption,
  coverParent = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  position?: string;
  caption?: string;
  coverParent?: boolean;
}) {
  return (
    <figure className={`group ${coverParent ? "absolute inset-0" : "relative"} overflow-hidden bg-olive/10 ${className}`}>
      <Image
        src={assetPath(src)}
        alt={alt}
        fill
        loading={priority ? "eager" : undefined}
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: position }}
      />
      {caption && <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/75 to-transparent px-5 pb-4 pt-12 text-xs text-white/80">{caption}</figcaption>}
    </figure>
  );
}
