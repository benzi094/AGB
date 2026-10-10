"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Images } from "lucide-react";
import Image from "next/image";
import { CATEGORY_LABELS, countPhotos, type Project } from "@/data/projects";
import ProjectStatusLabel from "./ProjectStatus";

// Carte en incrustation : la photo remplit la carte, les infos se superposent en bas.
export default function ProjectCardPremium({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.08 }}
      onClick={onOpen}
      aria-label={`Découvrir le projet ${project.title}`}
      className="group relative block w-full overflow-hidden rounded-[6px] bg-slate-900 text-left cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/25 to-transparent" />

        <span className="absolute left-4 top-4 font-oswald text-sm font-bold tracking-widest text-white/80">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-secondary/70 px-3 py-1.5 backdrop-blur-sm">
          <ProjectStatusLabel status={project.status} onDark />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="text-[10px] font-bold font-oswald tracking-[0.12em] sm:tracking-[0.2em] uppercase text-accent">
            {CATEGORY_LABELS[project.category]}
          </span>
          <h3 className="mt-1.5 font-oswald text-xl font-bold uppercase text-white leading-snug tracking-wide">
            {project.title}
          </h3>
          <span className="mt-3 block h-0.5 w-10 bg-primary transition-all duration-500 group-hover:w-full" />
          <div className="mt-3 flex items-center justify-between text-xs font-bold font-oswald uppercase tracking-wider sm:tracking-widest text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <Images className="w-3.5 h-3.5" />
              {countPhotos(project)} photos
            </span>
            <span className="inline-flex items-center transition-colors group-hover:text-accent">
              Découvrir
              <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
