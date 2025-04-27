import React from 'react';
import Input from '../ui/Input';
import FormSection from '../ui/FormSection';
import { FundingDetailsStepProps } from '@/types';

const FundingDetailsStep: React.FC<FundingDetailsStepProps> = ({
  formData,
  formErrors,
  updateFormData,
  validateField,
}) => {
  return (
    <FormSection
      title="Funding Details"
      description="Specify your funding requirements and timeline"
    >
      <div className="relative">
        <Input
          label="Funding Goal"
          type="number"
          placeholder="0.00"
          value={formData.fundingDetails.fundingGoal}
          onChange={(e) => updateFormData('fundingDetails', 'fundingGoal', e.target.value)}
          onBlur={() => validateField('fundingDetails', 'fundingGoal')}
          error={formErrors.fundingDetails?.fundingGoal}
          helperText="Amount needed to complete your project"
          required
        />
        <div className="absolute right-3 top-9 text-gray-500 font-medium">SOL</div>
      </div>
      
      <Input
        label="Funding Deadline"
        type="date"
        placeholder="Select a deadline"
        value={formData.fundingDetails.fundingDeadline}
        onChange={(e) => updateFormData('fundingDetails', 'fundingDeadline', e.target.value)}
        helperText="When do you need the funds by? (Optional)"
      />
      
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Wallet Address</h3>
        <div className="flex items-center space-x-2">
          <div className="w-full py-2 px-3 bg-gray-100 rounded-lg border border-gray-200 text-gray-700 text-sm overflow-x-auto">
            {formData.fundingDetails.walletAddress.slice(0, 4)}...{formData.fundingDetails.walletAddress.slice(-4)}
          </div>
          <button 
            type="button"
            className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(formData.fundingDetails.walletAddress);
            }}
            title="Copy wallet address"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Funds will be sent to this wallet address if your proposal is successful
        </p>
      </div>
    </FormSection>
  );
};

export default FundingDetailsStep;