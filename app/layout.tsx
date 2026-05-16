import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LokIzy | Gestion locative simple et moderne",
  description:
    "LokIzy aide les proprietaires et petites agences a gerer leurs biens, baux, locataires, documents et loyers depuis une seule interface.",
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
