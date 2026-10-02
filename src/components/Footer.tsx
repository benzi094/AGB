"use client";

import { PhoneCall, MapPin, Layers, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-section text-white border-t-8 border-primary relative overflow-hidden">
      {/* Structural background lines */}
      <div className="absolute inset-0 industrial-grid-dark opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 construction-lines opacity-5 pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-white px-2 py-1 rounded-[6px] border border-accent">
                <Logo className="h-12 w-[146px]" />
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed font-inter">
              African Global Business (AGB) est une entreprise multisectorielle intervenant notamment dans le BTP, les infrastructures, la logistique, l&apos;import-export, l&apos;imprimerie et les fournitures. Basée à Conakry, Guinée.
            </p>
          </div>

          {/* Column 2: Quick Links / Services */}
          <div>
            <h3 className="text-lg font-bold font-oswald uppercase tracking-wider mb-6 text-primary-light border-b border-white/10 pb-2">
              Nos Services
            </h3>
            <ul className="space-y-3">
              {[
                "BTP & Construction",
                "Infrastructures",
                "Logistique",
                "Import & Export",
                "Imprimerie",
                "Fournitures",
              ].map((service, i) => (
                <li key={i}>
                  <Link 
                    href="#services" 
                    className="text-white/70 hover:text-primary-light transition-colors text-sm flex items-center group font-inter"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 text-accent transform group-hover:translate-x-1 transition-transform" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Projects */}
          <div>
            <h3 className="text-lg font-bold font-oswald uppercase tracking-wider mb-6 text-primary-light border-b border-white/10 pb-2">
              Réalisations
            </h3>
            <ul className="space-y-3">
              {[
                "Collège Damakania",
                "Nongo",
                "Matam / Carrière",
              ].map((project, i) => (
                <li key={i}>
                  <Link 
                    href="#projects" 
                    className="text-white/70 hover:text-primary-light transition-colors text-sm flex items-center group font-inter"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 text-accent transform group-hover:translate-x-1 transition-transform" />
                    {project}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Direct Hotline */}
          <div>
            <h3 className="text-lg font-bold font-oswald uppercase tracking-wider mb-6 text-primary-light border-b border-white/10 pb-2">
              Contact
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4 font-inter">
              Parlez-nous de votre projet : BTP, infrastructures, logistique, import-export, imprimerie ou fournitures.
            </p>
            {/* Direct hotline contact footer block */}
            <div className="bg-secondary p-4 border border-accent/20 rounded-[6px] flex items-start space-x-3">
              <PhoneCall className="w-5 h-5 text-primary-light mt-1 shrink-0" />
              <div>
                <h4 className="text-xs text-accent font-bold uppercase tracking-wider font-oswald">
                  Téléphone
                </h4>
                <a href="tel:+224628187100" className="text-sm font-bold block hover:text-primary-light transition-colors font-inter mt-0.5">
                  +224 628 18 71 00
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Contact Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-y border-white/10 mb-8 text-sm">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-primary-light shrink-0" />
            <span className="text-white/75 font-inter">Hamdallaye, Ratoma, Conakry, Guinée</span>
          </div>
          <div className="flex items-center space-x-3">
            <Layers className="w-5 h-5 text-primary-light shrink-0" />
            <span className="text-white/75 font-inter">Entreprise multisectorielle</span>
          </div>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-primary-light shrink-0" />
            <span className="text-white/75 font-inter">Intégrité · Innovation · Engagement</span>
          </div>
          <div className="flex items-center space-x-3">
            <PhoneCall className="w-5 h-5 text-primary-light shrink-0" />
            <a href="tel:+224628187100" className="text-white/75 hover:text-primary-light transition-colors font-inter">
              +224 628 18 71 00
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-white/40 font-inter">
          <p>© {currentYear} African Global Business. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-primary-light transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-primary-light transition-colors">Conditions d&apos;utilisation</a>
            <a href="/sitemap.xml" className="hover:text-primary-light transition-colors">Plan du site</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
