"use client"
import { useParams } from 'next/navigation';
import { useSolanaWallet } from '@/Context/SolanaWalletContext';
import Navbar from '@/Components/Navbar';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Proposal {
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
  creator: {
    username: string;
    bio: string;
    social_handles: {
      twitter?: string;
      github?: string;
      website?: string;
    };
    previous_fundings: number;
  };
}

export default function ProposalDetail() {
  const { id } = useParams();
  const { publicKey, isConnected } = useSolanaWallet();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [fundAmount, setFundAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // TODO: Fetch proposal data from backend using the id
    // This is a mock implementation
    setProposal({
      id: '1',
      hex_id: id as string,
      title: 'Build a Solana NFT Marketplace',
      description: 'Creating a decentralized NFT marketplace on Solana with advanced features',
      amount_requested: 5000,
      amount_received: 2500,
      fully_funded: false,
      category: 'Development',
      image_url: 'https://picsum.photos/150',
      tags: ['NFT', 'Marketplace', 'Solana'],
      creator: {
        username: 'johndoe',
        bio: 'Blockchain developer with 5 years of experience in Solana development',
        social_handles: {
          twitter: '@johndoe',
          github: 'johndoe',
          website: 'johndoe.dev'
        },
        previous_fundings: 3
      }
    });
  }, [id]);

  const handleFund = async () => {
    // TODO: Implement funding logic
    console.log('Funding proposal:', {
      amount: fundAmount,
      message,
      proposalId: id
    });
  };

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    );
  }

  const progressPercentage = (proposal.amount_received / proposal.amount_requested) * 100;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Proposal Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{proposal.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-sm font-medium text-gray-500">Category: {proposal.category}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                proposal.fully_funded ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {proposal.fully_funded ? 'Fully Funded' : 'In Progress'}
              </span>
            </div>
            <div className="relative h-64 w-full mb-6">
              <img
                src={proposal.image_url}
                alt={proposal.title}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://picsum.photos/150';
                }}
              />
            </div>
          </div>

          {/* Funding Progress */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Funding Progress</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Raised: {proposal.amount_received} SOL</span>
                <span>Goal: {proposal.amount_requested} SOL</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Creator Info */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Creator</h2>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {proposal.creator.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-medium text-gray-800">{proposal.creator.username}</h3>
                  <Link
                    href={`/profile/${proposal.creator.username}`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View Profile
                  </Link>
                </div>
                <p className="text-gray-600 mt-1">{proposal.creator.bio}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Previous Fundings: {proposal.creator.previous_fundings}
                  </p>
                  <div className="flex space-x-4 mt-2">
                    {proposal.creator.social_handles.twitter && (
                      <a
                        href={`https://twitter.com/${proposal.creator.social_handles.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Twitter
                      </a>
                    )}
                    {proposal.creator.social_handles.github && (
                      <a
                        href={`https://github.com/${proposal.creator.social_handles.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        GitHub
                      </a>
                    )}
                    {proposal.creator.social_handles.website && (
                      <a
                        href={proposal.creator.social_handles.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Proposal Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">{proposal.description}</p>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {proposal.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Fund Form */}
          {isConnected && publicKey && !proposal.fully_funded && (
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Fund this Proposal</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount (SOL)</label>
                  <input
                    type="number"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message (Optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    placeholder="Add a message to the creator"
                  />
                </div>
                <button
                  onClick={handleFund}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Fund Proposal
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 