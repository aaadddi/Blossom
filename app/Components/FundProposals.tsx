"use client"
import { useState } from 'react';

const sampleProposals = [
  {
    id: '1',
    hex_id: 'abc123',
    title: 'Build a Solana NFT Marketplace',
    description: 'Creating a decentralized NFT marketplace on Solana with advanced features',
    amount_requested: 5000,
    amount_received: 2500,
    fully_funded: false,
    category: 'Development',
    image_url: 'https://via.placeholder.com/150',
    tags: ['NFT', 'Marketplace', 'Solana']
  },
  {
    id: '2',
    hex_id: 'def456',
    title: 'DeFi Protocol Development',
    description: 'Building a new DeFi protocol with yield farming capabilities',
    amount_requested: 10000,
    amount_received: 7500,
    fully_funded: false,
    category: 'DeFi',
    image_url: 'https://via.placeholder.com/150',
    tags: ['DeFi', 'Yield Farming', 'Protocol']
  },
  {
    id: '3',
    hex_id: 'ghi789',
    title: 'Solana Wallet Integration',
    description: 'Developing a new wallet interface with enhanced security features',
    amount_requested: 3000,
    amount_received: 3000,
    fully_funded: true,
    category: 'Wallet',
    image_url: 'https://via.placeholder.com/150',
    tags: ['Wallet', 'Security', 'UI/UX']
  },
  {
    id: '4',
    hex_id: 'jkl012',
    title: 'Blockchain Education Platform',
    description: 'Creating an educational platform for blockchain development',
    amount_requested: 8000,
    amount_received: 4000,
    fully_funded: false,
    category: 'Education',
    image_url: 'https://via.placeholder.com/150',
    tags: ['Education', 'Blockchain', 'Learning']
  }
];

const FundProposals = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Fund Proposals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProposals.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-lg shadow-md p-6">
            <img src={proposal.image_url} alt={proposal.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{proposal.title}</h3>
            <p className="text-gray-600 mb-4">{proposal.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-500">Category: {proposal.category}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                proposal.fully_funded ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {proposal.fully_funded ? 'Fully Funded' : 'In Progress'}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Requested:</span>
                <span className="font-medium">{proposal.amount_requested} SOL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Received:</span>
                <span className="font-medium">{proposal.amount_received} SOL</span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {proposal.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundProposals; 