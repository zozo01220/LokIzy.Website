import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lok Izy | Le cockpit de gestion locative pour piloter sans friction",
  description:
    "Lok Izy centralise biens, candidats, loyers, incidents, documents et signatures pour aider les propriétaires et leurs équipes à gagner du temps et mieux piloter.",
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
