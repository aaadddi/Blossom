import { User } from "@/types";
import SupabaseClient from "./SupabaseClient";

export const getIsOnboarded = async (publicKey: string) => {
    const { data, error } = await SupabaseClient.from('users').select('*').eq('walletAddress', publicKey).select().single();
    return data ? true : false;
}

export const getUser = async (publicKey: string) => {
    const { data, error } = await SupabaseClient.from('users').select('*').eq('walletAddress', publicKey).select().single();
    return data as User;
}

export const getUserByUsername = async (username: string) => {
  const { data, error } = await SupabaseClient.from('users').select('*').eq('username', username).select().single();
  return data as User;
}

export const completeOnboarding = async (user: User) => {
  const { data, error } = await SupabaseClient.from('users').insert(user).select().single();
  if (error) {
    console.error('Error completing onboarding:', error);
    throw error;
  }
  return data;
}

export const usernameExists = async (username: string) => {
  const { data, error } = await SupabaseClient.from('users').select('username').eq('username', username).select().single();
  return data ? true : false;
}



// export const fetchUserData = async (publicKey: string) => {
//     let { data, error } = await SupabaseClient.from('users').select('*').eq('wallet_address', publicKey).select().single();
//     if (error) {
//         console.error('Error fetching user:', error)
//         return null;
//     }
//     return data as UserInfoType;
// }

// export const createNewUser = async (publicKey: string) =>{
//     const {data, error} = await SupabaseClient.from('users').insert([{
//         wallet_address: publicKey
//     }]).select().single();
//     if (error) {
//         console.error('Error inserting user:', error)
//         return null;
//       } 
//       return data as UserInfoType;
// }

// export const updateUserData = async (publicKey: string, profile: Partial<UserInfoType>) => {
//     const { data, error } = await SupabaseClient
//         .from('users')
//         .update(profile)
//         .eq('wallet_addr', publicKey)
//         .select().single();
//     if (error) {
//         console.error('Error updating user profile:', error);
//         throw error;
//     }
//     return data as UserInfoType;
// }   

// export const fetchProposals = async () => {
//     try {
//       const { data, error } = await SupabaseClient
//         .from('proposals')
//         .select(`
//           *,
//           creator:users(*)
//         `)
//         .order('created_at', { ascending: false });
  
//       if (error) {
//         throw error;
//       }
  
//       return data;
//     } catch (error) {
//       console.error('Error fetching proposals:', error);
//       return [];
//     }
//   }; 