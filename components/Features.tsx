import {
  Building2,
  ClipboardCheck,
  FileSignature,
  PackageCheck,
  ReceiptText,
  UsersRound,
} from "lucide-react";

const features = [
  {
    title: "Biens structures",
    text: "Fiches completes, lots, pieces, annexes, documents et historique au meme endroit.",
    icon: Building2,
  },
  {
    title: "Baux prets a signer",
    text: "Generez des contrats coherents a partir des donnees deja saisies.",
    icon: FileSignature,
  },
  {
    title: "Etats des lieux guides",
    text: "Preparez l'entree et la sortie avec photos, commentaires et validation claire.",
    icon: ClipboardCheck,
  },
  {
    title: "Inventaires maitrises",
    text: "Suivez meubles, equipements, cles et compteurs sans tableur fragile.",
    icon: PackageCheck,
  },
  {
    title: "Loyers et quittances",
    text: "Visualisez les paiements, relancez les retards et editez les quittances.",
    icon: ReceiptText,
  },
  {
    title: "Relation locataire",
    text: "Centralisez contacts, demandes, echanges et pieces justificatives.",
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
            Tout ce qu&apos;il faut pour gerer une location serieusement.
          </h2>

          <p className="text-lg leading-8 text-[#66736d]">
            LokIzy rassemble les taches repetitives et les moments sensibles
            de la location dans une experience lisible, rapide et fiable.
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
