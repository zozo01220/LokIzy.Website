const faq = [
  {
    question: "LokIzy remplace-t-il mes tableurs actuels ?",
    answer:
      "Oui. L'objectif est de regrouper biens, locataires, baux, documents et suivi des loyers dans une interface plus fiable qu'un tableur partage.",
  },
  {
    question: "Puis-je gerer plusieurs biens ?",
    answer:
      "Oui. Les offres Pro et Agence sont concues pour les portefeuilles multi-biens avec une vision globale et un suivi par logement.",
  },
  {
    question: "Les documents peuvent-ils etre exportes ?",
    answer:
      "Oui. Les baux, quittances, etats des lieux et inventaires sont penses pour etre conserves, transmis et archives facilement.",
  },
  {
    question: "LokIzy est-il adapte aux petites agences ?",
    answer:
      "Oui. L'offre Agence ajoute des usages d'equipe, des acces collaborateurs et un accompagnement pour structurer le portefeuille.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-white py-28">
      <div className="section-container max-w-4xl">
        <div className="mb-14">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0f6f34]">
            FAQ
          </p>
          <h2 className="mb-6 text-4xl font-bold text-[#101513] sm:text-5xl">
            Les questions qui reviennent avant de se lancer.
          </h2>
        </div>

        <div className="space-y-5">
          {faq.map((item) => (
            <div key={item.question} className="glass-card p-8">
              <h3 className="text-xl font-semibold text-[#101513]">
                {item.question}
              </h3>
              <p className="mt-4 leading-7 text-[#66736d]">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
