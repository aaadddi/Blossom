"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProposalType } from '@/types/interfaces';
import { fetchProposals } from '@/supabase/Calls';

const demoProposal: ProposalType = {
  id: 'demo',
  hex_id: 'demo123',
  title: 'Sample Project (Demo)',
  description: 'This is a demo project to showcase the platform features. You cannot fund this project.',
  amount_requested: 1000,
  amount_received: 0,
  fully_funded: false,
  category: 'Demo',
  image_url: 'https://placehold.co/150',
  tags: ['Demo', 'Example'],
  creator: {
    username: 'demo_creator',
    name: 'Demo Creator',
    title: 'Platform Demo',
    wallet_addr: 'DEMO123...XYZ',
    bio: 'This is a demo creator account',
    social_handles: {
      twitter: '@demo',
      github: 'demo',
      website: 'demo.dev',
    },
    previous_fundings: 0,
    created_proposals: 1,
    new_user: true
  }
};

const FundProposals = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProposals = async () => {
      try {
        const fetchedProposals = await fetchProposals();
        setProposals(fetchedProposals);
      } catch (error) {
        console.error('Error loading proposals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProposals();
  }, []);

  const displayProposals = proposals.length > 0 ? proposals : [demoProposal];

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading proposals...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Fund Proposals</h2>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
        {displayProposals.map((proposal) => (
          <Link key={proposal.id} href={`/proposal/${proposal.hex_id}`}>
            <div className={`bg-white rounded-lg shadow-md p-6 ${
              viewMode === 'list' ? 'flex items-center space-x-6' : ''
            }`}>
              <div className="flex-shrink-0">
                <img
                  src={proposal.image_url || "https://placehold.co/150x150"}
                  alt={proposal.title}
                  className={`${
                    viewMode === 'grid' ? 'w-full h-48' : 'w-32 h-32'
                  } object-cover rounded-md`}
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/150x150";
                  }}
                />
              </div>
              <div className={viewMode === 'list' ? 'flex-1' : ''}>
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
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span>Creator: @{proposal.creator.username}</span>
                </div>
                <div className="mt-4">
                  <button
                    className={`w-full py-2 px-4 rounded-md ${
                      proposal.id === 'demo'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    disabled={proposal.id === 'demo'}
                    onClick={(e) => {
                      if (proposal.id === 'demo') {
                        e.preventDefault();
                      }
                    }}
                  >
                    {proposal.id === 'demo' ? 'Demo Project' : 'Fund Project'}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FundProposals; 