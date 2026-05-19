const steps = [
  {
    title: "Structurez votre portefeuille",
    text: "Créez vos biens, votre organisation et votre cadre de gestion dans une base propre, exploitable et durable.",
  },
  {
    title: "Centralisez la mise en location",
    text: "Lancez une campagne, suivez les candidats, qualifiez les profils et gardez chaque dossier au bon niveau de priorité.",
  },
  {
    title: "Transformez plus vite",
    text: "Convertissez un bon candidat en locataire avec les bons documents, les bons statuts et le bon historique.",
  },
  {
    title: "Sécurisez la vie du bail",
    text: "Baux, états des lieux, inventaires, loyers et quittances restent liés dans un parcours cohérent.",
  },
  {
    title: "Pilotez sans angle mort",
    text: "Incidents, alertes, audit log, notifications et lecture financière vous donnent enfin une vision exploitable du quotidien.",
  },
];

export default function Workflow() {
  return (
    <section id="workflow" className="bg-white py-28">
      <div className="section-container">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0f6f34]">
            Comment ça marche
          </p>
          <h2 className="mb-6 text-4xl font-bold text-[#101513] sm:text-5xl">
            De la mise en location au suivi quotidien, tout reste connecté.
          </h2>
          <p className="text-lg leading-8 text-[#66736d]">
            Lok Izy ne se contente pas de stocker des fiches. La plateforme
            relie vos décisions, vos documents, vos opérations et vos alertes
            dans un seul flux de travail.
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
