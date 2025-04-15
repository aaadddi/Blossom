"use client"

import dynamic from 'next/dynamic';
import { useSolanaWallet } from "./Context/SolanaWalletContext";
import Navbar from './Components/Navbar';
import { useEffect, useState } from 'react';
import { isNewUser } from '@/supabase/Calls';
import UsernameModal from './Components/UsernameModal';
import { UserInfoProvider } from './Context/UserInfoContext';

// Dynamically import the ConnectWallet component with no SSR
const ConnectWallet = dynamic(
  () => import('./Components/ConnectWallet'),
  { ssr: false }
);

function HomeContent() {
  const { walletAddress, isConnected } = useSolanaWallet();
  const [newUserA, setNewUser] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);

  useEffect(()=>{
    if(!isConnected) return;
    
    const checkNewUser = async () =>{
      if(walletAddress){
        const isNew = await isNewUser(walletAddress);
        setNewUser(isNew ?? false);
        if (isNew) {
          setShowUsernameModal(true);
        }
      }
    }
    
    checkNewUser();
  },[isConnected, walletAddress])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {newUserA}
        {/* Main content will go here */}
      </main>
      <UsernameModal
        isOpen={showUsernameModal}
        onClose={() => setShowUsernameModal(false)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <UserInfoProvider>
      <HomeContent />
    </UserInfoProvider>
  );
}
