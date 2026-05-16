const steps = [
  {
    title: "Creer le bien",
    text: "Renseignez l'adresse, les surfaces, les pieces, les annexes et les documents utiles.",
  },
  {
    title: "Preparer le dossier",
    text: "Ajoutez le locataire, les garants, les justificatifs et les conditions du bail.",
  },
  {
    title: "Generer les documents",
    text: "LokIzy assemble bail, inventaire, etat des lieux et quittances avec les bonnes donnees.",
  },
  {
    title: "Faire signer",
    text: "Envoyez les documents au bon moment et gardez une trace claire des validations.",
  },
  {
    title: "Piloter au quotidien",
    text: "Suivez loyers, demandes, echeances et renouvellements depuis votre tableau de bord.",
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
            Un parcours clair, du premier bien au suivi mensuel.
          </h2>
          <p className="text-lg leading-8 text-[#66736d]">
            Chaque etape garde le contexte precedent. Vous saisissez moins,
            vous controlez mieux, et vos dossiers restent propres.
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
