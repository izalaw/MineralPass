import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    project: "Mineral Pass",
    environment: "production-real-cnft-demo",
    network: "solana-devnet",

    frontend: {
      framework: "Next.js",
      wallet: "Phantom Wallet Connect",
      deployed: true,
      url: "https://mineral-pass.vercel.app",
    },

    backend: {
      apiMintRoute: "/api/mint",
      apiMintRealRoute: "/api/mint-real",
      apiProofRoute: "/api/proof",
      apiHealthRoute: "/api/health",
      mintMode: "protected-real-bubblegum-cnft",
      protectedMintEndpoint: true,
      ownerWalletMintSupport: true,
    },

    solana: {
      realCnftMintProduction: true,
      standard: "Metaplex Bubblegum cNFT",
      network: "Solana Devnet",
      merkleTree: "9KmgNsDFmottejP9ug3DMRKVg79Vc1yPVNvUJHvDJ6cy",
      treeConfig: "5F1dk877qiuuomwuZaYLNDrWmwf39mTVrBS844xure6b",
      backendSigner: "4YhAJxbcmh4PJunKywgyGpxbHi9oKfy4CfRXLvNXgtEZ",
      technicalProofUrl: "https://mineral-pass.vercel.app/technical-proof",
      latestConfirmedTransaction:
        "22p3nCDbex6xWJwZgt4xhKjzJ6nQkmVtg7JM8MEDfUkAw6q4xZXxMKddBW1TUSSunqtYrp9FSaVV9vi7JTuo1jSV",
      explorer:
        "https://explorer.solana.com/tx/22p3nCDbex6xWJwZgt4xhKjzJ6nQkmVtg7JM8MEDfUkAw6q4xZXxMKddBW1TUSSunqtYrp9FSaVV9vi7JTuo1jSV?cluster=devnet",
    },
  });
}
