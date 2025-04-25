import React from 'react';
import { useOnboarding } from '../../Context/OnboardingContext';
import { Step } from '@/types';

interface StepIndicatorProps {
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ totalSteps }) => {
  const { currentStep } = useOnboarding();
  
  // Map step names to their position
  const stepMap: Record<Step, number> = {
    'welcome': 1,
    'profile': 2,
    'additional': 3,
    'connect': 4,
    'complete': 5
  };
  
  const currentStepNumber = stepMap[currentStep] || 1;

  return (
    <div className="flex items-center justify-center my-4">
      <div className="flex w-full max-w-xs justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStepNumber;
          const isCompleted = stepNumber < currentStepNumber;
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  transition-all duration-300 ease-in-out
                  ${isActive ? 'bg-[#9945FF] text-white' : 
                    isCompleted ? 'bg-[#14F195] text-white' : 'bg-gray-200 text-gray-500'}
                `}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              {index < totalSteps - 1 && (
                <div className={`w-12 h-0.5 mt-4 ${isCompleted ? 'bg-[#14F195]' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;