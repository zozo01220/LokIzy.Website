import Image from "next/image";
import Link from "next/link";
import { LOGIN_URL, SIGNUP_PATH } from "@/lib/app-config";

const heroStats = [
  ["Vision immédiate", "revenus, occupation et alertes en un coup d'œil"],
  ["Tout centralisé", "biens, candidats, baux, incidents et documents"],
  ["Moins d'oublis", "automatisations et historique pour sécuriser le quotidien"],
];

export default function Hero() {
  return (
    <section className="soft-grid relative overflow-hidden bg-[#f7faf8] pt-28">
      <div className="section-container py-8">
        <div className="flex justify-center">
          <Link
            href={SIGNUP_PATH}
            className="inline-flex h-14 items-center justify-center rounded-full bg-[#16a34a] px-8 text-base font-semibold text-white shadow-[0_18px_40px_rgba(22,163,74,0.28)] transition hover:-translate-y-1 hover:bg-[#0f6f34]"
          >
            Participer au sondage
          </Link>
        </div>
      </div>

      <div className="section-container grid min-h-[760px] items-center gap-16 py-10 lg:grid-cols-[0.98fr_1.02fr] lg:py-16">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#16a34a]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#0f6f34]">
            Le cockpit locatif pensé pour les petits propriétaires et leurs équipes
          </div>

          <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-normal text-[#101513] sm:text-6xl lg:text-7xl">
            Reprenez le contrôle de votre gestion locative, sans tableurs, sans relances oubliées, sans dispersion.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#66736d] sm:text-xl">
            Lok Izy réunit dans un seul outil le pilotage du portefeuille,
            la gestion des locataires, les loyers, les incidents, les
            documents et les signatures pour faire gagner du temps et réduire
            la charge mentale.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={LOGIN_URL}
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#0f6f34] px-7 text-base font-semibold text-white shadow-lg shadow-[#16a34a]/20 transition hover:bg-[#0b4f25]"
            >
              Connexion
            </a>
            <a
              href="#workflow"
              className="inline-flex h-14 items-center justify-center rounded-full border border-[#16a34a]/20 bg-white px-7 text-base font-semibold text-[#0f6f34] transition hover:border-[#0f6f34] hover:bg-[#e8f7ee] sm:w-auto"
            >
              Voir comment ça marche
            </a>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {heroStats.map(([value, label]) => (
              <div
                key={value}
                className="rounded-3xl border border-[#e4ebe7] bg-white/70 p-5 shadow-[0_12px_35px_rgba(16,21,19,0.04)]"
              >
                <div className="text-2xl font-bold text-[#101513]">{value}</div>
                <div className="mt-2 text-sm leading-5 text-[#66736d]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[620px]">
          <div className="absolute left-1/2 top-2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d8f2df] blur-3xl" />

          <div className="absolute left-1/2 top-0 w-full max-w-[820px] -translate-x-1/2">
            <div className="overflow-hidden rounded-[36px] border border-[#dfe9e3] bg-white p-3 shadow-[0_34px_90px_rgba(16,21,19,0.18)]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-white">
                <Image
                  src="/hero-dashboard-devices.png"
                  alt="Lok Izy sur laptop, tablette et smartphone"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 820px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
