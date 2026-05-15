"use client";

import { useMemo, useState } from "react";

type AttestationStatus = "valid" | "missing" | "expired" | "revoked" | "disputed";

type Attestation = {
  id: string;
  label: string;
  description: string;
  status: AttestationStatus;
};

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

const statusLabels: Record<AttestationStatus, string> = {
  valid: "Valid",
  missing: "Missing",
  expired: "Expired",
  revoked: "Revoked",
  disputed: "Disputed",
};

const statusStyles: Record<AttestationStatus, string> = {
  valid: "bg-emerald-400/10 text-emerald-200 border-emerald-300/20",
  missing: "bg-amber-400/10 text-amber-200 border-amber-300/20",
  expired: "bg-slate-400/10 text-slate-200 border-slate-300/20",
  revoked: "bg-red-400/10 text-red-200 border-red-300/20",
  disputed: "bg-purple-400/10 text-purple-200 border-purple-300/20",
};

export default function Home() {
  const [company, setCompany] = useState("Sertão Minerals");
  const [mineral, setMineral] = useState("Lítio");
  const [origin, setOrigin] = useState("Vale do Jequitinhonha, Minas Gerais");
  const [volume, setVolume] = useState("24 toneladas");
  const [lotId, setLotId] = useState("LIT-VALE-2026-001");
  const [assetId, setAssetId] = useState("");
  const [documentCode, setDocumentCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletError, setWalletError] = useState("");

  const [attestations, setAttestations] = useState<Attestation[]>([
    {
      id: "origin",
      label: "Origem declarada",
      description: "Origem, produtor e identificação do lote.",
      status: "valid",
    },
    {
      id: "anm",
      label: "Regularidade ANM",
      description: "Registro regulatório e autorização de lavra.",
      status: "missing",
    },
    {
      id: "environmental",
      label: "Licença ambiental",
      description: "Licença ambiental e documentação relacionada.",
      status: "missing",
    },
    {
      id: "labor",
      label: "Conformidade trabalhista",
      description: "Conformidade trabalhista e segurança operacional.",
      status: "valid",
    },
  ]);

  const exportReady = useMemo(
    () => attestations.every((item) => item.status === "valid"),
    [attestations],
  );

  const hash = useMemo(() => {
    const base = `${company}-${mineral}-${origin}-${volume}-${lotId}`;
    let result = 0;

    for (let index = 0; index < base.length; index += 1) {
      result = (result << 5) - result + base.charCodeAt(index);
      result |= 0;
    }

    return `0x${Math.abs(result).toString(16).padStart(8, "0")}...${lotId
      .slice(-3)
      .toLowerCase()}`;
  }, [company, mineral, origin, volume, lotId]);

  async function connectWallet() {
    setWalletError("");

    try {
      const provider = window.solana;

      if (!provider?.isPhantom) {
        setWalletError("Phantom Wallet não encontrada. Instale a extensão para conectar.");
        return;
      }

      const response = await provider.connect();
      setWalletAddress(response.publicKey.toString());
    } catch {
      setWalletError("Conexão recusada ou cancelada na Phantom.");
    }
  }

  async function disconnectWallet() {
    try {
      await window.solana?.disconnect?.();
      setWalletAddress("");
    } catch {
      setWalletAddress("");
    }
  }

  async function issueMineralPass() {
  setAssetId("Gerando passaporte via API...");

  try {
    const response = await fetch("/api/mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company,
        mineral,
        origin,
        volume,
        lotId,
        hash,
        walletAddress: walletAddress || null,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      setAssetId("Erro ao emitir Mineral Pass");
      return;
    }

    setAssetId(data.assetId);
    setUnlocked(false);
    setDocumentCode("");
  } catch {
    setAssetId("Erro ao conectar com a API de mint");
  }
}

  function updateAttestation(id: string, status: AttestationStatus) {
    setAttestations((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  }

  function unlockDocument() {
    setUnlocked(documentCode.trim().toUpperCase() === "MINERAL2026");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-5 py-8 md:px-8">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl md:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Mineral Pass
          </p>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
                Passaporte digital de conformidade para minerais críticos brasileiros.
              </h1>

              <p className="mt-6 max-w-3xl text-lg text-slate-300">
                Cada lote recebe um cNFT em Solana com hashes verificáveis de origem
                e atestações regulatórias, ambientais e trabalhistas — preservando
                segredos comerciais do exportador.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">
                  Status do lote
                </p>
                <h2 className="mt-3 text-3xl font-bold">
                  {exportReady ? "Export-ready" : "Missing attestation"}
                </h2>
                <p className="mt-3 text-sm text-emerald-50/80">
                  O comprador verifica pendências antes de avançar na negociação.
                </p>
              </div>

              <div className="rounded-3xl border border-blue-300/20 bg-blue-400/10 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-blue-200">
                  Solana Devnet
                </p>

                {walletAddress ? (
                  <div>
                    <p className="mt-3 text-sm text-blue-50/80">
                      Wallet conectada como exportador:
                    </p>
                    <p className="mt-2 break-all text-sm font-semibold text-blue-100">
                      {walletAddress}
                    </p>
                    <button
                      onClick={disconnectWallet}
                      className="mt-4 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Desconectar wallet
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="mt-3 text-sm text-blue-50/80">
                      Conecte a Phantom para demonstrar integração real com carteira Solana.
                    </p>
                    <button
                      onClick={connectWallet}
                      className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                    >
                      Connect Phantom Wallet
                    </button>
                  </div>
                )}

                {walletError && (
                  <p className="mt-3 text-sm text-amber-200">{walletError}</p>
                )}
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              1. Criar lote
            </p>
            <h2 className="mt-2 text-2xl font-bold">Dados públicos do passaporte</h2>

            <div className="mt-6 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm text-slate-300">Empresa exportadora</span>
                <input
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none ring-emerald-300/40 focus:ring-2"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm text-slate-300">Mineral</span>
                <input
                  value={mineral}
                  onChange={(event) => setMineral(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none ring-emerald-300/40 focus:ring-2"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm text-slate-300">Origem</span>
                <input
                  value={origin}
                  onChange={(event) => setOrigin(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none ring-emerald-300/40 focus:ring-2"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm text-slate-300">Volume</span>
                  <input
                    value={volume}
                    onChange={(event) => setVolume(event.target.value)}
                    className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none ring-emerald-300/40 focus:ring-2"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm text-slate-300">ID do lote</span>
                  <input
                    value={lotId}
                    onChange={(event) => setLotId(event.target.value)}
                    className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none ring-emerald-300/40 focus:ring-2"
                  />
                </label>
              </div>

              <button
                onClick={issueMineralPass}
                className="mt-2 rounded-full bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Emitir Mineral Pass demo
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              2. Resultado verificável
            </p>
            <h2 className="mt-2 text-2xl font-bold">Passaporte do lote</h2>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-sm text-slate-400">Lote</p>
                <p className="mt-1 text-xl font-bold">{lotId}</p>
                <p className="mt-2 text-slate-300">
                  {mineral} • {volume} • {origin}
                </p>
                <p className="text-slate-300">Exportador: {company}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm text-slate-400">Asset ID cNFT simulado</p>
                  <p className="mt-2 break-all font-semibold text-emerald-200">
                    {assetId || "Clique em “Emitir Mineral Pass demo”"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm text-slate-400">Hash dos dados</p>
                  <p className="mt-2 break-all font-semibold text-blue-200">{hash}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 p-5">
                <p className="font-semibold text-amber-100">
                  Dados sensíveis off-chain, prova on-chain.
                </p>
                <p className="mt-2 text-sm text-amber-50/80">
                  Preço, contrato, comprador e documentos completos não ficam públicos.
                  O MVP registra apenas hash, status e metadados mínimos.
                </p>
              </div>

              <div className="rounded-2xl border border-purple-300/20 bg-purple-400/10 p-5">
                <p className="font-semibold text-purple-100">
                  Próximo passo técnico: mint real de cNFT.
                </p>
                <p className="mt-2 text-sm text-purple-50/80">
                  A versão atual conecta carteira Solana e demonstra o fluxo. Em produção,
                  este Asset ID simulado será substituído por um cNFT real emitido via
                  Underdog ou integração direta com Solana.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              3. Atestações
            </p>
            <h2 className="mt-2 text-2xl font-bold">Checklist de conformidade</h2>

            <div className="mt-6 grid gap-3">
              {attestations.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4 md:grid-cols-[1fr_auto] md:items-center"
                >
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                  </div>

                  <select
                    value={item.status}
                    onChange={(event) =>
                      updateAttestation(item.id, event.target.value as AttestationStatus)
                    }
                    className={`rounded-full border px-4 py-2 text-sm font-semibold outline-none ${statusStyles[item.status]}`}
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value} className="bg-slate-950">
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              4. Verificação do comprador
            </p>
            <h2 className="mt-2 text-2xl font-bold">Acesso seletivo</h2>

            <p className="mt-4 text-slate-300">
              O comprador vê o status público. Para abrir o documento completo,
              precisa de um código one-time fornecido pelo exportador.
            </p>

            <div className="mt-6 grid gap-3">
              <input
                value={documentCode}
                onChange={(event) => setDocumentCode(event.target.value)}
                placeholder="Digite MINERAL2026"
                className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 outline-none ring-emerald-300/40 focus:ring-2"
              />

              <button
                onClick={unlockDocument}
                className="rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Ver documento com código
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              {unlocked ? (
                <div>
                  <p className="font-semibold text-emerald-200">
                    Documento liberado para due diligence.
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    Mock: licença ambiental, regularidade ANM e declaração trabalhista
                    seriam exibidas aqui com acesso controlado.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-slate-200">
                    Documento protegido.
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    Use o código de demonstração para simular acesso autorizado.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}