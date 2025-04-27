"use client"
import React, { useState } from 'react';
import { Proposal } from '@/types';
import { 
  calculateFundingPercentage, 
  formatTimeRemaining, 
  formatSol,
  // formatWalletAddress
} from '@/lib/utils';
import { 
  X, 
  Calendar, 
  User, 
  ExternalLink, 
  FileText, 
  Tag,
  AlertTriangle
} from 'lucide-react';
import Image from 'next/image';
interface ProposalModalProps {
  proposal: Proposal;
  isOpen: boolean;
  onClose: () => void;
}

const ProposalModal: React.FC<ProposalModalProps> = ({ proposal, isOpen, onClose }) => {
  const [fundingAmount, setFundingAmount] = useState<number>(0);
  const [walletBalance] = useState<number>(10); // Mock wallet balance
  const [walletAddress] = useState<string>('5tGH...9Uvx'); // Mock connected wallet
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  
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
        onClose();
      }, 3000);
    }, 1500);
  };
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Project Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Project Details */}
          <div className="flex-1 p-6">
            {/* Cover Image */}
            <div className="h-56 w-full rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden mb-6">
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
              <div className="flex items-center mb-2">
                <span className="inline-block bg-purple-50 text-purple-700 text-sm font-medium px-2 py-1 rounded-full mr-2">
                  {proposal.proposalDetails.category}
                </span>
                <div className="flex items-center text-gray-500">
                  <Calendar size={16} className="mr-1" />
                  <span>{formatTimeRemaining(proposal.fundingDetails.fundingDeadline.toString())}</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">{proposal.proposalDetails.proposalTitle}</h1>
            </div>
            
            {/* Creator */}
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <User size={20} className="text-gray-500" />
              </div>
              <div>
                <div className="font-medium">{proposal.walletAddress}</div>
                <div className="text-sm text-gray-500">{proposal.walletAddress}</div>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 mb-4">{proposal.proposalDetails.detailedDescription}</p>
              
              {proposal.proposalDetails.problemStatement && (
                <>
                  <h3 className="text-lg font-semibold mb-2">Problem Statement</h3>
                  <p className="text-gray-700 mb-4">{proposal.proposalDetails.problemStatement}</p>
                </>
              )}
              
              {proposal.proposalDetails.fundUsage && (
                <>
                  <h3 className="text-lg font-semibold mb-2">Fund Usage</h3>
                  <p className="text-gray-700 mb-4">{proposal.proposalDetails.fundUsage}</p>
                </>
              )}
            </div>
            
            {/* Links */}
            {(proposal.proposalDetails.demoLink || proposal.proposalDetails.driveLink) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Links</h3>
                <div className="space-y-2">
                  {proposal.proposalDetails.demoLink && (
                    <a 
                      href={proposal.proposalDetails.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-[#9945FF] hover:text-purple-700"
                    >
                      <ExternalLink size={16} className="mr-2" /> Demo Link
                    </a>
                  )}
                  {proposal.proposalDetails.driveLink && (
                    <a 
                      href={proposal.proposalDetails.driveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-[#9945FF] hover:text-purple-700"
                    >
                      <FileText size={16} className="mr-2" /> Documentation
                    </a>
                  )}
                </div>
              </div>
            )}
            
            {/* Tags */}
            {proposal.proposalDetails.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {proposal.proposalDetails.tags.map((tag, index) => (
                    <div 
                      key={index} 
                      className="flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                    >
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Funding Info */}
          <div className="md:w-80 p-6 bg-gray-50 md:border-l border-gray-200">
            <div className="sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Funding Details</h3>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{fundingPercentage}% Funded</span>
                  <span>{formatSol(proposal.fundingDetails.fundingReceived)} of {formatSol(proposal.fundingDetails.fundingGoal)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-[#14F195] h-2.5 rounded-full" 
                    style={{ width: `${fundingPercentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {formatSol(remainingToFund)} remaining to fund
                </div>
              </div>
              
              {/* Connected Wallet */}
              <div className="p-3 bg-white rounded-lg border border-gray-200 mb-6">
                <div className="text-sm text-gray-500 mb-1">Connected Wallet</div>
                <div className="font-medium">{walletAddress}</div>
                <div className="text-sm mt-2">
                  Balance: <span className="font-medium">{formatSol(walletBalance)}</span>
                </div>
              </div>
              
              {/* Funding Input */}
              <div className="mb-6">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount to Fund
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="amount"
                    min="0"
                    max={Math.min(walletBalance, remainingToFund)}
                    step="0.1"
                    value={fundingAmount}
                    onChange={(e) => setFundingAmount(parseFloat(e.target.value) || 0)}
                    className="block w-full pr-16 text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-[#9945FF] focus:border-[#9945FF]"
                    placeholder="0.0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500">SOL</span>
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
                disabled={fundingAmount <= 0 || fundingAmount > walletBalance || isProcessing || showSuccess}
                className={`w-full py-2 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                  ${isProcessing ? 'bg-purple-300' : 'bg-[#9945FF] hover:bg-purple-700'}
                  ${(fundingAmount <= 0 || fundingAmount > walletBalance) ? 'opacity-50 cursor-not-allowed' : ''}
                  transition-colors duration-200
                `}
              >
                {isProcessing ? 'Processing...' : showSuccess ? 'Funded Successfully!' : 'Fund Project'}
              </button>
              
              {/* Success Message */}
              {showSuccess && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
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

export default ProposalModal;