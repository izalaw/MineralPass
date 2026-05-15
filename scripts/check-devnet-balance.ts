import fs from "fs";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey } from "@metaplex-foundation/umi";

const walletPath = "scripts/devnet-wallet.json";
const walletFile = JSON.parse(fs.readFileSync(walletPath, "utf-8"));

async function main() {
  const umi = createUmi("https://api.devnet.solana.com");
  const balance = await umi.rpc.getBalance(publicKey(walletFile.publicKey));

  console.log("Wallet:");
  console.log(walletFile.publicKey);
  console.log("");
  console.log("Balance:");
  console.log(`${Number(balance.basisPoints) / 1_000_000_000} SOL devnet`);
}

main().catch((error) => {
  console.error("Failed to check balance:");
  console.error(error);
  process.exit(1);
});
