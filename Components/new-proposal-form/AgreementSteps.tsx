import React from 'react';
import Checkbox from '../ui/Checkbox';
import FormSection from '../ui/FormSection';
import { AgreementsStepProps } from '@/types';

const AgreementsStep: React.FC<AgreementsStepProps> = ({
  formData,
  formErrors,
  updateFormData,
  validateField,
}) => {
  return (
    <FormSection
      title="Agreements"
      description="Review and agree to our terms"
    >
      <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-100 mb-6">
        <h3 className="text-sm font-medium text-indigo-800 mb-2">Before submitting your proposal</h3>
        <p className="text-xs text-indigo-700 mb-3">
          Please review the following guidelines to ensure your proposal meets our community standards and has the best chance of getting funded.
        </p>
        <ul className="text-xs text-indigo-700 space-y-1">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5 text-indigo-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Be honest and transparent about your project's goals and funding needs
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5 text-indigo-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Provide regular updates to your funders on project progress
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5 text-indigo-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Respect the community guidelines and code of conduct
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5 text-indigo-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Keep your profile updated with your latest work and achievements for better visibility
          </li>
        </ul>
      </div>
      
      <Checkbox
        label={
          <span>
            I have read and agree to the <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">Community Guidelines</a>
          </span>
        }
        checked={formData.agreements.communityGuidelines}
        onChange={(checked) => updateFormData('agreements', 'communityGuidelines', checked)}
        onBlur={() => validateField('agreements', 'communityGuidelines')}
        error={formErrors.agreements?.communityGuidelines}
        required
      />
      
      <Checkbox
        label="I agree to provide regular updates to funders on the progress of my project"
        checked={formData.agreements.projectUpdates}
        onChange={(checked) => updateFormData('agreements', 'projectUpdates', checked)}
        onBlur={() => validateField('agreements', 'projectUpdates')}
        error={formErrors.agreements?.projectUpdates}
        required
      />
    </FormSection>
  );
};

export default AgreementsStep;