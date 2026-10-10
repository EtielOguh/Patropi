export type GalleryCategory = "Restaurante" | "Café da manhã colonial" | "Churrasco" | "Culinária japonesa" | "Hotel" | "Quartos";
export type GalleryLayout = "standard" | "featured" | "wide" | "tall";

export type GalleryItem = {
  category: GalleryCategory;
  label: string;
  src: string;
  position?: string;
  layout?: GalleryLayout;
};

export const galleryFilters = ["Todos", "Restaurante", "Café da manhã colonial", "Churrasco", "Culinária japonesa", "Hotel", "Quartos"] as const;

export const galleryItems: readonly GalleryItem[] = [
  // Seleção da página inicial: um retrato de cada experiência principal.
  { category: "Restaurante", label: "Buffet geral do restaurante Patropi", src: "/images/restaurante/buffet-principal.webp", position: "center", layout: "featured" },
  { category: "Café da manhã colonial", label: "Bolos e pães do café da manhã colonial", src: "/images/hotel/cafe-da-manha-bolos.webp", position: "center" },
  { category: "Churrasco", label: "Carne assada sendo servida na churrasqueira do Patropi", src: "/images/restaurante/churrasco-principal.webp", position: "center", layout: "tall" },
  { category: "Hotel", label: "Fachada do Hotel e Churrascaria Patropi", src: "/images/fachada-patropi.webp", position: "center", layout: "wide" },
  { category: "Quartos", label: "Suíte principal do Hotel Patropi", src: "/images/hotel/suite-principal.webp", position: "center 58%" },
  { category: "Culinária japonesa", label: "Estação de culinária japonesa do Patropi", src: "/images/restaurante/japonesa-principal.webp", position: "center 78%", layout: "wide" },

  // Restaurante: somente fotografias do conjunto buffet-geral.
  { category: "Restaurante", label: "Visão ampla do buffet geral do Patropi", src: "/images/restaurante/buffet-perspectiva.webp", position: "center", layout: "wide" },
  { category: "Restaurante", label: "Pratos quentes e acompanhamentos do buffet geral", src: "/images/restaurante/buffet-amplo.webp", position: "center" },
  { category: "Restaurante", label: "Petiscos disponíveis no buffet geral", src: "/images/restaurante/buffet-petiscos.webp", position: "center", layout: "wide" },

  // Café da manhã do hotel, separado do restaurante.
  { category: "Café da manhã colonial", label: "Café da manhã colonial servido no Hotel Patropi", src: "/images/hotel/cafe-da-manha-buffet.webp", position: "center", layout: "wide" },
  { category: "Café da manhã colonial", label: "Salão preparado para o café da manhã colonial", src: "/images/hotel/cafe-da-manha-salao.webp", position: "center" },
  { category: "Café da manhã colonial", label: "Mesa de bolos, pães e quitutes do café da manhã", src: "/images/hotel/cafe-da-manha-mesa.webp", position: "center", layout: "wide" },

  // Churrasco: serviço, corte e carne pronta em enquadramentos diferentes.
  { category: "Churrasco", label: "Corte de carne assada na churrasqueira do Patropi", src: "/images/restaurante/churrasco-corte.webp", position: "center", layout: "tall" },
  { category: "Churrasco", label: "Carne assada disponível no buffet", src: "/images/restaurante/carne-buffet.webp", position: "center", layout: "tall" },

  // Culinária japonesa: estação, variedade, detalhes e acompanhamentos.
  { category: "Culinária japonesa", label: "Variedade da culinária japonesa", src: "/images/restaurante/japonesa-variedade.webp", position: "center", layout: "tall" },
  { category: "Culinária japonesa", label: "Detalhe dos preparos japoneses", src: "/images/restaurante/japonesa-detalhe.webp", position: "center", layout: "tall" },
  { category: "Culinária japonesa", label: "Molhos e acompanhamentos da estação japonesa", src: "/images/restaurante/japonesa-molhos.webp", position: "center", layout: "wide" },

  // Hotel e acomodações.
  { category: "Hotel", label: "Corredor interno do Hotel Patropi", src: "/images/hotel/corredor.webp", position: "center", layout: "wide" },
  { category: "Hotel", label: "Hóspedes chegando ao elevador", src: "/images/hotel/elevador-hospedes.webp", position: "center" },
  { category: "Hotel", label: "Recepção do Hotel Patropi", src: "/images/hotel/recepcao.webp", position: "center" },
  { category: "Hotel", label: "Família percorrendo o corredor do hotel", src: "/images/hotel/hospedes-corredor.webp", position: "center" },
  { category: "Quartos", label: "Cama da suíte principal", src: "/images/hotel/suite-cama.webp", position: "center" },
  { category: "Quartos", label: "Hidromassagem da suíte", src: "/images/hotel/suite-hidromassagem.webp", position: "center", layout: "wide" },
  { category: "Quartos", label: "Banheiro da suíte", src: "/images/hotel/suite-banheiro.webp", position: "center" },
  { category: "Quartos", label: "Quarto standard do Hotel Patropi", src: "/images/hotel/quarto-standard.webp", position: "center" },
  { category: "Quartos", label: "Ambiente do quarto standard", src: "/images/hotel/quarto-standard-ambiente.webp", position: "center" },
  { category: "Quartos", label: "Família em uma acomodação do hotel", src: "/images/hotel/familia-quarto.webp", position: "center", layout: "wide" },
];
