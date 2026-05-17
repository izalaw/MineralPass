# Minas Pass

Minas Pass is a blockchain verification layer for mineral lot certificates.

The MVP issues a real Solana compressed NFT certificate for a mineral lot using Metaplex Bubblegum on Solana Devnet. The cNFT can be delivered to the connected Phantom wallet, while the backend signer pays and executes the mint.

## Live app

https://mineral-pass.vercel.app

## Technical proof

https://mineral-pass.vercel.app/technical-proof

## APIs

- Health: https://mineral-pass.vercel.app/api/health
- Proof: https://mineral-pass.vercel.app/api/proof
- Mint route: `/api/mint`
- Protected real mint route: `/api/mint-real`

## Core concept

Minas Pass does not tokenize mineral ownership.

It tokenizes the verification certificate of a mineral lot as a Solana cNFT.

The model is:

```text
Mineral lot
↓
Minimal lot metadata
↓
Protected backend mint
↓
Metaplex Bubblegum cNFT
↓
Owner Phantom wallet
↓
Solana Devnet transaction
↓
Explorer verification

