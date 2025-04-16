"use client"
import { useSolanaWallet } from "../../Context/SolanaWalletContext";
import Navbar from '@/Components/Navbar';
import CompleteProfile from '@/Components/CompleteProfile';
import { UserInfoProvider, useUserInfo } from '../../Context/UserInfoContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


function CompleteProfileContent() {
  const { isConnected } = useSolanaWallet();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
      return;
    }

  },[isConnected])


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CompleteProfile />
      </main>
    </div>
  );
}

export default function CompleteProfilePage() {
  return (
    <UserInfoProvider>
      <CompleteProfileContent />
    </UserInfoProvider>
  );
} 