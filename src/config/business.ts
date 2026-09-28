export type Verification = "confirmed" | "public-source" | "needs-confirmation";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || "";
export const basePath = configuredBasePath === "/" ? "" : configuredBasePath.replace(/\/$/, "");

export function assetPath(path: string) {
  if (!path.startsWith("/") || !basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}

export const business = {
  name: "Patropi",
  legalDisplayName: "Hotel e Churrascaria Patropi",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.redepatropi.com.br").replace(/\/$/, ""),
  description:
    "Restaurante, churrascaria e hospedagem às margens da BR-101, em Casimiro de Abreu, Rio de Janeiro.",
  location: {
    display: "BR-101, km 206 · Casimiro de Abreu — RJ",
    street: "Rodovia BR-101, km 206",
    numberCandidates: ["602", "612"],
    district: "Centro",
    city: "Casimiro de Abreu",
    state: "RJ",
    postalCode: "28860-000",
    country: "BR",
    verification: "needs-confirmation" as Verification,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Hotel+Patropi+Casimiro+de+Abreu",
    embedUrl:
      "https://www.google.com/maps?q=Hotel%20Patropi%20Casimiro%20de%20Abreu&output=embed",
  },
  hotel: {
    phone: { label: "(22) 2778-2061", href: "+552227782061", verification: "public-source" as Verification },
    amenities: ["Wi-Fi", "Café da manhã", "Estacionamento", "Ar-condicionado", "TV", "Frigobar"],
    amenitiesVerification: "needs-confirmation" as Verification,
  },
  restaurant: {
    phone: { label: "(22) 2778-4678", href: "+552227784678", verification: "needs-confirmation" as Verification },
    services: ["Buffet / self-service", "Churrasco", "Cozinha brasileira", "Culinária japonesa"],
    hours: [
      { day: "Segunda", dayIndex: 1, open: "11:00", close: "22:00" },
      { day: "Terça", dayIndex: 2, open: "11:00", close: "22:00" },
      { day: "Quarta", dayIndex: 3, open: "11:00", close: "22:00" },
      { day: "Quinta", dayIndex: 4, open: "11:00", close: "22:00" },
      { day: "Sexta", dayIndex: 5, open: "11:00", close: "22:00" },
      { day: "Sábado", dayIndex: 6, open: "11:00", close: "22:00" },
      { day: "Domingo", dayIndex: 0, open: "11:00", close: "17:00" },
    ],
    hoursVerification: "needs-confirmation" as Verification,
  },
  whatsapp: {
    label: "(22) 93618-0096",
    digits: "5522936180096",
    verification: "needs-confirmation" as Verification,
    temporary: true,
  },
  email: null as null | string,
  instagram: {
    handle: "@churrascariapatropi",
    url: "https://www.instagram.com/churrascariapatropi/",
    verification: "public-source" as Verification,
  },
  reviews: {
    googleRestaurant: { rating: 4.5, count: 2700, updatedAt: "2026-09-23", verification: "public-source" as Verification },
    googleHotel: { rating: 4.4, count: 1200, updatedAt: "2026-09-23", verification: "public-source" as Verification },
    tripadvisorRestaurantUrl:
      "https://www.tripadvisor.com.br/Restaurant_Review-g2347270-d2385997-Reviews-Patropi-Casimiro_de_Abreu_State_of_Rio_de_Janeiro.html",
    tripadvisorHotelUrl:
      "https://www.tripadvisor.com.br/Hotel_Review-g2347270-d4511848-Reviews-Patropi_Hotel_E_Churrascaria-Casimiro_de_Abreu_State_of_Rio_de_Janeiro.html",
  },
  confirmationChecklist: [
    "Logo oficial em alta resolução e cores da marca",
    "Endereço e numeração oficial de cada operação",
    "Existência e dados de outras unidades",
    "Telefones, WhatsApp e e-mail oficiais",
    "Horários atuais do restaurante",
    "Categorias, capacidade e comodidades dos quartos",
    "Check-in, check-out e políticas de hospedagem",
    "Regras para crianças e animais",
    "Formas de pagamento e sistema de reservas",
    "Fotos oficiais autorizadas e cardápio",
  ],
} as const;

export const navigation = [
  { label: "Início", href: "/" },
  { label: "Restaurante", href: "/restaurante" },
  { label: "Hotel", href: "/hotel" },
  { label: "Galeria", href: "/galeria" },
  { label: "Como chegar", href: "/#localizacao" },
  { label: "Contato", href: "/contato" },
] as const;

export function trackEvent(name: string, data: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name, ...data });
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.whatsapp.digits}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path = "") {
  return `${business.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
