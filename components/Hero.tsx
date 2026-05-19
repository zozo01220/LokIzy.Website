import Link from "next/link";
import { LOGIN_URL, SURVEY_PATH } from "@/lib/app-config";

const heroStats = [
  [
    "Pilotage",
    "Vision immédiate",
    "revenus, occupation et alertes en un coup d'œil",
  ],
  [
    "Centralisation",
    "Tout centralisé",
    "biens, candidats, baux, incidents et documents",
  ],
  [
    "Fiabilité",
    "Moins d'oublis",
    "automatisations et historique pour sécuriser le quotidien",
  ],
];

const heroChips = [
  "Loyers et quittances",
  "Candidats et baux",
  "Incidents et documents",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1f2822] pt-28 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(6,10,8,0.78) 0%, rgba(10,15,12,0.68) 34%, rgba(16,22,18,0.54) 62%, rgba(22,29,24,0.46) 100%), url('/hero-login-bg.png')",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(127,190,141,0.18),transparent_28%),radial-gradient(circle_at_74%_18%,rgba(255,255,255,0.10),transparent_18%),linear-gradient(180deg,rgba(6,10,8,0.16),rgba(7,11,9,0.32)_58%,rgba(7,11,9,0.54)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:82px_82px]" />
      <div className="absolute inset-y-0 left-0 w-[52%] bg-[linear-gradient(90deg,rgba(5,8,6,0.60),rgba(5,8,6,0.10)_76%,transparent)]" />

      <div className="section-container relative py-8">
        <div className="flex justify-center">
          <Link
            href={SURVEY_PATH}
            className="hero-fade-up inline-flex h-14 items-center justify-center rounded-full bg-[var(--sage-accent)] px-8 text-base font-semibold text-white shadow-[0_18px_40px_rgba(127,190,141,0.32)] transition hover:-translate-y-1 hover:bg-[var(--sage-accent-dark)]"
          >
            Participer au sondage
          </Link>
        </div>
      </div>

      <div className="section-container relative py-10 lg:py-16">
        <div className="max-w-3xl">
          <div className="hero-fade-up inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-md">
            Le cockpit locatif pensé pour les petits propriétaires et leurs équipes
          </div>

          <h1 className="hero-fade-up-delay mt-6 max-w-4xl text-4xl font-bold leading-[0.96] tracking-[-0.03em] text-white sm:text-5xl lg:text-[5rem]">
            Reprenez le contrôle de votre gestion locative,
            <span className="block text-white/92">
              sans tableurs, sans relances oubliées,
            </span>
            <span className="block text-[var(--sage-accent)]">
              sans dispersion.
            </span>
          </h1>

          <div className="hero-fade-up-delay mt-7 flex flex-wrap gap-3">
            {heroChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur-md"
              >
                {chip}
              </span>
            ))}
          </div>

          <p className="hero-fade-up-delay mt-8 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Lok Izy réunit dans un seul outil le pilotage du portefeuille, la
            gestion des locataires, les loyers, les incidents, les documents et
            les signatures pour faire gagner du temps et réduire la charge
            mentale.
          </p>

          <div className="hero-fade-up-delay mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={LOGIN_URL}
              className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--sage-accent)] px-7 text-base font-semibold text-white shadow-[0_18px_40px_rgba(127,190,141,0.28)] transition hover:-translate-y-1 hover:bg-[var(--sage-accent-dark)]"
            >
              Connexion
            </a>
            <a
              href="#workflow"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/16 bg-white/10 px-7 text-base font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)] backdrop-blur-md transition hover:-translate-y-1 hover:border-white/26 hover:bg-white/16"
            >
              Voir comment ça marche
            </a>
          </div>
        </div>

        <div className="hero-fade-up-delay mt-14 grid gap-4 md:grid-cols-3">
          {heroStats.map(([badge, value, label]) => (
            <HeroStatCard
              key={value}
              badge={badge}
              value={value}
              label={label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroStatCard({
  badge,
  value,
  label,
}: {
  badge: string;
  value: string;
  label: string;
}) {
  return (
    <div className="group rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.08))] hover:shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/84">
          {badge}
        </span>
        <span className="h-3 w-3 rounded-full bg-[var(--sage-accent)] transition duration-300 group-hover:scale-125" />
      </div>
      <div className="text-2xl font-extrabold leading-tight text-white">
        {value}
      </div>
      <div className="mt-3 text-sm leading-6 text-white/68">{label}</div>
    </div>
  );
}
