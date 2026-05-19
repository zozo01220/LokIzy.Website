type FeatureCard = {
  kpi: string;
  title: string;
  description: string;
};

type FeatureGroup = {
  title: string;
  intro: string;
  cards: FeatureCard[];
};

const featureGroups: FeatureGroup[] = [
  {
    title: "Pour les propriétaires et admins",
    intro:
      "Tout ce qu'il faut pour piloter un parc locatif sans perdre du temps à recouper les informations.",
    cards: [
      {
        kpi: "Vue 360",
        title: "Pilotez en priorité, pas à l'aveugle",
        description:
          "Dashboard avec revenus encaissés, revenus en cours, occupation, impayés réels, alertes prioritaires et activité récente.",
      },
      {
        kpi: "Par bien",
        title: "Gardez chaque logement sous contrôle",
        description:
          "Création, suivi, historique et activité détaillée bien par bien.",
      },
      {
        kpi: "Actifs",
        title: "Suivez vos locataires sans friction",
        description:
          "Contacts, activité, historique et dossier liés directement au bon logement.",
      },
      {
        kpi: "Scoring",
        title: "Accélérez la sélection des candidats",
        description:
          "Campagnes de location, centralisation des candidatures et conversion fluide en locataire.",
      },
      {
        kpi: "Cycle de vie",
        title: "Sécurisez baux, signatures et activation",
        description:
          "Création, édition, signature et suivi des baux dans un même parcours.",
      },
      {
        kpi: "Par pièce",
        title: "Standardisez états des lieux et inventaires",
        description:
          "Formulaires structurés pour documenter précisément chaque pièce, chaque élément, chaque validation.",
      },
      {
        kpi: "Back-office",
        title: "Centralisez les documents administratifs",
        description:
          "Import, classement, suppression et consultation sans chasse aux pièces jointes.",
      },
      {
        kpi: "PaymentDay",
        title: "Lisez enfin vos loyers correctement",
        description:
          "Échéances, encaissements, relances et impayés selon la vraie date contractuelle.",
      },
      {
        kpi: "Séparé",
        title: "Distinguez dépôt de garantie et revenus",
        description:
          "Un suivi dédié pour éviter les confusions dans la lecture financière.",
      },
      {
        kpi: "Auto",
        title: "Générez quittances et loyers sans oubli",
        description:
          "Automatisation mensuelle, logique de rattrapage et documents disponibles au bon moment.",
      },
      {
        kpi: "2 voies",
        title: "Traitez les incidents sans perdre le contexte",
        description:
          "Tickets, échanges, pièces jointes, historique et notifications bidirectionnelles.",
      },
      {
        kpi: "Trace",
        title: "Gardez une traçabilité exploitable",
        description:
          "Audit log, activité récente et configuration centralisée pour fiabiliser l'exploitation.",
      },
    ],
  },
  {
    title: "Pour les locataires",
    intro:
      "Une expérience claire, simple et rassurante pour réduire les échanges dispersés et améliorer le suivi.",
    cards: [
      {
        kpi: "Vue claire",
        title: "Retrouvez les infos utiles sans chercher",
        description:
          "Espace personnel avec synthèse du logement, documents et informations importantes.",
      },
      {
        kpi: "Partagé",
        title: "Accédez aux bons documents au bon moment",
        description:
          "Documents partagés, pièces demandées et quittances téléchargeables depuis le même espace.",
      },
      {
        kpi: "Temps réel",
        title: "Comprenez instantanément votre situation",
        description:
          "Loyers, statuts, montants dus, règlements et incidents consultables en autonomie.",
      },
      {
        kpi: "Photo + suivi",
        title: "Déclarez un incident en quelques clics",
        description:
          "Description, photo, suivi du statut et échanges avec le bailleur sans changer d'outil.",
      },
      {
        kpi: "Alertes",
        title: "Recevez les bonnes notifications",
        description:
          "Finances, incidents, documents et événements importants restent visibles et suivables.",
      },
      {
        kpi: "Mobile",
        title: "Utilisez Lok Izy comme une vraie app",
        description:
          "PWA fluide sur smartphone avec continuité d'usage et notifications push.",
      },
    ],
  },
];

export default function Features() {
  return (
    <section id="fonctionnalites" className="bg-white py-28">
      <div className="section-container">
        <div className="mb-16 max-w-4xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#4f6455]">
            Pourquoi Lok Izy
          </p>
          <h2 className="mb-6 text-4xl font-bold text-[#101513] sm:text-5xl">
            Une plateforme conçue pour faire gagner du temps, clarifier les décisions et professionnaliser la gestion locative.
          </h2>

          <p className="text-lg leading-8 text-[#66736d]">
            Là où beaucoup d'outils empilent des écrans, Lok Izy relie enfin
            les opérations du quotidien dans une expérience claire, exploitable
            et pensée pour la vraie vie.
          </p>
        </div>

        <div className="grid gap-10">
          {featureGroups.map((group) => (
            <article key={group.title} className="glass-card p-8 sm:p-10">
              <div className="mb-8 max-w-3xl">
                <h3 className="text-2xl font-bold text-[#101513] sm:text-3xl">
                  {group.title}
                </h3>
                <p className="mt-3 leading-7 text-[#66736d]">{group.intro}</p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {group.cards.map((card) => (
                  <article
                    key={card.title}
                    className="group rounded-[28px] border border-[#dfe9e3] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,250,246,0.98))] p-6 shadow-[0_14px_40px_rgba(16,21,19,0.06)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(16,21,19,0.14)]"
                  >
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <span className="inline-flex rounded-full bg-[#edf1ee] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#4f6455]">
                        {card.kpi}
                      </span>
                      <span className="h-3 w-3 rounded-full bg-[var(--sage-accent)] transition duration-300 group-hover:scale-125" />
                    </div>

                    <h4 className="text-2xl font-extrabold leading-tight text-[#101513] sm:text-[1.75rem]">
                      {card.title}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-[#6e7b75]">
                      {card.description}
                    </p>
                  </article>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
