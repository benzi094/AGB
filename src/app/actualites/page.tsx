import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import NewsFeed from "@/components/news/NewsFeed";
import { NewsBanner, NewsHighlightsStrip } from "@/components/news/NewsIntro";

const DESCRIPTION =
  "Suivez en images les projets d'African Global Business (AGB), l'évolution de ses chantiers et les temps forts de l'entreprise en Guinée.";

export const metadata: Metadata = {
  title: "Actualités",
  description: DESCRIPTION,
  alternates: { canonical: "/actualites" },
  openGraph: {
    title: "Actualités | African Global Business",
    description: DESCRIPTION,
    url: "/actualites",
    siteName: "African Global Business",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "African Global Business (AGB)" }],
  },
};

export default function ActualitesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <NewsBanner />
        <div className="bg-bg-light">
          <NewsHighlightsStrip />
        </div>
        <NewsFeed />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
