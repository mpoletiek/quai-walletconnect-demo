import { defineChain } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

export const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not set. Add NEXT_PUBLIC_WC_PROJECT_ID to .env.local");
}

export const quai = defineChain({
  id: 9,
  caipNetworkId: "eip155:9",
  chainNamespace: "eip155",
  name: "Quai Network",
  nativeCurrency: {
    decimals: 18,
    name: "Quai",
    symbol: "QUAI",
  },
  rpcUrls: {
    default: { http: ["https://rpc.quai.network/cyprus1/"] },
  },
  blockExplorers: {
    default: { name: "Quaiscan", url: "https://quaiscan.io" },
  },
});

export const networks = [quai];

export const wagmiAdapter = new WagmiAdapter({
  storage: undefined,
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
