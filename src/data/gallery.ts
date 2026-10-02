export type GalleryCategory = "Restaurante" | "Gastronomia" | "Hotel" | "Quartos";
export type GalleryLayout = "standard" | "featured" | "wide" | "tall";

export type GalleryItem = {
  category: GalleryCategory;
  label: string;
  src: string;
  position?: string;
  layout?: GalleryLayout;
};

export const galleryFilters = ["Todos", "Restaurante", "Gastronomia", "Hotel", "Quartos"] as const;

export const galleryItems: readonly GalleryItem[] = [
  { category: "Restaurante", label: "Buffet completo do restaurante Patropi", src: "/images/restaurante/buffet-principal.webp", position: "center", layout: "featured" },
  { category: "Quartos", label: "Suíte principal do Hotel Patropi", src: "/images/hotel/suite-principal.webp", position: "center 58%" },
  { category: "Restaurante", label: "Família durante uma refeição no Patropi", src: "/images/restaurante/familia-a-mesa.webp", position: "center" },
  { category: "Gastronomia", label: "Corte assado servido na churrasqueira do Patropi", src: "/images/restaurante/churrasco-principal.webp", position: "center", layout: "tall" },
  { category: "Gastronomia", label: "Estação de culinária japonesa do Patropi", src: "/images/restaurante/japonesa-principal.webp", position: "center 78%", layout: "wide" },
  { category: "Hotel", label: "Fachada do Hotel e Churrascaria Patropi", src: "/images/fachada-patropi.webp", position: "center", layout: "wide" },

  { category: "Hotel", label: "Café da manhã servido no Hotel Patropi", src: "/images/hotel/cafe-da-manha-buffet.webp", position: "center" },
  { category: "Hotel", label: "Salão preparado para o café da manhã", src: "/images/hotel/cafe-da-manha-salao.webp", position: "center" },
  { category: "Quartos", label: "Cama da suíte principal", src: "/images/hotel/suite-cama.webp", position: "center" },
  { category: "Quartos", label: "Hidromassagem da suíte", src: "/images/hotel/suite-hidromassagem.webp", position: "center", layout: "wide" },
  { category: "Quartos", label: "Banheiro da suíte", src: "/images/hotel/suite-banheiro.webp", position: "center" },
  { category: "Quartos", label: "Quarto standard do Hotel Patropi", src: "/images/hotel/quarto-standard.webp", position: "center" },
  { category: "Quartos", label: "Ambiente do quarto standard", src: "/images/hotel/quarto-standard-ambiente.webp", position: "center" },
  { category: "Hotel", label: "Corredor interno do Hotel Patropi", src: "/images/hotel/corredor.webp", position: "center", layout: "wide" },
  { category: "Hotel", label: "Hóspedes chegando ao elevador", src: "/images/hotel/elevador-hospedes.webp", position: "center" },
  { category: "Hotel", label: "Recepção do Hotel Patropi", src: "/images/hotel/recepcao.webp", position: "center" },
  { category: "Hotel", label: "Família percorrendo o corredor do hotel", src: "/images/hotel/hospedes-corredor.webp", position: "center" },
  { category: "Quartos", label: "Família em uma acomodação do hotel", src: "/images/hotel/familia-quarto.webp", position: "center" },

  { category: "Restaurante", label: "Casal durante o café no restaurante", src: "/images/restaurante/casal-a-mesa.webp", position: "center" },
  { category: "Restaurante", label: "Momento em família no restaurante", src: "/images/restaurante/experiencia-familia.webp", position: "center" },
  { category: "Restaurante", label: "Perspectiva do buffet do Patropi", src: "/images/restaurante/buffet-perspectiva.webp", position: "center", layout: "wide" },
  { category: "Restaurante", label: "Variedade do buffet do Patropi", src: "/images/restaurante/buffet-amplo.webp", position: "center" },
  { category: "Gastronomia", label: "Seleção de sobremesas do buffet", src: "/images/restaurante/sobremesas-variedade.webp", position: "center" },
  { category: "Gastronomia", label: "Sobremesa de chocolate do Patropi", src: "/images/restaurante/sobremesa-chocolate.webp", position: "center" },
  { category: "Gastronomia", label: "Seleção de saladas frescas", src: "/images/restaurante/saladas.webp", position: "center", layout: "wide" },
  { category: "Gastronomia", label: "Pratos quentes do buffet", src: "/images/restaurante/pratos-quentes.webp", position: "center" },
  { category: "Gastronomia", label: "Acompanhamentos do buffet", src: "/images/restaurante/acompanhamentos.webp", position: "center" },
  { category: "Gastronomia", label: "Cozinha brasileira servida no buffet", src: "/images/restaurante/cozinha-brasileira.webp", position: "center", layout: "wide" },
  { category: "Gastronomia", label: "Saladas e frios do Patropi", src: "/images/restaurante/saladas-vertical.webp", position: "center", layout: "tall" },
  { category: "Gastronomia", label: "Preparo do churrasco no Patropi", src: "/images/restaurante/churrasco-corte.webp", position: "center", layout: "tall" },
  { category: "Gastronomia", label: "Carne assada disponível no buffet", src: "/images/restaurante/carne-buffet.webp", position: "center", layout: "tall" },
  { category: "Gastronomia", label: "Variedade da culinária japonesa", src: "/images/restaurante/japonesa-variedade.webp", position: "center", layout: "tall" },
  { category: "Gastronomia", label: "Detalhe dos preparos japoneses", src: "/images/restaurante/japonesa-detalhe.webp", position: "center", layout: "tall" },
  { category: "Gastronomia", label: "Molhos e acompanhamentos da estação japonesa", src: "/images/restaurante/japonesa-molhos.webp", position: "center", layout: "wide" },
];
