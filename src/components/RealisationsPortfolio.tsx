"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORY_LABELS, PROJECTS, type Project, type ProjectCategory } from "@/data/projects";
import FeaturedProject from "./FeaturedProject";
import ProjectCardPremium from "./ProjectCardPremium";
import ProjectModal from "./ProjectModal";

// Filtres limités aux catégories qui ont réellement du contenu.
const CATEGORIES = (Object.keys(CATEGORY_LABELS) as ProjectCategory[]).filter((c) =>
  PROJECTS.some((p) => p.category === c)
);

export default function RealisationsPortfolio() {
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = PROJECTS.filter((p) => activeFilter === "all" || p.category === activeFilter);
  // Le premier projet de la liste filtrée est mis à la une, les suivants vont dans la grille.
  const [featured, ...others] = filtered;
  const nextOf = (project: Project) => {
    const i = filtered.findIndex((p) => p.slug === project.slug);
    return filtered.length > 1 && i !== -1 ? filtered[(i + 1) % filtered.length] : undefined;
  };
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
                className={`relative -mb-px min-h-11 shrink-0 whitespace-nowrap px-2 sm:px-4 text-[11px] sm:text-xs font-bold uppercase tracking-normal sm:tracking-wider transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                  active ? "text-secondary" : "text-slate-500 hover:text-secondary"
                }`}
              >
                {tab.label} <span className={active ? "text-secondary/70" : "text-slate-400"}>({tab.count})</span>
                {active && (
                  <motion.span
                    layoutId="filter-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {featured && (
            <FeaturedProject key={featured.slug} project={featured} onOpen={() => setSelectedProject(featured)} />
          )}
        </AnimatePresence>

        <motion.div layout className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {others.map((project, i) => (
              <ProjectCardPremium
                key={project.slug}
                project={project}
                index={i + 1}
                onOpen={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              next={nextOf(selectedProject)}
              onNavigate={setSelectedProject}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
