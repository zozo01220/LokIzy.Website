import Image from "next/image";
import Link from "next/link";
import { LOGIN_URL, SURVEY_PATH } from "@/lib/app-config";

const heroStats = [
  ["Pilotage", "Vision immédiate", "revenus, occupation et alertes en un coup d'œil"],
  ["Centralisation", "Tout centralisé", "biens, candidats, baux, incidents et documents"],
  ["Fiabilité", "Moins d'oublis", "automatisations et historique pour sécuriser le quotidien"],
];

const heroChips = [
  "Loyers et quittances",
  "Candidats et baux",
  "Incidents et documents",
];

export default function Hero() {
  return (
    <section className="soft-grid hero-aurora relative overflow-x-hidden overflow-y-visible bg-[#f7faf8] pt-28">
      <div className="hero-structure pointer-events-none absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),transparent)]" />
      <div className="absolute left-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-[#d6e0d8]/55 blur-3xl" />
      <div className="absolute right-[-120px] top-[60px] h-[360px] w-[360px] rounded-full bg-[#e3eae4]/78 blur-3xl" />

      <div className="section-container py-8">
        <div className="flex justify-center">
          <Link
            href={SURVEY_PATH}
            className="hero-fade-up inline-flex h-14 items-center justify-center rounded-full bg-[var(--sage-accent)] px-8 text-base font-semibold text-white shadow-[0_18px_40px_rgba(127,190,141,0.32)] transition hover:-translate-y-1 hover:bg-[var(--sage-accent-dark)]"
          >
            Participer au sondage
          </Link>
        </div>
      </div>

      <div className="section-container relative grid min-h-[760px] items-center gap-12 py-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:py-16">
        <div className="max-w-2xl">
          <div className="hero-fade-up inline-flex items-center gap-3 rounded-full border border-[#6f8674]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#4f6455] shadow-[0_10px_28px_rgba(16,21,19,0.05)]">
            Le cockpit locatif pensé pour les petits propriétaires et leurs équipes
          </div>

          <h1 className="hero-fade-up-delay mt-6 max-w-3xl text-4xl font-bold leading-[0.98] tracking-normal text-[#101513] sm:text-5xl lg:text-[4.15rem]">
            Reprenez le contrôle de votre gestion locative,
            <span className="gradient-text"> sans tableurs, sans relances oubliées, sans dispersion.</span>
          </h1>

          <div className="relative my-8 min-h-[250px] lg:hidden">
            <div className="absolute inset-x-0 top-2 mx-auto h-44 w-44 rounded-full bg-[#e3eae4] blur-3xl" />
            <div className="relative mx-auto w-full max-w-[720px]">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/hero-dashboard-devices.png"
                  alt="Lok Izy sur laptop, tablette et smartphone"
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain opacity-100 drop-shadow-[0_34px_80px_rgba(16,21,19,0.16)]"
                />
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <div className="hero-fade-up-delay mt-7 flex flex-wrap gap-3">
              {heroChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[#dbe9df] bg-white px-4 py-2 text-sm font-semibold text-[#42504a] shadow-[0_10px_24px_rgba(16,21,19,0.05)]"
                >
                  {chip}
                </span>
              ))}
            </div>

            <p className="hero-fade-up-delay mt-7 max-w-xl text-base leading-7 text-[#66736d] sm:text-lg">
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
                className="inline-flex h-14 items-center justify-center rounded-full border border-[#6f8674]/20 bg-white px-7 text-base font-semibold text-[#4f6455] shadow-[0_10px_24px_rgba(16,21,19,0.05)] transition hover:-translate-y-1 hover:border-[#4f6455] hover:bg-[#edf1ee] sm:w-auto"
              >
                Voir comment ça marche
              </a>
            </div>

            <div className="hero-fade-up-delay mt-12 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
              {heroStats.map(([badge, value, label]) => (
                <HeroStatCard key={value} badge={badge} value={value} label={label} />
              ))}
            </div>
          </div>
        </div>

        <div className="relative hidden min-h-[660px] lg:-mt-6 lg:block lg:min-h-[740px]">
          <div className="absolute left-[10%] top-[58px] h-44 w-44 rounded-full bg-white/70 blur-2xl" />
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#e3eae4] blur-3xl" />
          <div className="absolute right-6 top-12 h-56 w-56 rounded-full bg-[#d6e0d8]/60 blur-3xl" />

          <div className="absolute left-1/2 top-[-72px] w-full max-w-[980px] -translate-x-1/2">
            <div className="relative aspect-[1.18/1]">
              <div className="absolute inset-x-[12%] top-[8%] h-[78%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(227,234,228,0.72),rgba(227,234,228,0.18)_56%,transparent_76%)] blur-2xl" />
              <Image
                src="/hero-dashboard-devices.png"
                alt="Lok Izy sur laptop, tablette et smartphone"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 980px"
                className="object-contain opacity-100 drop-shadow-[0_40px_120px_rgba(16,21,19,0.22)]"
              />
            </div>
          </div>
        </div>

        <div className="hidden lg:col-span-2 lg:block">
          <div className="hero-fade-up-delay grid gap-10 rounded-[36px] border border-[#dfe9e3] bg-white/72 px-8 py-8 shadow-[0_24px_70px_rgba(16,21,19,0.08)] backdrop-blur-sm xl:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="flex flex-wrap gap-3">
                {heroChips.map((chip) => (
                  <span
                    key={chip}
                  className="rounded-full border border-[#dbe9df] bg-white px-4 py-2 text-sm font-semibold text-[#42504a] shadow-[0_10px_24px_rgba(16,21,19,0.05)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#66736d]">
                Lok Izy réunit dans un seul outil le pilotage du portefeuille,
                la gestion des locataires, les loyers, les incidents, les
                documents et les signatures pour faire gagner du temps et réduire
                la charge mentale.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={LOGIN_URL}
                  className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--sage-accent)] px-7 text-base font-semibold text-white shadow-[0_18px_40px_rgba(127,190,141,0.28)] transition hover:-translate-y-1 hover:bg-[var(--sage-accent-dark)]"
                >
                  Connexion
                </a>
                <a
                  href="#workflow"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-[#6f8674]/20 bg-white px-7 text-base font-semibold text-[#4f6455] shadow-[0_10px_24px_rgba(16,21,19,0.05)] transition hover:-translate-y-1 hover:border-[#4f6455] hover:bg-[#edf1ee]"
                >
                  Voir comment ça marche
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
              {heroStats.map(([badge, value, label]) => (
                <HeroStatCard key={value} badge={badge} value={value} label={label} />
              ))}
            </div>
          </div>
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
    <div className="group rounded-[28px] border border-[#dfe9e3] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,250,246,0.98))] p-5 shadow-[0_14px_40px_rgba(16,21,19,0.06)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(16,21,19,0.14)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex rounded-full bg-[#edf1ee] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#4f6455]">
          {badge}
        </span>
        <span className="h-3 w-3 rounded-full bg-[var(--sage-accent)] transition duration-300 group-hover:scale-125" />
      </div>
      <div className="text-2xl font-extrabold leading-tight text-[#101513]">
        {value}
      </div>
      <div className="mt-3 text-sm leading-6 text-[#6e7b75]">{label}</div>
    </div>
  );
}
