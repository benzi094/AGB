"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALISATION...");
  const [show, setShow] = useState(true);

  useEffect(() => {
    const textPhases = [
      { threshold: 0, text: "PRÉPARATION DU SITE..." },
      { threshold: 25, text: "CHARGEMENT DES CONTENUS..." },
      { threshold: 50, text: "MISE EN PLACE DES SECTIONS..." },
      { threshold: 75, text: "FINALISATION..." },
      { threshold: 90, text: "BIENVENUE CHEZ AGB..." },
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setShow(false), 500); // delay before hiding
          return 100;
        }

        const increment = Math.floor(Math.random() * 8) + 4; // increment 4 to 11%
        const next = Math.min(prev + increment, 100);

        // Update subtext
        const matched = textPhases.filter((p) => next >= p.threshold).pop();
        if (matched) {
          setLoadingText(matched.text);
        }

        return next;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 bg-dark-section flex flex-col items-center justify-center text-white p-4"
        >
          {/* Background grid lines */}
          <div className="absolute inset-0 industrial-grid-dark opacity-10 pointer-events-none" />
          
          {/* Diagonal construction hazards decorative borders */}
          <div className="absolute top-0 left-0 right-0 h-4 construction-lines-dark opacity-20" />
          <div className="absolute bottom-0 left-0 right-0 h-4 construction-lines-dark opacity-20" />

          <div className="relative max-w-md w-full flex flex-col items-center px-6">
            {/* Logo frame */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative p-6 border-4 border-primary rounded-[6px] mb-8 bg-dark-section flex items-center justify-center shadow-[0_0_20px_rgba(220,1,17,0.15)] group"
            >
              {/* Outer offset borders to look architectural */}
              <div className="absolute -inset-2 border border-accent opacity-30 pointer-events-none" />
              
              <div className="bg-white px-3 py-2 rounded-[4px]">
                <Logo className="h-20 w-[193px]" />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="sr-only"
            >
              AG<span className="text-primary-light">B</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xs uppercase tracking-[0.3em] text-white/60 mb-12 font-inter"
            >
              Entreprise multisectorielle
            </motion.p>

            {/* Progress counter */}
            <div className="w-full relative">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] md:text-xs tracking-wider text-accent font-semibold uppercase font-oswald animate-pulse">
                  {loadingText}
                </span>
                <span className="text-xl md:text-2xl font-bold font-oswald text-primary-light">
                  {progress}%
                </span>
              </div>

              {/* Progress bar container */}
              <div className="w-full h-[6px] bg-secondary border border-secondary/30 rounded-[4px] overflow-hidden p-[1px]">
                <motion.div
                  className="h-full bg-primary"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
