'use client';

import { createConfig, http, WagmiProvider } from 'wagmi';
import { quai } from './quai';
import { walletConnect, injected } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';

// 1. Get Project ID
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
if (!projectId) throw new Error('Project ID is not set');

// 2. Create Wagmi config
const metadata = {
  name: 'My Web3 App',
  description: 'A Next.js application with WalletConnect',
  url: 'http://localhost:3001', // origin must match your domain
  icons: ['http://localhost:3001/favicon.ico'],
};

const chains = [quai] as const;
export const config = createConfig({
  chains,
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: true }),
    injected({ shimDisconnect: true }),
  ],
  transports: {
    [quai.id]: http(),
  },
});

// 3. Set up QueryClient
const queryClient = new QueryClient();

// 4. Set up Web3Modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false, // Optional
});

// 5. Create a Provider component
export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
