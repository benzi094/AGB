"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import { formatDuration, type SiteVideo } from "@/data/videos";

interface VideoPlayerProps {
  video: SiteVideo;
  /** Intitulé lu par les lecteurs d'écran (« Lire la vidéo : … »). */
  title: string;
  /** Attribut `sizes` de la miniature. */
  sizes: string;
  priority?: boolean;
  className?: string;
}

// Lecture à la demande : seule la miniature optimisée est chargée ; le fichier vidéo n'est
// demandé qu'au clic, puis lu avec les commandes natives du navigateur (clavier, plein écran).
export default function VideoPlayer({ video, title, sizes, priority = false, className = "" }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const aspect = video.orientation === "portrait" ? "aspect-[9/16]" : "aspect-video";

  return (
    <div className={`relative w-full ${aspect} overflow-hidden rounded-[6px] bg-slate-900 ${className}`}>
      {playing ? (
        <video
          src={video.src}
          poster={video.poster.src}
          controls
          autoPlay
          playsInline
          preload="metadata"
          aria-label={title}
          className="absolute inset-0 h-full w-full object-contain"
        >
          Votre navigateur ne permet pas de lire cette vidéo.
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
          aria-label={`Lire la vidéo : ${title} (${formatDuration(video.duration)})`}
        >
          <Image
            src={video.poster.src}
            alt={video.poster.alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
          <span className="absolute inset-0 bg-secondary/25 transition-colors group-hover:bg-secondary/10" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-secondary shadow-lg transition-colors group-hover:bg-white">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </span>
          <span className="absolute bottom-3 right-3 rounded-[4px] bg-secondary/80 px-2 py-1 font-oswald text-xs font-bold tracking-wider text-white">
            {formatDuration(video.duration)}
          </span>
        </button>
      )}
    </div>
  );
}
