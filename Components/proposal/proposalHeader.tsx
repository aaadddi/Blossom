"use client"
import React, { useState, useRef, useEffect } from 'react';
import { ViewMode, SortOption, CategoryFilter } from '@/types';
import { LayoutGrid, List, ChevronDown, Search, X } from 'lucide-react';

interface ProposalHeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  categoryFilter: CategoryFilter;
  setCategoryFilter: (category: CategoryFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProposalHeader: React.FC<ProposalHeaderProps> = ({
  viewMode,
  setViewMode,
  sortOption,
  setSortOption,
  categoryFilter,
  setCategoryFilter,
  searchQuery,
  setSearchQuery
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const sortMenuRef = useRef<HTMLDivElement>(null);
  
  const categories: CategoryFilter[] = ['All', 'Development', 'Art', 'Content', 'Research', 'Community'];
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setShowCategoryMenu(false);
      }
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setShowSortMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (category: CategoryFilter) => {
    setCategoryFilter(category);
    setShowCategoryMenu(false);
  };

  const handleSortSelect = (option: SortOption) => {
    setSortOption(option);
    setShowSortMenu(false);
  };
  
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* View Toggle */}
        <div className="flex items-center">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('card')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg flex items-center
                ${viewMode === 'card' 
                  ? 'bg-[#9945FF] text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              <LayoutGrid size={16} className="mr-2" />
              Card
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg flex items-center
                ${viewMode === 'list' 
                  ? 'bg-[#9945FF] text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              <List size={16} className="mr-2" />
              List
            </button>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="ml-4 text-gray-500 hover:text-gray-700 sm:hidden"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        {/* Search (Hidden on mobile unless filters are shown) */}
        <div className={`relative ${showFilters ? 'block' : 'hidden sm:block'}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search proposals..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>
      
      {/* Filters - Row (Hidden on mobile unless filters are shown) */}
      <div className={`flex flex-col sm:flex-row gap-4 ${showFilters ? 'flex' : 'hidden sm:flex'}`}>
        {/* Category Filter */}
        <div className="relative inline-block text-left" ref={categoryMenuRef}>
          <button
            type="button"
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            {categoryFilter}
            <ChevronDown size={16} className="-mr-1 ml-2" />
          </button>
          
          {showCategoryMenu && (
            <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="py-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      categoryFilter === category ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } hover:bg-gray-50`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sort Options */}
        <div className="relative inline-block text-left" ref={sortMenuRef}>
          <button
            type="button"
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            Sort: {sortOption === 'newest' ? 'Newest' : sortOption === 'fundingGoal' ? 'Funding Goal' : 'Deadline'}
            <ChevronDown size={16} className="-mr-1 ml-2" />
          </button>
          
          {showSortMenu && (
            <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="py-1">
                <button
                  onClick={() => handleSortSelect('newest')}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    sortOption === 'newest' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } hover:bg-gray-50`}
                >
                  Newest
                </button>
                <button
                  onClick={() => handleSortSelect('fundingGoal')}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    sortOption === 'fundingGoal' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } hover:bg-gray-50`}
                >
                  Funding Goal
                </button>
                <button
                  onClick={() => handleSortSelect('deadline')}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    sortOption === 'deadline' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } hover:bg-gray-50`}
                >
                  Deadline
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalHeader;