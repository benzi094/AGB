import { Building2, Handshake, HardHat, ShieldCheck, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { Breadcrumb } from "./NewsParts";

// Photo réelle de chantier (Barry Diawadou, Matam) utilisée comme visuel du bandeau.
const BANNER_IMAGE = {
  src: encodeURI("/Barry Diawadou/WhatsApp Image 2026-10-07 at 12.33.14 (4).webp"),
  alt: "Bâtiment en construction sur le chantier Barry Diawadou à Matam",
};

// Messages qualitatifs uniquement : aucun chiffre tant qu'AGB n'a pas validé de données.
const HIGHLIGHTS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Building2, title: "Projets & réalisations", text: "Nos ouvrages présentés en images" },
  { icon: HardHat, title: "Suivi des chantiers", text: "L'avancement des travaux sur le terrain" },
  { icon: Handshake, title: "Expertise & savoir-faire", text: "Des équipes mobilisées à chaque étape" },
  { icon: ShieldCheck, title: "Engagement qualité", text: "Pour des infrastructures durables" },
];

// Bandeau d'introduction : texte sur fond marine, photo à droite séparée par une diagonale rouge.
export function NewsBanner() {
  return (
    <section className="relative overflow-hidden bg-dark-section pt-24">
      {/* Visuel : plein cadre (voilé) sur mobile, moitié droite en diagonale sur grand écran */}
      <div className="absolute inset-0 top-24 lg:left-[42%] lg:bg-primary lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]">
        <div className="absolute inset-0 lg:[clip-path:polygon(19.5%_0,100%_0,100%_100%,1.5%_100%)]">
          <Image
            src={BANNER_IMAGE.src}
            alt={BANNER_IMAGE.alt}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-dark-section/70 lg:bg-dark-section/10" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 lg:pt-14 lg:pb-28">
        <div className="max-w-xl lg:max-w-[42%]">
          <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Actualités" }]} />
          <span className="mt-6 block text-accent font-bold text-xs tracking-[0.12em] sm:tracking-[0.25em] uppercase">
            Actualités &amp; Réalisations
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-black font-oswald text-white uppercase thick-underline">
            Nos actualités
          </h1>
          <p className="mt-8 text-white/75 text-sm md:text-base font-inter leading-relaxed">
            Suivez en images nos projets, l&apos;évolution de nos chantiers et les temps forts de la vie d&apos;AGB.
          </p>
        </div>
      </div>
    </section>
  );
}

// Bande blanche de mise en valeur, en chevauchement sur le bas du bandeau.
export function NewsHighlightsStrip() {
  return (
    <div className="relative z-20 -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-slate-200 bg-slate-100 shadow-[0_18px_40px_-20px_rgba(1,28,52,0.35)] lg:grid-cols-4">
        {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="flex flex-col items-start gap-2 bg-white px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:py-5"
          >
            <Icon className="h-7 w-7 shrink-0 text-primary sm:h-9 sm:w-9" strokeWidth={1.5} aria-hidden="true" />
            <span className="min-w-0">
              <span className="block font-oswald text-sm font-bold uppercase tracking-wide text-secondary sm:text-base">
                {title}
              </span>
              <span className="mt-0.5 block font-inter text-xs leading-snug text-slate-500">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
