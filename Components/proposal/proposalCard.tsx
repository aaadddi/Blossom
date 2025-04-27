import React from 'react';
import { Proposal } from '@/types'; 
import { 
  calculateFundingPercentage, 
  formatTimeRemaining, 
  isDeadlineUrgent,
  formatSol,
  truncateText
} from '@/lib/utils';
import { Clock, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
interface ProposalCardProps {
  proposal: Proposal;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  const fundingPercentage = calculateFundingPercentage(proposal.fundingDetails.fundingReceived, proposal.fundingDetails.fundingGoal);
  const isUrgent = isDeadlineUrgent(proposal.fundingDetails.fundingDeadline.toString());
  
  return (
    <Link 
      href={`/proposal/${proposal.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 block h-full"
    >
      <div className="flex flex-col h-full">
        {/* Card Image */}
        <div className="h-40 w-full rounded-t-lg bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
          {proposal.proposalDetails.coverImageUrl ? (
            <Image 
              src={proposal.proposalDetails.coverImageUrl} 
              alt={proposal.proposalDetails.proposalTitle} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-grow flex flex-col">
          {/* Category Tag */}
          <div className="flex justify-between items-center mb-2">
            <span className="inline-block bg-purple-50 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
              {proposal.proposalDetails.category}
            </span>
            <div className="flex items-center text-xs text-gray-500">
              <User size={12} className="mr-1" />
              <span>{proposal.walletAddress}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-gray-800 font-bold mb-2 line-clamp-2">
            {proposal.proposalDetails.proposalTitle}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {truncateText(proposal.proposalDetails.shortDescription, 120)}
          </p>

          {/* Funding Progress */}
          <div className="mt-auto">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-[#14F195] h-2 rounded-full" 
                style={{ width: `${fundingPercentage}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">
                {formatSol(proposal.fundingDetails.fundingReceived)} of {formatSol(proposal.fundingDetails.fundingGoal)}
              </span>
              <span className={`flex items-center ${isUrgent ? 'text-amber-500 font-medium' : 'text-gray-500'}`}>
                <Clock size={14} className="mr-1" />
                {formatTimeRemaining(proposal.fundingDetails.fundingDeadline.toString())}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProposalCard;