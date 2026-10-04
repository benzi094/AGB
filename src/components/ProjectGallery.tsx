"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { ProjectImage } from "@/data/projects";

interface ProjectGalleryProps {
  images: ProjectImage[];
  /** Appelé au clic sur la grande image ; `sync` permet de recaler la galerie quand la visionneuse change de photo. */
  onOpen: (index: number, sync: (index: number) => void) => void;
  priority?: boolean;
  /** Classes de ratio de la grande image (4/3 par défaut). */
  aspect?: string;
}

const ARROW =
  "absolute top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-secondary/70 hover:bg-secondary/90 text-white " +
  "transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

// Grande image + miniatures + compteur + précédent/suivant. Une seule image : ni flèches ni miniatures.
export default function ProjectGallery({ images, onOpen, priority = false, aspect = "aspect-[4/3]" }: ProjectGalleryProps) {
  const [active, setActive] = useState(0);
  const [portrait, setPortrait] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const count = images.length;
  const multi = count > 1;
  const current = images[active];

  const go = (delta: number) => setActive((i) => (i + delta + count) % count);

  // Garde la miniature active visible (défilement horizontal uniquement, la page ne bouge pas).
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <div>
      <div
        className={`relative ${aspect} touch-pan-y overflow-hidden rounded-[6px] bg-slate-100`}
        onTouchStart={(e) => {
          touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }}
        onTouchEnd={(e) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start || !multi) return;
          const dx = e.changedTouches[0].clientX - start.x;
          const dy = e.changedTouches[0].clientY - start.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
        }}
      >
        <button
          type="button"
          onClick={() => onOpen(active, setActive)}
          className="absolute inset-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
          aria-label={`Agrandir : ${current.alt}`}
        >
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className={portrait ? "object-contain" : "object-cover"}
            onLoad={(e) => setPortrait(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth)}
          />
        </button>

        {multi && (
          <>
            <button type="button" onClick={() => go(-1)} className={`${ARROW} left-3`} aria-label="Photo précédente">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => go(1)} className={`${ARROW} right-3`} aria-label="Photo suivante">
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="pointer-events-none absolute bottom-3 right-3 rounded bg-secondary/75 px-2 py-1 text-[11px] font-semibold text-white font-inter">
              {active + 1} / {count}
            </span>
          </>
        )}
      </div>

      {multi && (
        <div ref={thumbsRef} className="mt-2 flex gap-2 overflow-x-auto pb-1 snap-x [scrollbar-width:thin]">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Photo ${i + 1} sur ${count}`}
              aria-current={i === active}
              className={`relative shrink-0 snap-start w-16 sm:w-20 aspect-[4/3] overflow-hidden rounded-[4px] border-2 transition-all cursor-pointer ${
                i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
