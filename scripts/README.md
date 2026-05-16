# Scripts técnicos — Solana Devnet / Bubblegum

Esta pasta contém scripts experimentais usados para provar que o Mineral Pass consegue interagir diretamente com a Solana Devnet e com Metaplex Bubblegum, sem depender de serviço pago como Underdog.

O app principal publicado na Vercel usa uma rota `/api/mint` com backend fallback para manter a demo estável. Em paralelo, estes scripts demonstram a viabilidade técnica de mint real de cNFT em devnet.

---

## Prova real de mint cNFT

Transação real na Solana Devnet:

https://explorer.solana.com/tx/5eKTkFdcUSwfPbTdoLhuA9iYe4Xr4Cg3x8yM6amGFmwZ16bA4YfmdQhqNvcZ9f86UYecaCqz8RFwRZmv2dTg6ASf?cluster=devnet

---

## Contas criadas na Devnet

Merkle Tree:

9KmgNsDFmottejP9ug3DMRKVg79Vc1yPVNvUJHvDJ6cy

Tree Config:

5F1dk877qiuuomwuZaYLNDrWmwf39mTVrBS844xure6b

---

## Arquivos principais

create-devnet-wallet.ts

Cria uma wallet experimental para uso apenas em devnet. A chave privada gerada fica em `scripts/devnet-wallet.json`. Esse arquivo está no `.gitignore` e não deve ser enviado ao GitHub.

check-devnet-balance.ts

Consulta o saldo da wallet experimental na Solana Devnet.

Comando:

npm run devnet:balance

check-tree-accounts.ts

Verifica se a Merkle Tree e a Tree Config existem na Solana Devnet.

Comando:

npm run devnet:check-tree

mint-on-existing-tree.ts

Executa um mint experimental de cNFT usando uma Bubblegum Tree já criada.

Comando:

npm run devnet:mint

Observação: este comando executa uma nova transação real na devnet e consome um pouco de SOL devnet.

---

## Fluxo técnico validado

1. Criar wallet devnet experimental.
2. Financiar a wallet com SOL devnet via faucet.
3. Criar Bubblegum Merkle Tree.
4. Confirmar existência da Merkle Tree e Tree Config.
5. Executar `mintV2` com Metaplex Bubblegum.
6. Obter assinatura de transação real.
7. Verificar transação no Solana Explorer.

---

## Decisão de arquitetura

O app principal não depende do mint real para funcionar durante a apresentação. Ele usa:

Frontend Next.js
↓
Phantom Wallet Connect
↓
/api/mint
↓
Backend fallback
↓
Asset ID simulado + prova técnica Bubblegum

O experimento Bubblegum comprova que a próxima etapa técnica é viável:

Frontend Next.js
↓
/api/mint
↓
Metaplex Bubblegum
↓
Solana Devnet/Mainnet
↓
cNFT real

---

## Segurança

A wallet experimental é apenas para devnet.

Não usar essa wallet com fundos reais.

Não remover `scripts/devnet-wallet.json` do `.gitignore`.

---

## Status

- Phantom Wallet Connect no app: implementado
- `/api/mint`: implementado com backend fallback
- `/api/proof`: implementado
- Página `/technical-proof`: implementada
- Bubblegum Merkle Tree real: criada
- cNFT real em devnet: mintado
- Integração do mint real no fluxo principal: roadmap técnico imediato
