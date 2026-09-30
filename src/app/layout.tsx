import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { CookieConsent } from "@/components/CookieConsent";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { absoluteUrl, assetPath, business } from "@/config/business";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  applicationName: "Patropi",
  category: "hospitality",
  title: { default: "Hotel e Churrascaria Patropi | Casimiro de Abreu — RJ", template: "%s | Patropi" },
  description: business.description,
  alternates: { canonical: business.siteUrl },
  openGraph: { type: "website", locale: "pt_BR", siteName: "Patropi", title: "Hotel e Churrascaria Patropi", description: business.description, url: business.siteUrl, images: [{ url: absoluteUrl("/images/fachada-patropi.webp"), width: 1600, height: 645, alt: "Fachada do Hotel e Churrascaria Patropi" }] },
  twitter: { card: "summary_large_image", title: "Hotel e Churrascaria Patropi", description: business.description, images: [absoluteUrl("/images/fachada-patropi.webp")] },
  manifest: assetPath("/manifest.webmanifest"),
  icons: { icon: assetPath("/icon.png"), apple: assetPath("/icon.png") },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#19352d" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><Script id="patropi-cookie-consent-state" strategy="beforeInteractive">{`try{if(localStorage.getItem("patropi-cookie-consent")){var s=document.createElement("style");s.id="patropi-cookie-consent-style";s.textContent=".cookie-consent{display:none!important}";document.head.appendChild(s)}}catch(e){}`}</Script><a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:p-3">Pular para o conteúdo</a><Header /><CookieConsent /><main id="conteudo">{children}</main><Footer /><MobileBar /><WhatsAppButton /></body></html>;
}
