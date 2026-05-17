"use client";

import { useMemo, useState } from "react";

type PhantomProvider = {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect?: () => Promise<void>;
};

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

type MintResult = {
  success?: boolean;
  mode?: string;
  assetId?: string;
  network?: string;
  message?: string;
  ownerWallet?: string;
  transactionSignature?: string;
  explorer?: string;
  solanaProof?: {
    transaction?: string;
  };
};

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletError, setWalletError] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [mintResult, setMintResult] = useState<MintResult | null>(null);
  const [mintError, setMintError] = useState("");

  const lot = {
    company: "Sertão Minerals",
    lotId: "LIT-VALE-2026-001",
    mineral: "Lithium",
    origin: "Vale do Jequitinhonha, Minas Gerais, Brazil",
    volume: "24 tons",
  };

  const lotHash = useMemo(() => {
    const base = `${lot.company}-${lot.mineral}-${lot.origin}-${lot.volume}-${lot.lotId}`;
    let result = 0;

    for (let index = 0; index < base.length; index += 1) {
      result = (result << 5) - result + base.charCodeAt(index);
      result |= 0;
    }

    return `0x${Math.abs(result).toString(16).padStart(8, "0")}...${lot.lotId
      .slice(-3)
      .toLowerCase()}`;
  }, [lot.company, lot.mineral, lot.origin, lot.volume, lot.lotId]);

  async function connectWallet() {
    setWalletError("");

    try {
      const provider = window.solana;

      if (!provider?.isPhantom) {
        setWalletError("Phantom Wallet not found. Install or enable the extension.");
        return;
      }

      const response = await provider.connect();
      setWalletAddress(response.publicKey.toString());
    } catch {
      setWalletError("Wallet connection was rejected or cancelled.");
    }
  }

  async function disconnectWallet() {
    try {
      await window.solana?.disconnect?.();
      setWalletAddress("");
      setMintResult(null);
    } catch {
      setWalletAddress("");
    }
  }

  async function issueMinasPass() {
    setMintError("");
    setMintResult(null);

    if (!walletAddress) {
      setMintError("Connect Phantom before issuing the Minas Pass.");
      return;
    }

    setIsMinting(true);

    try {
      const response = await fetch("/api/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: lot.company,
          mineral: lot.mineral,
          origin: lot.origin,
          volume: lot.volume,
          lotId: lot.lotId,
          hash: lotHash,
          walletAddress,
        }),
      });

      const data = (await response.json()) as MintResult;

      if (!response.ok || !data.success) {
        setMintError(data.message || "Mint failed.");
        return;
      }

      setMintResult(data);
    } catch {
      setMintError("Could not connect to the mint API.");
    } finally {
      setIsMinting(false);
    }
  }

  const explorerUrl = mintResult?.explorer || mintResult?.solanaProof?.transaction;

  return (
    <main className="min-h-screen bg-[#020617] text-slate-50">
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 md:px-8 md:py-10">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-400/10">
              <div className="h-0 w-0 border-x-[13px] border-b-[23px] border-x-transparent border-b-emerald-300" />
              <div className="absolute mt-2 h-0 w-0 border-x-[7px] border-b-[12px] border-x-transparent border-b-[#020617]" />
            </div>

            <div>
              <p className="text-xl font-bold tracking-tight">Minas Pass</p>
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">
                Mineral blockchain certificate
              </p>
            </div>
          </div>

          <a
            href="/technical-proof"
            className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 md:inline-flex"
          >
            Technical proof
          </a>
        </header>

        <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl md:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
              Solana Devnet · Metaplex Bubblegum · cNFT
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
              Blockchain passport for critical mineral lots.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Minas Pass issues a real Solana compressed NFT certificate for a
              mineral lot and delivers the proof to the connected Phantom wallet.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {walletAddress ? (
                <button
                  onClick={disconnectWallet}
                  className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Disconnect Phantom
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                >
                  Connect Phantom
                </button>
              )}

              <a
                href="/api/proof"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                API proof
              </a>

              <a
                href="/api/health"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                API health
              </a>
            </div>

            {walletError ? (
              <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-400/10 p-3 text-sm text-red-100">
                {walletError}
              </p>
            ) : null}
          </div>

          <div className="rounded-3xl border border-emerald-300/20 bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">
              Wallet status
            </p>

            {walletAddress ? (
              <div>
                <p className="mt-4 text-sm text-slate-400">Connected owner wallet</p>
                <p className="mt-2 break-all rounded-2xl bg-white/5 p-4 font-mono text-sm text-emerald-100">
                  {walletAddress}
                </p>
              </div>
            ) : (
              <p className="mt-4 text-slate-300">
                Connect Phantom to receive the Minas Pass cNFT certificate.
              </p>
            )}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-3xl font-black text-emerald-300">1</p>
            <h2 className="mt-3 text-xl font-bold">Register lot</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              The demo lot has basic mineral identity, origin, volume and hash.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-3xl font-black text-emerald-300">2</p>
            <h2 className="mt-3 text-xl font-bold">Mint cNFT</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              The backend executes a protected real Bubblegum mint on Solana Devnet.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-3xl font-black text-emerald-300">3</p>
            <h2 className="mt-3 text-xl font-bold">Verify proof</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              The transaction, owner wallet and certificate can be checked on Explorer.
            </p>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                Demo lot
              </p>

              <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
                Verified demo lot
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black">Lithium lot certificate</h2>

            <div className="mt-6 space-y-4">
              <Info label="Company" value={lot.company} />
              <Info label="Lot ID" value={lot.lotId} />
              <Info label="Mineral" value={lot.mineral} />
              <Info label="Origin" value={lot.origin} />
              <Info label="Volume" value={lot.volume} />
              <Info label="Lot hash" value={lotHash} mono />
            </div>

            <div className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5">
              <p className="text-sm font-bold text-emerald-200">Verification layer</p>
              <div className="mt-3 grid gap-2 text-sm text-slate-200">
                <p>✓ Origin declared</p>
                <p>✓ Lot hash generated</p>
                <p>✓ Owner wallet required</p>
                <p>✓ cNFT certificate issued on Solana</p>
              </div>
            </div>

            <button
              onClick={issueMinasPass}
              disabled={!walletAddress || isMinting}
              className="mt-8 w-full rounded-2xl bg-emerald-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isMinting ? "Minting real cNFT..." : "Issue Minas Pass cNFT"}
            </button>

            {!walletAddress ? (
              <p className="mt-3 text-center text-sm text-slate-400">
                Connect Phantom first.
              </p>
            ) : null}

            {mintError ? (
              <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-400/10 p-3 text-sm text-red-100">
                {mintError}
              </p>
            ) : null}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
              On-chain result
            </p>

            {!mintResult ? (
              <div className="mt-6 rounded-3xl border border-dashed border-white/15 p-8 text-center">
                <p className="text-2xl font-black">No mint yet</p>
                <p className="mt-3 text-slate-400">
                  After issuing, the transaction signature and Explorer link will appear here.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">
                    Mint success
                  </p>
                  <p className="mt-2 text-2xl font-black">cNFT certificate issued</p>
                </div>

                <Info label="Mode" value={mintResult.mode || "real-bubblegum-mint"} />
                <Info label="Network" value={mintResult.network || "solana-devnet"} />
                <Info label="Owner wallet" value={mintResult.ownerWallet || walletAddress} mono />
                <Info
                  label="Transaction signature"
                  value={mintResult.transactionSignature || mintResult.assetId || ""}
                  mono
                />

                {explorerUrl ? (
                  <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full justify-center rounded-2xl bg-blue-500 px-5 py-4 text-sm font-black text-white transition hover:bg-blue-400"
                  >
                    View on Solana Explorer
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
            Why now
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <MarketCard
              title="Critical minerals"
              text="Battery, clean energy and industrial supply chains need stronger mineral traceability."
            />
            <MarketCard
              title="Compliance pressure"
              text="Buyers, investors and regulators increasingly need proof of origin and technical status."
            />
            <MarketCard
              title="Blockchain proof"
              text="Sensitive documents stay off-chain, while the certificate and transaction are publicly verifiable."
            />
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-400">
            Minas Pass does not replace mining licenses, audits or environmental documents.
            It adds a blockchain verification layer for mineral lot certificates.
          </p>
        </section>
      </section>
    </main>
  );
}

function Info({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p
        className={`mt-1 break-all text-sm text-slate-100 ${
          mono ? "font-mono" : "font-semibold"
        }`}
      >
        {value || "—"}
      </p>
    </div>
  );
}

function MarketCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <h3 className="text-lg font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}
