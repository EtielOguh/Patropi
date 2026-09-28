import type { MetadataRoute } from "next";
import { business } from "@/config/business";

export const dynamic = "force-static";

const routes: Array<{ path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/restaurante", changeFrequency: "weekly", priority: 0.9 },
  { path: "/hotel", changeFrequency: "weekly", priority: 0.9 },
  { path: "/galeria", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contato", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacidade", changeFrequency: "yearly", priority: 0.3 },
  { path: "/termos", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
  { path: "/politica-de-hospedagem", changeFrequency: "monthly", priority: 0.5 },
  { path: "/acessibilidade", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-27T00:00:00-03:00");
  return routes.map(({ path, changeFrequency, priority }) => ({ url: `${business.siteUrl}${path}`, lastModified, changeFrequency, priority }));
}
