"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ScrollProgressBar from "./ScrollProgressBar";
import Logo from "./Logo";

const NAV_ITEMS = [
  { label: "Accueil", href: "#home" },
  { label: "À propos", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#projects" },
  { label: "Démarche", href: "#process" },
  { label: "Valeurs", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-dark-section/95 backdrop-blur-md border-b-2 border-primary shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <ScrollProgressBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="#home" aria-label="African Global Business - Accueil" className="flex items-center group">
            <div className="bg-white px-2 py-1 rounded-[6px] border border-accent group-hover:border-primary transition-colors">
              <Logo className="h-10 w-[96px] md:h-12 md:w-[116px]" />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-semibold uppercase tracking-wider transition-colors py-2 relative whitespace-nowrap ${
                    isActive ? "text-primary-light" : "text-white/80 hover:text-primary-light"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Emergency & CTA Buttons */}
          <div className="hidden xl:flex items-center space-x-4">
            <Link
              href="#quote"
              className="bg-primary hover:bg-primary-dark text-white font-oswald text-sm font-bold uppercase tracking-wider whitespace-nowrap px-5 py-2.5 rounded-[6px] border border-primary-dark shadow-[0_4px_10px_rgba(220,1,17,0.2)] transition-all transform hover:-translate-y-0.5"
            >
              Parler de votre projet
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center space-x-3">
            <Link
              href="#quote"
              className="bg-primary hover:bg-primary-dark text-white font-oswald text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-[6px] border border-primary-dark transition-all"
            >
              Projet
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-secondary text-white p-2 rounded-[6px] border border-white/10 hover:border-primary transition-colors cursor-pointer"
              aria-label="Ouvrir ou fermer le menu de navigation"
            >
              {isOpen ? <X className="w-6 h-6 text-primary-light" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-secondary border-t border-primary/20"
          >
            <div className="px-4 py-6 space-y-3 max-h-[80vh] overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <Link
                    key={item.label}
                    onClick={() => setIsOpen(false)}
                    href={item.href}
                    className={`block py-3 px-4 text-base font-bold uppercase tracking-wider border-l-4 rounded-[4px] transition-all ${
                      isActive
                        ? "bg-dark-section text-primary-light border-primary"
                        : "text-white/80 border-transparent hover:border-primary hover:bg-dark-section hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
