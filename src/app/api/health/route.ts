import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    project: "Mineral Pass",
    environment: "production-ready-demo",
    network: "solana-devnet",
    frontend: {
      framework: "Next.js",
      wallet: "Phantom Wallet Connect",
      deployed: true,
      url: "https://mineral-pass.vercel.app",
    },
    backend: {
      apiMintRoute: "/api/mint",
      apiProofRoute: "/api/proof",
      apiHealthRoute: "/api/health",
      mintMode: "backend-fallback",
    },
    solana: {
      realCnftMintExperiment: true,
      standard: "Metaplex Bubblegum cNFT",
      technicalProofUrl: "https://mineral-pass.vercel.app/technical-proof",
      explorer:
        "https://explorer.solana.com/tx/5eKTkFdcUSwfPbTdoLhuA9iYe4Xr4Cg3x8yM6amGFmwZ16bA4YfmdQhqNvcZ9f86UYecaCqz8RFwRZmv2dTg6ASf?cluster=devnet",
    },
  });
}
