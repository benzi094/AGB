"use client";

import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import Image from "next/image";
import type { ProjectImage } from "@/data/projects";

// Mosaïque de miniatures : la première photo est mise en grand quand il y en a assez. Un clic ouvre la visionneuse.
export default function PhotoMosaic({
  images,
  onOpen,
}: {
  images: ProjectImage[];
  onOpen: (index: number) => void;
}) {
  const hero = images.length >= 4;
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[130px] sm:auto-rows-[160px] lg:auto-rows-[180px]">
      {images.map((img, i) => (
        <motion.button
          key={img.src}
          type="button"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
          onClick={() => onOpen(i)}
          aria-label={`Agrandir : ${img.alt}`}
          className={`group relative overflow-hidden rounded-[6px] bg-slate-200 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
            hero && i === 0 ? "col-span-2 row-span-2" : ""
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={hero && i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <span className="absolute inset-0 bg-secondary/0 transition-colors duration-300 group-hover:bg-secondary/35" />
          <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-secondary opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100">
            <Expand className="h-4 w-4" />
          </span>
        </motion.button>
      ))}
    </div>
  );
}
