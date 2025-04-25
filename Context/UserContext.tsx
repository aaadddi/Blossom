"use client"
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSolanaWallet } from './SolanaWalletContext';
import { User, UserContextType } from '@/types';

const UserProviderContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { publicKey, isConnected } = useSolanaWallet();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = (newUserInfo: User) => {
    if (!publicKey || !isConnected) return;
    setUser(newUserInfo);
  }

  return (
    <UserProviderContext.Provider
      value={{
        user,
        updateUser,
        isLoading
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserProviderContext);
  if (context === undefined) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return context;
} 