"use client";

import { motion } from "framer-motion";
import { HardHat, ShieldCheck, Lightbulb, Handshake, Layers, MapPin } from "lucide-react";

interface Member {
  name: string;
  role: string;
  desc: string;
  icon: React.ReactNode;
}

const TEAM_MEMBERS: Member[] = [
  {
    name: "Intégrité",
    role: "Valeur",
    desc: "Agir avec honnêteté et transparence envers nos clients et nos partenaires.",
    icon: <ShieldCheck className="w-20 h-20" />,
  },
  {
    name: "Innovation",
    role: "Valeur",
    desc: "Rechercher des solutions adaptées et des façons de faire améliorées.",
    icon: <Lightbulb className="w-20 h-20" />,
  },
  {
    name: "Engagement",
    role: "Valeur",
    desc: "Mener chaque projet avec sérieux et responsabilité.",
    icon: <Handshake className="w-20 h-20" />,
  },
  {
    name: "Multisectoriel",
    role: "Positionnement",
    desc: "BTP, infrastructures, logistique, import-export, imprimerie et fournitures.",
    icon: <Layers className="w-20 h-20" />,
  },
  {
    name: "Conakry",
    role: "Positionnement",
    desc: "Siège à Hamdallaye Concasseur, Ratoma, Conakry, Guinée.",
    icon: <MapPin className="w-20 h-20" />,
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-white relative overflow-hidden industrial-grid">
      
      {/* Structural layout decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 construction-lines opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-primary font-bold text-xs tracking-[0.25em] uppercase block mb-2">
              Nos valeurs
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-oswald text-secondary uppercase thick-underline">
              Valeurs &amp; Positionnement
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm md:text-base font-inter leading-relaxed">
            Intégrité, innovation et engagement : les valeurs qui guident AGB, entreprise multisectorielle basée à Conakry.
          </p>
        </div>

        {/* Team Cards Grid (Asymmetrical Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-bg-light border-4 border-slate-200 hover:border-primary rounded-[6px] overflow-hidden transition-all duration-300 flex flex-col group relative"
            >
              {/* Asymmetrical top offset layout effect */}
              <div className="relative h-[140px] w-full shrink-0 bg-secondary overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 industrial-grid-dark opacity-10 pointer-events-none" />
                <div className="relative text-primary-light transition-transform duration-500 group-hover:scale-110">
                  {member.icon}
                </div>
                {/* Safety Helmet Overlay on Hover */}
                <div className="absolute top-3 right-3 bg-secondary/80 text-white p-2 rounded-[6px] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <HardHat className="w-4 h-4 text-primary-light" />
                </div>

                {/* Hover Slide Up Contact Strip */}
                <div className="absolute bottom-0 left-0 right-0 bg-primary/95 text-white py-3 px-4 flex justify-center border-t-2 border-primary-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <a href="#contact" className="text-xs font-bold font-oswald uppercase tracking-wider hover:text-secondary transition-colors">
                    Nous contacter
                  </a>
                </div>
              </div>

              {/* Text description */}
              <div className="p-4 h-[125px] flex flex-col justify-between bg-white border-t border-slate-100">
                <div>
                  <h3 className="font-oswald text-base font-extrabold text-secondary uppercase group-hover:text-primary transition-colors tracking-wide truncate">
                    {member.name}
                  </h3>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-2">
                    {member.role}
                  </span>
                  <p className="text-slate-500 text-[11px] leading-relaxed font-inter line-clamp-3">
                    {member.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
