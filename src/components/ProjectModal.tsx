"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  CircleCheck,
  Hammer,
  Images,
  Landmark,
  MessageCircle,
  Play,
  Tag,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import {
  CATEGORY_LABELS,
  DEFAULT_DESCRIPTION,
  STATUS_LABELS,
  countPhotos,
  type Project,
  type ProjectImage,
} from "@/data/projects";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import Lightbox from "./Lightbox";
import PhotoMosaic from "./PhotoMosaic";
import useModalFocus from "./useModalFocus";

interface LightboxState {
  images: ProjectImage[];
  index: number;
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
    <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:gap-3">
      <Icon className="h-5 w-5 sm:mt-0.5 sm:h-6 sm:w-6 shrink-0 text-primary" aria-hidden="true" />
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
export default function ProjectModal({
  project,
  onClose,
  next,
  onNavigate,
}: {
  project: Project;
  onClose: () => void;
  /** Projet suivant : affiche un bouton de navigation en bas de la fenêtre. */
  next?: Project;
  onNavigate?: (project: Project) => void;
}) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
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

  // Retour en haut quand on passe à un autre projet.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.slug]);

  const open = (images: ProjectImage[]) => (index: number) => setLightbox({ images, index });

  // Chantier suivi dans le temps : deux galeries (travaux puis résultat), empilées.
  const stages = [
    { title: "Pendant les travaux", images: project.workInProgress ?? [] },
    { title: "Projet terminé", images: project.completed ?? [] },
  ].filter((s) => s.images.length > 0);
  const hasStages = stages.length > 0;
  const visit = project.officialVisit;
  const whatsappUrl = buildWhatsAppUrl(
    `Bonjour AGB, j'ai vu votre réalisation « ${project.title} » et je souhaite un devis pour un projet similaire.`
  );

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-secondary/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          initial={{ scale: 0.94, y: 24, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.94, y: 24, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="relative flex h-[100dvh] w-full flex-col overflow-hidden border-0 outline-none sm:h-auto sm:w-[94vw] sm:max-w-[1200px] sm:max-h-[94dvh] sm:rounded-[8px] bg-white text-secondary shadow-[0_30px_80px_-12px_rgba(1,28,52,0.6)]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-secondary/70 text-white backdrop-blur-sm transition-colors hover:bg-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Fermer"
            title="Fermer"
            data-autofocus
          >
            <X className="h-5 w-5" />
          </button>

          <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden">
            {/* En-tête immersif : couverture pleine largeur, titre en incrustation */}
            <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] bg-slate-900">
              <Image
                key={project.cover.src}
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                priority
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/45 to-secondary/10" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
                <span className="text-[10px] font-bold font-oswald tracking-[0.12em] sm:tracking-[0.25em] uppercase text-accent">
                  {CATEGORY_LABELS[project.category]}
                </span>
                <h3 className="mt-2 font-oswald text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight text-white">
                  {project.title}
                </h3>
                <span className="mt-4 block h-1 w-16 bg-primary" />
              </div>
            </div>

            {/* Bandeau d'informations + appel à l'action */}
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-8 lg:px-10">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-4">
                  {project.status && (
                    <InfoItem icon={CalendarCheck} label="Statut" value={STATUS_LABELS[project.status]} />
                  )}
                  <InfoItem icon={Tag} label="Catégorie" value={CATEGORY_LABELS[project.category]} />
                  <InfoItem icon={Images} label="Photos" value={`${countPhotos(project)} photos`} />
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-brand-green px-6 py-3.5 font-oswald text-xs font-bold uppercase tracking-wider sm:tracking-widest text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Demander un devis
                </a>
              </div>
            </div>

            <div className="px-5 py-8 sm:px-8 lg:px-10">
              <p className="max-w-3xl font-inter text-[15px] sm:text-base leading-relaxed text-slate-600">
                {project.description ?? DEFAULT_DESCRIPTION}
              </p>
            </div>

            {/* Galeries en mosaïque */}
            {hasStages
              ? stages.map((stage) => (
                  <section key={stage.title} className="px-5 pb-10 sm:px-8 lg:px-10">
                    <SectionTitle icon={STAGE_ICONS[stage.title]}>{stage.title}</SectionTitle>
                    <PhotoMosaic images={stage.images} onOpen={open(stage.images)} />
                  </section>
                ))
              : project.gallery.length > 0 && (
                  <section className="px-5 pb-10 sm:px-8 lg:px-10">
                    <SectionTitle icon={Images}>Galerie</SectionTitle>
                    <PhotoMosaic images={project.gallery} onOpen={open(project.gallery)} />
                  </section>
                )}
            {hasStages && project.gallery.length > 0 && (
              <section className="px-5 pb-10 sm:px-8 lg:px-10">
                <SectionTitle icon={Images}>Galerie du projet</SectionTitle>
                <PhotoMosaic images={project.gallery} onOpen={open(project.gallery)} />
              </section>
            )}

            {project.video && (
              <section className="px-5 pb-10 sm:px-8 lg:px-10">
                <SectionTitle icon={Video}>Vidéo du chantier</SectionTitle>
                <ProjectVideo video={project.video} />
              </section>
            )}
            {visit && (
              <section className="px-5 pb-10 sm:px-8 lg:px-10">
                <SectionTitle icon={Landmark}>{visit.title}</SectionTitle>
                <PhotoMosaic images={visit.images} onOpen={open(visit.images)} />
              </section>
            )}

            {/* Pied : projet suivant */}
            {next && onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate(next)}
                className="group flex w-full items-center justify-between gap-4 bg-secondary px-5 py-6 text-left transition-colors hover:bg-slate-900 sm:px-8 lg:px-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              >
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold font-oswald uppercase tracking-[0.12em] sm:tracking-[0.25em] text-accent">
                    Projet suivant
                  </span>
                  <span className="mt-1 block truncate font-oswald text-xl font-bold uppercase text-white">
                    {next.title}
                  </span>
                </span>
                <ArrowRight className="h-6 w-6 shrink-0 text-white transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            index={lightbox.index}
            onIndexChange={(index) => setLightbox((l) => (l ? { ...l, index } : l))}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
