"use client"
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSolanaWallet } from './SolanaWalletContext';
import { createNewUser, fetchUserData, updateUserData } from '@/supabase/Calls';
import { UserInfoType, UserInfoContextType } from '../types/interfaces';
import { useRouter, usePathname } from 'next/navigation';

const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined);

export function UserInfoProvider({ children }: { children: React.ReactNode }) {
  const { publicKey, isConnected } = useSolanaWallet();
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const getUserData = useCallback(async () => {
    if (!publicKey || !isConnected) {
      setUserInfo(null);
      return;
    }

    // Don't fetch if we already have the data for this wallet
    if (userInfo?.wallet_addr === publicKey) {
      return;
    }

    try {
      setIsLoading(true);
      let userData = await fetchUserData(publicKey);
      console.log("userData", userData);
      if (!userData) {
        userData = await createNewUser(publicKey);
      }
      setUserInfo(userData);

      // Only redirect if we're on the home page
      if (pathname === '/') {
        if (userData && userData.new_user) {
          router.push('/complete-profile');
        } else {
          router.push('/fund-proposals');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, isConnected, userInfo?.wallet_addr, router, pathname]);

  // Only fetch data when wallet connection status changes
  useEffect(() => {
    if (isConnected && publicKey) {
      getUserData();
    } else {
      setUserInfo(null);
    }
  }, [isConnected, publicKey]); // Removed getUserData from dependencies

  const updateUserInfo = async (newUserInfo: Partial<UserInfoType>) => {
    if (!publicKey || !isConnected) return;

    try {
      newUserInfo.new_user = false;
      const updatedUser = await updateUserData(publicKey, newUserInfo);
      setUserInfo(updatedUser);
      router.push('/fund-proposals');
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        getUserData,
        updateUserInfo,
        isLoading
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfo() {
  const context = useContext(UserInfoContext);
  if (context === undefined) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return context;
} 