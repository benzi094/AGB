"use client";

import { useId, useState } from "react";
import { Search, X } from "lucide-react";
import { NEWS, NEWS_CATEGORY_LABELS, matchesNewsQuery, type NewsCategory } from "@/data/news";
import NewsCard from "./NewsCard";

type Filter = "all" | NewsCategory;

const FILTERS: { key: Filter; label: string; count: number }[] = [
  { key: "all", label: "Toutes", count: NEWS.length },
  ...(Object.keys(NEWS_CATEGORY_LABELS) as NewsCategory[]).map((key) => ({
    key,
    label: NEWS_CATEGORY_LABELS[key],
    count: NEWS.filter((p) => p.category === key).length,
  })),
];

// Fil des actualités : filtres par rubrique + recherche plein texte.
export default function NewsFeed() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const searchId = useId();

  const posts = NEWS.filter((p) => (filter === "all" || p.category === filter) && matchesNewsQuery(p, query));
  const resultLabel = `${posts.length} publication${posts.length > 1 ? "s" : ""}`;

  const reset = () => {
    setFilter("all");
    setQuery("");
  };

  return (
    <section className="pt-12 pb-20 md:pt-14 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filtrer les actualités par rubrique"
            className="-mx-4 flex flex-nowrap gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.key)}
                  className={`min-h-11 shrink-0 whitespace-nowrap rounded-full border px-5 font-oswald text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ${
                    active
                      ? "border-secondary bg-secondary text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-secondary hover:text-secondary"
                  }`}
                >
                  {f.label} <span className={active ? "text-white/70" : "text-slate-400"}>({f.count})</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80">
            <label htmlFor={searchId} className="sr-only">
              Rechercher une actualité
            </label>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une actualité..."
              autoComplete="off"
              className="h-11 w-full rounded-[6px] border border-slate-200 bg-white pl-11 pr-10 font-inter text-sm text-secondary placeholder:text-slate-400 transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Effacer la recherche"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-secondary cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {resultLabel}
        </p>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {posts.map((post, i) => (
              <NewsCard key={post.slug} post={post} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="rounded-[6px] border border-slate-200 bg-white px-6 py-14 text-center">
            <p className="font-oswald text-lg font-bold uppercase tracking-wide text-secondary">Aucune publication</p>
            <p className="mt-2 font-inter text-sm text-slate-500">
              {query.trim()
                ? "Aucune actualité ne correspond à votre recherche."
                : "Aucune publication dans cette rubrique pour le moment."}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex items-center rounded-[6px] border-2 border-secondary px-5 py-2.5 font-oswald text-xs font-bold uppercase tracking-wider text-secondary transition-colors hover:bg-secondary hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              Voir toutes les actualités
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
