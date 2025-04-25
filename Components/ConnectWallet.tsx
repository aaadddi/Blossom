"use client"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-40 bg-solana-100 rounded-md animate-pulse" />
    );
  }

  return (
    <div className="flex items-center">
      <style jsx global>{`
        .wallet-adapter-button {
          background-color: #8b5cf6 !important;
          color: white !important;
          border-radius: 0.375rem !important;
          padding: 0.5rem 1rem !important;
          font-weight: 500 !important;
          transition: background-color 0.2s !important;
        }
        .wallet-adapter-button:hover {
          background-color: #7c3aed !important;
        }
      `}</style>
      <WalletMultiButton />
    </div>
  );
};

export default ConnectWallet;