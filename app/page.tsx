'use client';

import { useState, useEffect } from 'react';
import { useAccount, useBalance, useDisconnect, useSendTransaction } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { formatEther, parseEther } from 'viem';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => setMounted(true), []);

  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { sendTransaction, isPending, isSuccess, error } = useSendTransaction();

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900">
      <main className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
              WalletConnect Demo
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Connect your wallet using Web3Modal
            </p>
          </div>

          {/* Connection Status Card */}
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 mb-6 border border-zinc-200 dark:border-zinc-700">
            {!mounted || !isConnected ? (
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-zinc-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    No wallet connected
                  </p>
                </div>
                <button
                  onClick={() => open()}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Connected Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      Connected
                    </span>
                  </div>
                  <button
                    onClick={() => disconnect()}
                    className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>

                {/* Wallet Address */}
                <div>
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                    Wallet Address
                  </label>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 bg-zinc-100 dark:bg-zinc-800 px-4 py-3 rounded-lg text-sm font-mono text-zinc-900 dark:text-zinc-50 break-all">
                      {address}
                    </code>
                    <button
                      onClick={() => navigator.clipboard.writeText(address || '')}
                      className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                      title="Copy address"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {formatAddress(address)}
                  </p>
                </div>

                {/* Balance */}
                <div>
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                    Balance
                  </label>
                  <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-3 rounded-lg">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        {balance
                          ? parseFloat(formatEther(balance.value)).toFixed(4)
                          : '0.0000'}
                      </span>
                      <span className="text-lg font-semibold text-zinc-600 dark:text-zinc-400">
                        {balance?.symbol || 'QUAI'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Send Transaction */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">
                    Send QUAI (Transaction Test)
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Recipient address (0x...)"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Amount (QUAI)"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => {
                        if (!recipient || !amount) return;
                        sendTransaction(
                          {
                            to: recipient as `0x${string}`,
                            value: parseEther(amount),
                          },
                          {
                            onSuccess: () => {
                              setRecipient('');
                              setAmount('');
                            },
                          }
                        );
                      }}
                      disabled={!recipient || !amount || isPending}
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                    >
                      {isPending ? 'Confirm in wallet...' : 'Send QUAI'}
                    </button>
                  </div>
                  {isSuccess && (
                    <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                      Transaction sent successfully.
                    </p>
                  )}
                  {error && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {error.message}
                    </p>
                  )}
                </div>

                {/* Change Wallet Button */}
                <button
                  onClick={() => open({ view: 'Account' })}
                  className="w-full px-4 py-2 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-50 font-medium rounded-lg transition-colors duration-200"
                >
                  Change Wallet
                </button>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <p className="text-sm text-center text-zinc-500 dark:text-zinc-400">
              This is a demo application showcasing WalletConnect integration with Web3Modal
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
