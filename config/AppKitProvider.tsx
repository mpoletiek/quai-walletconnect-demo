"use client";

import { wagmiAdapter, projectId, quai } from "./index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

const queryClient = new QueryClient();

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const metadata = {
  name: "Quai Network WalletConnect Demo",
  description: "WalletConnect and AppKit integration demo for Quai Network",
  url: appUrl,
  icons: [`${appUrl}/favicon.ico`],
};

createAppKit({
  adapters: [wagmiAdapter],
  projectId: projectId!,
  networks: [quai],
  defaultNetwork: quai,
  metadata,
  features: {
    analytics: false,
  },
});

export function AppKitProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
