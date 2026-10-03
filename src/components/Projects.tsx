"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FEATURED_PROJECTS, type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

// Sélection de réalisations pour la page d'accueil ; le portfolio complet est sur /realisations.
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 bg-bg-light relative overflow-hidden industrial-grid">
      {/* Structural layout decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 construction-lines opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-primary font-bold text-xs tracking-[0.25em] uppercase block mb-2">
            Réalisations
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-oswald text-secondary uppercase thick-underline">
            Nos Réalisations
          </h2>
        </div>

        {/* Sélection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} onOpen={() => setSelectedProject(project)} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/realisations"
            className="bg-primary hover:bg-primary-dark text-white font-oswald font-bold uppercase tracking-wider px-8 py-4 rounded-[6px] border border-primary-dark transition-all shadow-[0_5px_15px_rgba(220,1,17,0.3)] hover:-translate-y-0.5 flex items-center justify-center group"
          >
            Voir toutes nos réalisations
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <AnimatePresence>
          {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </AnimatePresence>
      </div>
    </section>
  );
}
