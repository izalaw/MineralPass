import { NextResponse } from "next/server";

type MintRequest = {
  company?: string;
  mineral?: string;
  origin?: string;
  volume?: string;
  lotId?: string;
  hash?: string;
  walletAddress?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as MintRequest;

    if (!body.walletAddress) {
      return NextResponse.json(
        {
          success: false,
          message: "Connect Phantom Wallet before issuing Mineral Pass.",
        },
        { status: 400 },
      );
    }

    const token = process.env.MINT_REAL_API_TOKEN;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Mint token is not configured on the server.",
        },
        { status: 500 },
      );
    }

    const origin =
      request.headers.get("origin") || "https://mineral-pass.vercel.app";

    const mintResponse = await fetch(`${origin}/api/mint-real`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        lotId: body.lotId || "LIT-VALE-2026-001",
        mineral: body.mineral || "Lithium",
        origin: body.origin || "Brazil",
        ownerWallet: body.walletAddress,
      }),
    });

    const mintData = await mintResponse.json();

    if (!mintResponse.ok || !mintData.success) {
      return NextResponse.json(
        {
          success: false,
          mode: "real-bubblegum-mint",
          message: mintData.message || "Real cNFT mint failed.",
        },
        { status: mintResponse.status || 500 },
      );
    }

    return NextResponse.json({
      success: true,
      mode: mintData.mode || "real-bubblegum-mint",
      assetId: mintData.transactionSignature,
      network: mintData.network || "solana-devnet",
      message: "Real Mineral Pass cNFT minted to owner wallet.",
      ownerWallet: mintData.ownerWallet,
      transactionSignature: mintData.transactionSignature,
      explorer: mintData.explorer,
      solanaProof: {
        status: "real-cnft-mint-executed",
        standard: "Metaplex Bubblegum cNFT",
        merkleTree: mintData.merkleTree,
        treeConfig: mintData.treeConfig,
        transaction: mintData.explorer,
      },
      metadata: {
        company: body.company,
        mineral: body.mineral,
        origin: body.origin,
        volume: body.volume,
        lotId: body.lotId,
        hash: body.hash,
        walletAddress: body.walletAddress,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to issue real Mineral Pass cNFT.",
      },
      { status: 500 },
    );
  }
}
