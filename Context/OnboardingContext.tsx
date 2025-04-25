import React, { createContext, useContext, useState, useCallback } from 'react';
import { OnboardingContextType, Step, User, OnboardingProviderProps } from '@/types';
import { usernameExists } from '@/supabase/Calls';
// Create context with a default undefined value
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Order of steps for navigation
const STEPS: Step[] = ['welcome', 'profile', 'additional', 'connect', 'complete'];

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ 
  children, 
  walletAddress,
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form data with wallet address
    const [formData, setFormData] = useState<User>({
    walletAddress,
    username: generateDefaultUsername(walletAddress),
    name: '',
    profileImage: '',
    bio: '',
    professionTitle: '',
    socialLinks: {
      github: '',
      twitter: '',
      linkedin: '',
      website: '',
      discord: '',
    },
    joinedDate: new Date().toISOString(),
    totalFundingReceived: 0,
    proposalsCreated: 0,
  });

  function generateDefaultUsername(address: string): string {
    return `user_${address.substring(0, 4)}${address.substring(address.length - 4)}`.toLowerCase();
  }

  // Navigation functions
  const nextStep = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
    
    // If we're going to the complete step, call onComplete
    if (STEPS[currentIndex + 1] === 'complete') {
      // Small delay to allow the animation to complete
      setTimeout(() => {
        onComplete(formData);
      }, 2000);
    }
  }, [currentStep, formData, onComplete]);

  const prevStep = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: Step) => {
    setCurrentStep(step);
  }, []);

  const skipOnboarding = useCallback(() => {
    onSkip();
  }, [onSkip]);

  // Update form data
  const updateFormData = useCallback((data: Partial<User>) => {
    setFormData(prev => ({
      ...prev,
      ...data,
    }));
  }, []);

  // Mock API call for username availability check
  const checkUsernameAvailability = useCallback(async (username: string): Promise<boolean> => {
    setIsLoading(true);
    const isAvailable = await usernameExists(username);
    setIsLoading(false);
    return !isAvailable;
  }, []);

  const value: OnboardingContextType = {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    skipOnboarding,
    formData,
    updateFormData,
    checkUsernameAvailability,
    isLoading
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Custom hook to use the onboarding context
export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};