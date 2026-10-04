"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, CircleCheck, FileText, Hammer, Images, Landmark, Play, Tag, Video, X, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { CATEGORY_LABELS, DEFAULT_DESCRIPTION, STATUS_LABELS, type Project, type ProjectImage } from "@/data/projects";
import Lightbox from "./Lightbox";
import ProjectGallery from "./ProjectGallery";
import useModalFocus from "./useModalFocus";

interface LightboxState {
  images: ProjectImage[];
  index: number;
  /** Recale la galerie d'origine sur la photo affichée dans la visionneuse. */
  sync?: (index: number) => void;
}

function SectionTitle({ children, icon: Icon }: { children: ReactNode; icon?: LucideIcon }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      {Icon && <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />}
      <h4 className="min-w-0 font-oswald font-bold uppercase tracking-wider text-sm text-secondary">{children}</h4>
      <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
      <div>
        <span className="block font-inter text-xs text-slate-500">{label}</span>
        <span className="block font-inter text-sm font-medium text-secondary">{value}</span>
      </div>
    </div>
  );
}

const STAGE_ICONS: Record<string, LucideIcon> = { "Pendant les travaux": Hammer, "Projet terminé": CircleCheck };

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
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalFocus(dialogRef);

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
        className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-secondary/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="relative flex h-[100dvh] w-full flex-col overflow-hidden border-0 outline-none sm:h-auto sm:w-[94vw] sm:max-w-[1500px] sm:max-h-[94dvh] sm:rounded-[8px] sm:border border-slate-200 bg-white text-secondary shadow-[0_24px_60px_-12px_rgba(1,28,52,0.45)]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-2 top-2 z-10 sm:right-3 sm:top-3 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-secondary shadow-md transition-colors hover:bg-slate-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            aria-label="Fermer"
            title="Fermer"
            data-autofocus
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {/* Haut : galerie principale + informations */}
            <div className="grid gap-6 px-4 pb-4 pt-16 sm:p-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-10">
              <div className="min-w-0">
                <ProjectGallery images={mainImages} onOpen={open(mainImages)} priority aspect="aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[350px]" />
              </div>

              <div className="flex min-w-0 flex-col lg:pr-10">
                <h3 className="font-oswald text-3xl font-black uppercase leading-tight tracking-wide text-secondary lg:text-4xl">
                  {project.title}
                </h3>

                <div className="mt-6">
                  <SectionTitle icon={FileText}>Présentation</SectionTitle>
                  <p className="text-sm leading-relaxed text-slate-600 font-inter">
                    {project.description ?? DEFAULT_DESCRIPTION}
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 min-[420px]:grid-cols-2">
                  <InfoItem icon={Tag} label="Catégorie" value={CATEGORY_LABELS[project.category]} />
                  {project.status && <InfoItem icon={CalendarCheck} label="Statut" value={STATUS_LABELS[project.status]} />}
                </div>
              </div>
            </div>

            {/* Galeries chronologiques */}
            {hasStages && (
              <div className="grid divide-y divide-slate-200 border-t border-slate-200 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
                {stages.map((stage) => (
                  <section key={stage.title} className="min-w-0 p-4 sm:p-6">
                    <SectionTitle icon={STAGE_ICONS[stage.title]}>{stage.title}</SectionTitle>
                    <ProjectGallery images={stage.images} onOpen={open(stage.images)} aspect="aspect-[4/3] lg:aspect-[16/9]" />
                  </section>
                ))}
              </div>
            )}

            {extraGallery && (
              <section className="mx-auto max-w-5xl border-t border-slate-200 p-4 sm:p-6 lg:p-8">
                <SectionTitle icon={Images}>Galerie du projet</SectionTitle>
                <ProjectGallery images={extraGallery} onOpen={open(extraGallery)} aspect="aspect-[4/3] lg:aspect-[16/9]" />
              </section>
            )}

            {/* Vidéo puis visite officielle */}
            {project.video && (
              <section className="border-t border-slate-200 p-4 sm:p-6 lg:p-8">
                <SectionTitle icon={Video}>Vidéo du chantier</SectionTitle>
                <ProjectVideo video={project.video} />
              </section>
            )}
            {visit && (
              <section className="mx-auto max-w-5xl border-t border-slate-200 p-4 sm:p-6 lg:p-8">
                <SectionTitle icon={Landmark}>{visit.title}</SectionTitle>
                <ProjectGallery images={visit.images} onOpen={open(visit.images)} aspect="aspect-[4/3] lg:aspect-[16/9]" />
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
