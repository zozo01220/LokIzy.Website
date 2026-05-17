import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LokIzy | Gestion locative, campagnes candidats et pilotage owner",
  description:
    "LokIzy aide les proprietaires et equipes a gerer leurs biens, candidats, visites, signatures, notifications et suivi locatif depuis une seule interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
