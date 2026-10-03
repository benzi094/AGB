"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORY_LABELS, PROJECTS, type Project, type ProjectCategory } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

// Filtres limités aux catégories qui ont réellement du contenu.
const CATEGORIES = (Object.keys(CATEGORY_LABELS) as ProjectCategory[]).filter((c) =>
  PROJECTS.some((p) => p.category === c)
);

export default function RealisationsPortfolio() {
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = PROJECTS.filter((p) => activeFilter === "all" || p.category === activeFilter);
  const filters = [
    { key: "all" as const, label: "Tous" },
    ...CATEGORIES.map((c) => ({ key: c, label: CATEGORY_LABELS[c] })),
  ];

  return (
    <section className="py-16 bg-bg-light relative overflow-hidden industrial-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap gap-2 border-b-2 border-slate-200 pb-2 mb-10">
          {filters.map((tab) => (
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

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} onOpen={() => setSelectedProject(project)} />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </AnimatePresence>
      </div>
    </section>
  );
}
