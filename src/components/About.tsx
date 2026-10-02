"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Target, Eye, Calendar, ChevronRight, Quote } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const MILESTONES = [
  { year: "BTP & Construction", title: "Collège Damakania", desc: "Projet de réhabilitation du Collège Damakania réalisé par AGB." },
  { year: "BTP & Construction", title: "Nongo", desc: "Projet de construction et travaux réalisé dans la zone de Nongo." },
  { year: "BTP & Construction", title: "Collège et Lycée Général Lansana Conté", desc: "Projet de réhabilitation du Collège et Lycée Général Lansana Conté de Kindia réalisé par AGB." },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden industrial-grid">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 construction-lines opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-left">
          <span className="text-primary font-bold text-xs tracking-[0.25em] uppercase block mb-2">
            Qui sommes-nous
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-oswald text-secondary uppercase thick-underline">
            À propos d&apos;AGB
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Details, Experience & Mission */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-extrabold font-oswald text-secondary uppercase leading-tight">
                Une entreprise multisectorielle au service de vos projets
              </h3>
              <p className="text-slate-600 leading-relaxed font-inter">
                African Global Business (AGB) est une entreprise multisectorielle intervenant notamment dans le BTP, les infrastructures, la logistique, l&apos;import-export, l&apos;imprimerie et les fournitures. Basée à Conakry, elle accompagne ses clients dans des projets variés.
              </p>
              
              {/* Asymmetrical Experience Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="bg-secondary text-white p-6 rounded-[6px] border-l-8 border-primary flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute right-2 bottom-2 text-white/5 font-black text-7xl font-oswald pointer-events-none select-none">
                    6
                  </div>
                  <span className="text-4xl md:text-5xl font-black font-oswald text-primary-light">
                    <AnimatedCounter value={6} suffix="" />
                  </span>
                  <span className="text-xs uppercase font-bold tracking-widest text-accent font-inter mt-1">
                    Secteurs d&apos;activité
                  </span>
                  <span className="text-white/60 text-xs mt-2 font-inter">
                    BTP, infrastructures, logistique, import-export, imprimerie et fournitures.
                  </span>
                </div>
                
                <div className="bg-bg-light border-4 border-slate-200 p-6 rounded-[6px] flex flex-col justify-center relative overflow-hidden geo-border-orange">
                  <span className="text-4xl md:text-5xl font-black font-oswald text-secondary">
                    <AnimatedCounter value={3} suffix="" />
                  </span>
                  <span className="text-xs uppercase font-bold tracking-widest text-slate-500 font-inter mt-1">
                    Valeurs
                  </span>
                  <span className="text-slate-600 text-xs mt-2 font-inter">
                    Intégrité, innovation et engagement.
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Mission & Vision (Side-by-Side Asymmetrical Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-bg-light border border-slate-200 p-6 rounded-[6px] group hover:border-primary hover:bg-white transition-all duration-300 shadow-sm"
              >
                <div className="bg-primary/10 text-primary w-12 h-12 rounded-[6px] border border-primary/25 flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-white">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-oswald text-secondary uppercase mb-2">Notre positionnement</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-inter">
                  Une entreprise multisectorielle intervenant dans le BTP, les infrastructures, la logistique, l&apos;import-export, l&apos;imprimerie et les fournitures.
                </p>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-bg-light border border-slate-200 p-6 rounded-[6px] group hover:border-primary hover:bg-white transition-all duration-300 shadow-sm"
              >
                <div className="bg-accent/20 text-accent-dark w-12 h-12 rounded-[6px] border border-accent/25 flex items-center justify-center mb-4 transition-colors group-hover:bg-accent group-hover:text-secondary">
                  <Eye className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-oswald text-secondary uppercase mb-2">Nos valeurs</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-inter">
                  L&apos;intégrité, l&apos;innovation et l&apos;engagement guident notre manière de travailler avec nos clients et nos partenaires.
                </p>
              </motion.div>

            </div>

            {/* Awards & Accreditation Row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-secondary text-white p-6 rounded-[6px] flex flex-col md:flex-row items-center justify-between border-t-4 border-accent gap-6"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white/10 p-3 rounded-[6px] border border-white/15">
                  <MapPin className="w-8 h-8 text-accent animate-pulse" />
                </div>
                <div>
                  <h4 className="font-oswald text-lg font-bold uppercase tracking-wider">Basée à Conakry</h4>
                  <p className="text-xs text-white/60 font-inter mt-0.5">Hamdallaye Concasseur, Ratoma, Conakry, Guinée</p>
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-white/80 font-inter w-full md:w-auto">
                <li className="flex items-center"><ChevronRight className="w-3.5 h-3.5 text-primary-light mr-1 shrink-0" /> BTP &amp; Construction</li>
                <li className="flex items-center"><ChevronRight className="w-3.5 h-3.5 text-primary-light mr-1 shrink-0" /> Infrastructures</li>
                <li className="flex items-center"><ChevronRight className="w-3.5 h-3.5 text-primary-light mr-1 shrink-0" /> Logistique</li>
                <li className="flex items-center"><ChevronRight className="w-3.5 h-3.5 text-primary-light mr-1 shrink-0" /> Import &amp; Export</li>
                <li className="flex items-center"><ChevronRight className="w-3.5 h-3.5 text-primary-light mr-1 shrink-0" /> Imprimerie</li>
                <li className="flex items-center"><ChevronRight className="w-3.5 h-3.5 text-primary-light mr-1 shrink-0" /> Fournitures</li>
              </ul>
            </motion.div>

          </div>

          {/* Right Column: Timeline */}
          <div className="lg:col-span-5 bg-secondary text-white p-8 rounded-[6px] border-4 border-slate-700 relative geo-border-orange">
            <div className="absolute inset-0 bg-gradient-to-t from-dark-section via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-8">
                <Calendar className="w-5 h-5 text-primary-light" />
                <h3 className="text-xl font-bold font-oswald uppercase tracking-wider text-white">
                  Nos réalisations
                </h3>
              </div>

              {/* Timeline Container */}
              <div className="relative border-l-2 border-slate-700 ml-3 pl-6 space-y-8 py-2">
                {MILESTONES.map((milestone, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative group"
                  >
                    {/* Bullet */}
                    <div className="absolute -left-[33px] top-1 bg-secondary border-2 border-primary w-4 h-4 rounded-full group-hover:bg-primary transition-colors flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <span className="font-oswald text-xs font-bold text-primary-light tracking-widest uppercase block mb-1">
                      {milestone.year}
                    </span>
                    <h4 className="font-oswald text-base font-bold text-white uppercase group-hover:text-accent transition-colors">
                      {milestone.title}
                    </h4>
                    <p className="text-white/60 text-xs leading-relaxed font-inter mt-1.5">
                      {milestone.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Message de la direction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-12 bg-secondary text-white rounded-[6px] border-4 border-slate-700 overflow-hidden geo-border-orange"
        >
          {/* Photo (cadrée sur le portrait, sans le texte intégré) */}
          <div className="lg:col-span-5 relative aspect-[1350/830] lg:aspect-auto lg:min-h-[380px] bg-slate-800 overflow-hidden">
            <Image
              src="/direction-portrait.jpg"
              alt="Mamadou Camara, Directeur Général d'AGB"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[50%_20%]"
            />
          </div>

          {/* Message */}
          <figure className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center border-t-4 lg:border-t-0 lg:border-l-4 border-accent">
            <span className="text-primary-light font-bold text-xs tracking-[0.25em] uppercase block mb-4">
              Message de la direction
            </span>
            <Quote className="w-10 h-10 text-accent mb-4" />
            <blockquote className="text-white/90 text-base md:text-lg leading-relaxed font-inter">
              « Le développement durable d’une nation repose sur des actions concrètes et des partenaires de confiance. Chez AGB, nous croyons que chaque projet est une opportunité de bâtir un avenir solide, où infrastructures, logistique et services s’unissent pour transformer la Guinée et l’Afrique. »
            </blockquote>
            <figcaption className="mt-6 pt-6 border-t border-white/15">
              <span className="font-oswald text-xl font-bold uppercase tracking-wider text-white block">
                Mamadou Camara
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-accent font-inter">
                Directeur Général AGB
              </span>
            </figcaption>
          </figure>
        </motion.div>

      </div>
    </section>
  );
}
