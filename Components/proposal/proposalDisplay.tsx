"use client"
import React, { useState, useEffect } from 'react';
import {  ViewMode, SortOption, CategoryFilter } from '@/types';
import { mockProposals } from './mockData'; 
import { sortProposals } from '@/lib/utils';
import ProposalHeader from './proposalHeader';
import ProposalCard from './proposalCard';
import ProposalList from './proposalList';

const ProposalDisplay: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Apply filters and sorting
  const filteredProposals = mockProposals
    .filter(proposal => {
      // Category filter
      if (categoryFilter !== 'All' && proposal.proposalDetails.category !== categoryFilter) {
        return false;
      }
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          proposal.proposalDetails.proposalTitle.toLowerCase().includes(query) ||
          proposal.proposalDetails.detailedDescription.toLowerCase().includes(query) ||
          proposal.walletAddress.toLowerCase().includes(query) ||
          proposal.proposalDetails.category.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  
  // Apply sorting
  const sortedProposals = sortProposals(filteredProposals, sortOption);
  
  // Add smooth transition when switching view modes
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [viewMode]);
  
  return (
    <div className="font-sans">
      <ProposalHeader 
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortOption={sortOption}
        setSortOption={setSortOption}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {viewMode === 'card' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProposals.map(proposal => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
              />
            ))}
          </div>
        ) : (
          <ProposalList proposals={sortedProposals} />
        )}
        
        {sortedProposals.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No proposals match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalDisplay;