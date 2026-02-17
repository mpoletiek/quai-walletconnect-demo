import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Web3ModalProvider } from "@/app/lib/w3config";

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
    "A demonstration of WalletConnect and Web3Modal integration with Quai Network. Connect wallets, view balances, and send transactions.",
  openGraph: {
    title: "Quai Network WalletConnect Demo",
    description:
      "A demonstration of WalletConnect and Web3Modal integration with Quai Network.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3ModalProvider>
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  );
}
