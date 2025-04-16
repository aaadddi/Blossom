import { UserInfoType } from "@/types/interfaces";
import SupabaseClient from "./SupabaseClient";

export const fetchUserData = async (publicKey: string) => {
    let { data, error } = await SupabaseClient.from('users').select('*').eq('wallet_addr', publicKey).select().single();
    if (error) {
        console.error('Error fetching user:', error)
        return null;
    }
    return data as UserInfoType;
}

export const createNewUser = async (publicKey: string) =>{
    const {data, error} = await SupabaseClient.from('users').insert([{
        wallet_addr: publicKey
    }]).select().single();
    if (error) {
        console.error('Error inserting user:', error)
        return null;
      } 
      return data as UserInfoType;
}

export const updateUserData = async (publicKey: string, profile: Partial<UserInfoType>) => {
    const { data, error } = await SupabaseClient
        .from('users')
        .update(profile)
        .eq('wallet_addr', publicKey)
        .select().single();
    if (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
    return data as UserInfoType;
}   

export const fetchProposals = async () => {
    try {
      const { data, error } = await SupabaseClient
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Error fetching proposals:', error);
      return [];
    }
  }; 