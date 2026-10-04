"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
      className="text-left bg-white border border-slate-200 rounded-[6px] overflow-hidden hover:border-slate-300 transition-all duration-300 flex flex-col group shadow-sm hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 bg-secondary text-accent text-[10px] font-bold font-oswald tracking-widest uppercase px-3 py-1.5 border border-accent/25 rounded-[4px]">
          {CATEGORY_LABELS[project.category]}
        </div>

        <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors duration-300" />
      </div>

      {/* Infos */}
      <div className="px-4 py-3.5 flex-grow flex flex-col justify-between border-t border-slate-100 bg-white">
        <div>
          <h3 className="font-oswald text-lg font-bold uppercase text-secondary group-hover:text-primary transition-colors tracking-wide leading-snug">
            {project.title}
          </h3>
          {project.status && (
            <div className="mt-1.5">
              <ProjectStatusLabel status={project.status} />
            </div>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-xs font-bold font-oswald uppercase tracking-widest text-secondary group-hover:text-primary transition-colors">
          Découvrir le projet
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.button>
  );
}
