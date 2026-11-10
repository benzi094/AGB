// Registre unique des vidéos du site.
// Une vidéo est déclarée une seule fois ici, puis référencée à la fois par une actualité
// (src/data/news.ts) et par la fiche projet correspondante (src/data/projects.ts).

export interface VideoPoster {
  src: string;
  alt: string;
}

export interface SiteVideo {
  id: string;
  /** Fichier MP4 (H.264, « faststart ») servi depuis /public. */
  src: string;
  /** Image extraite de la vidéo, affichée tant que la lecture n'a pas été demandée. */
  poster: VideoPoster;
  /** Format d'affichage du lecteur. */
  orientation: "landscape" | "portrait";
  /** Durée en secondes (affichée sur les miniatures). */
  duration: number;
}

const media = (path: string) => encodeURI(`/${path}`);

export const VIDEOS = {
  taouyahRogbane: {
    id: "taouyah-rogbane",
    src: media("Chantier Taouyah_rogbane/Taouyah_Robgane_coulage_AGB_v2_16x9.mp4"),
    poster: {
      src: media("Chantier Taouyah_rogbane/video-poster.webp"),
      alt: "Vue aérienne du chantier Taouyah Rogbane pendant le coulage de la dalle",
    },
    orientation: "landscape",
    duration: 39,
  },
  yimbayaSoloprimo: {
    id: "yimbaya-soloprimo",
    src: media("Chantier Yimbaya Soloprimo/Yimbaya_Soloprimo_vision_realisation_16x9.mp4"),
    poster: {
      src: media("Chantier Yimbaya Soloprimo/video-poster.webp"),
      alt: "Structure en béton du chantier Yimbaya Soloprimo",
    },
    orientation: "landscape",
    duration: 52,
  },
  presentationAgb: {
    id: "presentation-agb",
    src: media("AGB_16x9_web.mp4"),
    poster: {
      src: media("AGB_16x9_web-poster.webp"),
      alt: "Les équipes d'African Global Business sur un chantier",
    },
    orientation: "landscape",
    duration: 57,
  },
} satisfies Record<string, SiteVideo>;

/** Durée au format « m:ss ». */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
