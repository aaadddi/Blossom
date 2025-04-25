


export interface FundProposalFormData {
  amount: string;
  message?: string;
  proposalId: string;
}

export interface UserFormData {
  username: string;
  name: string;
  bio?: string;
  social_handles?: {
    twitter?: string;
    github?: string;
    website?: string;
  };
} 
