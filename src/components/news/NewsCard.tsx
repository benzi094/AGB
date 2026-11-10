import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { newsAction, type NewsPost } from "@/data/news";
import { NewsBadge, NewsDate, PlayIndicator, newsHref } from "./NewsParts";

// Carte d'une publication dans la grille de la page Actualités :
// grande miniature (étiquette, lecture, durée en incrustation), puis date, titre, résumé et action.
export default function NewsCard({ post, priority = false }: { post: NewsPost; priority?: boolean }) {
  const action = newsAction(post);
  return (
    <Link
      href={newsHref(post)}
      aria-label={`${action} : ${post.title}`}
      className="group flex h-full flex-col overflow-hidden rounded-[6px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(1,28,52,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_14px_30px_-14px_rgba(1,28,52,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <PlayIndicator post={post} />
        <span className="absolute left-4 top-4">
          <NewsBadge post={post} />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <NewsDate date={post.date} className="mb-3" />
        <h3 className="font-oswald text-xl font-bold uppercase leading-snug tracking-wide text-secondary transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2.5 font-inter text-sm leading-relaxed text-slate-600 line-clamp-3">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center pt-5 font-oswald text-sm font-bold uppercase tracking-wider text-secondary transition-colors group-hover:text-primary">
          {action}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
