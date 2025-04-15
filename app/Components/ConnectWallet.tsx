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
      <div className="h-10 w-40 bg-gray-200 rounded-md animate-pulse" />
    );
  }

  return (
    <div className="flex items-center">
      <WalletMultiButton />
    </div>
  );
};

export default ConnectWallet;