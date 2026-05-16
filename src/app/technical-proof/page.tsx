export default function TechnicalProofPage() {
  const explorerUrl =
    "https://explorer.solana.com/tx/5eKTkFdcUSwfPbTdoLhuA9iYe4Xr4Cg3x8yM6amGFmwZ16bA4YfmdQhqNvcZ9f86UYecaCqz8RFwRZmv2dTg6ASf?cluster=devnet";

  const proofItems = [
    {
      label: "App",
      value: "Mineral Pass",
    },
    {
      label: "Network",
      value: "Solana Devnet",
    },
    {
      label: "Wallet integration",
      value: "Phantom Wallet Connect",
    },
    {
      label: "Frontend",
      value: "Next.js + TypeScript + Tailwind CSS",
    },
    {
      label: "Backend route",
      value: "/api/mint",
    },
    {
      label: "Mint mode in app",
      value: "Backend fallback for stable demo",
    },
    {
      label: "Real cNFT experiment",
      value: "Metaplex Bubblegum mintV2 executed on Solana Devnet",
    },
    {
      label: "Merkle Tree",
      value: "9KmgNsDFmottejP9ug3DMRKVg79Vc1yPVNvUJHvDJ6cy",
    },
    {
      label: "Tree Config",
      value: "5F1dk877qiuuomwuZaYLNDrWmwf39mTVrBS844xure6b",
    },
    {
      label: "Mint transaction",
      value:
        "5eKTkFdcUSwfPbTdoLhuA9iYe4Xr4Cg3x8yM6amGFmwZ16bA4YfmdQhqNvcZ9f86UYecaCqz8RFwRZmv2dTg6ASf",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white md:px-8">
      <section className="mx-auto max-w-6xl">
        <a
          href="/"
          className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          ← Voltar para o app
        </a>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl md:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Solana Technical Proof
          </p>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
            Prova técnica do Mineral Pass na Solana Devnet.
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            O app publicado conecta Phantom e usa uma rota backend de emissão.
            Em paralelo, o projeto inclui um script experimental que executou
            mint real de cNFT usando Metaplex Bubblegum diretamente na Solana
            Devnet, sem depender de serviço pago.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
              Phantom Wallet
            </span>
            <span className="rounded-full bg-blue-400/10 px-4 py-2 text-sm text-blue-200">
              /api/mint
            </span>
            <span className="rounded-full bg-purple-400/10 px-4 py-2 text-sm text-purple-200">
              Metaplex Bubblegum
            </span>
            <span className="rounded-full bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
              cNFT Devnet Mint
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          {proofItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                {item.label}
              </p>
              <p className="mt-2 break-all text-lg font-semibold text-slate-100">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-purple-300/20 bg-purple-400/10 p-6">
          <h2 className="text-2xl font-bold text-purple-100">
            Real cNFT mint transaction
          </h2>

          <p className="mt-3 text-slate-300">
            Esta transação comprova a execução experimental de mint de cNFT na
            Solana Devnet usando Bubblegum. O app principal mantém fallback para
            estabilidade da demo, enquanto esta prova técnica demonstra a
            viabilidade on-chain.
          </p>

          <a
            href={explorerUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-purple-200 px-5 py-3 font-semibold text-slate-950 transition hover:bg-purple-100"
          >
            Abrir transação no Solana Explorer
          </a>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">Arquitetura técnica</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <p className="font-semibold text-emerald-200">App publicado</p>
              <p className="mt-2 text-sm text-slate-300">
                Front-end Next.js com Phantom Wallet Connect, checklist de
                conformidade e rota backend /api/mint com fallback de emissão.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <p className="font-semibold text-blue-200">Experimento on-chain</p>
              <p className="mt-2 text-sm text-slate-300">
                Scripts locais em TypeScript usam wallet devnet, Metaplex Umi e
                Bubblegum para criar Merkle Tree e executar mintV2 em devnet.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-blue-300/20 bg-blue-400/10 p-6">
          <h2 className="text-2xl font-bold text-blue-100">
            Endpoints públicos de verificação
          </h2>

          <p className="mt-3 text-slate-300">
            Além da interface visual, o projeto expõe APIs simples para verificar
            o status técnico da demo e a prova Solana em formato estruturado.
          </p>

          <div className="mt-5 grid gap-3">
            <a
              href="/api/proof"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 transition hover:bg-slate-800"
            >
              <p className="font-semibold text-blue-200">/api/proof</p>
              <p className="mt-1 text-sm text-slate-400">
                Retorna Merkle Tree, Tree Config, transação real e status do mint cNFT.
              </p>
            </a>

            <a
              href="/api/health"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 transition hover:bg-slate-800"
            >
              <p className="font-semibold text-blue-200">/api/health</p>
              <p className="mt-1 text-sm text-slate-400">
                Retorna status geral do app, rede, backend e prova técnica Solana.
              </p>
            </a>
          </div>
        </div>

      </section>
    </main>
  );
}
