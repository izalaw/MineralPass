type LotPageProps = {
  params: Promise<{
    lotId: string;
  }>;
};

export default async function LotPage({ params }: LotPageProps) {
  const { lotId } = await params;

  const attestations = [
    {
      name: "Origem declarada",
      status: "Valid",
      detail: "Vale do Jequitinhonha, Minas Gerais",
    },
    {
      name: "Regularidade ANM",
      status: "Valid",
      detail: "Atestado regulatório demonstrativo",
    },
    {
      name: "Licença ambiental",
      status: "Valid",
      detail: "Documento ambiental mockado para due diligence",
    },
    {
      name: "Conformidade trabalhista",
      status: "Valid",
      detail: "Conformidade operacional e trabalhista demonstrativa",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-wrap gap-3">
          <a
            href="/"
            className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            ← Voltar para o app
          </a>

          <a
            href="/technical-proof"
            className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Ver prova técnica Solana
          </a>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl md:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Mineral Pass público
          </p>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="break-all text-4xl font-bold tracking-tight md:text-6xl">
                {lotId}
              </h1>

              <p className="mt-6 max-w-3xl text-lg text-slate-300">
                Página pública de verificação para comprador, auditor ou regulador
                consultar o status de conformidade de um lote mineral sem acessar
                segredos comerciais do exportador.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">
                Status
              </p>
              <h2 className="mt-3 text-3xl font-bold">Export-ready</h2>
              <p className="mt-3 text-sm text-emerald-50/80">
                Todas as atestações obrigatórias estão válidas neste cenário de
                demonstração.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Dados públicos do lote
            </p>
            <h2 className="mt-2 text-2xl font-bold">Lítio brasileiro</h2>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm text-slate-400">Exportador</p>
                <p className="mt-1 font-semibold">Sertão Minerals</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm text-slate-400">Origem</p>
                <p className="mt-1 font-semibold">
                  Vale do Jequitinhonha, Minas Gerais
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm text-slate-400">Volume</p>
                  <p className="mt-1 font-semibold">24 toneladas</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm text-slate-400">Mineral</p>
                  <p className="mt-1 font-semibold">Lítio</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Prova técnica
            </p>
            <h2 className="mt-2 text-2xl font-bold">Hash + cNFT proof</h2>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm text-slate-400">Asset ID demonstrativo</p>
                <p className="mt-2 break-all font-semibold text-emerald-200">
                  cnft_E2026001_demo
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm text-slate-400">Hash demonstrativo</p>
                <p className="mt-2 break-all font-semibold text-blue-200">
                  0x1dc80843...001
                </p>
              </div>

              <a
                href="https://explorer.solana.com/tx/5eKTkFdcUSwfPbTdoLhuA9iYe4Xr4Cg3x8yM6amGFmwZ16bA4YfmdQhqNvcZ9f86UYecaCqz8RFwRZmv2dTg6ASf?cluster=devnet"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit rounded-full bg-purple-200 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-purple-100"
              >
                Ver mint real Bubblegum no Explorer
              </a>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Atestações
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            Checklist público de conformidade
          </h2>

          <div className="mt-6 grid gap-3">
            {attestations.map((item) => (
              <div
                key={item.name}
                className="grid gap-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4 md:grid-cols-[1fr_auto] md:items-center"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
                </div>

                <span className="w-fit rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-amber-300/20 bg-amber-400/10 p-6">
          <h2 className="text-2xl font-bold text-amber-100">
            Privacidade comercial preservada
          </h2>
          <p className="mt-3 text-amber-50/80">
            Esta página mostra apenas metadados mínimos, status e provas
            verificáveis. Contratos, preço, comprador, rota logística e
            documentos completos ficam off-chain com acesso seletivo.
          </p>
        </section>
      </section>
    </main>
  );
}