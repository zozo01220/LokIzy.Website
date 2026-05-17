import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Highlights from "../components/Highlights";
import Features from "../components/Features";
import Workflow from "../components/Workflow";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <Features />
        <Workflow />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
