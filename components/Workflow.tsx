const steps = [
  {
    title: "Structurer le portefeuille",
    text: "Ajoutez les biens, l'organisation, les admins et les capacites de travail adaptees a votre plan.",
  },
  {
    title: "Ouvrir une campagne",
    text: "Lancez une recherche locataire par bien avec un objectif clair, un profil cible et un suivi centralise.",
  },
  {
    title: "Qualifier les profils",
    text: "Analysez les candidats, planifiez les visites, faites evoluer les statuts et gardez les bons dossiers visibles.",
  },
  {
    title: "Signer sans friction",
    text: "Generez les documents utiles puis ouvrez directement le bon parcours de signature pour le bail ou les annexes.",
  },
  {
    title: "Piloter en continu",
    text: "Suivez quotas, alertes, notifications, journal d'activite, loyers et renouvellements depuis une meme vue produit.",
  },
];

export default function Workflow() {
  return (
    <section id="workflow" className="bg-white py-28">
      <div className="section-container">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0f6f34]">
            Workflow
          </p>
          <h2 className="mb-6 text-4xl font-bold text-[#101513] sm:text-5xl">
            Un parcours clair, de la campagne au suivi locataire.
          </h2>
          <p className="text-lg leading-8 text-[#66736d]">
            Chaque etape conserve le contexte precedent. L'app relie
            portefeuille, candidats, documents et actions de suivi au lieu de
            les disperser.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex gap-8 border-l border-[#e4ebe7] pb-14 pl-10 last:pb-0"
            >
              <div className="-ml-[57px] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-sm font-bold text-white ring-8 ring-white">
                {index + 1}
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-semibold text-[#101513]">
                  {step.title}
                </h3>

                <p className="leading-7 text-[#66736d]">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
