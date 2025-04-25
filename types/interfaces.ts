export interface UserInfoType {
    username: string;
    name: string;
    title: string;
    wallet_addr: string;
    bio?: string;
    avatar_url?: string;
    social_handles?: {
      twitter?: string;
      github?: string;
      website?: string;
    };
    previous_fundings: number;
    created_proposals: number;
    new_user: boolean;
  }

  export interface ProposalType {
    id: string;
    hex_id: string;
    title: string;
    description: string;
    amount_requested: number;
    amount_received: number;
    fully_funded: boolean;
    category: string;
    image_url: string;
    tags: string[];
    creator: UserInfoType;
  }