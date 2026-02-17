import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve ??= {};
    config.resolve.fallback ??= {};
    Object.assign(config.resolve.fallback, {
      "@base-org/account": false,
      "@gemini-wallet/core": false,
      "@metamask/sdk": false,
      "@safe-global/safe-apps-sdk": false,
      "@safe-global/safe-apps-provider": false,
      porto: false,
      "porto/internal": false,
      "pino-pretty": false,
    });
    return config;
  },
  serverExternalPackages: ["pino", "thread-stream"],
};

export default nextConfig;
