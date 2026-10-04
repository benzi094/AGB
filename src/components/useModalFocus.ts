"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

// Isole une boîte de dialogue : le focus y entre (sur [data-autofocus] si présent), reste piégé dans le conteneur,
// le reste de la page devient `inert`, et le focus revient à l'élément d'origine à la fermeture.
export default function useModalFocus(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    // Seuls les éléments rendus inertes par ce dialogue sont restaurés (les dialogues imbriqués gèrent les leurs).
    const madeInert: HTMLElement[] = [];
    for (const el of Array.from(document.body.children)) {
      if (!(el instanceof HTMLElement) || el.contains(container) || el.inert) continue;
      if (el.tagName === "SCRIPT" || el.tagName === "STYLE") continue;
      el.inert = true;
      madeInert.push(el);
    }

    const initial = container.querySelector<HTMLElement>("[data-autofocus]") ?? container;
    initial.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0
      );
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!container.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (active === first || active === container)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      madeInert.forEach((el) => {
        el.inert = false;
      });
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [containerRef]);
}
