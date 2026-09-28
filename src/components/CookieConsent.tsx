"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Preference = "all" | "necessary";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(!localStorage.getItem("patropi-cookie-consent"));
    const open = () => setVisible(true);
    window.addEventListener("patropi:open-consent", open);
    return () => window.removeEventListener("patropi:open-consent", open);
  }, []);
  const save = (value: Preference) => {
    localStorage.setItem("patropi-cookie-consent", value);
    window.dispatchEvent(new CustomEvent("patropi:consent", { detail: value }));
    setVisible(false);
  };
  if (!visible) return null;
  return (
    <aside className="fixed bottom-20 left-3 right-3 z-[70] mx-auto max-w-3xl rounded-2xl border border-ink/10 bg-white p-5 shadow-2xl md:bottom-4 md:left-4 md:right-4" aria-label="Preferências de cookies" role="dialog" aria-live="polite">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex-1"><p className="font-display text-xl">Sua privacidade importa</p><p className="mt-1 text-sm leading-6 text-ink/75">Usamos cookies necessários para o site funcionar. Cookies de análise só serão ativados com seu consentimento. <Link href="/cookies" className="underline">Saiba mais</Link>.</p></div>
        <div className="grid w-full gap-2 sm:flex sm:w-auto sm:flex-wrap"><button onClick={() => save("necessary")} className="btn-secondary justify-center px-4 py-2 text-xs">Somente necessários</button><button onClick={() => save("all")} className="btn-primary justify-center px-4 py-2 text-xs">Aceitar opcionais</button></div>
      </div>
    </aside>
  );
}
