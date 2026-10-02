"use client";

import { motion } from "framer-motion";
import { ClipboardList, Paintbrush, FileCheck, Hammer, Sparkles, Key } from "lucide-react";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Écoute & Analyse du besoin",
    desc: "Échange avec le client pour comprendre son projet, ses contraintes et ses objectifs.",
    icon: <ClipboardList className="w-6 h-6" />,
    color: "border-primary text-primary-light",
  },
  {
    step: "02",
    title: "Étude & Planification",
    desc: "Définition de l'approche, des moyens à mobiliser et du calendrier d'intervention.",
    icon: <Paintbrush className="w-6 h-6" />,
    color: "border-accent-dark text-accent-dark",
  },
  {
    step: "03",
    title: "Organisation",
    desc: "Mobilisation des équipes, des matériaux et des fournitures nécessaires à la réalisation du projet.",
    icon: <FileCheck className="w-6 h-6" />,
    color: "border-primary text-primary-light",
  },
  {
    step: "04",
    title: "Exécution",
    desc: "Réalisation des travaux ou des prestations selon ce qui a été défini avec le client.",
    icon: <Hammer className="w-6 h-6" />,
    color: "border-accent-dark text-accent-dark",
  },
  {
    step: "05",
    title: "Suivi & Contrôle",
    desc: "Suivi régulier de l'avancement et vérification de la conformité aux attentes du client.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "border-primary text-primary-light",
  },
  {
    step: "06",
    title: "Livraison",
    desc: "Remise du projet ou des prestations et échange final avec le client.",
    icon: <Key className="w-6 h-6" />,
    color: "border-accent-dark text-accent-dark",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-dark-section text-white relative overflow-hidden diagonal-clip-both">
      {/* Background elements */}
      <div className="absolute inset-0 industrial-grid-dark opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 construction-lines opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-8">
        
        {/* Section Header */}
        <div className="mb-20 text-center">
          <span className="text-accent font-bold text-xs tracking-[0.25em] uppercase block mb-2">
            Notre méthode
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-oswald text-white uppercase thick-underline-accent">
            Notre Démarche
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          
          {/* Central Vertical Connecting Line (Hidden on mobile, centered on desktop) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] bg-slate-700 md:-translate-x-1/2 pointer-events-none">
            {/* Glowing Accent Progress bar inside */}
            <div className="absolute top-0 bottom-1/4 left-0 right-0 bg-gradient-to-b from-primary via-accent to-transparent" />
          </div>

          <div className="space-y-12 md:space-y-20">
            {PROCESS_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col md:flex-row relative items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Timeline Node Point */}
                  <div className="absolute left-0 md:left-1/2 top-2 md:top-1/2 -translate-x-0 md:-translate-x-1/2 -translate-y-0 md:-translate-y-1/2 z-10 shrink-0">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className={`bg-secondary border-4 ${step.color} w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg`}
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Spacer / Left side Content block on desktop */}
                  <div className="w-full md:w-1/2" />

                  {/* Details Card Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 mt-4 md:mt-0"
                  >
                    <div className="bg-secondary/40 border-2 border-slate-700 p-6 md:p-8 rounded-[6px] hover:border-primary transition-all duration-300 relative group">
                      
                      {/* Step Number Badge */}
                      <span className="absolute top-4 right-6 font-oswald text-3xl font-extrabold text-slate-700/50 group-hover:text-primary-light transition-colors">
                        {step.step}
                      </span>

                      <h3 className="font-oswald text-lg md:text-xl font-bold uppercase text-white tracking-wide mb-3 group-hover:text-primary-light transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-white/60 text-xs md:text-sm leading-relaxed font-inter">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
