import React from 'react';
import { ProposalCardProps } from '@/types';
import Image from 'next/image';

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  const progressPercentage = Math.min(
    Math.round((proposal.fundingDetails.fundingReceived / proposal.fundingDetails.fundingGoal) * 100), 
    100
  );
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
      <div className="relative h-40">
        <Image 
          src={proposal.proposalDetails.coverImageUrl || 'https://images.pexels.com/photos/12198535/pexels-photo-12198535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
          alt={proposal.proposalDetails.proposalTitle} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#333333] mb-2 line-clamp-1">{proposal.proposalDetails.proposalTitle}</h3>
        <p className="text-[#6B7280] mb-4 text-sm line-clamp-2">{proposal.proposalDetails.shortDescription}</p>
        
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[#6B7280]">Funded</span>
            <span className="font-medium text-[#333333]">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-[#F5F7FA] rounded-full h-2 overflow-hidden">
            <div 
              className="bg-[#14F195] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-[#333333]">
            {formatCurrency(proposal.fundingDetails.fundingReceived)}
          </span>
          <span className="text-[#6B7280]">
            of {formatCurrency(proposal.fundingDetails.fundingGoal)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;