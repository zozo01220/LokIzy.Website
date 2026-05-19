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
    title: "Pour les proprietaires / admin",
    intro:
      "Un back-office complet pour piloter les biens, les flux financiers, les occupants et les actions de l'equipe.",
    cards: [
      {
        kpi: "Vue 360",
        title: "Dashboard pilotage",
        description:
          "Revenus encaisses, revenus en cours, occupation, impayes reels, alertes prioritaires et activites recentes.",
      },
      {
        kpi: "Par bien",
        title: "Gestion des biens",
        description:
          "Creation, modification et suivi des logements avec timeline d'activite detaillee.",
      },
      {
        kpi: "Actifs",
        title: "Gestion des locataires",
        description:
          "Dossiers actifs, contacts, activite et historique relies a chaque logement.",
      },
      {
        kpi: "Scoring",
        title: "Gestion des candidats",
        description:
          "Candidatures centralisees, campagnes de location et conversion candidat vers locataire.",
      },
      {
        kpi: "Cycle de vie",
        title: "Contrats de bail",
        description:
          "Creation, edition, signature, activation et suivi complet des baux.",
      },
      {
        kpi: "Par piece",
        title: "Etats des lieux",
        description:
          "Formulaires structures par onglets avec pieces dynamiques, elements et validation.",
      },
      {
        kpi: "Detail",
        title: "Inventaires",
        description:
          "Gestion du contenu du logement piece par piece sur la meme logique que l'etat des lieux.",
      },
      {
        kpi: "Back-office",
        title: "Documents",
        description:
          "Import, suppression, classement et consultation des documents administratifs.",
      },
      {
        kpi: "PaymentDay",
        title: "Loyers et finances",
        description:
          "Echeances, paiements, statuts en attente ou impayes, relances et lecture des encaissements.",
      },
      {
        kpi: "Separe",
        title: "Depot de garantie",
        description:
          "Suivi du depot prevu, encaisse, restitue ou retenu, distinct des revenus locatifs.",
      },
      {
        kpi: "Auto",
        title: "Quittances",
        description:
          "Generation et mise a disposition des quittances apres enregistrement des paiements.",
      },
      {
        kpi: "2 voies",
        title: "Incidents",
        description:
          "Tickets locataires avec statuts, historique, pieces jointes, echanges et notifications bidirectionnelles.",
      },
      {
        kpi: "Push PWA",
        title: "Notifications",
        description:
          "Centre de notifications, non lues, marquage comme lu et preferences utilisateur.",
      },
      {
        kpi: "Finance",
        title: "Rapports",
        description:
          "Rapport financier et declaration fiscale pour le pilotage comptable.",
      },
      {
        kpi: "Equipe",
        title: "Organisation",
        description:
          "Gestion de l'organisation owner, des admins, du plan et des capacites.",
      },
      {
        kpi: "Centralise",
        title: "Configuration",
        description:
          "Reglages metier, notifications, uploads, IRL, prorata et job mensuel de generation.",
      },
      {
        kpi: "Mensuel",
        title: "Automatisation des loyers",
        description:
          "Job serveur avec logique de rattrapage pour generer les loyers du mois.",
      },
      {
        kpi: "Trace",
        title: "Audit log",
        description:
          "Tracabilite des actions importantes realisees dans l'application.",
      },
    ],
  },
  {
    title: "Pour les locataires",
    intro:
      "Un espace simple pour consulter, telecharger, signaler et suivre les sujets du quotidien.",
    cards: [
      {
        kpi: "Perso",
        title: "Ma location",
        description:
          "Vue synthetique du logement et des informations utiles en un seul endroit.",
      },
      {
        kpi: "Partage",
        title: "Mes documents",
        description:
          "Acces aux documents partages et depot des pieces demandees.",
      },
      {
        kpi: "Temps reel",
        title: "Mes paiements",
        description:
          "Consultation des loyers, des statuts et des montants dus ou regles.",
      },
      {
        kpi: "Telechargement",
        title: "Mes quittances",
        description:
          "Acces direct aux quittances generees apres encaissement.",
      },
      {
        kpi: "Photo + suivi",
        title: "Mes incidents",
        description:
          "Ouverture d'incident avec description, photo, statuts et echanges avec le bailleur.",
      },
      {
        kpi: "Alertes",
        title: "Notifications",
        description:
          "Reception des alertes liees aux incidents, documents, finances et autres evenements.",
      },
      {
        kpi: "Mobile",
        title: "PWA mobile",
        description:
          "Usage fluide comme une app mobile avec notifications push et continuite sur smartphone.",
      },
    ],
  },
  {
    title: "Ce qui est utile au quotidien",
    intro:
      "Des details produit concrets qui simplifient l'exploitation et rendent les lectures plus fiables.",
    cards: [
      {
        kpi: "Contrat",
        title: "Regle PaymentDay",
        description:
          "Evite de marquer un loyer comme impaye avant sa vraie date contractuelle.",
      },
      {
        kpi: "Tresorerie",
        title: "Revenu encaisse / en cours",
        description:
          "Donne une lecture plus realiste de la tresorerie au quotidien.",
      },
      {
        kpi: "Tout centralise",
        title: "Documents + incidents + loyers",
        description:
          "Limite les echanges disperses par email ou messagerie externe.",
      },
      {
        kpi: "Moins d'oubli",
        title: "Automatisation + historique",
        description:
          "Reduit les oublis et ameliore la tracabilite des operations.",
      },
    ],
  },
];

export default function Features() {
  return (
    <section id="fonctionnalites" className="bg-white py-28">
      <div className="section-container">
        <div className="mb-16 max-w-4xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0f6f34]">
            Fonctionnalites
          </p>
          <h2 className="mb-6 text-4xl font-bold text-[#101513] sm:text-5xl">
            Des modules presentes comme de vrais blocs produit, pas comme une simple liste.
          </h2>

          <p className="text-lg leading-8 text-[#66736d]">
            Chaque carte met en avant l'usage cle, avec un titre fort et une
            description plus discrete pour garder une lecture rapide.
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
                      <span className="inline-flex rounded-full bg-[#e8f7ee] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#0f6f34]">
                        {card.kpi}
                      </span>
                      <span className="h-3 w-3 rounded-full bg-[#16a34a] transition duration-300 group-hover:scale-125" />
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
