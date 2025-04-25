import React from 'react';

interface ProgressBarProps {
  steps: { id: number; title: string }[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="mb-8">
      <div className="hidden md:flex justify-between">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          
          return (
            <div 
              key={step.id} 
              className={`
                flex flex-col items-center cursor-pointer
                transition-all duration-300
                ${isActive ? 'scale-110' : ''}
                ${isCompleted || isActive ? 'text-indigo-700' : 'text-gray-400'}
              `}
              onClick={() => onStepClick && onStepClick(step.id)}
            >
              <div 
                className={`
                  flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300
                  ${isCompleted ? 'bg-indigo-700 text-white' : isActive ? 'border-2 border-indigo-700 bg-white text-indigo-700' : 'border border-gray-300 bg-white text-gray-400'}
                `}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span className={`mt-1 text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>{step.title}</span>
            </div>
          );
        })}
      </div>
      
      {/* Mobile view */}
      <div className="flex items-center justify-between md:hidden">
        <span className="text-sm font-medium text-indigo-700">Step {currentStep} of {steps.length}</span>
        <span className="text-sm font-medium text-gray-700">{steps[currentStep - 1].title}</span>
      </div>
      
      {/* Progress bar */}
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;