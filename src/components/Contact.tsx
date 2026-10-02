"use client";

import { MapPin, PhoneCall, Layers, Briefcase, ArrowRight, Navigation } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden industrial-grid">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 construction-lines opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-left">
          <span className="text-primary font-bold text-xs tracking-[0.25em] uppercase block mb-2">
            Nous trouver
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-oswald text-secondary uppercase thick-underline">
            Nous Contacter
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Address Card */}
              <div className="bg-bg-light border-2 border-slate-200 p-6 rounded-[6px] hover:border-primary transition-all duration-300 flex items-start space-x-4 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-[6px] border border-primary/25 shrink-0 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-oswald text-base font-bold text-secondary uppercase tracking-wider mb-1">
                    Siège
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-inter">
                    Hamdallaye, Ratoma, Conakry, Guinée
                  </p>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-bg-light border-2 border-slate-200 p-6 rounded-[6px] hover:border-primary transition-all duration-300 flex items-start space-x-4 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-[6px] border border-primary/25 shrink-0 text-primary">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-oswald text-base font-bold text-secondary uppercase tracking-wider mb-1">
                    Secteurs d&apos;activité
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-inter">
                    BTP &amp; Construction • Infrastructures • Logistique <br />
                    Import &amp; Export • Imprimerie • Fournitures
                  </p>
                </div>
              </div>

              {/* General Inquiries */}
              <div className="bg-bg-light border-2 border-slate-200 p-6 rounded-[6px] hover:border-primary transition-all duration-300 flex items-start space-x-4 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-[6px] border border-primary/25 shrink-0 text-primary">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-oswald text-base font-bold text-secondary uppercase tracking-wider mb-1">
                    Téléphone
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-inter">
                    <a href="tel:+224628187100" className="text-primary font-semibold hover:underline">+224 628 18 71 00</a>
                  </p>
                </div>
              </div>
            </div>

            {/* High-Contrast Safety Emergency Hotline */}
            <div className="bg-dark-section text-white p-6 border-l-8 border-accent rounded-[6px] flex items-start space-x-4 shadow-md mt-6">
              <div className="bg-white/10 p-3 rounded-[6px] border border-white/15 shrink-0 text-accent animate-pulse">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-oswald text-sm font-bold text-accent uppercase tracking-widest mb-1">
                  Parlez de votre projet
                </h3>
                <p className="text-white/60 text-[11px] leading-normal font-inter mb-3">
                  Contactez-nous pour échanger sur votre besoin en BTP, infrastructures, logistique, import-export, imprimerie ou fournitures.
                </p>
                <a
                  href="#quote"
                  className="font-oswald font-black text-xl text-white hover:text-primary-light transition-colors flex items-center"
                >
                  <ArrowRight className="w-5 h-5 mr-2 text-primary-light shrink-0" />
                  Parler de votre projet
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Architectural Mockup */}
          <div className="lg:col-span-7 bg-dark-section border-4 border-secondary rounded-[6px] relative overflow-hidden min-h-[400px] flex flex-col justify-between p-6 geo-border-orange shadow-lg">
            
            {/* Architectural Background Grid for Blueprint Map Look */}
            <div className="absolute inset-0 bg-secondary/20 pointer-events-none" />
            <div className="absolute inset-0 industrial-grid-dark opacity-20 pointer-events-none" />
            
            {/* SVG stylized map outline representing a street grid */}
            <svg 
              className="absolute inset-0 w-full h-full text-slate-800/60 pointer-events-none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g stroke="currentColor" strokeWidth="2" fill="none">
                {/* Horizontal & Vertical structural roads */}
                <line x1="0" y1="50" x2="100%" y2="50" />
                <line x1="0" y1="150" x2="100%" y2="150" />
                <line x1="0" y1="280" x2="100%" y2="280" />
                <line x1="0" y1="360" x2="100%" y2="360" />

                <line x1="100" y1="0" x2="100" y2="100%" />
                <line x1="280" y1="0" x2="280" y2="100%" />
                <line x1="450" y1="0" x2="450" y2="100%" />
                <line x1="600" y1="0" x2="600" y2="100%" />

                {/* Diagonal secondary access lines */}
                <line x1="0" y1="0" x2="400" y2="400" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="200" y1="0" x2="600" y2="400" strokeWidth="1" strokeDasharray="5,5" />
              </g>

              {/* Waterway shape representation */}
              <path d="M 0,20 Q 150,80 300,120 T 600,180 L 600,0 L 0,0 Z" fill="rgba(220,1,17, 0.05)" />
            </svg>

            {/* Header coordinates detail banner */}
            <div className="relative z-10 flex justify-between items-center bg-secondary/80 border border-white/10 px-4 py-2 text-[10px] text-white/60 font-mono tracking-widest uppercase">
              <span className="flex items-center"><Layers className="w-3.5 h-3.5 text-primary-light mr-1.5" /> RATOMA · CONAKRY</span>
              <span>GUINÉE</span>
            </div>

            {/* Stylized Marker Point */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 flex flex-col items-center">
              {/* Pulsing ring overlay */}
              <span className="absolute w-12 h-12 rounded-full bg-primary/20 border border-primary animate-ping" />
              
              {/* Marker pin */}
              <div className="bg-primary hover:bg-primary-dark border-2 border-white text-white p-3 rounded-full shadow-lg relative flex items-center justify-center cursor-pointer">
                <Navigation className="w-5 h-5 rotate-45 text-white" />
              </div>

              {/* Label */}
              <div className="mt-3 bg-secondary/95 text-white font-oswald text-xs font-bold uppercase tracking-widest px-3 py-1.5 border border-primary rounded-[6px] shadow-md whitespace-nowrap">
                AGB
              </div>
            </div>

            {/* Map UI Control Mockup */}
            <div className="relative z-10 flex justify-between items-end">
              <div className="bg-secondary/90 border border-white/10 p-3 rounded-[6px] text-xs text-white max-w-[200px] font-inter">
                <h4 className="font-bold text-accent mb-0.5">Siège AGB</h4>
                <p className="text-[10px] text-white/60">Hamdallaye, Ratoma, Conakry</p>
              </div>

              <div className="flex flex-col space-y-1 bg-secondary border border-white/10 p-1 rounded-[6px]">
                <button aria-label="Zoom avant" className="w-8 h-8 flex items-center justify-center text-white hover:bg-slate-700 font-bold transition-colors cursor-pointer">+</button>
                <div className="h-[1px] bg-white/10" />
                <button aria-label="Zoom arrière" className="w-8 h-8 flex items-center justify-center text-white hover:bg-slate-700 font-bold transition-colors cursor-pointer">-</button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
