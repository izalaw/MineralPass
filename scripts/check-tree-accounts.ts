import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const merkleTree = new PublicKey("9KmgNsDFmottejP9ug3DMRKVg79Vc1yPVNvUJHvDJ6cy");
const treeConfig = new PublicKey("5F1dk877qiuuomwuZaYLNDrWmwf39mTVrBS844xure6b");

async function checkAccount(label: string, address: PublicKey) {
  const account = await connection.getAccountInfo(address);

  console.log("");
  console.log(label);
  console.log(address.toBase58());

  if (!account) {
    console.log("Account not found");
    return;
  }

  console.log("Exists: yes");
  console.log("Owner:", account.owner.toBase58());
  console.log("Lamports:", account.lamports);
  console.log("Data length:", account.data.length);
  console.log("Executable:", account.executable);
}

async function main() {
  await checkAccount("Merkle Tree", merkleTree);
  await checkAccount("Tree Config", treeConfig);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
