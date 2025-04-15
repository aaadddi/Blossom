"use client"
import dynamic from 'next/dynamic';
import { useSolanaWallet } from "../Context/SolanaWalletContext";
import Navbar from '../Components/Navbar';
import FundProposals from '../Components/FundProposals';
import { UserInfoProvider } from '../Context/UserInfoContext';

// Dynamically import the ConnectWallet component with no SSR
const ConnectWallet = dynamic(
  () => import('../Components/ConnectWallet'),
  { ssr: false }
);

function FundProposalsContent() {
  const { isConnected } = useSolanaWallet();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isConnected ? (
          <FundProposals />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect your wallet to view proposals</h2>
            <ConnectWallet />
          </div>
        )}
      </main>
    </div>
  );
}

export default function FundProposalsPage() {
  return (
    <UserInfoProvider>
      <FundProposalsContent />
    </UserInfoProvider>
  );
} 