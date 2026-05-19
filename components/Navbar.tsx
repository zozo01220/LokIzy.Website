"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { LOGIN_URL, SIGNUP_PATH } from "@/lib/app-config";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Fonctionnalites", href: "/#fonctionnalites" },
    { label: "Workflow", href: "/#workflow" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#e4ebe7] bg-white/90 backdrop-blur-xl">
      <div className="section-container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Lok Izy">
          <Logo />
        </Link>

        <nav className="hidden gap-10 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#66736d] transition hover:text-[#0f6f34]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={LOGIN_URL}
            className="rounded-full border border-[#0f6f34]/15 bg-white px-5 py-3 text-sm font-semibold text-[#0f6f34] transition hover:border-[#0f6f34] hover:bg-[#e8f7ee]"
          >
            Connexion
          </a>
          <Link
            href={SIGNUP_PATH}
            className="rounded-full bg-[#0f6f34] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4f25]"
          >
            Participer au sondage
          </Link>
        </div>

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
              href={SIGNUP_PATH}
              onClick={() => setOpen(false)}
              className="inline-flex justify-center rounded-full bg-[#0f6f34] px-5 py-3 font-semibold text-white transition hover:bg-[#0b4f25]"
            >
              Participer au sondage
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
