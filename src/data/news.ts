// Fil des actualités AGB.
// Une publication peut être textuelle, photographique ou vidéo ; elle peut pointer vers une
// réalisation (`projectSlug`) et réutilise alors les médias déjà déclarés, sans copie.

import type { ProjectImage } from "./projects";
import { VIDEOS, type SiteVideo } from "./videos";

export type NewsCategory = "realisations" | "chantiers" | "activites" | "evenements";
export type NewsFormat = "text" | "photo" | "video";

export interface NewsPost {
  slug: string;
  title: string;
  category: NewsCategory;
  format: NewsFormat;
  /** Libellé affiché sur le badge (ex. « Chantier en cours »). */
  label: string;
  /** Résumé court affiché sur les cartes. */
  excerpt: string;
  /** Paragraphes de la page de détail. */
  body: string[];
  /** Date de publication (AAAA-MM-JJ), renseignée uniquement lorsqu'elle est connue. */
  date?: string;
  cover: ProjectImage;
  video?: SiteVideo;
  /** Réalisation associée (slug de src/data/projects.ts). */
  projectSlug?: string;
}

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  realisations: "Réalisations",
  chantiers: "Chantiers",
  activites: "Activités",
  evenements: "Événements",
};

const FORMAT_LABELS: Partial<Record<NewsFormat, string>> = {
  video: "Vidéo",
  photo: "Photos",
};

/** Texte du badge : libellé + format (« Réalisation · Vidéo »). */
export function newsBadge(post: NewsPost): string {
  const format = FORMAT_LABELS[post.format];
  return format ? `${post.label} · ${format}` : post.label;
}

/** Date longue en français (« 6 novembre 2026 »). */
export function formatNewsDate(date: string): string {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`)
  );
}

// Ordre d'affichage : le plus récent en premier.
export const NEWS: NewsPost[] = [
  {
    slug: "taouyah-rogbane",
    title: "Taouyah Rogbane",
    category: "realisations",
    format: "video",
    label: "Réalisation",
    excerpt: "Découvrez en vidéo la présentation du projet Taouyah Rogbane et les éléments de sa réalisation.",
    body: [
      "Découvrez en vidéo la présentation du projet Taouyah Rogbane et les éléments de sa réalisation.",
      "Filmé depuis les airs, le coulage de la dalle en béton marque une étape importante dans l'avancement du chantier, mené par les équipes d'African Global Business.",
    ],
    cover: VIDEOS.taouyahRogbane.poster,
    video: VIDEOS.taouyahRogbane,
    projectSlug: "chantier-taouyah",
  },
  {
    slug: "yimbaya-soloprimo",
    title: "Yimbaya Soloprimo",
    category: "chantiers",
    format: "video",
    label: "Chantier en cours",
    excerpt:
      "De la vision architecturale à la réalisation sur le terrain, suivez l'évolution du projet Yimbaya Soloprimo.",
    body: [
      "De la vision architecturale à la réalisation sur le terrain, découvrez en images l'évolution du projet Yimbaya Soloprimo.",
      "Un chantier conduit avec rigueur par les équipes d'AGB.",
    ],
    cover: VIDEOS.yimbayaSoloprimo.poster,
    video: VIDEOS.yimbayaSoloprimo,
    projectSlug: "chantier-yimbaya-soloprimo",
  },
  {
    slug: "presentation-agb",
    title: "AGB en vidéo",
    category: "activites",
    format: "video",
    label: "Présentation",
    excerpt:
      "BTP, infrastructures, logistique, fournitures et imprimerie : découvrez en vidéo les métiers et les équipes d'African Global Business.",
    body: [
      "BTP et construction, infrastructures, logistique, fournitures et imprimerie : découvrez en vidéo les métiers d'African Global Business.",
      "Des chantiers, des équipes et des compétences multiples, mobilisés sur le terrain là où les projets prennent forme.",
    ],
    cover: VIDEOS.presentationAgb.poster,
    video: VIDEOS.presentationAgb,
  },
];

/** Texte du lien d'action d'une carte. */
export function newsAction(post: NewsPost): string {
  return post.format === "video" ? "Voir la vidéo" : "Lire l'article";
}

/** Recherche insensible à la casse et aux accents (titre, résumé, libellé). */
export function matchesNewsQuery(post: NewsPost, query: string): boolean {
  const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = normalize([post.title, post.excerpt, post.label, NEWS_CATEGORY_LABELS[post.category]].join(" "));
  return terms.every((term) => haystack.includes(term));
}

export function getNewsPost(slug: string): NewsPost | undefined {
  return NEWS.find((p) => p.slug === slug);
}

/** Publications mises en avant sur l'accueil. */
export const HOME_NEWS = NEWS.filter((p) => p.format === "video").slice(0, 3);
