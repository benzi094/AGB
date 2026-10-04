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
    { key: "all" as const, label: "Tous", count: PROJECTS.length },
    ...CATEGORIES.map((c) => ({
      key: c,
      label: CATEGORY_LABELS[c],
      count: PROJECTS.filter((p) => p.category === c).length,
    })),
  ];

  return (
    <section className="py-16 bg-bg-light relative overflow-hidden industrial-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          role="group"
          aria-label="Filtrer les réalisations"
          className="mb-10 flex flex-nowrap gap-1 overflow-x-auto border-b border-slate-200 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {filters.map((tab) => {
            const active = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveFilter(tab.key)}
                className={`-mb-px min-h-11 shrink-0 whitespace-nowrap border-b-2 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                  active ? "border-primary text-secondary" : "border-transparent text-slate-500 hover:text-secondary"
                }`}
              >
                {tab.label} <span className={active ? "text-secondary/70" : "text-slate-400"}>({tab.count})</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
