"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hammer, Building, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import AnimatedCounter from "./AnimatedCounter";
import { PROJECTS } from "@/data/projects";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transformations for background image, text, and floating cards
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const stats = [
    { value: 6, suffix: "", label: "Secteurs d'activité", icon: <Building className="w-5 h-5 text-primary-light" /> },
    { value: PROJECTS.length, suffix: "", label: "Réalisations présentées", icon: <Hammer className="w-5 h-5 text-accent" /> },
    { value: 3, suffix: "", label: "Valeurs", icon: <ShieldCheck className="w-5 h-5 text-primary-light" /> },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen lg:h-screen lg:min-h-[650px] w-full overflow-hidden bg-dark-section flex items-center pt-32 pb-16 lg:py-0"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover object-center"
        />
        {/* Premium multi-layered overlay for high contrast and modern styling */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-section via-dark-section/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-section via-transparent to-dark-section/40" />
        <div className="absolute inset-0 industrial-grid-dark opacity-10" />
      </motion.div>

      {/* Decorative diagonal layout elements */}
      <div className="absolute right-0 bottom-0 w-1/3 h-1/2 construction-lines opacity-10 pointer-events-none transform skew-y-12" />
      
      {/* Heavy Orange Divider Line */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-primary z-10" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Headline Block */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="lg:col-span-8 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-oswald text-white uppercase leading-[1.05] tracking-tight mb-6">
              <span className="block text-accent text-sm sm:text-base md:text-xl tracking-[0.25em] mb-4">
                African Global Business
              </span>
              Un partenaire <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                multisectoriel
              </span>{" "}
              pour vos projets.
            </h1>

            {/* Paragraph */}
            <p className="text-white/70 max-w-xl text-base md:text-lg mb-10 font-inter leading-relaxed">
              African Global Business (AGB) intervient dans le BTP, les infrastructures, la logistique, l&apos;import-export, l&apos;imprimerie et les fournitures, depuis Conakry, en Guinée.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="#quote"
                className="bg-primary hover:bg-primary-dark text-white font-oswald font-bold uppercase tracking-wider px-8 py-4 rounded-[6px] border border-primary-dark transition-all shadow-[0_5px_15px_rgba(220,1,17,0.3)] hover:-translate-y-0.5 flex items-center justify-center cursor-pointer group"
              >
                Parler de votre projet
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/realisations"
                className="bg-transparent hover:bg-white/5 text-white border-2 border-white/20 hover:border-white/50 font-oswald font-bold uppercase tracking-wider px-8 py-4 rounded-[6px] transition-all flex items-center justify-center cursor-pointer"
              >
                Voir les réalisations
              </Link>
            </div>
          </motion.div>

          {/* Floating Stats Block - Asymmetrical Layout */}
          <div className="lg:col-span-4 mt-12 lg:mt-0 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="bg-secondary/90 backdrop-blur-md border-4 border-primary rounded-[6px] p-8 w-full max-w-sm relative geo-border-orange"
            >
              {/* Decorative Corner Tab */}
              <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 font-oswald text-[10px] font-extrabold tracking-wider uppercase">
                Conakry · Guinée
              </div>

              <h3 className="text-lg font-bold font-oswald text-white uppercase tracking-wider mb-6 pb-2 border-b border-white/10">
                AGB en bref
              </h3>

              <div className="space-y-6">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="bg-dark-section p-3 border border-white/15 rounded-[6px] shrink-0">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white font-oswald">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs text-white/50 uppercase tracking-wider font-semibold font-inter">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
