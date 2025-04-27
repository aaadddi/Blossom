import { Proposal, User } from "@/types";
import SupabaseClient from "./SupabaseClient";
import { FormData } from "@/types/newProposalForm";

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

export const submitProposal = async (formData: FormData) => {
  // Create a properly formatted proposal object from form data

  const defaultDeadline = new Date();
  defaultDeadline.setDate(defaultDeadline.getDate() + 90);

  const proposalData = {
    walletAddress: formData.fundingDetails.walletAddress,
    fundingGoal: formData.fundingDetails.fundingGoal ? parseFloat(formData.fundingDetails.fundingGoal) : 0,
    fundingDeadline: formData.fundingDetails.fundingDeadline 
      ? new Date(formData.fundingDetails.fundingDeadline).toISOString() 
      : defaultDeadline.toISOString(), // Default to current date if empty
    fullyFunded: false,
    fundingReceived: 0,
    isExpired: false,
    proposalTitle: formData.basicInfo.proposalTitle,
    shortDescription: formData.basicInfo.shortDescription,
    detailedDescription: formData.proposalInfo.detailedDescription,
    problemStatement: formData.proposalInfo.problemStatement,
    coverImageUrl: formData.proposalInfo.coverImageUrl || '', // Handle possible empty string
    category: formData.basicInfo.category,
    createdAt: new Date().toISOString(),
    tags: formData.proposalInfo.tags || [], // Handle possible undefined
    
    // Additional fields from the form that aren't in the original schema
    fundUsage: formData.proposalInfo.fundUsage,
    googleDriveLink: formData.supportingDocs.googleDriveLink,
    demoLink: formData.supportingDocs.demoLink,
  };
  // Insert data into the proposals table
  const { data, error } = await SupabaseClient.from('proposals').insert(proposalData).select().single();
  
  return data;
}