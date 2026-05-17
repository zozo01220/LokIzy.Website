const faq = [
  {
    question: "LokIzy couvre-t-il aussi la recherche de locataires ?",
    answer:
      "Oui. L'app gere les campagnes candidats, la qualification des profils, la planification des visites et la conversion en locataire dans le meme flux.",
  },
  {
    question: "Peut-on travailler a plusieurs dans le meme espace ?",
    answer:
      "Oui. LokIzy introduit un espace organisation owner avec gestion des admins, des quotas et d'un portefeuille partage par equipe.",
  },
  {
    question: "Que devient la signature des documents ?",
    answer:
      "Les baux, inventaires et etats des lieux suivent un parcours de signature plus direct, avec preview, statuts et centralisation dans le dossier.",
  },
  {
    question: "Y a-t-il un suivi des alertes et des actions ?",
    answer:
      "Oui. Notifications, rappels, evenements importants et journal d'activite permettent de suivre les priorites et les actions recentes du portefeuille.",
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
            Les questions qui reviennent avec la nouvelle version.
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
