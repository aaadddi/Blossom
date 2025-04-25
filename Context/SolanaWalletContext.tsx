"use client"
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useConnection, useWallet, ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import "@solana/wallet-adapter-react-ui/styles.css";

export interface SolanaWalletContextType {
  publicKey: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  isConnected: boolean;
}

const SolanaWalletContext = createContext<SolanaWalletContextType | undefined>(undefined);

// Separate component for wallet state management
const WalletStateManager = ({ children }: { children: React.ReactNode }) => {
  const { connection } = useConnection();
  const { wallet, disconnect, connected } = useWallet();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const updateWalletInfo = async () => {
      if (wallet?.adapter?.publicKey) {
        const address = wallet.adapter.publicKey.toString();
        setWalletAddress(address);
        setIsConnected(true);
      } else {
        setWalletAddress(null);
        setIsConnected(false);
      }
    };

    updateWalletInfo();
  }, [wallet, connected]);

  useEffect(() => {
    setIsConnected(connected);
  }, [connected]);

  const disconnectWallet = async () => {
    try {
      await disconnect();
      setWalletAddress(null);
      setIsConnected(false);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const connectWallet = async () => {
    try {
      await wallet?.adapter?.connect();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <SolanaWalletContext.Provider
      value={{
        publicKey: wallet?.adapter?.publicKey?.toString() || null,
        connectWallet,
        disconnectWallet,
        isConnected: !!wallet?.adapter?.publicKey,
      }}
    >
      {children}
    </SolanaWalletContext.Provider>
  );
};

export const SolanaWalletProvider = ({ children }: { children: React.ReactNode }) => {
  const endpoint = clusterApiUrl("devnet");
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletStateManager>
            {children}
          </WalletStateManager>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const useSolanaWallet = () => {
  const context = useContext(SolanaWalletContext);
  if (context === undefined) {
    throw new Error('useSolanaWallet must be used within a SolanaWalletProvider');
  }
  return context;
}; 