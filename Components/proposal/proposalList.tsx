"use client"
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

interface ProposalListProps {
  proposals: Proposal[];
}

const ProposalList: React.FC<ProposalListProps> = ({ proposals }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Creator</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Deadline</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {proposals.map((proposal) => {
            const fundingPercentage = calculateFundingPercentage(proposal.fundingDetails.fundingReceived, proposal.fundingDetails.fundingGoal);
            const isUrgent = isDeadlineUrgent(proposal.fundingDetails.fundingDeadline.toString());
            
            return (
              <tr 
                key={proposal.id} 
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4">
                  <Link href={`/proposal/${proposal.id}`} className="block">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden bg-gray-100 mr-3 hidden sm:block">
                        {proposal.proposalDetails.coverImageUrl ? (
                          <img src={proposal.proposalDetails.coverImageUrl} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{truncateText(proposal.proposalDetails.proposalTitle, 50)}</div>
                        <div className="text-gray-500 text-sm hidden sm:block">{truncateText(proposal.proposalDetails.detailedDescription, 60)}</div>
                      </div>
                    </div>
                  </Link>
                </td>

                <td className="px-4 py-4 hidden md:table-cell">
                  <span className="inline-block bg-purple-50 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
                    {proposal.proposalDetails.category}
                  </span>
                </td>

                <td className="px-4 py-4 hidden lg:table-cell">
                  <div className="flex items-center text-sm text-gray-500">
                    <User size={14} className="mr-1" />
                    <span>{proposal.walletAddress}</span>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className="w-full max-w-xs">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-[#14F195] h-2 rounded-full" 
                            style={{ width: `${fundingPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {fundingPercentage}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatSol(proposal.fundingDetails.fundingReceived)} of {formatSol(proposal.fundingDetails.fundingGoal)}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 hidden sm:table-cell">
                  <span className={`${isUrgent ? 'text-amber-500 font-medium' : 'text-gray-500'} text-sm flex items-center`}>
                    <Clock size={14} className="mr-1" />
                    {formatTimeRemaining(proposal.fundingDetails.fundingDeadline.toString())}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalList;