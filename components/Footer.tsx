import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[#e4ebe7] bg-[#f7faf8] py-10">
      <div className="section-container flex flex-col items-center justify-between gap-6 lg:flex-row">
        <a href="#" className="flex items-center" aria-label="LokIzy">
          <Logo />
        </a>

        <div className="text-center text-[#66736d] lg:text-right">
          &copy; 2026 LokIzy. Gestion locative simple, claire et mieux organisee.
        </div>
      </div>
    </footer>
  );
}
