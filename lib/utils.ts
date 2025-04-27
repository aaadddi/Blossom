import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Proposal, SortOption } from "@/types";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatMonthYear = (dateString: string) => {
  return new Date(dateString).toLocaleString('default', { month: 'long', year: 'numeric' });
};

// Calculate time remaining in days
export const getDaysRemaining = (deadline: string): number => {
  const deadlineDate = new Date(deadline);
  const currentDate = new Date();
  
  // Get difference in milliseconds and convert to days
  const diffTime = deadlineDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Format time remaining with appropriate unit
export const formatTimeRemaining = (deadline: string): string => {
  const daysRemaining = getDaysRemaining(deadline);
  
  if (daysRemaining <= 0) return 'Ended';
  if (daysRemaining === 1) return '1 day left';
  if (daysRemaining < 7) return `${daysRemaining} days left`;
  
  const weeksRemaining = Math.floor(daysRemaining / 7);
  return weeksRemaining === 1 ? '1 week left' : `${weeksRemaining} weeks left`;
};

// Calculate funding percentage
export const calculateFundingPercentage = (current: number, goal: number): number => {
  return Math.min(Math.round((current / goal) * 100), 100);
};

// Check if deadline is urgent (less than 3 days)
export const isDeadlineUrgent = (deadline: string): boolean => {
  const daysRemaining = getDaysRemaining(deadline);
  return daysRemaining > 0 && daysRemaining <= 3;
};

// Format SOL amount
export const formatSol = (amount: number): string => {
  return `${amount.toLocaleString()} SOL`;
};

// Sort proposals based on selected option
export const sortProposals = (proposals: Proposal[], sortOption: SortOption): Proposal[] => {
  const sortedProposals = [...proposals];
  
  switch (sortOption) {
    case 'newest':
      return sortedProposals.sort((a, b) => 
        new Date(b.proposalDetails.createdAt).getTime() - new Date(a.proposalDetails.createdAt).getTime()
      );
    case 'fundingGoal':
      return sortedProposals.sort((a, b) => b.fundingDetails.fundingGoal - a.fundingDetails.fundingGoal);
    case 'deadline':
      return sortedProposals.sort((a, b) => 
        new Date(a.fundingDetails.fundingDeadline).getTime() - new Date(b.fundingDetails.fundingDeadline).getTime()
      );
    default:
      return sortedProposals;
  }
};

// Truncate text with ellipsis if it's longer than maxLength
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Format wallet address for display
export const formatWalletAddress = (address: string): string => {
  if (address.includes('...')) return address; // Already formatted
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};