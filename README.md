# Quai Network WalletConnect Demo

A demonstration application showcasing WalletConnect integration with Web3Modal for the Quai Network. This Next.js application provides a simple interface to connect wallets and display wallet information including address and QUAI balance.

## Purpose

This project demonstrates how to integrate WalletConnect and Web3Modal with the Quai Network, providing a reference implementation for developers building dApps on Quai Network.

## Features

- WalletConnect integration via Web3Modal
- Injected wallet connector support
- Display wallet address and QUAI balance
- Modern, responsive UI with dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A WalletConnect Project ID (get one at [dashboard.reown.com](https://dashboard.reown.com/))

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your WalletConnect Project ID:

```env
NEXT_PUBLIC_WC_PROJECT_ID=your_project_id_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Important Notes & Limitations

### Chain Support

- **WalletConnect**: WalletConnect has native support for the Quai Network chain.
- **Viem**: Viem does not include Quai Network in its default chain definitions. The Quai Network chain is manually defined in `app/lib/quai.ts` to work with wagmi/viem.

### Wallet Connectors

#### Injected Connector

The injected connector (for browser extension wallets like MetaMask) depends on the `eth_` namespace, which provides **read-only** access to the Quai Network blockchain. This means:
- ✅ You can read wallet addresses, balances, and chain information
- ❌ You **cannot** send transactions or interact with smart contracts through the injected connector

#### WalletConnect Connector

- ✅ Full read and write capabilities
- ❌ **Pelagus wallet is not currently supported** out of the box with WalletConnect
- 🔜 **Future support**: WalletConnect QR code scanning is coming to Blip (Quai Network's mobile wallet)

### Current Wallet Support

- **WalletConnect**: Works with wallets that support WalletConnect protocol
- **Injected**: Works with browser extension wallets (read-only on Quai Network)
- **Pelagus**: Not currently supported via WalletConnect
- **Blip**: QR code scanning support coming soon

## Project Structure

- `app/lib/w3config.tsx` - Wagmi and Web3Modal configuration
- `app/lib/quai.ts` - Quai Network chain definition for viem
- `app/page.tsx` - Main demo page with wallet connection UI
- `app/layout.tsx` - Root layout with Web3Modal provider

## Technologies Used

- [Next.js](https://nextjs.org) - React framework
- [wagmi](https://wagmi.sh) - React Hooks for Ethereum
- [viem](https://viem.sh) - TypeScript Ethereum library
- [Web3Modal](https://web3modal.com) - Wallet connection UI
- [WalletConnect](https://walletconnect.com) - Web3 wallet connection protocol
- [Tailwind CSS](https://tailwindcss.com) - Styling

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [wagmi Documentation](https://wagmi.sh)
- [Web3Modal Documentation](https://docs.walletconnect.com/web3modal)
- [Quai Network](https://quai.network)

## License

This project is a demo application for educational purposes.
