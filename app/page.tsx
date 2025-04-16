"use client"

import { useEffect } from 'react';
import { useSolanaWallet } from "@/Context/SolanaWalletContext";
import { UserInfoProvider, useUserInfo } from '@/Context/UserInfoContext';

import Navbar from '@/Components/Navbar';

function HomeContent() {
  const { publicKey, isConnected } = useSolanaWallet();
  const { userInfo, getUserData } = useUserInfo();

  useEffect(()=>{
    if(!isConnected) return;
    const fetchUserData = async () => {
      await getUserData();
    }
    if(!userInfo){
      fetchUserData();
    }
  },[isConnected, publicKey, userInfo])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      </main>
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
