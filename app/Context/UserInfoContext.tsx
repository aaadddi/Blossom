import { createContext, useContext, useEffect, useState } from 'react';
import { useSolanaWallet } from './SolanaWalletContext';
import SupabaseClient from '@/supabase/SupabaseClient';

interface UserInfoContextType {
  username: string | null;
  setUsername: (username: string) => void;
}

const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined);

export function UserInfoProvider({ children }: { children: React.ReactNode }) {
  const { walletAddress, isConnected } = useSolanaWallet();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsername = async () => {
      if (!isConnected || !walletAddress) {
        setUsername(null);
        return;
      }

      try {
        const { data, error } = await SupabaseClient
          .from('users')
          .select('username')
          .eq('wallet_addr', walletAddress)
          .single();

        if (error) {
          console.error('Error fetching username:', error);
          setUsername(null);
        } else {
          setUsername(data?.username || null);
        }
      } catch (err) {
        console.error('Error in fetchUsername:', err);
        setUsername(null);
      }
    };

    fetchUsername();
  }, [isConnected, walletAddress]);

  const updateUsername = async (newUsername: string) => {
    if (!walletAddress) return;
    
    try {
      const { data, error } = await SupabaseClient
        .from('users')
        .update({ username: newUsername })
        .eq('wallet_addr', walletAddress)
        .select()
        .single();

      if (error) {
        console.error('Error updating username:', error);
        throw error;
      }

      setUsername(data.username);
    } catch (err) {
      console.error('Error in updateUsername:', err);
      throw err;
    }
  };

  return (
    <UserInfoContext.Provider value={{ username, setUsername: updateUsername }}>
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