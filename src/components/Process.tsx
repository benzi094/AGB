"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessagesSquare, CalendarDays, Users, HardHat, Search, CircleCheck, type LucideIcon } from "lucide-react";

type ProcessStep = {
  step: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Écoute & Analyse du besoin",
    desc: "Échange avec le client pour comprendre son projet, ses contraintes et ses objectifs.",
    Icon: MessagesSquare,
  },
  {
    step: "02",
    title: "Étude & Planification",
    desc: "Définition de l'approche, des moyens à mobiliser et du calendrier d'intervention.",
    Icon: CalendarDays,
  },
  {
    step: "03",
    title: "Organisation",
    desc: "Mobilisation des équipes, des matériaux et des fournitures nécessaires à la réalisation du projet.",
    Icon: Users,
  },
  {
    step: "04",
    title: "Exécution",
    desc: "Réalisation des travaux ou des prestations selon ce qui a été défini avec le client.",
    Icon: HardHat,
  },
  {
    step: "05",
    title: "Suivi & Contrôle",
    desc: "Suivi régulier de l'avancement et vérification de la conformité aux attentes du client.",
    Icon: Search,
  },
  {
    step: "06",
    title: "Livraison",
    desc: "Remise du projet ou des prestations et échange final avec le client.",
    Icon: CircleCheck,
  },
];

// Photo réelle d'un chantier AGB (déjà présente dans la bibliothèque du site)
const PROCESS_PHOTO = {
  src: encodeURI("/Visite du ministre Paul Cedy sur le chantier Barry Diawadou de Matam/WhatsApp Image 2026-10-03 at 13.02.49 (1).webp"),
  alt: "Équipe AGB en casques et gilets de sécurité sur le chantier Barry Diawadou à Matam",
  caption: "Chantier Barry Diawadou · Matam",
};

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="py-24 bg-dark-section text-white relative overflow-hidden diagonal-clip-both"
    >
      {/* Background elements */}
      <div className="absolute inset-0 industrial-grid-dark opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 construction-lines opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">

          {/* Partie gauche : présentation + photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <span className="text-accent font-bold text-xs tracking-[0.25em] uppercase flex items-center gap-3 mb-2">
              Notre méthode
              <span className="h-[3px] w-10 bg-primary" aria-hidden="true" />
            </span>
            <h2
              id="process-heading"
              className="text-3xl md:text-5xl font-black font-oswald text-white uppercase thick-underline-accent"
            >
              Notre Démarche
            </h2>
            <p className="text-white/70 leading-relaxed font-inter mt-8 max-w-md">
              Une approche structurée, de la première écoute jusqu&apos;à la livraison, pour transformer vos besoins en réalisations concrètes.
            </p>

            <figure className="mt-8 relative rounded-[6px] border-4 border-slate-700 geo-border-orange">
              <div className="relative aspect-[921/810] overflow-hidden rounded-[2px] bg-slate-800">
                <Image
                  src={PROCESS_PHOTO.src}
                  alt={PROCESS_PHOTO.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-section/80 via-transparent to-transparent pointer-events-none" />
              </div>
              <figcaption className="absolute left-4 bottom-4 bg-secondary/90 border-l-4 border-primary px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white font-inter">
                {PROCESS_PHOTO.caption}
              </figcaption>
            </figure>
          </motion.div>

          {/* Partie droite : les six étapes */}
          <div className="lg:col-span-7">
            <ol className="relative space-y-4 sm:space-y-5">
              {/* Ligne verticale reliant les étapes */}
              <span
                className="absolute left-[7px] top-8 bottom-8 w-[2px] bg-slate-700 pointer-events-none"
                aria-hidden="true"
              >
                <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary to-transparent" />
              </span>

              {PROCESS_STEPS.map(({ step, title, desc, Icon }, idx) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="relative pl-8 sm:pl-10 group"
                >
                  {/* Point de la ligne */}
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[3px] border-primary bg-dark-section transition-colors group-hover:bg-primary"
                    aria-hidden="true"
                  />

                  <div className="flex items-stretch bg-white rounded-[6px] overflow-hidden border-2 border-transparent shadow-lg shadow-black/20 transition-colors duration-300 group-hover:border-primary">
                    {/* Numéro + icône */}
                    <div className="shrink-0 w-[84px] sm:w-[136px] bg-secondary border-l-4 border-primary flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-3 py-4 transition-colors duration-300 group-hover:bg-primary">
                      <span className="font-oswald text-2xl sm:text-3xl font-black text-white leading-none">
                        {step}
                      </span>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white/80" strokeWidth={1.75} aria-hidden="true" />
                    </div>

                    {/* Contenu */}
                    <div className="min-w-0 flex-1 px-4 py-4 sm:px-6 sm:py-5">
                      <h3 className="font-oswald text-base sm:text-lg font-bold text-secondary tracking-wide leading-snug">
                        {title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-inter mt-1">
                        {desc}
                      </p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </section>
  );
}
