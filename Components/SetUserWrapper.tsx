'use client';

import { completeOnboarding, getUser } from '@/supabase/Calls';
import { getIsOnboarded } from '@/supabase/Calls';
import { useEffect, useState } from 'react';
import { useSolanaWallet } from '@/Context/SolanaWalletContext';
import { useUser } from '@/Context/UserContext';
import { User } from '@/types';
import OnboardingModal from './onboarding-modal/OnboardingModal';
export default function SetUserWrapper({ children }: { children: React.ReactNode }) {
  const {isConnected, publicKey} = useSolanaWallet();
  const [showModal, setShowModal] = useState(false);
  const { updateUser } = useUser();
  
  const handleOnboardingComplete = async (user: User) => {
    console.log('Onboarding completed with profile:', user);
    const res = await completeOnboarding(user);
    if(res) {
      setShowModal(false);
      updateUser(res);
      console.log('Onboarding completed with profile:', res);
    }
  };

  const handleSkip = () => {
    setShowModal(false);
    console.log('Onboarding skipped');
  };

  useEffect(()=>{
    if(!isConnected) {
      updateUser({} as User);
      return;
    }

    const checkIsOnboarded = async () => {
      const isOnboarded = await getIsOnboarded(publicKey || '');
      if(isOnboarded) {
        const user = await getUser(publicKey || '');
        if(user) {
          updateUser(user);
          return;
        }
      }
      setShowModal(true);
    }
    checkIsOnboarded();
  },[isConnected, publicKey, updateUser])

  return showModal ? <OnboardingModal
        isOpen={showModal}
        walletAddress={publicKey || ''}
        onComplete={handleOnboardingComplete}
        onSkip={handleSkip}
      /> : <>{children}</>;
}