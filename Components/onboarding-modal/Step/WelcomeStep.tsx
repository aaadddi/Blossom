import React from 'react';
import { useOnboarding } from '@/Context/OnboardingContext';
import { Button } from '@/Components/ui/button';
import StepIndicator from '@/Components/onboarding-modal/StepIndicator';
import { StepProps } from '@/types';

export const WelcomeStep: React.FC<StepProps> = ({ walletAddress }) => {
  const { nextStep } = useOnboarding();
  
  // Format wallet address to show only first and last few characters
  const shortenedAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

  return (
    <div className="text-center animate-fadeIn">
      <h2 className="text-2xl font-bold text-[#333333] mb-3">
        Welcome to Fund my work
      </h2>
      
      <p className="text-[#6B7280] mb-6">
        Community-powered funding for creators and builders
      </p>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6 inline-block">
        <p className="text-sm text-[#6B7280]">Wallet connected</p>
        <p className="font-medium text-[#333333]">{shortenedAddress}</p>
      </div>
      
      <StepIndicator totalSteps={4} />
      
      <p className="text-[#6B7280] mb-8 max-w-md mx-auto">
        Let's set up your profile to get started. You'll need to provide a username and display name.
      </p>
      
      <div className="space-y-4">
        <Button 
          onClick={nextStep} 
          className="w-full"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;