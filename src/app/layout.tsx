import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { CookieConsent } from "@/components/CookieConsent";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { business } from "@/config/business";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  applicationName: "Patropi",
  category: "hospitality",
  title: { default: "Hotel e Churrascaria Patropi | Casimiro de Abreu — RJ", template: "%s | Patropi" },
  description: business.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "pt_BR", siteName: "Patropi", title: "Hotel e Churrascaria Patropi", description: business.description, url: "/", images: [{ url: "/images/fachada-patropi.webp", width: 1600, height: 645, alt: "Fachada do Hotel e Churrascaria Patropi" }] },
  twitter: { card: "summary_large_image", title: "Hotel e Churrascaria Patropi", description: business.description, images: ["/images/fachada-patropi.webp"] },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.png", apple: "/icon.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#20231f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:p-3">Pular para o conteúdo</a><Header /><main id="conteudo">{children}</main><Footer /><MobileBar /><WhatsAppButton /><CookieConsent /></body></html>;
}
