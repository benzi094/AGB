// Données centralisées des réalisations AGB.
// Les images proviennent de /public (aucun fichier n'est renommé ni déplacé) :
// seules les photos retenues pour l'affichage sont listées ici.

export type ProjectCategory = "btp" | "fournitures";
export type ProjectStatus = "completed" | "ongoing";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Renseigné uniquement lorsque le statut est confirmé. */
  status?: ProjectStatus;
  description?: string;
  cover: ProjectImage;
  /** Galerie principale. */
  gallery: ProjectImage[];
  /** Pour un chantier suivi dans le temps : étapes puis résultat (remplace `gallery` à l'affichage). */
  workInProgress?: ProjectImage[];
  completed?: ProjectImage[];
  video?: { src: string; poster: ProjectImage };
  officialVisit?: { title: string; images: ProjectImage[] };
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  btp: "BTP & Construction",
  fournitures: "Fournitures",
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  completed: "Terminé",
  ongoing: "En cours",
};

export const DEFAULT_DESCRIPTION =
  "Chantier réalisé par African Global Business, avec un suivi rigoureux des travaux de la préparation jusqu'à la livraison.";

const photo = (folder: string, id: string, alt: string): ProjectImage => ({
  src: encodeURI(`/${folder}/WhatsApp Image 2026-10-03 at ${id}.webp`),
  alt,
});

const photos = (folder: string, ids: string[], title: string): ProjectImage[] =>
  ids.map((id, i) => photo(folder, id, `${title} – photo ${i + 1}`));

/** `names` : texte situé après « WhatsApp Image » dans le nom du fichier (sans extension). */
const shots = (folder: string, names: string[], title: string): ProjectImage[] =>
  names.map((name, i) => ({
    src: encodeURI(`/${folder}/WhatsApp Image ${name}.webp`),
    alt: `${title} – photo ${i + 1}`,
  }));

const root = (file: string, alt: string): ProjectImage => ({
  src: encodeURI(`/${file}`),
  alt,
});

const DAMAKANIA = "Collège Damakania";
const LANSANA = "Lycée et collège Général Lansana conté finis";
const LAMBANDJI = "Chantier de Lambandji fini";
const MANEYA = "Collège Maneya en cours";
const NONGO = "Chantier Nongo";
const TAOUYAH = "Chantier Taouyah";
const YIMBAYA = "Chantier Yimbaya Soloprimo";
const LANSANAYA = "Chantier Lansanaya";
const MATAM = "Chantier Matam";
const BARRY = "Barry Diawadou";
const CAHIERS = "Livraison des cahiers pour les examens nationaux";
const VISITE = "Visite du ministre Paul Cedy sur le chantier Barry Diawadou de Matam"; // nom du dossier source

