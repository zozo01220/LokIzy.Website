import { BellRing, Building2, Megaphone } from "lucide-react";

const highlights = [
  {
    title: "Organisation owner et equipe",
    text: "Pilotez votre structure, vos admins, vos quotas et votre portefeuille depuis un espace unique.",
    icon: Building2,
  },
  {
    title: "Campagnes candidats et visites",
    text: "Ouvrez une campagne par bien, qualifiez les profils, planifiez les visites et convertissez le bon dossier en locataire.",
    icon: Megaphone,
  },
  {
    title: "Alertes, signatures et activite",
    text: "Suivez les notifications, les documents a signer et l'historique des actions importantes sans perdre le contexte.",
    icon: BellRing,
  },
];

export default function Highlights() {
  return (
    <section id="nouveautes" className="bg-white py-24">
      <div className="section-container">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0f6f34]">
            Nouveautes produit
          </p>
          <h2 className="mb-6 text-4xl font-bold text-[#101513] sm:text-5xl">
            Le site parle maintenant de la vraie version de LokIzy.
          </h2>
          <p className="text-lg leading-8 text-[#66736d]">
            La plateforme ne se limite plus a la gestion des biens et des
            documents. Elle couvre aussi l'organisation, le recrutement
            locataire, le suivi operationnel et les alertes du quotidien.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {highlights.map(({ title, text, icon: Icon }) => (
            <article key={title} className="glass-card p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f7ee] text-[#0f6f34]">
                <Icon size={22} strokeWidth={2.2} />
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-[#101513]">
                {title}
              </h3>
              <p className="leading-7 text-[#66736d]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
