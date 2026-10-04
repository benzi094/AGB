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
  /** Mis en avant sur la page d'accueil. */
  featured?: boolean;
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
  src: encodeURI(`/${folder}/WhatsApp Image 2026-10-03 at ${id}.jpeg`),
  alt,
});

const photos = (folder: string, ids: string[], title: string): ProjectImage[] =>
  ids.map((id, i) => photo(folder, id, `${title} – photo ${i + 1}`));

const root = (file: string, alt: string): ProjectImage => ({
  src: encodeURI(`/${file}`),
  alt,
});

const DAMAKANIA = "Collège Damakania";
const LANSANA = "Lycée et collège Général Lansana conté finis";
const LAMBANDJI = "Chantier de Lambandji fini";
const LANSANAYA = "Chantier Lansanaya";
const MATAM = "Chantier Matam";
const BARRY = "Barry Diawadou";
const CAHIERS = "Livraison des cahiers pour les examens nationaux";
const VISITE = "Visite du ministre Paul Cedy sur le chantier Barry Diawadou de Matam"; // nom du dossier source

export const PROJECTS: Project[] = [
  {
    slug: "college-damakania",
    title: "Collège Damakania",
    category: "btp",
    status: "completed",
    description:
      "Réalisation d'un bâtiment scolaire par African Global Business, suivie de l'état du chantier jusqu'à la livraison du projet terminé.",
    cover: root("Damakania.jpg", "Collège Damakania"),
    gallery: [],
    workInProgress: photos(
      "Collège Damakania en cours",
      ["13.01.39 (3)", "13.01.39 (2)", "13.01.37", "13.01.37 (2)", "13.01.39 (1)", "13.01.39 (7)", "13.01.40", "13.01.40 (2)", "13.01.40 (3)"],
      `${DAMAKANIA} (pendant les travaux)`
    ),
    completed: photos(
      "Collège Damakania finis",
      ["13.03.58 (5)", "13.03.57", "13.03.57 (1)", "13.03.57 (3)", "13.03.58", "13.03.58 (1)", "13.03.58 (3)", "13.03.59"],
      `${DAMAKANIA} (projet terminé)`
    ),
    featured: true,
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
    featured: true,
  },
  {
    slug: "chantier-lambandji",
    title: "Chantier Lambandji",
    category: "btp",
    status: "completed",
    description:
      "Chantier de construction mené par African Global Business, de la structure aux finitions, aujourd'hui achevé.",
    cover: photo(LAMBANDJI, "13.06.55 (1)", "Chantier Lambandji"),
    gallery: photos(
      LAMBANDJI,
      ["13.06.55 (1)", "13.06.57", "13.06.57 (1)", "13.06.56 (1)", "13.06.56 (3)", "13.06.56"],
      "Chantier Lambandji"
    ),
    featured: true,
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
    cover: photo(LANSANAYA, "13.10.05 (4)", "Chantier Lansanaya"),
    gallery: photos(
      LANSANAYA,
      ["13.10.05 (4)", "13.09.51", "13.10.03", "13.10.03 (1)", "13.10.03 (2)", "13.10.04 (2)", "13.10.04 (3)", "13.10.04 (6)", "13.10.05 (1)", "13.10.05 (2)"],
      "Chantier Lansanaya"
    ),
  },
  {
    slug: "chantier-matam",
    title: "Chantier Matam",
    category: "btp",
    status: "ongoing",
    description: "Chantier de construction mené par African Global Business, avec un suivi rigoureux des travaux de construction et de finition.",
    cover: photo(MATAM, "13.12.56 (1)", "Chantier Matam"),
    gallery: photos(
      MATAM,
      ["13.12.56 (1)", "13.12.56 (2)", "13.12.57", "13.12.57 (1)", "13.12.57 (3)", "13.12.57 (5)"],
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
    cover: photo(BARRY, "13.04.57", "Barry Diawadou"),
    gallery: photos(
      BARRY,
      ["13.04.57", "13.04.58 (1)", "13.04.58 (2)", "13.04.58 (4)", "13.04.59", "13.04.59 (1)"],
      "Barry Diawadou"
    ),
    officialVisit: {
      title: "Visite officielle du ministre Paul Cedy sur le chantier Barry Diawadou de Matam",
      images: photos(VISITE, ["13.02.47", "13.02.47 (3)", "13.02.48", "13.02.49 (1)"], "Visite officielle du ministre Paul Cedy sur le chantier Barry Diawadou de Matam"),
    },
    featured: true,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

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
