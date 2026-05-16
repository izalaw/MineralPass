export default function TechnicalProofPage() {
  const lastTransaction =
    "https://explorer.solana.com/tx/22p3nCDbex6xWJwZgt4xhKjzJ6nQkmVtg7JM8MEDfUkAw6q4xZXxMKddBW1TUSSunqtYrp9FSaVV9vi7JTuo1jSV?cluster=devnet";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
          Mineral Pass Technical Proof
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
          Real Solana cNFT verification for mineral lots.
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          Mineral Pass tokenizes the verification certificate of a mineral lot as
          a compressed NFT on Solana Devnet. It does not tokenize mineral
          ownership. It creates a public, blockchain-verifiable proof of the
          lot certificate.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-950/30 p-5">
            <p className="text-sm text-emerald-300">Blockchain status</p>
            <h2 className="mt-2 text-2xl font-semibold">Real cNFT mint working</h2>
            <p className="mt-3 text-slate-300">
              The production backend executes a real Metaplex Bubblegum cNFT
              mint on Solana Devnet.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-400/20 bg-blue-950/30 p-5">
            <p className="text-sm text-blue-300">Owner wallet delivery</p>
            <h2 className="mt-2 text-2xl font-semibold">cNFT sent to wallet</h2>
            <p className="mt-3 text-slate-300">
              The backend signer pays and executes the mint, while the cNFT can
              be delivered to the mineral lot owner wallet.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-sm text-slate-400">Protection</p>
            <h2 className="mt-2 text-2xl font-semibold">Protected endpoint</h2>
            <p className="mt-3 text-slate-300">
              The production mint route requires an Authorization Bearer token.
              Public POST requests without the token are rejected.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-sm text-slate-400">Verification</p>
            <h2 className="mt-2 text-2xl font-semibold">Explorer proof</h2>
            <p className="mt-3 text-slate-300">
              Each successful mint returns a Solana transaction signature and a
              public Explorer link.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-2xl font-semibold">Current blockchain architecture</h2>

          <div className="mt-5 space-y-3 text-slate-300">
            <p>1. Mineral lot data is prepared by the app/backend.</p>
            <p>2. The backend signer loads a protected Devnet wallet.</p>
            <p>3. Metaplex Bubblegum mints a compressed NFT on Solana Devnet.</p>
            <p>4. The cNFT points to the mineral lot URI.</p>
            <p>5. The cNFT owner can be the connected Phantom wallet.</p>
            <p>6. The transaction is publicly verifiable on Solana Explorer.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-sm text-slate-400">Merkle Tree</p>
            <p className="mt-2 break-all font-mono text-sm text-blue-200">
              9KmgNsDFmottejP9ug3DMRKVg79Vc1yPVNvUJHvDJ6cy
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-sm text-slate-400">Tree Config</p>
            <p className="mt-2 break-all font-mono text-sm text-blue-200">
              5F1dk877qiuuomwuZaYLNDrWmwf39mTVrBS844xure6b
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-sm text-slate-400">Backend signer</p>
            <p className="mt-2 break-all font-mono text-sm text-blue-200">
              4YhAJxbcmh4PJunKywgyGpxbHi9oKfy4CfRXLvNXgtEZ
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-sm text-slate-400">Network</p>
            <p className="mt-2 font-mono text-sm text-blue-200">
              Solana Devnet
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-blue-400/20 bg-blue-950/30 p-6">
          <h2 className="text-2xl font-semibold">Last verified transaction</h2>
          <p className="mt-3 break-all font-mono text-sm text-blue-200">
            22p3nCDbex6xWJwZgt4xhKjzJ6nQkmVtg7JM8MEDfUkAw6q4xZXxMKddBW1TUSSunqtYrp9FSaVV9vi7JTuo1jSV
          </p>

          <a
            href={lastTransaction}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-2xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400"
          >
            View on Solana Explorer
          </a>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-2xl font-semibold">API routes</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <a
              href="/api/mint-real"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-slate-950 p-4 transition hover:bg-slate-800"
            >
              <p className="font-semibold text-blue-200">/api/mint-real</p>
              <p className="mt-1 text-sm text-slate-400">
                Protected real Bubblegum cNFT mint endpoint.
              </p>
            </a>

            <a
              href="/api/proof"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-slate-950 p-4 transition hover:bg-slate-800"
            >
              <p className="font-semibold text-blue-200">/api/proof</p>
              <p className="mt-1 text-sm text-slate-400">
                Returns technical proof metadata.
              </p>
            </a>

            <a
              href="/api/health"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-slate-950 p-4 transition hover:bg-slate-800"
            >
              <p className="font-semibold text-blue-200">/api/health</p>
              <p className="mt-1 text-sm text-slate-400">
                Returns app, backend, and network status.
              </p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
