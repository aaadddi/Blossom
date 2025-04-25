"use client"

import Navbar from '@/Components/Navbar';
import { useState } from 'react';
import { useSolanaWallet } from "@/Context/SolanaWalletContext";
import { useUser } from '@/Context/UserContext';
import { User } from '@/types';
import { OnboardingModal } from '@/Components/onboarding-modal/OnboardingModal';
import { completeOnboarding } from '@/supabase/Calls';

function HomeContent() {
  


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
      <HomeContent />
  );
}
