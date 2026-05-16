"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Fonctionnalites", href: "#fonctionnalites" },
    { label: "Workflow", href: "#workflow" },
    { label: "Tarifs", href: "#tarifs" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#e4ebe7] bg-white/90 backdrop-blur-xl">
      <div className="section-container flex h-20 items-center justify-between">
        <a href="#" className="flex items-center" aria-label="LokIzy">
          <Logo />
        </a>

        <nav className="hidden gap-10 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#66736d] transition hover:text-[#0f6f34]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#tarifs"
          className="hidden rounded-full bg-[#0f6f34] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4f25] lg:inline-flex"
        >
          Commencer
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0f6f34] text-white transition hover:bg-[#0b4f25] lg:hidden"
          aria-label="Ouvrir le menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#e4ebe7] bg-white lg:hidden">
          <div className="flex flex-col gap-6 p-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-semibold text-[#101513]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
