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
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  position?: string;
  caption?: string;
}) {
  return (
    <figure className={`group relative overflow-hidden bg-olive/10 ${className}`}>
      <Image
        src={assetPath(src)}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition duration-700 group-hover:scale-[1.015]"
        style={{ objectPosition: position }}
      />
      {caption && <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/75 to-transparent px-5 pb-4 pt-12 text-xs text-white/80">{caption}</figcaption>}
    </figure>
  );
}
