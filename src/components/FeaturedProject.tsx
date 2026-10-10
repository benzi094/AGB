"use client";

import { motion } from "framer-motion";
import { ArrowRight, Images } from "lucide-react";
import Image from "next/image";
import { CATEGORY_LABELS, countPhotos, type Project } from "@/data/projects";
import ProjectStatusLabel from "./ProjectStatus";

// Projet en vedette : grande image pleine largeur, titre en incrustation.
export default function FeaturedProject({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onClick={onOpen}
      aria-label={`Découvrir le projet ${project.title}`}
      className="group relative block w-full overflow-hidden rounded-[6px] bg-slate-900 text-left cursor-pointer shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          priority
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 via-transparent to-transparent" />

        <div className="absolute left-5 top-5 sm:left-8 sm:top-8 flex items-center gap-3">
          <span className="bg-primary text-white text-[10px] font-bold font-oswald tracking-[0.12em] sm:tracking-[0.2em] uppercase px-3 py-1.5 rounded-[4px]">
            À la une
          </span>
          <span className="hidden sm:inline text-[10px] font-bold font-oswald tracking-[0.12em] sm:tracking-[0.2em] uppercase text-white/80">
            {CATEGORY_LABELS[project.category]}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <ProjectStatusLabel status={project.status} onDark />
              <span className="inline-flex items-center gap-1.5 text-xs font-bold font-oswald uppercase tracking-wider text-white/85">
                <Images className="w-3.5 h-3.5" />
                {countPhotos(project)} photos
              </span>
            </div>
            <h2 className="mt-3 font-oswald text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white leading-tight">
              {project.title}
            </h2>
            <span className="mt-4 block h-1 w-16 bg-primary transition-all duration-500 group-hover:w-32" />
            {project.description && (
              <p className="mt-4 hidden sm:block text-sm lg:text-base text-white/80 font-inter leading-relaxed line-clamp-2">
                {project.description}
              </p>
            )}
          </div>

          <span className="inline-flex shrink-0 items-center self-start lg:self-end rounded-[6px] bg-white/95 px-6 py-3 text-xs font-bold font-oswald uppercase tracking-wider sm:tracking-widest text-secondary transition-colors group-hover:bg-primary group-hover:text-white">
            Découvrir le projet
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
