import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals ??= [];
    if (Array.isArray(config.externals)) {
      config.externals.push("pino-pretty", "lokijs", "encoding");
    }
    config.resolve ??= {};
    config.resolve.fallback ??= {};
    Object.assign(config.resolve.fallback, {
      "@react-native-async-storage/async-storage": false,
    });
    return config;
  },
};

export default nextConfig;