const ALL_PROJECTS: Project[] = [
  {
    slug: "college-damakania",
    title: "Collège Damakania",
    category: "btp",
    status: "completed",
    description:
      "Construction d'un collège par African Global Business : bâtiments de classes et équipements annexes livrés et achevés.",
    cover: root("Damakania.webp", "Collège Damakania"),
    gallery: photos(
      DAMAKANIA,
      ["13.03.57 (1)", "13.03.57 (4)", "13.03.58 (2)", "13.03.58 (3)", "13.03.59 (3)", "13.03.57", "13.03.58 (6)", "13.03.59 (1)"],
      DAMAKANIA
    ),
  },
  {
    slug: "lycee-college-general-lansana-conte",
    title: "Lycée et Collège Général Lansana Conté",
    category: "btp",
    status: "completed",
    description: "Réhabilitation de l'établissement de Kindia : des travaux de remise en état pour offrir aux élèves un cadre d'étude adapté.",
    cover: photo(LANSANA, "13.00.44 (1)", "Lycée et Collège Général Lansana Conté"),
    gallery: photos(
      LANSANA,
      ["13.00.44 (1)", "13.00.41", "13.00.42 (1)", "13.00.41 (1)", "13.00.42 (5)", "13.00.42 (6)", "13.00.43 (1)", "13.00.43 (3)", "13.00.43 (6)", "13.00.44 (2)", "13.00.44 (3)", "13.00.44 (6)"],
      "Lycée et Collège Général Lansana Conté"
    ),
  },
  {
    slug: "chantier-lambandji",
    title: "Chantier Lambandji",
    category: "btp",
    status: "completed",
    description:
      "Chantier de construction mené par African Global Business, de la structure aux finitions, aujourd'hui achevé.",
    cover: photo(LAMBANDJI, "13.06.55 (1)", "Chantier Lambandji"),
    gallery: [],
    workInProgress: shots(LAMBANDJI, ["2026-10-03 at 13.07.12", "2026-10-03 at"], "Chantier Lambandji (pendant les travaux)"),
    completed: photos(
      LAMBANDJI,
      ["13.06.55 (1)", "13.06.57 (1)", "13.06.56 (1)", "13.06.56 (3)", "13.06.56", "13.06.57"],
      "Chantier Lambandji (projet terminé)"
    ),
  },
  {
    slug: "livraison-cahiers-examens-nationaux",
    title: "Livraison de cahiers pour les examens nationaux",
    category: "fournitures",
    description:
      "Fourniture et livraison de cahiers destinés aux examens nationaux, assurées par African Global Business.",
    cover: photo(CAHIERS, "13.03.31", "Livraison de cahiers pour les examens nationaux"),
    gallery: photos(
      CAHIERS,
      ["13.03.31", "13.03.32 (4)", "13.03.32 (1)", "13.03.32 (3)", "13.03.32"],
      "Livraison de cahiers pour les examens nationaux"
    ),
  },
  {
    slug: "chantier-lansanaya",
    title: "Chantier Lansanaya",
    category: "btp",
    status: "ongoing",
    description:
      "Chantier de construction suivi par African Global Business : gros œuvre, maçonnerie et aménagements intérieurs.",
    cover: shots(LANSANAYA, ["2026-10-07 at 12.56.08 (1)"], "Chantier Lansanaya")[0],
    gallery: [
      ...shots(LANSANAYA, ["2026-10-07 at 12.56.08 (1)", "2026-10-07 at 12.56.08 (3)"], "Chantier Lansanaya"),
      ...photos(LANSANAYA, ["13.10.05 (4)", "13.09.51", "13.10.05 (3)", "13.10.03 (1)", "13.10.03", "13.10.05 (1)"], "Chantier Lansanaya"),
    ],
  },
  {
    slug: "chantier-matam",
    title: "Chantier Matam",
    category: "btp",
    status: "ongoing",
    description: "Chantier de construction mené par African Global Business, avec un suivi rigoureux des travaux de construction et de finition.",
    cover: photo(MATAM, "13.12.56 (2)", "Chantier Matam"),
    gallery: photos(
      MATAM,
      ["13.12.56 (2)", "13.12.56 (1)", "13.12.57", "13.12.57 (1)", "13.12.57 (3)", "13.12.57 (5)"],
      "Chantier Matam"
    ),
  },
  {
    slug: "barry-diawadou",
    title: "Barry Diawadou",
    category: "btp",
    status: "ongoing",
    description:
      "Chantier de construction en cours à Matam, mené par African Global Business. Il a reçu la visite officielle du ministre Paul Cedy.",
    cover: shots(BARRY, ["2026-10-07 at 12.33.14 (4)"], "Barry Diawadou")[0],
    gallery: [
      ...shots(BARRY, ["2026-10-07 at 12.33.14 (4)", "2026-10-07 at 12.33.14 (10)", "2026-10-07 at 12.33.14", "2026-10-07 at 12.33.14 (6)", "2026-10-07 at 12.33.14 (8)", "2026-10-07 at 12.33.14 (1)"], "Barry Diawadou"),
      ...photos(BARRY, ["13.04.57", "13.04.58 (2)", "13.04.59"], "Barry Diawadou"),
    ],
    officialVisit: {
      title: "Visite officielle du ministre Paul Cedy sur le chantier Barry Diawadou de Matam",
      images: photos(VISITE, ["13.02.47", "13.02.47 (3)", "13.02.48", "13.02.49 (1)"], "Visite officielle du ministre Paul Cedy sur le chantier Barry Diawadou de Matam"),
    },
  },
  {
    slug: "college-maneya",
    title: "Collège Maneya",
    category: "btp",
    status: "ongoing",
    description: "Réhabilitation du collège de Maneya en cours : remise en état des salles de classe, de la toiture et des façades.",
    cover: photo(MANEYA, "13.01.39 (3)", "Collège Maneya"),
    gallery: photos(
      MANEYA,
      ["13.01.39 (3)", "13.01.37 (1)", "13.01.39 (2)", "13.01.37", "13.01.39 (6)", "13.01.40 (3)", "13.01.40 (4)", "13.01.40 (2)"],
      "Collège Maneya"
    ),
  },
  {
    slug: "chantier-nongo",
    title: "Chantier Nongo",
    category: "btp",
    status: "ongoing",
    description: "Chantier de construction à Nongo : fondations, voiles et dalles en béton armé suivis par African Global Business.",
    cover: shots(NONGO, ["2026-10-07 at 12.52.01 (3)"], "Chantier Nongo")[0],
    gallery: shots(
      NONGO,
      ["2026-10-07 at 12.52.01 (3)", "2026-10-07 at 1", "2026-10-07 56.45", "2026-10-07 at 12.48.38", "2026-10-07 at 12.56.45", "2026-10-07 at 12.52.01 (2)", "2026-10-07 at 12.52.01 (1)", "2026-10-03 at 13.12.57"],
      "Chantier Nongo"
    ),
  },
  {
    slug: "chantier-taouyah",
    title: "Chantier Taouyah",
    category: "btp",
    status: "ongoing",
    description: "Chantier de construction à Taouyah, vu du ciel : coulage des dalles et avancement du gros œuvre.",
    cover: shots(TAOUYAH, ["2026-10-07 at 14.53.32 (4)"], "Chantier Taouyah")[0],
    gallery: shots(
      TAOUYAH,
      ["2026-10-07 at 14.53.32 (4)", "2026-10-07 at 12.53.54", "2026-10-07 at 14.53.31", "2026-10-07 at 14.53.32 (2)", "2026-10-07 at 14.53.32 (5)", "2026-10-07 at 14.53.32 (8)"],
      "Chantier Taouyah"
    ),
  },
  {
    slug: "chantier-yimbaya-soloprimo",
    title: "Chantier Yimbaya Soloprimo",
    category: "btp",
    status: "ongoing",
    description: "Chantier de construction à Yimbaya Soloprimo : poteaux et dalle du rez-de-chaussée.",
    cover: shots(YIMBAYA, ["2026-10-07 at 12.57.21"], "Chantier Yimbaya Soloprimo")[0],
    gallery: shots(YIMBAYA, ["2026-10-07 at 12.57.21", "10-07 at 12.57.21", "2026-7 at 12.57.21"], "Chantier Yimbaya Soloprimo"),
  },
];

