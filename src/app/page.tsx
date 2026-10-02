import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import QuoteRequest from "@/components/QuoteRequest";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      {/* Main Navigation */}
      <Navbar />

      {/* Page Sections */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Projects />
        <WhyChooseUs />
        <Process />
        <Team />
        <Testimonials />
        <FAQ />
        <QuoteRequest />
        <Contact />
      </main>

      {/* Page Footer */}
      <Footer />

      {/* Utilities */}
      <BackToTop />
    </>
  );
}
