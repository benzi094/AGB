import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import RealisationsPortfolio from "@/components/RealisationsPortfolio";

export const metadata: Metadata = {
  title: "Nos réalisations | African Global Business (AGB)",
  description:
    "Découvrez en images les réalisations et activités d'African Global Business : BTP & construction, fournitures.",
};

export default function RealisationsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <section className="bg-dark-section pt-36 pb-16 border-b-4 border-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-accent font-bold text-xs tracking-[0.25em] uppercase block mb-2">
              Portfolio
            </span>
            <h1 className="text-3xl md:text-5xl font-black font-oswald text-white uppercase thick-underline">
              Nos Réalisations
            </h1>
            <p className="mt-10 max-w-2xl text-white/70 text-sm md:text-base font-inter leading-relaxed">
              Les réalisations et activités d&apos;African Global Business, en images.
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
