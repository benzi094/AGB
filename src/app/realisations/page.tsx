import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import RealisationsPortfolio from "@/components/RealisationsPortfolio";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Découvrez les réalisations d'African Global Business (AGB) en Guinée : Collège Damakania, Lycée et Collège Général Lansana Conté, chantiers de Lambandji, Lansanaya, Matam, Barry Diawadou et livraison de cahiers pour les examens nationaux.",
  alternates: { canonical: "/realisations" },
  openGraph: {
    title: "Réalisations | African Global Business",
    description:
      "Les réalisations d'African Global Business (AGB) en Guinée : chantiers de construction, collèges, lycée et livraison de cahiers pour les examens nationaux.",
    url: "/realisations",
    siteName: "African Global Business",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "African Global Business (AGB)" }],
  },
};

export default function RealisationsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <section className="bg-dark-section pt-28 pb-6 border-b-4 border-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-accent font-bold text-xs tracking-[0.25em] uppercase block mb-2">
              African Global Business · Portfolio
            </span>
            <h1 className="text-3xl md:text-5xl font-black font-oswald text-white uppercase thick-underline">
              Nos Réalisations
            </h1>
            <p className="mt-4 max-w-2xl text-white/70 text-sm md:text-base font-inter leading-relaxed">
              Les réalisations et activités d&apos;African Global Business : chantiers de construction et fournitures.
            </p>
          </div>
        </section>
        <RealisationsPortfolio />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