/** Réalisations mises en avant sur l'accueil, dans l'ordre d'affichage (elles ouvrent aussi la page Réalisations). */
const FEATURED_SLUGS = [
  "barry-diawadou",
  "chantier-nongo",
  "chantier-taouyah",
  "chantier-yimbaya-soloprimo",
  "chantier-matam",
  "chantier-lansanaya",
];

/** Ordre de la page Réalisations : la sélection de l'accueil, puis ces projets. */
const PORTFOLIO_ORDER = [
  ...FEATURED_SLUGS,
  "chantier-lambandji",
  "livraison-cahiers-examens-nationaux",
  "college-damakania",
  "lycee-college-general-lansana-conte",
  "college-maneya",
];

const rank = (slug: string) => {
  const i = PORTFOLIO_ORDER.indexOf(slug);
  return i === -1 ? PORTFOLIO_ORDER.length : i;
};

/** Toutes les réalisations, dans l'ordre de `PORTFOLIO_ORDER` (les projets absents de la liste passent à la fin). */
export const PROJECTS: Project[] = [...ALL_PROJECTS].sort((a, b) => rank(a.slug) - rank(b.slug));

export const FEATURED_PROJECTS = FEATURED_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter(
  (p): p is Project => p !== undefined
);

/** Sections de galerie affichées dans le détail d'un projet, dans l'ordre. */
export function getGallerySections(project: Project): { title?: string; images: ProjectImage[] }[] {
  const sections: { title?: string; images: ProjectImage[] }[] = [];
  if (project.workInProgress?.length) sections.push({ title: "Pendant les travaux", images: project.workInProgress });
  if (project.completed?.length) sections.push({ title: "Projet terminé", images: project.completed });
  if (project.gallery.length) sections.push({ title: project.workInProgress ? undefined : "Galerie", images: project.gallery });
  if (project.officialVisit) sections.push({ title: "Visite officielle", images: project.officialVisit.images });
  return sections;
}

export function countPhotos(project: Project): number {
  return getGallerySections(project).reduce((n, s) => n + s.images.length, 0);
}
