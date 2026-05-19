import Link from "next/link";
import { SIGNUP_PATH } from "@/lib/app-config";

const plans = [
  {
    name: "Free",
    summary: "Socle d'entree pour demarrer l'activite.",
    features: [
      "3 owners",
      "5 admins",
      "25 biens",
      "100 candidats",
      "50 locataires",
      "1 Go de stockage",
    ],
    cta: "Decouvrir Free",
    highlighted: false,
  },
  {
    name: "Pro",
    summary: "Plan standard pour une exploitation locative active.",
    features: [
      "10 owners",
      "20 admins",
      "100 biens",
      "500 candidats",
      "250 locataires",
      "10 Go de stockage",
    ],
    cta: "Voir le plan Pro",
    highlighted: true,
  },
  {
    name: "Business",
    summary: "Capacites etendues pour des organisations multi-equipes.",
    features: [
      "25 owners",
      "50 admins",
      "250 biens",
      "2 500 candidats",
      "1 000 locataires",
      "50 Go de stockage",
    ],
    cta: "Explorer Business",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="tarifs" className="py-28">
      <div className="section-container">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0f6f34]">
            Plans
          </p>
          <h2 className="mb-6 text-4xl font-bold text-[#101513] sm:text-5xl">
            Des capacites claires, alignees sur l'app.
          </h2>
          <p className="text-lg leading-8 text-[#66736d]">
            Les niveaux ci-dessous reprennent les plans structures dans
            Lok Izy: Free, Pro et Business, avec leurs quotas par organisation.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass-card p-8 ${
                plan.highlighted
                  ? "border-2 border-[#16a34a] bg-white shadow-2xl lg:-translate-y-4"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <div className="mb-5 inline-flex rounded-full bg-[#e8f7ee] px-3 py-1 text-sm font-bold text-[#0f6f34]">
                  Le plus choisi
                </div>
              )}
              <h3 className="mb-3 text-3xl font-bold text-[#101513]">
                {plan.name}
              </h3>

              <p className="mb-8 leading-7 text-[#66736d]">
                {plan.summary}
              </p>

              <div className="mb-8 rounded-2xl bg-[#f7faf8] px-5 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f6f34]">
                  Capacites incluses
                </p>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[#66736d]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#16a34a]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={SIGNUP_PATH}
                className="inline-flex w-full justify-center rounded-full bg-[#0f6f34] py-4 font-semibold text-white transition hover:bg-[#0b4f25]"
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
