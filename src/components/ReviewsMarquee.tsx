import { Quote, Star } from "lucide-react";
import { business } from "@/config/business";

const reviews = [
  { text: "Comida e ambiente maravilhosos. Tudo limpo e organizado.", name: "Gilane G.", source: "Tripadvisor · Restaurante", url: business.reviews.tripadvisorRestaurantUrl, scope: "restaurante" },
  { text: "Boa localização, fica às margens da BR-101.", name: "Hóspede verificado", source: "Tripadvisor · Hotel", url: business.reviews.tripadvisorHotelUrl, scope: "hotel" },
  { text: "Ótima variedade no self-service. Limpo e bom atendimento.", name: "Tania Dian", source: "Tripadvisor · Restaurante", url: business.reviews.tripadvisorRestaurantUrl, scope: "restaurante" },
] as const;

function ReviewCard({ review, duplicate = false }: { review: (typeof reviews)[number]; duplicate?: boolean }) {
  return (
    <a href={review.url} target="_blank" rel="noreferrer" className="review-card" aria-hidden={duplicate || undefined} tabIndex={duplicate ? -1 : undefined}>
      <div className="flex items-center justify-between">
        <Quote size={24} className="text-gold" />
        <div className="flex text-gold" aria-label="5 de 5 estrelas">
          {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill="currentColor" />)}
        </div>
      </div>
      <blockquote className="mt-7 font-display text-2xl leading-snug">“{review.text}”</blockquote>
      <p className="mt-7 text-sm font-bold">{review.name}</p>
      <p className="mt-1 text-xs text-white/70">{review.source}</p>
    </a>
  );
}

export function ReviewsMarquee({ compact = false, scope }: { compact?: boolean; scope?: "restaurante" | "hotel" }) {
  const selected = scope ? reviews.filter((review) => review.scope === scope) : reviews;
  const loop = compact ? selected : [...selected, ...selected];
  return (
    <div className={`reviews-viewport ${compact ? "is-compact" : ""}`}>
      <div className="reviews-track">
        {loop.map((review, index) => <ReviewCard key={`${review.name}-${index}`} review={review} duplicate={!compact && index >= selected.length} />)}
      </div>
    </div>
  );
}
