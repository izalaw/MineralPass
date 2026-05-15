import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { generateSigner, signerIdentity } from "@metaplex-foundation/umi";

async function main() {
  const umi = createUmi("https://api.devnet.solana.com");

  const wallet = generateSigner(umi);
  umi.use(signerIdentity(wallet));

  console.log("Devnet test wallet created:");
  console.log(wallet.publicKey);
  console.log("");
  console.log("This is an experimental wallet generated only for this script.");
  console.log("Next step: fund this address with devnet SOL from the Solana faucet.");
}

main().catch((error) => {
  console.error("Script failed:");
  console.error(error);
  process.exit(1);
});