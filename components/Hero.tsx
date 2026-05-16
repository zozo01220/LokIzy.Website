export default function Hero() {
  return (
    <section className="soft-grid relative overflow-hidden bg-[#f7faf8] pt-28">
      <div className="section-container grid min-h-[760px] items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#16a34a]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#0f6f34]">
            Gestion locative pensee pour avancer vite
          </div>

          <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-normal text-[#101513] sm:text-6xl lg:text-7xl">
            LokIzy centralise vos biens, vos locataires et vos documents.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#66736d] sm:text-xl">
            Une plateforme claire pour piloter la location de A a Z: baux,
            etats des lieux, inventaires, quittances, relances et suivi des
            loyers. Moins d&apos;administratif, plus de visibilite.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#tarifs"
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#0f6f34] px-7 text-base font-semibold text-white shadow-lg shadow-[#16a34a]/20 transition hover:bg-[#0b4f25]"
            >
              Voir les offres
            </a>
            <a
              href="#workflow"
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#16a34a] px-7 text-base font-semibold text-white shadow-lg shadow-[#16a34a]/20 transition hover:bg-[#0f6f34]"
            >
              Decouvrir le parcours
            </a>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4">
            {[
              ["48h", "pour lancer un bien"],
              ["1 espace", "pour tout suivre"],
              ["0 papier", "dans vos dossiers"],
            ].map(([value, label]) => (
              <div key={value} className="border-l border-[#e4ebe7] pl-4">
                <div className="text-2xl font-bold text-[#101513]">{value}</div>
                <div className="mt-1 text-sm leading-5 text-[#66736d]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="glass-card overflow-hidden p-4">
            <div className="rounded-lg bg-[#0f6f34] p-4 text-white">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-white/60">Portefeuille</p>
                  <p className="text-2xl font-bold">12 biens actifs</p>
                </div>
                <div className="rounded-full bg-[#e8f7ee] px-3 py-1 text-sm font-bold text-[#0f6f34]">
                  +96%
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Loyers encaisses", "18 420", "#e8f7ee"],
                  ["Baux a signer", "3 dossiers", "#bbf7d0"],
                  ["Tickets ouverts", "2 demandes", "#86efac"],
                  ["Documents", "146 fichiers", "#16a34a"],
                ].map(([label, value, color]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-white/10 bg-[#0b4f25] p-4"
                  >
                    <div
                      className="mb-7 h-2 w-16 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-sm text-white/60">{label}</p>
                    <p className="mt-1 text-xl font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 bg-white p-4">
              {[
                ["Rue du Lac 18", "Bail pret a envoyer", "Aujourd'hui"],
                ["Avenue Centrale 4", "Quittance generee", "Hier"],
                ["Place du Marche 9", "Etat des lieux planifie", "Vendredi"],
              ].map(([address, status, date]) => (
                <div
                  key={address}
                  className="flex items-center justify-between gap-4 rounded-lg border border-[#e4ebe7] p-4"
                >
                  <div>
                    <p className="font-semibold text-[#101513]">{address}</p>
                    <p className="mt-1 text-sm text-[#66736d]">{status}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#0f6f34]">{date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
