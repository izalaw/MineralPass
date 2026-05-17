# Minas Pass

Passaporte blockchain para verificação de lotes minerais críticos brasileiros usando Solana cNFTs.

Demo pública: https://mineral-pass.vercel.app/

## Core

O Minas Pass tokeniza o certificado/verificação de um lote mineral como um cNFT na Solana.

Ele não tokeniza a propriedade econômica do mineral, não representa direito minerário, não é valor mobiliário e não substitui licenças, auditorias ou documentos regulatórios.

A proposta é simples: dados sensíveis ficam off-chain; certificado e prova de emissão ficam on-chain.

## Problema

Minerais críticos como lítio, nióbio, grafite, terras raras e cobalto são estratégicos para cadeias globais de energia, baterias, tecnologia e indústria.

Exportadores precisam demonstrar origem, documentação mínima, rastreabilidade e status técnico do lote.

Compradores, investidores e auditores precisam verificar o lote sem exigir que dados comerciais sensíveis, como preço, contrato, comprador, rota logística ou documentos privados, fiquem públicos.

## Solução

O Minas Pass cria um passaporte digital para lotes minerais.

Cada lote pode receber um certificado cNFT na Solana, com identificação do lote, URI pública de verificação, wallet dona do certificado, transação verificável no Solana Explorer, metadados mínimos do lote e documentos sensíveis mantidos off-chain.

## Status atual do MVP

Implementado:

- Aplicação Next.js publicada na Vercel.
- Phantom Wallet Connect.
- Interface de demo com lote mineral verificado.
- Rota `/api/mint`.
- Rota protegida `/api/mint-real`.
- Mint real de cNFT com Metaplex Bubblegum na Solana Devnet.
- Entrega do cNFT para a `ownerWallet` informada.
- Backend signer pagando e executando o mint.
- Proteção com `MINT_REAL_API_TOKEN`.
- `/technical-proof` atualizado.
- `/api/proof` atualizado.
- `/api/health` atualizado.
- Transação real verificável no Solana Explorer.

## Arquitetura atual

Usuário conecta Phantom → Frontend Next.js → `/api/mint` → backend protegido → `/api/mint-real` → Metaplex Bubblegum → cNFT na Solana Devnet → owner Phantom wallet → Solana Explorer.

## Fluxo blockchain

Lote mineral → metadados mínimos → certificado Minas Pass → mint cNFT via Bubblegum → entrega para `ownerWallet` → transação pública em Solana Devnet → verificação via Explorer.

## Por que Solana

Solana foi escolhida para o MVP porque o caso de uso pode exigir emissão de muitos certificados de baixo custo e alta velocidade para lotes, sublotes, remessas e eventos de verificação.

O Metaplex Bubblegum permite compressed NFTs, tornando o modelo mais adequado para emissão escalável de certificados do que NFTs tradicionais.

Solana não é a tese central do produto. A tese é certificação mineral verificável. Solana é a infraestrutura escolhida para este MVP.

## Demo lot

Empresa: Sertão Minerals  
Lot ID: LIT-VALE-2026-001  
Mineral: Lithium  
Origem: Vale do Jequitinhonha, Minas Gerais, Brazil  
Volume: 24 tons  
Network: Solana Devnet  
Standard: Metaplex Bubblegum cNFT

## Prova técnica

Technical proof: https://mineral-pass.vercel.app/technical-proof

Health API: https://mineral-pass.vercel.app/api/health

Proof API: https://mineral-pass.vercel.app/api/proof

## Última transação real confirmada

https://explorer.solana.com/tx/22p3nCDbex6xWJwZgt4xhKjzJ6nQkmVtg7JM8MEDfUkAw6q4xZXxMKddBW1TUSSunqtYrp9FSaVV9vi7JTuo1jSV?cluster=devnet

## Solana proof

Merkle Tree: 9KmgNsDFmottejP9ug3DMRKVg79Vc1yPVNvUJHvDJ6cy

Tree Config: 5F1dk877qiuuomwuZaYLNDrWmwf39mTVrBS844xure6b

Backend signer: 4YhAJxbcmh4PJunKywgyGpxbHi9oKfy4CfRXLvNXgtEZ

## APIs

### `/api/mint`

Rota chamada pelo frontend para iniciar a emissão do Minas Pass.

Ela mantém o token fora do navegador e encaminha a emissão para o backend protegido.

### `/api/mint-real`

Rota protegida que executa o mint real Bubblegum cNFT na Solana Devnet.

Requer `Authorization: Bearer`.

Não deve ser chamada diretamente pelo frontend público com token exposto.

### `/api/proof`

Retorna a prova técnica do projeto, incluindo arquitetura, Merkle Tree, Tree Config e transação confirmada.

### `/api/health`

Retorna status do app, backend, rede e modo de mint atual.

## Environment variables

Necessárias em produção:

- `DEVNET_WALLET_SECRET_KEY`
- `MINT_REAL_API_TOKEN`

Essas variáveis não devem ser expostas no frontend.

A wallet experimental local fica em `scripts/devnet-wallet.json`.

Esse arquivo deve permanecer protegido pelo `.gitignore`.

## Como rodar localmente

1. Clone o repositório.
2. Entre na pasta do projeto.
3. Rode `npm install`.
4. Rode `npm run dev`.
5. Abra `http://localhost:3000`.

## Fluxo da demo

1. Abrir https://mineral-pass.vercel.app/
2. Conectar Phantom Wallet.
3. Mostrar o lote demo verificado.
4. Clicar em “Issue Minas Pass cNFT”.
5. Mostrar owner wallet.
6. Mostrar transaction signature.
7. Abrir “View on Solana Explorer”.
8. Mostrar `/technical-proof`.
9. Mostrar `/api/proof`.
10. Mostrar `/api/health`.

## Limitações

O MVP não substitui licença minerária, licença ambiental, auditoria, laudo técnico, obrigação regulatória ou due diligence jurídica.

Ele adiciona uma camada blockchain de verificação para certificados de lotes minerais.

## Roadmap

Próximos passos:

- Exibir melhor o resultado do mint na UI.
- Criar metadata/API específica por `lotId`.
- Adicionar storage off-chain para documentos.
- Adicionar papéis de exportador, atestador e comprador.
- Adicionar expiração, revogação e disputa de atestações.
- Evoluir integração com bases regulatórias e certificadoras.

## Hackathon

Projeto criado para o Hackathon BH Onchain / Solana SuperteamBR.

Foco: infraestrutura de verificação para lotes minerais críticos brasileiros usando Solana cNFTs.
