import { CalendarDays, ChevronRight, Play } from "lucide-react";
import Link from "next/link";
import { formatNewsDate, newsBadge, type NewsPost } from "@/data/news";
import { formatDuration } from "@/data/videos";

// Petits éléments partagés par les cartes et la page de détail des actualités.
// Styles repris des composants existants (badge de ProjectCard, pastille de lecture du lecteur vidéo).

export function NewsBadge({ post }: { post: NewsPost }) {
  return (
    <span className="inline-block bg-secondary text-accent text-[10px] font-bold font-oswald tracking-widest uppercase px-3 py-1.5 border border-accent/25 rounded-[4px]">
      {newsBadge(post)}
    </span>
  );
}

export function NewsDate({ date, className = "" }: { date?: string; className?: string }) {
  if (!date) return null;
  return (
    <time dateTime={date} className={`inline-flex items-center gap-1.5 font-inter text-xs text-slate-500 ${className}`}>
      <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
      {formatNewsDate(date)}
    </time>
  );
}

/** Indicateur de lecture superposé à une miniature (décoratif : le lien porte l'intitulé). */
export function PlayIndicator({ post, size = "md" }: { post: NewsPost; size?: "sm" | "md" }) {
  if (!post.video) return null;
  const circle = size === "sm" ? "h-12 w-12" : "h-16 w-16";
  const icon = size === "sm" ? "h-5 w-5" : "h-7 w-7";
  return (
    <>
      <span className="absolute inset-0 bg-secondary/20 transition-colors group-hover:bg-secondary/5" aria-hidden="true" />
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span
          className={`flex ${circle} items-center justify-center rounded-full bg-white/90 text-secondary shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-white`}
        >
          <Play className={`ml-0.5 ${icon} fill-current`} />
        </span>
      </span>
      <span
        className="absolute bottom-3 right-3 rounded-[4px] bg-secondary/80 px-2 py-1 font-oswald text-xs font-bold tracking-wider text-white"
        aria-hidden="true"
      >
        {formatDuration(post.video.duration)}
      </span>
    </>
  );
}

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap items-center gap-1.5 font-inter text-xs text-white/60">
        {items.map((item, i) => (
          <li key={item.label} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-white/90">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export const newsHref = (post: NewsPost): string => `/actualites/${post.slug}`;
export const projectHref = (slug: string): string => `/realisations?projet=${encodeURIComponent(slug)}`;
