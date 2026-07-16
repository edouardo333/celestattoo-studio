import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TattooPortfolio from "./components/TattooPortfolio";
import CoverUps from "./components/CoverUps";
import PaintingsGallery from "./components/PaintingsGallery";
import CreativeProcess from "./components/CreativeProcess";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <TattooPortfolio />
        <CoverUps />
        <PaintingsGallery />
        <CreativeProcess />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
