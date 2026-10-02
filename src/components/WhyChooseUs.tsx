"use client";

import { motion } from "framer-motion";
import { Layers, HardHat, Truck, Printer, Building2, PhoneCall, Activity } from "lucide-react";
import Image from "next/image";

const REASONS = [
  {
    title: "Offre multisectorielle",
    desc: "BTP, infrastructures, logistique, import-export, imprimerie et fournitures réunis au sein d'une même entreprise.",
    icon: <Layers className="w-6 h-6 text-primary" />,
  },
  {
    title: "Expérience en BTP",
    desc: "Des réalisations en BTP & Construction, dont la réhabilitation du Collège Damakania.",
    icon: <HardHat className="w-6 h-6 text-accent-dark" />,
  },
  {
    title: "Logistique & Import-Export",
    desc: "Des activités complémentaires pour l'acheminement et l'approvisionnement de marchandises et de matériels.",
    icon: <Truck className="w-6 h-6 text-primary" />,
  },
  {
    title: "Imprimerie & Fournitures",
    desc: "Des services d'impression et de fournitures adaptés aux besoins professionnels.",
    icon: <Printer className="w-6 h-6 text-accent-dark" />,
  },
  {
    title: "Infrastructures",
    desc: "Une intervention sur des projets d'infrastructures, aux côtés de nos activités de construction.",
    icon: <Building2 className="w-6 h-6 text-primary" />,
  },
  {
    title: "Interlocuteur direct",
    desc: "Échangez directement avec notre équipe au +224 628 18 71 00.",
    icon: <PhoneCall className="w-6 h-6 text-accent-dark" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 bg-white relative overflow-hidden industrial-grid">
      
      {/* Decorative diagonal header line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-brand-green" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Premium Industrial Card */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-primary font-bold text-xs tracking-[0.25em] uppercase block">
              Nos atouts
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-oswald text-secondary uppercase thick-underline mb-8">
              Pourquoi Nous Choisir
            </h2>
            <p className="text-slate-600 leading-relaxed font-inter mb-6">
              Chez AGB, l&apos;intégrité, l&apos;innovation et l&apos;engagement guident chacune de nos interventions, quel que soit le secteur concerné.
            </p>

            {/* Premium structural image block with geometric borders and hazard lines */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[6px] overflow-hidden border-4 border-secondary aspect-[4/3] group shadow-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
                alt="Illustration de chantier"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Graphic Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-90" />
              
              {/* Floating Quote Over Image */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center space-x-2 text-accent text-xs font-bold uppercase tracking-widest font-oswald mb-2">
                  <Activity className="w-4 h-4 text-primary-light animate-pulse" />
                  <span>Nos valeurs</span>
                </div>
                <h3 className="font-oswald text-xl font-bold uppercase leading-tight">
                  Intégrité. Innovation. <br />
                  Engagement.
                </h3>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Grid of Reasons */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {REASONS.map((reason, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-bg-light border-2 border-slate-200 p-6 rounded-[6px] hover:border-primary hover:bg-white transition-all duration-300 relative group shadow-sm"
                >
                  {/* Decorative side color block that shows on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-primary transition-all rounded-[6px] rounded-r-none" />

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-white border border-slate-200 w-12 h-12 rounded-[6px] flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors shrink-0 shadow-sm">
                      {reason.icon}
                    </div>
                    <h3 className="font-oswald text-base font-bold text-secondary uppercase group-hover:text-primary transition-colors tracking-wide">
                      {reason.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-xs font-inter leading-relaxed">
                    {reason.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
