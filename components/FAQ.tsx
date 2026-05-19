const faq = [
  {
    question: "À qui s'adresse Lok Izy ?",
    answer:
      "Lok Izy s'adresse aux petits propriétaires, aux structures de gestion et aux équipes qui veulent sortir des outils dispersés pour piloter leur activité plus sereinement.",
  },
  {
    question: "Est-ce seulement un outil de gestion de biens ?",
    answer:
      "Non. Lok Izy couvre aussi les candidats, les baux, les loyers, les documents, les incidents, les notifications et la lecture opérationnelle du quotidien.",
  },
  {
    question: "Qu'est-ce qui fait vraiment gagner du temps ?",
    answer:
      "La centralisation des flux, l'automatisation des loyers, la génération des quittances, le respect de PaymentDay et l'historique d'activité évitent les ressaisies et les oublis.",
  },
  {
    question: "Les locataires ont-ils aussi leur espace ?",
    answer:
      "Oui. Ils peuvent consulter leurs paiements, leurs quittances, leurs documents, ouvrir des incidents et suivre les échanges depuis une interface simple.",
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
            Les réponses aux questions qui comptent avant de choisir un outil.
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
