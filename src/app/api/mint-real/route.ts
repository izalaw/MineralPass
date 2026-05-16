import fs from "fs";
import { NextResponse } from "next/server";
import bs58 from "bs58";
import {
  createSignerFromKeypair,
  none,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  mintV2,
  TokenStandard,
} from "@metaplex-foundation/mpl-bubblegum";

export const runtime = "nodejs";

const MERKLE_TREE = "9KmgNsDFmottejP9ug3DMRKVg79Vc1yPVNvUJHvDJ6cy";
const TREE_CONFIG = "5F1dk877qiuuomwuZaYLNDrWmwf39mTVrBS844xure6b";
const DEVNET_RPC = "https://api.devnet.solana.com";

function loadDevnetSecretKey() {
  const secretFromEnv = process.env.DEVNET_WALLET_SECRET_KEY;

  if (secretFromEnv) {
    return new Uint8Array(JSON.parse(secretFromEnv) as number[]);
  }

  const walletPath = "scripts/devnet-wallet.json";

  if (!fs.existsSync(walletPath)) {
    throw new Error(
      "Devnet wallet not found. Set DEVNET_WALLET_SECRET_KEY or create scripts/devnet-wallet.json.",
    );
  }

  const walletFile = JSON.parse(fs.readFileSync(walletPath, "utf-8"));
  return new Uint8Array(walletFile.secretKey as number[]);
}

export async function POST() {
  try {
    const umi = createUmi(DEVNET_RPC);

    const secretKey = loadDevnetSecretKey();
    const keypair = umi.eddsa.createKeypairFromSecretKey(secretKey);
    const signer = createSignerFromKeypair(umi, keypair);

    umi.use(signerIdentity(signer));

    const balance = await umi.rpc.getBalance(publicKey(signer.publicKey));

    const mintBuilder = await mintV2(umi, {
      leafOwner: signer.publicKey,
      leafDelegate: signer.publicKey,
      merkleTree: publicKey(MERKLE_TREE),
      treeConfig: publicKey(TREE_CONFIG),
      treeCreatorOrDelegate: signer,
      metadata: {
        name: "Mineral Pass 001",
        uri: "https://mineral-pass.vercel.app/lots/LIT-VALE-2026-001",
        sellerFeeBasisPoints: 0,
        collection: none(),
        creators: [
          {
            address: signer.publicKey,
            verified: false,
            share: 100,
          },
        ],
        primarySaleHappened: false,
        isMutable: true,
        tokenStandard: TokenStandard.NonFungible,
      },
    });

    const mintResult = await mintBuilder.sendAndConfirm(umi);
    const signature = bs58.encode(mintResult.signature);
    const explorer = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;

    return NextResponse.json({
      success: true,
      mode: "real-bubblegum-mint",
      network: "solana-devnet",
      standard: "Metaplex Bubblegum cNFT",
      signer: signer.publicKey,
      balanceBeforeMint: `${Number(balance.basisPoints) / 1_000_000_000} SOL devnet`,
      merkleTree: MERKLE_TREE,
      treeConfig: TREE_CONFIG,
      transactionSignature: signature,
      explorer,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        mode: "real-bubblegum-mint",
        message: error instanceof Error ? error.message : "Unknown mint error",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ready",
    route: "/api/mint-real",
    method: "POST",
    warning:
      "This endpoint executes a real Bubblegum cNFT mint on Solana Devnet when called with POST.",
  });
}
