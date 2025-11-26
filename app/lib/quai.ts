import { type Chain } from 'viem'

export const quai = {
  id: 9,
  name: 'Quai Network',
  nativeCurrency: { name: 'Quai', symbol: 'QUAI', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.quai.network/cyprus1/'] },
  },
  blockExplorers: {
    default: { name: 'Quaiscan', url: 'https://quaiscan.io' },
  },
  contracts: {},
} as const satisfies Chain