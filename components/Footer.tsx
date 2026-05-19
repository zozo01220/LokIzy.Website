import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[#e4ebe7] bg-[#f7faf8] py-10">
      <div className="section-container flex flex-col items-center justify-between gap-6 lg:flex-row">
        <Link href="/" className="flex items-center" aria-label="Lok Izy">
          <Logo />
        </Link>

        <div className="text-center text-[#66736d] lg:text-right">
          &copy; 2026 Lok Izy. La gestion locative plus claire, plus rapide et mieux pilotée.
        </div>
      </div>
    </footer>
  );
}
