import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[#e4ebe7] bg-[#f7faf8] py-10">
      <div className="section-container flex flex-col items-center justify-between gap-6 lg:flex-row">
        <Link href="/" className="flex items-center" aria-label="LokIzy">
          <Logo />
        </Link>

        <div className="text-center text-[#66736d] lg:text-right">
          &copy; 2026 LokIzy. Gestion locative, candidats, signatures et pilotage owner dans un seul produit.
        </div>
      </div>
    </footer>
  );
}
