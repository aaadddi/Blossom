import SupabaseClient from "./SupabaseClient";

export const addNewUser = async (walletAddr: string) =>{
    const {data, error} = await SupabaseClient.from('users').insert([{
        wallet_addr: walletAddr
    }]).select();
    if (error) {
        console.error('Error inserting user:', error)
      } else {
        console.log('User added:', data)
      }
}
export const isNewUser = async (walletAddr: string) => {
    const { data, error } = await SupabaseClient.from('users').select('*').eq('wallet_addr', walletAddr);
    if (error) {
        console.error('Error fetching user:', error)
    } 
    else if (data.length > 0) {
      console.log(data)
      return false;
    }
    else {
        addNewUser(walletAddr)
        return true;
    } 
}

export const updateUsername = async (walletAddr: string, username: string) => {
    const { data, error } = await SupabaseClient
        .from('users')
        .update({ username: username })
        .eq('wallet_addr', walletAddr)
        .select();
    
    if (error) {
        console.error('Error updating username:', error);
        throw error;
    }
    return data;
}