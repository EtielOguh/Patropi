"use client";

export function CookieSettingsButton() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event("patropi:open-consent"))} className="text-left hover:text-white">Preferências de cookies</button>;
}
