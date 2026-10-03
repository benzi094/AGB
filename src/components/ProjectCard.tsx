"use client";

import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import Image from "next/image";
import { CATEGORY_LABELS, type Project } from "@/data/projects";
import ProjectStatusLabel from "./ProjectStatus";

export default function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onClick={onOpen}
      aria-label={`Découvrir le projet ${project.title}`}
      className="text-left bg-white border-4 border-slate-200 rounded-[6px] overflow-hidden hover:border-primary transition-all duration-300 flex flex-col group shadow-sm hover:shadow-lg cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute top-4 left-4 bg-secondary text-accent text-[10px] font-bold font-oswald tracking-widest uppercase px-3 py-1.5 border border-accent/25 rounded-[4px]">
          {CATEGORY_LABELS[project.category]}
        </div>

        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-secondary/95 text-white font-oswald text-xs font-bold uppercase tracking-widest px-4 py-2.5 border-2 border-primary rounded-[6px] flex items-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-4 h-4 mr-2 text-primary-light" />
            Voir le projet
          </span>
        </div>
      </div>

      {/* Infos */}
      <div className="p-5 flex-grow flex flex-col justify-between border-t-2 border-slate-100 bg-white">
        <div>
          <h3 className="font-oswald text-lg font-bold uppercase text-secondary group-hover:text-primary transition-colors tracking-wide leading-snug">
            {project.title}
          </h3>
          {project.status && (
            <div className="mt-2">
              <ProjectStatusLabel status={project.status} />
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-bold font-oswald uppercase tracking-widest text-primary">
          Découvrir le projet
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.button>
  );
}
