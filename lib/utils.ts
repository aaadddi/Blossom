import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatMonthYear = (dateString: string) => {
  return new Date(dateString).toLocaleString('default', { month: 'long', year: 'numeric' });
};

import { User, Proposal } from '@/types';

export const mockUser: User = {
  id: '1',
  username: 'alexrivera',
  name: 'Alex Rivera',
  walletAddress: '8xzt4NLnX9D5mJq7Mns2PAFj29P',
  profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
  bio: 'Fullstack developer passionate about web3 and decentralized applications. Building the future of finance on Solana.',
  professionTitle: 'Senior Blockchain Developer',
  joinedDate: 'May 2023',
  totalFundingReceived: 245000,
  proposalsCreated: 8,
  socialLinks: {
    github: 'https://github.com/alexrivera',
    twitter: 'https://twitter.com/alexrivera',
    linkedin: 'https://linkedin.com/in/alexrivera',
    website: 'https://alexrivera.dev',
    discord: 'alexrivera#1234'
  }
};

export const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Decentralized Identity Verification',
    description: 'A Solana-based solution for secure, private identity verification without centralized authorities.',
    imageUrl: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=600',
    amountRequested: 100000,
    amountReceived: 78500,
    createdAt: 'June 15, 2023',
    fullyFunded: true,
    category: 'Identity Verification',
    tags: ['Identity Verification', 'Decentralized', 'Solana'],
    creator: {
      username: 'alexrivera',
      bio: 'Fullstack developer passionate about web3 and decentralized applications. Building the future of finance on Solana.',
      social_handles: {
        twitter: 'https://twitter.com/alexrivera',
        github: 'https://github.com/alexrivera',
        website: 'https://alexrivera.dev'
      },
      previousFundings: 5
    }
  },
  {
    id: '2',
    title: 'P2P Lending Protocol',
    description: 'Enable peer-to-peer lending with automatic interest payments and collateral management.',
    imageUrl: 'https://images.pexels.com/photos/7876439/pexels-photo-7876439.jpeg?auto=compress&cs=tinysrgb&w=600',
    amountRequested: 150000,
    amountReceived: 96500,
    createdAt: 'August 3, 2023',
    fullyFunded: false,
    category: 'Lending',
    tags: ['Lending', 'DeFi', 'Solana'],
    creator: {
      username: 'alexrivera',
      bio: 'Fullstack developer passionate about web3 and decentralized applications. Building the future of finance on Solana.',
      social_handles: {
        twitter: 'https://twitter.com/alexrivera',
        github: 'https://github.com/alexrivera',
        website: 'https://alexrivera.dev'
      },
      previousFundings: 5
    }
  },
  {
    id: '3',
    title: 'NFT Marketplace for Digital Artists',
    description: 'Supporting digital creators with a low-fee NFT marketplace built on Solana.',
    imageUrl: 'https://images.pexels.com/photos/2882566/pexels-photo-2882566.jpeg?auto=compress&cs=tinysrgb&w=600',
    amountRequested: 80000,
    amountReceived: 32000,
    createdAt: 'October 12, 2023',
    fullyFunded: false,
    category: 'NFT Marketplace',
    tags: ['NFT Marketplace', 'DeFi', 'Solana'],
    creator: {
      username: 'alexrivera',
      bio: 'Fullstack developer passionate about web3 and decentralized applications. Building the future of finance on Solana.',
      social_handles: {
        twitter: 'https://twitter.com/alexrivera',
        github: 'https://github.com/alexrivera',
        website: 'https://alexrivera.dev'
      },
      previousFundings: 5,
    } 
  },
  {
    id: '4',
    title: 'DeFi Analytics Dashboard',
    description: 'Real-time analytics for DeFi protocols with customizable alerts and portfolio tracking.',
    imageUrl: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=600',
    amountRequested: 120000,
    amountReceived: 38000,
    createdAt: 'December 5, 2023',
    fullyFunded: false,
    category: 'Analytics',
    tags: ['Analytics', 'DeFi', 'Solana'],
    creator: {
      username: 'alexrivera',
      bio: 'Fullstack developer passionate about web3 and decentralized applications. Building the future of finance on Solana.',
      social_handles: {
        twitter: 'https://twitter.com/alexrivera',
        github: 'https://github.com/alexrivera',
        website: 'https://alexrivera.dev'
      },
      previousFundings: 5
    }
  }
];