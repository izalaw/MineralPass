import fs from "fs";
import {
  createSignerFromKeypair,
  generateSigner,
  none,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createTree,
  fetchTreeConfig,
  findTreeConfigPda,
  mintV1,
  parseLeafFromMintV1Transaction,
  TokenProgramVersion,
} from "@metaplex-foundation/mpl-bubblegum";

const walletPath = "scripts/devnet-wallet.json";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const umi = createUmi("https://api.devnet.solana.com");

  const walletFile = JSON.parse(fs.readFileSync(walletPath, "utf-8"));
  const keypair = umi.eddsa.createKeypairFromSecretKey(
    new Uint8Array(walletFile.secretKey),
  );
  const signer = createSignerFromKeypair(umi, keypair);

  umi.use(signerIdentity(signer));

  console.log("Using devnet wallet:");
  console.log(signer.publicKey);
  console.log("");

  const balance = await umi.rpc.getBalance(publicKey(signer.publicKey));
  console.log("Balance:");
  console.log(`${Number(balance.basisPoints) / 1_000_000_000} SOL devnet`);
  console.log("");

  const merkleTree = generateSigner(umi);

  console.log("Creating Bubblegum Merkle Tree...");
  console.log("Merkle tree:");
  console.log(merkleTree.publicKey);
  console.log("");

  const createTreeBuilder = await createTree(umi, {
    merkleTree,
    maxDepth: 14,
    maxBufferSize: 64,
    canopyDepth: 0,
  });

  const createTreeResult = await createTreeBuilder.sendAndConfirm(umi);

  console.log("Tree created.");
  console.log("Create tree signature:");
  console.log(createTreeResult.signature);
  console.log("");

  const treeConfig = findTreeConfigPda(umi, {
    merkleTree: merkleTree.publicKey,
  });

  console.log("Tree config PDA:");
  console.log(treeConfig);
  console.log("");

  console.log("Waiting for devnet RPC to index the tree config...");
  await sleep(8000);

  console.log("Fetching tree config...");
  const fetchedTreeConfig = await fetchTreeConfig(umi, treeConfig);
  console.log("Fetched tree config:");
  console.log(fetchedTreeConfig);
  console.log("");

  console.log("Minting cNFT...");

  const mintBuilder = await mintV1(umi, {
    leafOwner: signer.publicKey,
    leafDelegate: signer.publicKey,
    merkleTree: merkleTree.publicKey,
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
      tokenStandard: none(),
      uses: none(),
      tokenProgramVersion: TokenProgramVersion.Original,
    },
  });

  const mintResult = await mintBuilder.sendAndConfirm(umi);

  console.log("cNFT mint transaction sent.");
  console.log("Mint signature:");
  console.log(mintResult.signature);
  console.log("");

  const leaf = await parseLeafFromMintV1Transaction(umi, mintResult.signature);

  console.log("Parsed Bubblegum leaf:");
  console.log(leaf);
  console.log("");

  console.log("Experimental cNFT mint completed.");
}

main().catch((error) => {
  console.error("Bubblegum mint experiment failed:");
  console.error(error);
  process.exit(1);
});