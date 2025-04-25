import React from 'react';
import { Button } from '@/Components/ui/button';
import { ProposalPreviewProps } from '@/types';


const ProposalPreview: React.FC<ProposalPreviewProps> = ({
  formData,
  onClose,
  onConfirmSubmit,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 rounded-t-xl px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Preview Your Proposal</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.basicInfo.projectTitle}</h1>
            <p className="text-lg text-gray-600 mb-4">{formData.basicInfo.shortDescription}</p>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {formData.basicInfo.category}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                Goal: {formData.fundingDetails.fundingGoal} SOL
              </span>
              {formData.fundingDetails.fundingDeadline && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Deadline: {new Date(formData.fundingDetails.fundingDeadline).toLocaleDateString()}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {formData.creatorInfo.creatorName.substring(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900">{formData.creatorInfo.creatorName}</p>
                <p className="text-sm text-gray-500">Creator</p>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Proposal Description</h2>
              <div className="prose max-w-none text-gray-700">
                <p style={{ whiteSpace: 'pre-wrap' }}>{formData.projectInfo.detailedDescription}</p>
              </div>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Problem Statement</h2>
                <div className="prose max-w-none text-gray-700">
                  <p style={{ whiteSpace: 'pre-wrap' }}>{formData.projectInfo.problemStatement}</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Fund Usage</h2>
                <div className="prose max-w-none text-gray-700">
                  <p style={{ whiteSpace: 'pre-wrap' }}>{formData.projectInfo.fundUsage}</p>
                </div>
              </section>
            </div>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About the Creator</h2>
              <div className="prose max-w-none text-gray-700">
                <p style={{ whiteSpace: 'pre-wrap' }}>{formData.creatorInfo.briefBio}</p>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Connect with me</h3>
                <div className="flex flex-wrap gap-3">
                  {formData.socialValidation.githubLink && (
                    <a href={formData.socialValidation.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="mr-1">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  
                  {formData.socialValidation.twitterProfile && (
                    <a href={formData.socialValidation.twitterProfile} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="mr-1">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      Twitter/X
                    </a>
                  )}
                  
                  {formData.socialValidation.portfolioWebsite && (
                    <a href={formData.socialValidation.portfolioWebsite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                      Website
                    </a>
                  )}
                  
                  {formData.socialValidation.linkedIn && (
                    <a href={formData.socialValidation.linkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="mr-1">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </section>
            
            {(formData.supportingDocs.googleDriveLink || formData.supportingDocs.demoLink) && (
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Supporting Documentation</h2>
                <div className="space-y-2">
                  {formData.supportingDocs.googleDriveLink && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Supporting Documents:</h3>
                      <a 
                        href={formData.supportingDocs.googleDriveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 underline"
                      >
                        View Documents
                      </a>
                    </div>
                  )}
                  
                  {formData.supportingDocs.demoLink && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Project Demo:</h3>
                      <a 
                        href={formData.supportingDocs.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 underline"
                      >
                        View Demo
                      </a>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white border-t border-gray-200 rounded-b-xl px-6 py-4 flex justify-between items-center">
          <Button variant="secondary" onClick={onClose}>
            Back to Editing
          </Button>
          <Button onClick={onConfirmSubmit}>
            Submit Proposal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProposalPreview;