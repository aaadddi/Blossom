import React from 'react';
import { OnboardingProvider, useOnboarding } from '@/Context/OnboardingContext';
import { User } from '@/types';
import WelcomeStep from '@/Components/onboarding-modal/Step/WelcomeStep';
import ProfileStep from '@/Components/onboarding-modal/Step/ProfileStep';
import AdditionalInfoStep from '@/Components/onboarding-modal/Step/AdditionalInfo';
import ConnectStep from '@/Components/onboarding-modal/Step/ConnectStep';
import CompleteStep from '@/Components/onboarding-modal/Step/CompleteStep';

// Step content component
const StepContent: React.FC<{ walletAddress: string }> = ({ walletAddress }) => {
  const { currentStep } = useOnboarding();
  
  switch (currentStep) {
    case 'welcome':
      return <WelcomeStep walletAddress={walletAddress} />;
    case 'profile':
      return <ProfileStep />;
    case 'additional':
      return <AdditionalInfoStep />;
    case 'connect':
      return <ConnectStep />;
    case 'complete':
      return <CompleteStep />;
    default:
      return <WelcomeStep walletAddress={walletAddress} />;
  }
};

interface OnboardingModalProps {
  isOpen: boolean;
  walletAddress: string;
  onComplete: (profile: User) => void;
  onSkip: () => void;
}

// Main modal component
export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  walletAddress,
  onComplete,
  onSkip
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-6">
          <OnboardingProvider
            walletAddress={walletAddress}
            onComplete={onComplete}
            onSkip={onSkip}
          >
            <StepContent walletAddress={walletAddress} />
          </OnboardingProvider>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;