"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { LOGIN_URL, SURVEY_PATH } from "@/lib/app-config";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  const links = [
    { label: "Pourquoi Lok Izy", href: "/#fonctionnalites" },
    { label: "Comment ça marche", href: "/#workflow" },
    { label: "FAQ", href: "/#faq" },
  ];

  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!open || !headerRef.current) {
        return;
      }

      const target = event.target;
      if (target instanceof Node && !headerRef.current.contains(target)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function handleLogoClick(event: React.MouseEvent<HTMLAnchorElement>) {
    setOpen(false);

    if (window.location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-50 w-full border-b border-[#e4ebe7] bg-white/90 backdrop-blur-xl"
    >
      <div className="section-container flex h-20 items-center justify-between">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center"
          aria-label="Lok Izy"
        >
          <Logo />
        </Link>

        <nav className="hidden gap-10 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#66736d] transition hover:text-[#4f6455]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={LOGIN_URL}
            className="rounded-full border border-[#4f6455]/15 bg-white px-5 py-3 text-sm font-semibold text-[#4f6455] transition hover:border-[#4f6455] hover:bg-[#edf1ee]"
          >
            Connexion
          </a>
          <Link
            href={SURVEY_PATH}
            className="rounded-full bg-[linear-gradient(135deg,var(--sage-accent-dark),var(--sage-accent))] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(127,190,141,0.3)] ring-1 ring-[var(--sage-accent)]/20 transition hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(127,190,141,0.38)]"
          >
            Participer au sondage
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sage-accent-dark)] text-white transition hover:bg-[var(--sage-dark)] lg:hidden"
          aria-label="Ouvrir le menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#e4ebe7] bg-white lg:hidden">
          <div className="flex flex-col gap-6 p-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-semibold text-[#101513]"
              >
                {link.label}
              </Link>
            ))}
            <a href={LOGIN_URL} className="font-semibold text-[#101513]">
              Connexion
            </a>
            <Link
              href={SURVEY_PATH}
              onClick={() => setOpen(false)}
              className="inline-flex justify-center rounded-full bg-[linear-gradient(135deg,var(--sage-accent-dark),var(--sage-accent))] px-5 py-3 font-semibold text-white shadow-[0_16px_34px_rgba(127,190,141,0.28)] transition hover:-translate-y-1"
            >
              Participer au sondage
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
