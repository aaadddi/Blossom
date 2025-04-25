import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { ProposalsListProps } from '@/types';
import ProposalCard from './ProposalCard';
import Link from 'next/link';

const ProposalsList: React.FC<ProposalsListProps> = ({ 
  proposals, 
  isOwner, 
}) => {
  const [sortOption, setSortOption] = useState('newest');
  
  const getSortedProposals = () => {
    switch (sortOption) {
      case 'newest':
        return [...proposals].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'oldest':
        return [...proposals].sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case 'most-funded':
        return [...proposals].sort((a, b) => b.amountReceived - a.amountReceived);
      case 'least-funded':
        return [...proposals].sort((a, b) => a.amountReceived - b.amountReceived);
      default:
        return proposals;
    }
  };

  const sortedProposals = getSortedProposals();
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#333333]">My Proposals</h2>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white border border-[#E5E7EB] rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#9945FF]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most-funded">Most Funded</option>
              <option value="least-funded">Least Funded</option>
            </select>
            <Filter size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isOwner && (
          <button
            className="flex flex-col items-center justify-center h-full min-h-[240px] bg-[#F5F7FA] border-2 border-dashed border-[#E5E7EB] rounded-lg p-6 hover:border-[#9945FF] hover:bg-white transition-colors"
          >
        <Link href="/new-proposal" className="mr-2">
            <div className="w-12 h-12 rounded-full bg-[#9945FF] bg-opacity-10 flex items-center justify-center mb-3">
              <Plus size={24} className="text-[#9945FF]" />
            </div>
            <span className="text-[#333333] font-medium">Create New Proposal</span>
        </Link>
          </button>
        )}

        { sortedProposals.length > 0 ? (
          sortedProposals.map(proposal => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No proposals found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalsList;