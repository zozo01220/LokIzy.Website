import Link from "next/link";
import { LOGIN_URL, SIGNUP_PATH } from "@/lib/app-config";

export default function Hero() {
  return (
    <section className="soft-grid relative overflow-hidden bg-[#f7faf8] pt-28">
      <div className="section-container grid min-h-[760px] items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#16a34a]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#0f6f34]">
            Gestion locative et recrutement locataire dans un meme flux
          </div>

          <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-normal text-[#101513] sm:text-6xl lg:text-7xl">
            LokIzy relie vos biens, vos candidats, vos signatures et votre equipe.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#66736d] sm:text-xl">
            Une plateforme claire pour ouvrir une campagne, planifier des
            visites, convertir un candidat en locataire, envoyer les bons
            documents et suivre l'activite de votre organisation sans changer
            d'outil.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={LOGIN_URL}
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#0f6f34] px-7 text-base font-semibold text-white shadow-lg shadow-[#16a34a]/20 transition hover:bg-[#0b4f25]"
            >
              Connexion
            </a>
            <Link
              href={SIGNUP_PATH}
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#16a34a] px-7 text-base font-semibold text-white shadow-lg shadow-[#16a34a]/20 transition hover:bg-[#0f6f34]"
            >
              S'inscrire
            </Link>
            <a
              href="#workflow"
              className="inline-flex h-14 items-center justify-center rounded-full border border-[#16a34a]/20 bg-white px-7 text-base font-semibold text-[#0f6f34] transition hover:border-[#0f6f34] hover:bg-[#e8f7ee] sm:w-auto"
            >
              Comprendre le parcours
            </a>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4">
            {[
              ["1 espace", "pour piloter biens et equipe"],
              ["1 campagne", "pour suivre les candidats"],
              ["Temps reel", "pour alertes et signatures"],
            ].map(([value, label]) => (
              <div key={value} className="border-l border-[#e4ebe7] pl-4">
                <div className="text-2xl font-bold text-[#101513]">{value}</div>
                <div className="mt-1 text-sm leading-5 text-[#66736d]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="glass-card overflow-hidden p-4">
            <div className="rounded-lg bg-[#0f6f34] p-4 text-white">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-white/60">Vue owner</p>
                  <p className="text-2xl font-bold">Portefeuille en action</p>
                </div>
                <div className="rounded-full bg-[#e8f7ee] px-3 py-1 text-sm font-bold text-[#0f6f34]">
                  Live
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Campagnes ouvertes", "4 campagnes", "#e8f7ee"],
                  ["Visites planifiees", "7 rendez-vous", "#bbf7d0"],
                  ["Signatures en attente", "3 documents", "#86efac"],
                  ["Alertes actives", "5 notifications", "#16a34a"],
                ].map(([label, value, color]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-white/10 bg-[#0b4f25] p-4"
                  >
                    <div
                      className="mb-7 h-2 w-16 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-sm text-white/60">{label}</p>
                    <p className="mt-1 text-xl font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 bg-white p-4">
              {[
                ["Campagne Geneve Centre", "2 profils approuves, 1 visite demain", "Aujourd'hui"],
                ["Rue du Lac 18", "Bail envoye pour signature locataire", "Il y a 1 h"],
                ["Organisation Horizon", "Quota biens a 76% et 2 admins actifs", "Cette semaine"],
              ].map(([address, status, date]) => (
                <div
                  key={address}
                  className="flex items-center justify-between gap-4 rounded-lg border border-[#e4ebe7] p-4"
                >
                  <div>
                    <p className="font-semibold text-[#101513]">{address}</p>
                    <p className="mt-1 text-sm text-[#66736d]">{status}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#0f6f34]">{date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
