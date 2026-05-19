import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SurveyForm from "@/components/SurveyForm";

export const metadata: Metadata = {
  title: "Participer au sondage | Lok Izy",
  description:
    "Partagez vos besoins et participez au sondage produit Lok Izy.",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="soft-grid pt-28">
        <section className="section-container py-16 lg:py-20">
          <SurveyForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
