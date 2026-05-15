import fs from "fs";
import { generateSigner } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

const walletPath = "scripts/devnet-wallet.json";
const umi = createUmi("https://api.devnet.solana.com");

if (fs.existsSync(walletPath)) {
  console.log("Wallet already exists:");
  console.log(walletPath);
  process.exit(0);
}

const wallet = generateSigner(umi);

fs.writeFileSync(
  walletPath,
  JSON.stringify(
    {
      publicKey: wallet.publicKey,
      secretKey: Array.from(wallet.secretKey),
    },
    null,
    2,
  ),
);

console.log("Created devnet wallet:");
console.log(wallet.publicKey);
console.log("");
console.log("Saved at:");
console.log(walletPath);
console.log("");
console.log("This is only for devnet experiments. Do not use it for real funds.");
