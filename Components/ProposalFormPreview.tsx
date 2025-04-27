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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.basicInfo.proposalTitle}</h1>
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
          </div>
          
          {/* Main Content */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Proposal Description</h2>
              <div className="prose max-w-none text-gray-700">
                <p style={{ whiteSpace: 'pre-wrap' }}>{formData.proposalInfo.detailedDescription}</p>
              </div>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Problem Statement</h2>
                <div className="prose max-w-none text-gray-700">
                  <p style={{ whiteSpace: 'pre-wrap' }}>{formData.proposalInfo.problemStatement}</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Fund Usage</h2>
                <div className="prose max-w-none text-gray-700">
                  <p style={{ whiteSpace: 'pre-wrap' }}>{formData.proposalInfo.fundUsage}</p>
                </div>
              </section>
            </div>
            
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