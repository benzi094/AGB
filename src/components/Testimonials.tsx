"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Building } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "BTP & Infrastructures",
    role: "Domaine 1",
    company: "Construction & travaux",
    quote: "Construction, réhabilitation et travaux : des projets tels que le Collège Damakania, Nongo et le Collège et Lycée Général Lansana Conté illustrent notre activité dans le BTP & la construction.",
  },
  {
    name: "Logistique & Import-Export",
    role: "Domaine 2",
    company: "Acheminement & approvisionnement",
    quote: "Des activités complémentaires pour accompagner l'organisation de l'acheminement et de l'approvisionnement de marchandises et de matériels.",
  },
  {
    name: "Imprimerie & Fournitures",
    role: "Domaine 3",
    company: "Impression & matériels",
    quote: "Des services d'impression ainsi que la fourniture de matériels adaptés aux besoins professionnels de nos clients.",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-dark-section text-white relative overflow-hidden diagonal-clip-both">
      {/* Background patterns */}
      <div className="absolute inset-0 industrial-grid-dark opacity-10 pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-64 h-64 construction-lines-dark opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Controls */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-accent font-bold text-xs tracking-[0.25em] uppercase block">
              Nos domaines
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-oswald text-white uppercase thick-underline-accent">
              Pôles d&apos;Activité
            </h2>
            <p className="text-white/60 leading-relaxed font-inter">
              AGB regroupe ses activités autour de plusieurs domaines complémentaires.
            </p>

            {/* Slider Navigation Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={prevTestimonial}
                className="bg-secondary hover:bg-primary border-2 border-slate-700 hover:border-primary text-white p-3 rounded-[6px] transition-colors cursor-pointer"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="bg-secondary hover:bg-primary border-2 border-slate-700 hover:border-primary text-white p-3 rounded-[6px] transition-colors cursor-pointer"
                aria-label="Suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Animated Card Slider */}
          <div className="lg:col-span-7 relative min-h-[320px] flex items-center">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-secondary/40 border-4 border-slate-700 p-8 md:p-10 rounded-[6px] relative geo-border-orange"
              >
                {/* Giant Quote Icon Decoration */}
                <Quote className="absolute right-6 top-6 w-16 h-16 text-slate-700/30 pointer-events-none" />

                {/* Review Text */}
                <p className="text-white/80 text-sm md:text-base leading-relaxed italic mb-8 font-inter">
                  {TESTIMONIALS[activeIndex].quote}
                </p>

                {/* Author Block */}
                <div className="flex items-center space-x-4 border-t border-slate-700 pt-6">
                  <div className="bg-primary/20 p-2.5 rounded-[6px] border border-primary/30 shrink-0">
                    <Building className="w-6 h-6 text-primary-light" />
                  </div>
                  <div>
                    <h4 className="font-oswald text-base font-bold text-white uppercase tracking-wide">
                      {TESTIMONIALS[activeIndex].name}
                    </h4>
                    <span className="text-[10px] sm:text-xs text-accent font-bold uppercase tracking-wider block font-inter">
                      {TESTIMONIALS[activeIndex].role} &bull; <span className="text-white/60">{TESTIMONIALS[activeIndex].company}</span>
                    </span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
