import {
  BellRing,
  Building2,
  CalendarDays,
  FileSignature,
  Megaphone,
  ReceiptText,
  UsersRound,
} from "lucide-react";

const features = [
  {
    title: "Portefeuille et organisation",
    text: "Biens, quotas, organisation, owners et admins restent visibles depuis un espace owner structure.",
    icon: Building2,
  },
  {
    title: "Campagnes candidats",
    text: "Ouvrez une campagne par bien, centralisez les profils, triez les dossiers et convertissez le bon candidat en locataire.",
    icon: Megaphone,
  },
  {
    title: "Visites planifiees",
    text: "Ajoutez les rendez-vous, rattachez-les au bien et au candidat, puis gardez l'historique du suivi.",
    icon: CalendarDays,
  },
  {
    title: "Signatures et documents",
    text: "Baux, inventaires et etats des lieux avancent avec un workflow de signature plus direct et plus lisible.",
    icon: FileSignature,
  },
  {
    title: "Loyers et suivi finance",
    text: "Gardez les quittances, les paiements, les relances et les points de vigilance dans le meme pilotage.",
    icon: ReceiptText,
  },
  {
    title: "Notifications et activite",
    text: "Recevez les alertes utiles, activez le push et suivez chaque action importante dans un journal d'activite.",
    icon: BellRing,
  },
  {
    title: "Relation locataire continue",
    text: "Contacts, documents, signatures, evenements et timeline locataire restent relies du debut a la sortie.",
    icon: UsersRound,
  },
];

export default function Features() {
  return (
    <section id="fonctionnalites" className="py-28">
      <div className="section-container">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0f6f34]">
            Fonctionnalites
          </p>
          <h2 className="mb-6 text-4xl font-bold text-[#101513] sm:text-5xl">
            Les modules qui collent aux usages reels de ton app.
          </h2>

          <p className="text-lg leading-8 text-[#66736d]">
            LokIzy ne sert plus seulement a stocker des fiches. La plateforme
            orchestre les decisions, les actions et les validations qui font
            avancer un portefeuille locatif.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, text, icon: Icon }) => (
            <div
              key={title}
              className="glass-card p-8 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-lg bg-[#e8f7ee] text-[#0f6f34]">
                <Icon size={24} strokeWidth={2.2} />
              </div>

              <h3 className="mb-4 text-2xl font-semibold text-[#101513]">
                {title}
              </h3>

              <p className="leading-7 text-[#66736d]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
