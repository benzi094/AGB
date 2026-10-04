"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import type { ProjectImage } from "@/data/projects";
import useModalFocus from "./useModalFocus";

interface LightboxProps {
  images: ProjectImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const BUTTON =
  "bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/25 backdrop-blur-sm transition-colors cursor-pointer " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80";

export default function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useModalFocus(rootRef);
  const count = images.length;

  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + count) % count),
    [index, count, onIndexChange]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // L'élément <img> occupe toute la zone (object-contain) : on ne considère le clic
  // « sur l'image » que s'il tombe dans la zone réellement occupée par la photo.
  const handleStageClick = (e: React.MouseEvent) => {
    const img = imageRef.current;
    if (img) {
      // Photo pas encore chargée : dimensions inconnues, on ne ferme pas.
      if (!img.naturalWidth || !img.naturalHeight) return e.stopPropagation();
      const box = img.getBoundingClientRect();
      const scale = Math.min(box.width / img.naturalWidth, box.height / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const left = box.left + (box.width - w) / 2;
      const top = box.top + (box.height - h) / 2;
      if (e.clientX >= left && e.clientX <= left + w && e.clientY >= top && e.clientY <= top + h) return e.stopPropagation();
    }
    onClose();
  };

  const stop = (e: React.MouseEvent) => e.stopPropagation();
  const current = images[index];

  return (
    <motion.div
      ref={rootRef}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-dark-section/[0.98] flex flex-col outline-none"
      role="dialog"
      aria-modal="true"
      aria-label="Galerie photos"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null || count < 2) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      {/* Barre supérieure : compteur + fermeture */}
      <div className="flex items-center justify-between px-4 sm:px-6 pt-4 pb-2">
        <span className="font-oswald text-xs font-bold uppercase tracking-widest text-white/70">
          {index + 1} / {count}
        </span>
        <button
          type="button"
          onClick={(e) => {
            stop(e);
            onClose();
          }}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-secondary shadow-lg hover:bg-slate-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          aria-label="Fermer"
          title="Fermer"
          data-autofocus
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Photo */}
      <div className="relative flex-1 min-h-0 mx-3 sm:mx-20" onClick={handleStageClick}>
        <Image
          ref={imageRef}
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      {/* Navigation */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              stop(e);
              go(-1);
            }}
            className={`${BUTTON} absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center`}
            aria-label="Photo précédente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              stop(e);
              go(1);
            }}
            className={`${BUTTON} absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center`}
            aria-label="Photo suivante"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div className="px-4 py-3 text-center text-xs text-white/60 font-inter">{current.alt}</div>
    </motion.div>
  );
}
