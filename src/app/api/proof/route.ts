import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    project: "Mineral Pass",
    status: "production-real-cnft-mint-active",
    network: "solana-devnet",
    standard: "Metaplex Bubblegum cNFT",
    appUrl: "https://mineral-pass.vercel.app",
    technicalProofUrl: "https://mineral-pass.vercel.app/technical-proof",

    core: {
      tokenization:
        "Mineral Pass tokenizes the verification certificate of a mineral lot, not the economic ownership of the mineral.",
      blockchainUse:
        "The backend executes a real compressed NFT mint on Solana Devnet using Metaplex Bubblegum.",
      ownerWallet:
        "The cNFT can be delivered to the ownerWallet provided in the mint payload.",
    },

    mintArchitecture: {
      frontend: "Next.js + Phantom Wallet Connect",
      backend: "Protected /api/mint-real production endpoint",
      signer: "Backend-controlled Devnet signer pays and executes the mint",
      delivery: "cNFT leafOwner is set to the provided ownerWallet",
      protection: "Authorization Bearer token required for POST mint execution",
    },

    solanaProof: {
      merkleTree: "9KmgNsDFmottejP9ug3DMRKVg79Vc1yPVNvUJHvDJ6cy",
      treeConfig: "5F1dk877qiuuomwuZaYLNDrWmwf39mTVrBS844xure6b",
      backendSigner: "4YhAJxbcmh4PJunKywgyGpxbHi9oKfy4CfRXLvNXgtEZ",
      latestConfirmedTransaction:
        "22p3nCDbex6xWJwZgt4xhKjzJ6nQkmVtg7JM8MEDfUkAw6q4xZXxMKddBW1TUSSunqtYrp9FSaVV9vi7JTuo1jSV",
      explorer:
        "https://explorer.solana.com/tx/22p3nCDbex6xWJwZgt4xhKjzJ6nQkmVtg7JM8MEDfUkAw6q4xZXxMKddBW1TUSSunqtYrp9FSaVV9vi7JTuo1jSV?cluster=devnet",
    },

    supportedPayload: {
      lotId: "LIT-VALE-2026-001",
      mineral: "Lithium",
      origin: "Brazil",
      ownerWallet: "Solana public key from Phantom wallet",
    },

    currentMvp: {
      phantomWallet: true,
      apiMintRoute: true,
      backendFallback: true,
      realCnftMintProduction: true,
      protectedMintEndpoint: true,
      ownerWalletMintSupport: true,
      productionReadyMintIntegration: true,
    },

    nextSteps: [
      "Connect the frontend mint button to a safe backend flow",
      "Display the returned transaction signature and Explorer link in the UI",
      "Add a simple lot metadata page/API for each lotId",
      "Avoid exposing MINT_REAL_API_TOKEN in the browser",
    ],
  });
}
