"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HardHat, Eye, X, Compass } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  category: "btp";
  categoryLabel: string;
  description: string;
  image?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Collège Damakania",
    category: "btp",
    categoryLabel: "BTP & Construction",
    description: "Projet de réhabilitation du Collège Damakania réalisé par AGB.",
    image: "/Damakania.jpg",
  },
  {
    id: 2,
    title: "Nongo",
    category: "btp",
    categoryLabel: "BTP & Construction",
    description: "Projet de construction et travaux réalisé dans la zone de Nongo.",
    image: "/Nongo.jpg",
  },
  {
    id: 3,
    title: "Collège et Lycée Général Lansana Conté",
    category: "btp",
    categoryLabel: "BTP & Construction",
    description: "Projet de réhabilitation du Collège et Lycée Général Lansana Conté de Kindia réalisé par AGB.",
    image: "/kindia.jpg",
  },
];

const FILTERS = [
  { key: "all", label: "Toutes les réalisations" },
  { key: "btp", label: "BTP & Construction" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((project) =>
    activeFilter === "all" ? true : project.category === activeFilter
  );

  return (
    <section id="projects" className="py-24 bg-bg-light relative overflow-hidden industrial-grid">
      {/* Structural layout decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 construction-lines opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-primary font-bold text-xs tracking-[0.25em] uppercase block mb-2">
              Réalisations
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-oswald text-secondary uppercase thick-underline">
              Nos Réalisations
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 border-b-2 border-slate-200 pb-2">
            {FILTERS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-[4px] cursor-pointer ${
                  activeFilter === tab.key
                    ? "bg-primary text-white border-b-2 border-primary-dark shadow-[0_3px_8px_rgba(220,1,17,0.25)]"
                    : "text-slate-500 hover:text-primary hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Framer Motion AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-white border-4 border-slate-200 rounded-[6px] overflow-hidden hover:border-primary transition-all duration-300 flex flex-col group shadow-sm hover:shadow-lg cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-85">
                      <HardHat className="w-12 h-12 text-primary-light/70" />
                      <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/40 font-inter">
                        Visuel à venir
                      </span>
                    </div>
                  )}

                  {/* Category Accent Badge */}
                  <div className="absolute top-4 left-4 bg-secondary text-accent text-[10px] font-bold font-oswald tracking-widest uppercase px-3 py-1.5 border border-accent/25 rounded-[4px]">
                    {project.categoryLabel}
                  </div>

                  {/* Overlaid View Details Banner */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-secondary/95 text-white font-oswald text-xs font-bold uppercase tracking-widest px-4 py-2.5 border-2 border-primary rounded-[6px] flex items-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-4 h-4 mr-2 text-primary-light" />
                      Voir la réalisation
                    </span>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6 flex-grow flex flex-col justify-between border-t-2 border-slate-100 bg-white">
                  <div>
                    <h3 className="font-oswald text-xl font-bold uppercase text-secondary group-hover:text-primary transition-colors tracking-wide leading-snug mb-3">
                      {project.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500 font-inter">
                    <div className="flex items-center">
                      <HardHat className="w-4 h-4 mr-1.5 text-primary shrink-0" />
                      Réalisation AGB
                    </div>
                    <div className="flex items-center justify-end">
                      <Eye className="w-4 h-4 mr-1.5 text-primary shrink-0" />
                      Détails
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="bg-white text-secondary max-w-2xl w-full border-4 border-primary rounded-[6px] shadow-2xl relative overflow-hidden flex flex-col geo-border-orange"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 bg-secondary hover:bg-primary text-white p-2 rounded-[6px] transition-colors cursor-pointer"
                  aria-label="Fermer les détails"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Banner */}
                <div className="relative h-64 w-full bg-slate-900">
                  {selectedProject.image ? (
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      sizes="(min-width: 672px) 672px, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
                      <HardHat className="w-16 h-16 text-primary-light/70" />
                      <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/40 font-inter">
                        Visuel à venir
                      </span>
                  </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-accent font-bold font-oswald text-xs uppercase tracking-widest bg-primary/20 px-2 py-1 border border-accent/20 rounded">
                      {selectedProject.categoryLabel}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black font-oswald text-white uppercase tracking-wide mt-2">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider font-inter mb-3 flex items-center">
                      <Compass className="w-4 h-4 mr-1 text-primary" /> Présentation
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed font-inter">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Info Sheet Grid */}
                  <div className="bg-bg-light border border-slate-200 rounded-[6px] p-6">
                    <h4 className="font-oswald font-bold uppercase tracking-wider text-sm text-secondary mb-4 border-b border-slate-200 pb-2">
                      Informations
                    </h4>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs sm:text-sm font-inter">
                      <div>
                        <span className="text-slate-400 block mb-1">Catégorie</span>
                        <span className="font-semibold text-secondary flex items-center">
                          <HardHat className="w-3.5 h-3.5 text-primary mr-1 shrink-0" /> {selectedProject.categoryLabel}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block mb-1">Réalisé par</span>
                        <span className="font-semibold text-secondary">African Global Business</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Quote Button */}
                <div className="bg-bg-light border-t border-slate-200 p-4 flex justify-between items-center px-6">
                  <span className="text-xs text-slate-400 font-inter font-semibold">African Global Business</span>
                  <Link
                    href="#quote"
                    onClick={() => setSelectedProject(null)}
                    className="bg-primary hover:bg-primary-dark text-white font-oswald text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-[6px] border border-primary-dark shadow-md transition-colors"
                  >
                    Parler de votre projet
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
