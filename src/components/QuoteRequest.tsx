"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, FileText, Shield, User, Mail, Phone, Layers, Clock } from "lucide-react";

export default function QuoteRequest() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "btp",
    timeline: "À définir",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "btp",
        timeline: "À définir",
        message: "",
      });
    }, 4000);
  };

  return (
    <section id="quote" className="py-24 bg-dark-section text-white relative overflow-hidden diagonal-clip-both">
      {/* Background patterns */}
      <div className="absolute inset-0 industrial-grid-dark opacity-10 pointer-events-none" />
      <div className="absolute left-0 top-0 w-64 h-64 construction-lines-dark opacity-5 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: CTA Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary/20 border border-primary/45 px-3 py-1.5 rounded-[6px]">
              <FileText className="w-4 h-4 text-primary-light animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
                Votre projet
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black font-oswald text-white uppercase thick-underline-accent mb-6">
              Parler de votre projet
            </h2>
            
            <p className="text-white/60 leading-relaxed font-inter">
              Décrivez-nous votre besoin : BTP, infrastructures, logistique, import-export, imprimerie ou fournitures. Renseignez le formulaire pour présenter votre projet à African Global Business.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-700">
              <div className="flex items-center space-x-3 text-xs text-white/70 font-inter">
                <Shield className="w-5 h-5 text-accent shrink-0" />
                <span>Une entreprise multisectorielle à votre écoute</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-white/70 font-inter">
                <Shield className="w-5 h-5 text-accent shrink-0" />
                <span>Basée à Hamdallaye Concasseur, Ratoma, Conakry</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7">
            <motion.div
              layout
              className="bg-secondary/40 border-4 border-slate-700 p-8 rounded-[6px] relative geo-border-orange"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-4 font-inter"
                >
                  <div className="bg-primary/20 border-2 border-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-primary-light" />
                  </div>
                  <h3 className="font-oswald text-2xl font-extrabold text-white uppercase">
                    Merci !
                  </h3>
                  <p className="text-white/70 max-w-sm mx-auto text-sm">
                    Merci pour votre intérêt. Pour un échange rapide, contactez-nous au +224 614 58 56 56.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Grid Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/70 flex items-center">
                        <User className="w-3.5 h-3.5 text-primary-light mr-1.5" /> Nom complet
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Votre nom"
                        className="w-full bg-secondary border-2 border-slate-700 rounded-[6px] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder-white/20 font-inter"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/70 flex items-center">
                        <Mail className="w-3.5 h-3.5 text-primary-light mr-1.5" /> Adresse e-mail
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nom@entreprise.com"
                        className="w-full bg-secondary border-2 border-slate-700 rounded-[6px] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder-white/20 font-inter"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/70 flex items-center">
                        <Phone className="w-3.5 h-3.5 text-primary-light mr-1.5" /> Téléphone
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+224 6XX XX XX XX"
                        className="w-full bg-secondary border-2 border-slate-700 rounded-[6px] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder-white/20 font-inter"
                      />
                    </div>

                    {/* Project Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/70 flex items-center">
                        <Layers className="w-3.5 h-3.5 text-primary-light mr-1.5" /> Secteur concerné
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-secondary border-2 border-slate-700 rounded-[6px] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors font-inter cursor-pointer"
                      >
                        <option value="btp">BTP &amp; Construction</option>
                        <option value="infrastructures">Infrastructures</option>
                        <option value="logistique">Logistique</option>
                        <option value="import-export">Import &amp; Export</option>
                        <option value="imprimerie">Imprimerie</option>
                        <option value="fournitures">Fournitures</option>
                      </select>
                    </div>

                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/70 flex items-center">
                      <Clock className="w-3.5 h-3.5 text-primary-light mr-1.5" /> Délai souhaité
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold font-oswald uppercase">
                      {["Urgent", "1 mois", "3 mois", "À définir"].map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeline: tier })}
                          className={`py-2 px-3 border-2 rounded-[6px] transition-all cursor-pointer ${
                            formData.timeline === tier
                              ? "bg-primary border-primary text-white shadow-md"
                              : "bg-secondary/60 border-slate-700 hover:border-slate-500 text-white/80"
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/70">
                      Votre projet en quelques mots
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Décrivez votre projet : lieu, nature des travaux ou des besoins, délais souhaités..."
                      className="w-full bg-secondary border-2 border-slate-700 rounded-[6px] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder-white/20 font-inter resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-oswald text-sm font-bold uppercase tracking-wider py-4 rounded-[6px] border border-primary-dark transition-all transform hover:-translate-y-0.5 flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(220,1,17,0.25)]"
                  >
                    Envoyer ma demande
                    <Send className="w-4 h-4 ml-2" />
                  </button>

                </form>
              )}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
