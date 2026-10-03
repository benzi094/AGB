"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Qui est African Global Business (AGB) ?",
    answer: "African Global Business (AGB) est une entreprise multisectorielle intervenant notamment dans le BTP, les infrastructures, la logistique, l'import-export, l'imprimerie et les fournitures.",
  },
  {
    question: "Dans quels secteurs AGB intervient-elle ?",
    answer: "AGB intervient dans six secteurs : BTP & Construction, Infrastructures, Logistique, Import & Export, Imprimerie et Fournitures.",
  },
  {
    question: "Où se situe AGB ?",
    answer: "AGB est basée à Hamdallaye Concasseur, Ratoma, Conakry, en Guinée.",
  },
  {
    question: "Quelles réalisations AGB présente-t-elle ?",
    answer: "Dans le secteur BTP & Construction, AGB présente notamment le Collège Damakania et la réhabilitation du Collège et Lycée Général Lansana Conté de Kindia. Retrouvez toutes nos réalisations dans la page dédiée.",
  },
  {
    question: "Comment parler de mon projet avec AGB ?",
    answer: "Vous pouvez nous joindre par téléphone au +224 614 58 56 56 ou utiliser la section « Parler de votre projet » de cette page pour décrire votre besoin.",
  },
  {
    question: "Quelles sont les valeurs d'AGB ?",
    answer: "AGB s'appuie sur trois valeurs : l'intégrité, l'innovation et l'engagement.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden industrial-grid">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 construction-lines opacity-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-primary font-bold text-xs tracking-[0.25em] uppercase block mb-2">
            Questions
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-oswald text-secondary uppercase thick-underline">
            Questions Fréquentes
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-bg-light border-2 border-slate-200 rounded-[6px] overflow-hidden transition-all duration-300 hover:border-primary"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between text-secondary focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center space-x-4 pr-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${
                      isOpen ? "text-primary" : "text-slate-400 group-hover:text-primary"
                    }`} />
                    <span className="font-oswald text-sm md:text-base font-extrabold uppercase tracking-wide group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  
                  <div className={`p-1.5 rounded-[4px] border border-slate-300 group-hover:border-primary transition-colors shrink-0 ${
                    isOpen ? "bg-primary text-white border-primary" : "bg-white text-secondary"
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Accordion Content Panel (Animated Height) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 pl-14 text-xs md:text-sm text-slate-600 leading-relaxed font-inter border-t border-slate-200/50 pt-4 bg-white/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
