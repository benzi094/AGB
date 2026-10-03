"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORY_LABELS, DEFAULT_DESCRIPTION, STATUS_LABELS, type Project, type ProjectImage } from "@/data/projects";
import Lightbox from "./Lightbox";
import ProjectGallery from "./ProjectGallery";

interface LightboxState {
  images: ProjectImage[];
  index: number;
  /** Recale la galerie d'origine sur la photo affichée dans la visionneuse. */
  sync?: (index: number) => void;
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h4 className="font-oswald font-bold uppercase tracking-wider text-sm text-secondary mb-4 pb-2 border-b border-slate-200">
      {children}
    </h4>
  );
}

// Vidéo : rien n'est chargé tant que l'utilisateur n'a pas cliqué sur la miniature.
function ProjectVideo({ video }: { video: NonNullable<Project["video"]> }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative mx-auto w-full max-w-[240px] aspect-[9/16] max-h-[70vh] overflow-hidden rounded-[6px] bg-slate-900">
      {playing ? (
        <video
          src={video.src}
          poster={video.poster.src}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-contain"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
          aria-label="Lire la vidéo du chantier"
        >
          <Image src={video.poster.src} alt={video.poster.alt} fill sizes="240px" className="object-cover" />
          <span className="absolute inset-0 bg-secondary/30 group-hover:bg-secondary/15 transition-colors" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 group-hover:bg-white text-secondary shadow-lg transition-colors">
              <Play className="h-6 w-6 fill-current" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

// Modal unique : son contenu s'adapte aux données du projet (une galerie, deux galeries chronologiques,
// vidéo, visite officielle, statut présent ou non).
export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    if (lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, onClose]);

  const open = (images: ProjectImage[]) => (index: number, sync: (i: number) => void) =>
    setLightbox({ images, index, sync });

  // Chantier suivi dans le temps : la grande image du haut est la couverture, les deux galeries sont en dessous.
  const stages = [
    { title: "Pendant les travaux", images: project.workInProgress ?? [] },
    { title: "Projet terminé", images: project.completed ?? [] },
  ].filter((s) => s.images.length > 0);
  const hasStages = stages.length > 0;
  const mainImages = hasStages || project.gallery.length === 0 ? [project.cover] : project.gallery;
  const extraGallery = hasStages && project.gallery.length > 0 ? project.gallery : null;
  const visit = project.officialVisit;

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-secondary/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="relative flex w-full max-w-6xl max-h-[94vh] flex-col overflow-hidden rounded-[8px] border border-slate-200 bg-white text-secondary shadow-[0_24px_60px_-12px_rgba(1,28,52,0.45)]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-secondary shadow-md transition-colors hover:bg-slate-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            aria-label="Fermer"
            title="Fermer"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {/* Haut : galerie principale + informations */}
            <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-10 lg:p-8">
              <div className="min-w-0">
                {!hasStages && <SectionTitle>Galerie du projet</SectionTitle>}
                <ProjectGallery images={mainImages} onOpen={open(mainImages)} priority />
              </div>

              <div className="min-w-0 lg:pr-10 lg:pt-1">
                <span className="block font-oswald text-xs font-bold uppercase tracking-widest text-primary">
                  {CATEGORY_LABELS[project.category]}
                </span>
                <h3 className="mt-2 font-oswald text-3xl font-black uppercase leading-tight tracking-wide text-secondary lg:text-4xl">
                  {project.title}
                </h3>
                {project.status && (
                  <span className="mt-4 inline-flex items-center gap-2 rounded bg-slate-100 px-3 py-1.5 font-oswald text-xs font-bold uppercase tracking-widest text-secondary">
                    <span
                      className={`h-2 w-2 rounded-full ${project.status === "completed" ? "bg-brand-green" : "bg-accent"}`}
                    />
                    {STATUS_LABELS[project.status]}
                  </span>
                )}

                <div className="mt-8">
                  <SectionTitle>Présentation</SectionTitle>
                  <p className="text-sm leading-relaxed text-slate-600 font-inter">
                    {project.description ?? DEFAULT_DESCRIPTION}
                  </p>
                </div>

                <Link
                  href="/#quote"
                  onClick={onClose}
                  className="mt-8 inline-block rounded-[6px] border border-primary-dark bg-primary px-5 py-2.5 font-oswald text-xs font-bold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-primary-dark"
                >
                  Parler de votre projet
                </Link>
              </div>
            </div>

            {/* Galeries chronologiques */}
            {hasStages && (
              <div className="divide-y divide-slate-200 border-t border-slate-200">
                {stages.map((stage) => (
                  <section key={stage.title} className="mx-auto min-w-0 max-w-3xl p-4 sm:p-6 lg:p-8">
                    <SectionTitle>{stage.title}</SectionTitle>
                    <ProjectGallery images={stage.images} onOpen={open(stage.images)} />
                  </section>
                ))}
              </div>
            )}

            {extraGallery && (
              <section className="mx-auto max-w-3xl border-t border-slate-200 p-4 sm:p-6 lg:p-8">
                <SectionTitle>Galerie du projet</SectionTitle>
                <ProjectGallery images={extraGallery} onOpen={open(extraGallery)} />
              </section>
            )}

            {/* Vidéo puis visite officielle */}
            {project.video && (
              <section className="border-t border-slate-200 p-4 sm:p-6 lg:p-8">
                <SectionTitle>Vidéo du chantier</SectionTitle>
                <ProjectVideo video={project.video} />
              </section>
            )}
            {visit && (
              <section className="mx-auto max-w-3xl border-t border-slate-200 p-4 sm:p-6 lg:p-8">
                <SectionTitle>{visit.title}</SectionTitle>
                <ProjectGallery images={visit.images} onOpen={open(visit.images)} />
              </section>
            )}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            index={lightbox.index}
            onIndexChange={(index) => {
              setLightbox((l) => (l ? { ...l, index } : l));
              lightbox.sync?.(index);
            }}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
