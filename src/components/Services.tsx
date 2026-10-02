"use client";

import { motion } from "framer-motion";
import { Building2, DraftingCompass, Hammer, Paintbrush, Briefcase, Wrench, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    title: "BTP & Construction",
    desc: "Réalisation de projets de construction, de réhabilitation et de travaux, au service des besoins de nos clients.",
    icon: <Building2 className="w-8 h-8 text-primary-light" />,
    number: "01",
  },
  {
    title: "Infrastructures",
    desc: "Intervention sur des projets d'infrastructures, en complément de nos activités de construction.",
    icon: <Wrench className="w-8 h-8 text-accent" />,
    number: "02",
  },
  {
    title: "Logistique",
    desc: "Organisation et suivi de l'acheminement de marchandises et de matériels.",
    icon: <Briefcase className="w-8 h-8 text-primary-light" />,
    number: "03",
  },
  {
    title: "Import & Export",
    desc: "Accompagnement dans l'approvisionnement et l'échange de produits et d'équipements.",
    icon: <DraftingCompass className="w-8 h-8 text-accent" />,
    number: "04",
  },
  {
    title: "Imprimerie",
    desc: "Services d'impression pour répondre aux besoins des professionnels et des organisations.",
    icon: <Paintbrush className="w-8 h-8 text-primary-light" />,
    number: "05",
  },
  {
    title: "Fournitures",
    desc: "Fourniture de matériels et de consommables adaptés aux besoins professionnels.",
    icon: <Hammer className="w-8 h-8 text-accent" />,
    number: "06",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-dark-section text-white relative overflow-hidden diagonal-clip-both">
      {/* Background patterns */}
      <div className="absolute inset-0 industrial-grid-dark opacity-10 pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-64 h-64 construction-lines-dark opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-accent font-bold text-xs tracking-[0.25em] uppercase block mb-2">
              Nos domaines
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-oswald text-white uppercase thick-underline-accent">
              Nos Services
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-sm md:text-base font-inter leading-relaxed">
            AGB intervient dans plusieurs secteurs d&apos;activité pour répondre aux besoins de ses clients.
          </p>
        </div>

        {/* Services Grid (Asymmetrical Industrial Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-secondary/40 border-2 border-slate-700 p-6 rounded-[6px] hover:border-primary hover:bg-secondary/70 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              whileHover={{ y: -5 }}
            >
              {/* Asymmetrical Corner Design Accent */}
              <div className="absolute top-0 right-0 bg-slate-700/50 group-hover:bg-primary text-white text-xs font-oswald font-extrabold px-3 py-1.5 transition-colors">
                {service.number}
              </div>

              <div>
                {/* Icon Circle */}
                <div className="bg-dark-section border border-slate-700 w-14 h-14 rounded-[6px] flex items-center justify-center mb-6 group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                  {service.icon}
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold font-oswald uppercase text-white mb-3 group-hover:text-primary-light transition-colors tracking-wide">
                  {service.title}
                </h3>

                {/* Service Desc */}
                <p className="text-white/60 text-xs font-inter leading-relaxed mb-8">
                  {service.desc}
                </p>
              </div>

              {/* Action Link */}
              <Link
                href="#quote"
                className="inline-flex items-center text-xs text-accent font-bold uppercase tracking-wider group-hover:text-primary-light transition-colors mt-auto font-oswald"
              >
                Nous contacter
                <ArrowUpRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
