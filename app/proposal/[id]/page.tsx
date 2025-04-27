"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockProposals } from '@/Components/proposal/mockData';
import { 
  calculateFundingPercentage, 
  formatTimeRemaining, 
  formatSol
} from '@/lib/utils';

import { 
  Calendar, 
  User as UserIcon, 
  ExternalLink, 
  FileText, 
  Tag,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { User } from '@/types';
import { getUser } from '@/supabase/Calls';
import Image from 'next/image';
const ProposalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const proposal = mockProposals.find(p => p.id === id);
  
  const [fundingAmount, setFundingAmount] = useState<number>(0);
  const [walletBalance] = useState<number>(10); // Mock wallet balance
  const [walletAddress] = useState<string>('5tGH...9Uvx'); // Mock connected wallet
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [creator, setCreator] = useState<User | null>(null);

  useEffect(() => {
    const fetchCreator = async () => {
      if (proposal?.walletAddress) {
        const creator = await getUser(proposal.walletAddress);
        setCreator(creator);
      }
    };
    fetchCreator();
  }, [proposal]);
  if (!proposal) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Proposal not found</h2>
        <Link href="/" className="text-[#9945FF] hover:text-purple-700">
          Return to proposals
        </Link>
      </div>
    );
  }
  
  const fundingPercentage = calculateFundingPercentage(proposal.fundingDetails.fundingReceived, proposal.fundingDetails.fundingGoal);
  const remainingToFund = proposal.fundingDetails.fundingGoal - proposal.fundingDetails.fundingReceived;
  
  const handleFund = () => {
    if (fundingAmount <= 0 || fundingAmount > walletBalance) return;
    
    setIsProcessing(true);
    
    // Simulate transaction
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="p-6">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to proposals
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Cover Image */}
            <div className="h-64 w-full rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden mb-6">
              {proposal.proposalDetails.coverImageUrl ? (
                <Image 
                  src={proposal.proposalDetails.coverImageUrl} 
                  alt={proposal.proposalDetails.proposalTitle} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
            
            {/* Title and Category */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-block bg-purple-50 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
                  {proposal.proposalDetails.category}
                </span>
                <div className="flex items-center text-gray-500">
                  <Calendar size={16} className="mr-1" />
                  <span>{formatTimeRemaining(proposal.fundingDetails.fundingDeadline.toString())}</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">{proposal.proposalDetails.proposalTitle}</h1>
            </div>
            
            {/* Creator */}
            <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <UserIcon size={24} className="text-gray-500" />
              </div>
              <div>
                {/* Fetch creator details from database using the creator wallet address using function getUser from supabse/Calls.ts*/}
                <div className="font-medium text-lg">{creator?.name}</div>
                <div className="text-gray-500">{creator?.walletAddress}</div>
              </div>
            </div>
            
            {/* Description */}
            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 mb-6">{proposal.proposalDetails.detailedDescription}</p>
              
              {proposal.proposalDetails.problemStatement && (
                <>
                  <h2 className="text-xl font-semibold mb-3">Problem Statement</h2>
                  <p className="text-gray-700 mb-6">{proposal.proposalDetails.problemStatement}</p>
                </>
              )}
              
              {proposal.proposalDetails.fundUsage && (
                <>
                  <h2 className="text-xl font-semibold mb-3">Fund Usage</h2>
                  <p className="text-gray-700 mb-6">{proposal.proposalDetails.fundUsage}</p>
                </>
              )}
            </div>
            
            {/* Links */}
            {(proposal.proposalDetails.demoLink || proposal.proposalDetails.driveLink) && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Links</h2>
                <div className="space-y-3">
                  {proposal.proposalDetails.demoLink && (
                    <a 
                      href={proposal.proposalDetails.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-[#9945FF] hover:text-purple-700"
                    >
                      <ExternalLink size={18} className="mr-2" /> Demo Link
                    </a>
                  )}
                  {proposal.proposalDetails.driveLink && (
                    <a 
                      href={proposal.proposalDetails.driveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-[#9945FF] hover:text-purple-700"
                    >
                      <FileText size={18} className="mr-2" /> Documentation
                    </a>
                  )}
                </div>
              </div>
            )}
            
            {/* Tags */}
            {proposal.proposalDetails.tags.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {proposal.proposalDetails.tags.map((tag, index) => (
                    <div 
                      key={index} 
                      className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full"
                    >
                      <Tag size={14} className="mr-2" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Funding Sidebar */}
          <div className="lg:w-96">
            <div className="sticky top-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Fund this Project</h2>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{fundingPercentage}% Funded</span>
                  <span>{formatSol(proposal.fundingDetails.fundingReceived)} of {formatSol(proposal.fundingDetails.fundingGoal)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-[#14F195] h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${fundingPercentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {formatSol(remainingToFund)} remaining to fund
                </div>
              </div>
              
              {/* Connected Wallet */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-500 mb-1">Connected Wallet</div>
                <div className="font-medium">{walletAddress}</div>
                <div className="text-sm mt-2 flex justify-between items-center">
                  <span>Balance:</span>
                  <span className="font-medium">{formatSol(walletBalance)}</span>
                </div>
              </div>
              
              {/* Funding Input */}
              <div className="mb-6">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Fund
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="amount"
                    min="0"
                    max={Math.min(walletBalance, remainingToFund)}
                    step="0.1"
                    value={fundingAmount}
                    onChange={(e) => setFundingAmount(parseFloat(e.target.value) || 0)}
                    className="block w-full pr-16 border-gray-300 rounded-md focus:ring-[#9945FF] focus:border-[#9945FF]"
                    placeholder="0.0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">SOL</span>
                  </div>
                </div>
                
                {/* Validation Messages */}
                {fundingAmount > walletBalance && (
                  <div className="mt-2 flex items-center text-amber-600 text-sm">
                    <AlertTriangle size={14} className="mr-1" />
                    Exceeds wallet balance
                  </div>
                )}
                {fundingAmount > remainingToFund && (
                  <div className="mt-2 flex items-center text-amber-600 text-sm">
                    <AlertTriangle size={14} className="mr-1" />
                    Exceeds remaining funding needed
                  </div>
                )}
              </div>
              
              {/* Fund Button */}
              <button
                onClick={handleFund}
                disabled={fundingAmount <= 0 || fundingAmount > walletBalance || isProcessing}
                className={`w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                  ${isProcessing ? 'bg-purple-300' : 'bg-[#9945FF] hover:bg-purple-700'}
                  ${(fundingAmount <= 0 || fundingAmount > walletBalance) ? 'opacity-50 cursor-not-allowed' : ''}
                  transition-colors duration-200
                `}
              >
                {isProcessing ? 'Processing...' : 'Fund Project'}
              </button>
              
              {/* Success Message */}
              {showSuccess && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                  Your funding of {formatSol(fundingAmount)} has been successfully processed!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetail;