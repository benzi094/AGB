import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HOME_NEWS, type NewsPost } from "@/data/news";
import { NewsBadge, PlayIndicator, newsHref } from "./NewsParts";

// Publication mise en avant sur l'accueil : grande miniature à gauche, texte à droite.
function HighlightCard({ post }: { post: NewsPost }) {
  const action = post.video ? "Voir la vidéo" : "Lire la suite";
  return (
    <Link
      href={newsHref(post)}
      aria-label={`${action} : ${post.title}`}
      className="group flex flex-col overflow-hidden rounded-[6px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md sm:flex-row lg:flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-900 sm:aspect-auto sm:min-h-[240px] sm:w-[50%] sm:shrink-0 lg:aspect-video lg:min-h-0 lg:w-full">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <PlayIndicator post={post} />
        <span className="absolute left-3 top-3">
          <NewsBadge post={post} />
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center px-5 py-6 sm:px-6 lg:justify-start">
        <h3 className="font-oswald text-xl font-bold uppercase leading-snug tracking-wide text-secondary transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-3 font-inter text-sm leading-relaxed text-slate-600 lg:mb-5">{post.excerpt}</p>
        <span className="mt-5 block h-0.5 w-10 shrink-0 bg-primary lg:mt-auto transition-all duration-500 group-hover:w-16" aria-hidden="true" />
        <span className="mt-5 inline-flex items-center font-oswald text-xs font-bold uppercase tracking-widest text-secondary transition-colors group-hover:text-primary">
          {action}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

// Section éditoriale de l'accueil : trois publications et un lien vers le fil complet.
export default function NewsHighlights() {
  if (HOME_NEWS.length === 0) return null;
  return (
    <section id="actualites" aria-labelledby="actualites-title" className="py-20 bg-bg-light border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <span className="text-primary font-bold text-xs tracking-[0.25em] uppercase block mb-2">Nos actualités</span>
            <h2
              id="actualites-title"
              className="text-3xl md:text-4xl font-black font-oswald text-secondary uppercase thick-underline"
            >
              Actualités &amp; Réalisations
            </h2>
          </div>
          <p className="mt-4 font-inter text-sm md:text-base leading-relaxed text-slate-600 lg:col-span-4 lg:mt-0">
            Découvrez les projets, les activités et les réalisations qui témoignent de l&apos;engagement d&apos;AGB sur le
            terrain.
          </p>
          <div className="lg:col-span-3 lg:flex lg:justify-end">
            <Link
              href="/actualites"
              className="group inline-flex items-center justify-center rounded-[6px] border-2 border-secondary px-6 py-3 font-oswald text-sm font-bold uppercase tracking-wider text-secondary transition-colors hover:bg-secondary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              Voir toutes les actualités
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {HOME_NEWS.map((post) => (
            <HighlightCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
