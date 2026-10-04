"use client";

import { MapPin, PhoneCall, Mail, Layers, Briefcase, ArrowRight } from "lucide-react";

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
                    Concasseur, Commune de Dixinn, Conakry, Guinée
                  </p>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-inter mt-1">
                    Lundi – vendredi : 8h30 – 16h30
                  </p>
                  <a
                    href="https://maps.app.goo.gl/7o3p2nPGrarHjega7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-primary text-xs font-bold font-oswald uppercase tracking-wider hover:underline"
                  >
                    Voir sur Google Maps
                  </a>
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
                    <a href="tel:+224614585656" className="text-primary font-semibold hover:underline">+224 614 58 56 56</a>
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-bg-light border-2 border-slate-200 p-6 rounded-[6px] hover:border-primary transition-all duration-300 flex items-start space-x-4 shadow-sm">
                <div className="bg-primary/10 p-3 rounded-[6px] border border-primary/25 shrink-0 text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-oswald text-base font-bold text-secondary uppercase tracking-wider mb-1">
                    E-mail
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-inter break-all">
                    <a href="mailto:contact@africanglobalbusiness.com" className="text-primary font-semibold hover:underline">contact@africanglobalbusiness.com</a>
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
          <div className="lg:col-span-7 bg-dark-section border-4 border-secondary rounded-[6px] relative overflow-hidden min-h-[400px] flex flex-col justify-end p-4 geo-border-orange shadow-lg">
            
            <iframe
              title="Localisation d'AGB sur Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.814093957212!2d-13.649724752701912!3d9.56992745804862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf1cd6909302bf57%3A0x6b5f51ab7a241b6b!2sH992%2BR9V%2C%20Unnamed%20Road%2C%20Conakry%2C%20Guin%C3%A9e!5e0!3m2!1sfr!2s!4v1790952663420!5m2!1sfr!2s"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />

            {/* Lien vers Google Maps */}
            <a
              href="https://maps.app.goo.gl/7o3p2nPGrarHjega7"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 self-start bg-secondary/95 border border-white/10 p-3 rounded-[6px] text-xs text-white max-w-[220px] font-inter hover:border-primary transition-colors"
            >
              <h4 className="font-bold text-accent mb-0.5">Siège AGB</h4>
              <p className="text-[10px] text-white/60">Concasseur, Commune de Dixinn, Conakry</p>
              <span className="text-[10px] text-primary-light font-bold uppercase tracking-wider">Ouvrir dans Google Maps</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
