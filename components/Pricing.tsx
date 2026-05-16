const plans = [
  {
    name: "Free",
    price: "0 EUR",
    description: "Pour tester LokIzy et organiser un premier dossier.",
    features: ["1 bien actif", "Documents centralises", "Suivi locataire de base"],
    cta: "Commencer gratuitement",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "5 EUR",
    description: "Pour demarrer avec un ou deux biens.",
    features: ["2 biens actifs", "Baux et quittances", "Documents centralises"],
    cta: "Commencer",
    highlighted: true,
  },
  {
    name: "Business",
    price: "29 EUR",
    description: "Pour proprietaires multi-biens.",
    features: [
      "15 biens actifs",
      "Etats des lieux guides",
      "Relances et suivi des loyers",
    ],
    cta: "Commencer",
    highlighted: false,
  },
  {
    name: "Agence",
    price: "Sur devis",
    description: "Pour equipes et portefeuilles avances.",
    features: ["Biens illimites", "Acces collaborateurs", "Accompagnement dedie"],
    cta: "Nous contacter",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="tarifs" className="py-28">
      <div className="section-container">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0f6f34]">
            Tarifs
          </p>
          <h2 className="mb-6 text-4xl font-bold text-[#101513] sm:text-5xl">
            Des offres lisibles, sans engagement complique.
          </h2>
          <p className="text-lg leading-8 text-[#66736d]">
            Choisissez la formule adaptee a votre portefeuille. Vous pouvez
            changer d&apos;offre quand votre activite grandit.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
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
                {plan.description}
              </p>

              <div className="mb-8 text-5xl font-bold text-[#101513]">
                {plan.price}
                {plan.price !== "Sur devis" && (
                  <span className="text-base font-semibold text-[#66736d]">
                    {" "}
                    / mois
                  </span>
                )}
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[#66736d]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#16a34a]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={plan.price === "Sur devis" ? "mailto:contact@lokizy.ch" : "#faq"}
                className="inline-flex w-full justify-center rounded-full bg-[#0f6f34] py-4 font-semibold text-white transition hover:bg-[#0b4f25]"
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
