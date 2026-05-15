# Mineral Pass

Passaporte digital de conformidade para minerais críticos brasileiros usando Solana cNFTs.

Demo pública: https://mineral-pass.vercel.app/

## Problema

Minerais críticos como lítio, nióbio, grafite, terras raras e cobalto são estratégicos para cadeias globais de energia, baterias e tecnologia.

Exportadores brasileiros precisam comprovar origem, regularidade regulatória, documentação ambiental, conformidade trabalhista e rastreabilidade da cadeia de custódia.

Ao mesmo tempo, compradores internacionais precisam fazer due diligence sem que o exportador exponha segredos comerciais como preço, contrato, comprador, rota logística e documentos privados.

## Solução

O Mineral Pass cria um passaporte digital de conformidade para cada lote mineral.

A proposta é representar cada lote por um cNFT em Solana, registrando metadados públicos e hashes verificáveis, enquanto documentos sensíveis permanecem off-chain com acesso controlado.

Ideia central:

Dados sensíveis off-chain. Prova verificável on-chain.

## Status atual do MVP

O MVP atual é um protótipo funcional publicado na Vercel.

Implementado:

- aplicação em Next.js;
- formulário de criação de lote mineral;
- emissão simulada de Mineral Pass;
- geração simulada de Asset ID cNFT;
- geração de hash a partir dos dados do lote;
- checklist de conformidade;
- status automático: Missing attestation ou Export-ready;
- acesso seletivo a documento usando código;
- deploy público na Vercel;
- repositório privado no GitHub para jurados.

Código de demonstração:

MINERAL2026

Limitação atual:

O MVP ainda não minta um cNFT real em Solana. O Asset ID cNFT exibido é simulado para demonstrar o fluxo do produto. A emissão real de cNFT em Solana está no roadmap técnico imediato.

## Por que Solana

Solana é adequada para esse caso porque permite:

- emissão em escala;
- baixo custo por registro;
- verificação rápida;
- auditabilidade pública;
- uso de compressed NFTs;
- infraestrutura escalável para registros de ativos.

## Arquitetura atual

Usuário
↓
Front-end Next.js
↓
Formulário do lote mineral
↓
Geração de hash
↓
Asset ID cNFT simulado
↓
Checklist de conformidade
↓
Interface pública de verificação

## Arquitetura alvo

Exportador
↓
Front-end Next.js
↓
API Route segura
↓
Underdog ou integração Solana para mint de cNFT
↓
Solana devnet/mainnet
↓
Asset ID real + hash de metadata
↓
Interface de verificação para comprador

## Modelo de conformidade

O Mineral Pass não representa direito minerário, participação societária, valor mobiliário ou propriedade do subsolo.

Ele representa um passaporte digital de conformidade vinculado ao output de um lote mineral.

O passaporte pode incluir:

- origem declarada;
- regularidade relacionada à ANM;
- documentação ambiental;
- conformidade trabalhista;
- futuras atestações de carbono e ESG.

## Roadmap

### MVP do Hackathon

- protótipo interativo;
- criação de lote;
- checklist de conformidade;
- Asset ID cNFT simulado;
- verificação por hash;
- demo pública na Vercel.

### Técnico v1

- conexão com Phantom Wallet;
- integração real com Solana devnet;
- mint real de cNFT;
- API route segura;
- retorno de Asset ID real para a interface;
- integração com storage de documentos.

### Produção v1

- documentos off-chain cifrados;
- perfis de exportador, atestador e comprador;
- expiração e revogação de atestações;
- trilha de auditoria;
- integração com certificadoras.

### Produção v2

- integração com bases regulatórias públicas;
- dashboards institucionais;
- eventos de cadeia de custódia;
- integração com ERP e logística;
- fluxos formais de disputa e revogação.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel
- Solana cNFTs planejados
- Phantom Wallet planejada
- Underdog planejado

## Como rodar localmente

git clone https://github.com/izalaw/MineralPass.git

cd MineralPass

npm install

npm run dev

Abrir:

http://localhost:3000

## Fluxo da demo

1. Abrir a demo pública.
2. Clicar em "Emitir Mineral Pass".
3. Ver o Asset ID cNFT simulado.
4. Alterar as atestações para "Valid".
5. Confirmar que o status muda para "Export-ready".
6. Inserir o código MINERAL2026.
7. Liberar o documento mockado de due diligence.

## Hackathon

Projeto criado para o Hackathon BH Onchain / Solana SuperteamBR.

Foco:

Infraestrutura de conformidade para exportação de minerais críticos brasileiros usando verificação de ativos em Solana.

---

## Experimento técnico: mint real de cNFT na Solana Devnet

Além do MVP publicado, o projeto inclui um experimento técnico separado usando Metaplex Bubblegum para criar e mintar cNFTs diretamente na Solana Devnet, sem depender de serviço pago como Underdog.

Esse experimento é isolado do app principal para não comprometer a estabilidade da demo pública.

### O que foi implementado

- criação de wallet experimental para devnet;
- funding com SOL devnet via faucet;
- criação de Bubblegum Merkle Tree real;
- criação de Tree Config real;
- execução de mint real usando `mintV2`;
- geração de transação verificável no Solana Explorer.

### Transação de mint real

Explorer:

https://explorer.solana.com/tx/5eKTkFdcUSwfPbTdoLhuA9iYe4Xr4Cg3x8yM6amGFmwZ16bA4YfmdQhqNvcZ9f86UYecaCqz8RFwRZmv2dTg6ASf?cluster=devnet

### Arquivos técnicos relacionados

- `scripts/create-devnet-wallet.ts`
- `scripts/check-devnet-balance.ts`
- `scripts/check-tree-accounts.ts`
- `scripts/mint-on-existing-tree.ts`
- `scripts/mint-cnft-bubblegum-test.ts`
- `scripts/mint-cnft-bubblegum-v2-test.ts`

A chave da wallet experimental fica em `scripts/devnet-wallet.json` e está protegida pelo `.gitignore`, portanto não é enviada ao GitHub.

### Decisão técnica

O app principal mantém uma rota `/api/mint` com fallback de Asset ID simulado para garantir estabilidade da demo. O experimento Bubblegum comprova que o mint real de cNFT na Solana Devnet é tecnicamente viável e pode ser integrado ao fluxo principal em uma próxima iteração.

