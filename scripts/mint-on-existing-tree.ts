import fs from "fs";
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
  TokenProgramVersion,
  TokenStandard,
} from "@metaplex-foundation/mpl-bubblegum";

const walletPath = "scripts/devnet-wallet.json";

async function main() {
  const umi = createUmi("https://api.devnet.solana.com");

  const walletFile = JSON.parse(fs.readFileSync(walletPath, "utf-8"));
  const keypair = umi.eddsa.createKeypairFromSecretKey(
    new Uint8Array(walletFile.secretKey),
  );
  const signer = createSignerFromKeypair(umi, keypair);

  umi.use(signerIdentity(signer));

  const merkleTree = publicKey("9KmgNsDFmottejP9ug3DMRKVg79Vc1yPVNvUJHvDJ6cy");
  const treeConfig = publicKey("5F1dk877qiuuomwuZaYLNDrWmwf39mTVrBS844xure6b");

  console.log("Using devnet wallet:");
  console.log(signer.publicKey);
  console.log("");

  console.log("Using existing Merkle Tree:");
  console.log(merkleTree);
  console.log("");

  console.log("Using existing Tree Config:");
  console.log(treeConfig);
  console.log("");

  const balance = await umi.rpc.getBalance(publicKey(signer.publicKey));
  console.log("Balance:");
  console.log(`${Number(balance.basisPoints) / 1_000_000_000} SOL devnet`);
  console.log("");

  console.log("Minting cNFT on existing Bubblegum tree...");

  const mintBuilder = await mintV2(umi, {
    leafOwner: signer.publicKey,
    leafDelegate: signer.publicKey,
    merkleTree,
    treeConfig,
    treeCreatorOrDelegate: signer,
    metadata: {
      name: "Mineral Pass - LIT-VALE-2026-001",
      uri: "https://mineral-pass.vercel.app",
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
      editionNonce: none(),
      tokenStandard: TokenStandard.NonFungible,
      uses: none(),
      tokenProgramVersion: TokenProgramVersion.Original,
    },
  });

  const mintResult = await mintBuilder.sendAndConfirm(umi);
  const signature = bs58.encode(mintResult.signature);

  console.log("cNFT mint transaction sent.");
  console.log("Mint signature:");
  console.log(signature);
  console.log("");

  console.log("Explorer:");
  console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  console.log("");

  console.log("Experimental cNFT mint completed.");
}

main().catch((error) => {
  console.error("Mint on existing tree failed:");
  console.error(error);
  process.exit(1);
});