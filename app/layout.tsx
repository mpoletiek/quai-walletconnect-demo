import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { AppKitProvider } from "@/config/AppKitProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quai Network WalletConnect Demo",
  description:
    "A demonstration of WalletConnect and Reown AppKit integration with Quai Network. Connect wallets, view balances, and send transactions.",
  openGraph: {
    title: "Quai Network WalletConnect Demo",
    description:
      "A demonstration of WalletConnect and Reown AppKit integration with Quai Network.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppKitProvider cookies={cookies}>{children}</AppKitProvider>
      </body>
    </html>
  );
}
