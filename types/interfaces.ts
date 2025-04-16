export interface UserInfoType {
    username: string;
    name: string;
    title: string;
    wallet_addr: string;
    bio?: string;
    social_handles?: {
      twitter?: string;
      github?: string;
      website?: string;
    };
    previous_fundings: number;
    created_proposals: number;
    new_user: boolean;
  }

export interface UserInfoContextType {
    userInfo: UserInfoType | null;
    getUserData: () => Promise<void>;
    updateUserInfo: (newUserInfo: Partial<UserInfoType>) => Promise<void>;
    isLoading: boolean;
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