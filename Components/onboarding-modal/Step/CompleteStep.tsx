import React, { useEffect } from 'react';
import { Button } from '@/Components/ui/button';

export const CompleteStep: React.FC = () => {
  const [animationComplete, setAnimationComplete] = React.useState(false);
  
  // Simulate completion animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center animate-fadeIn">
      {/* Success animation */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-[#14F195]/10 flex items-center justify-center">
          <svg 
            className={`w-10 h-10 text-[#14F195] ${animationComplete ? 'animate-none' : 'animate-pulse'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
              className={animationComplete ? 'animate-none' : 'animate-draw-check'} 
            />
          </svg>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-[#333333] mb-3">
        You're all set!
      </h2>
      
      <p className="text-[#6B7280] mb-8 max-w-md mx-auto">
        Your profile has been created. Start exploring projects or create your first proposal.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="secondary"
          className="sm:flex-1"
        >
          Explore Projects
        </Button>
        
        <Button
          className="sm:flex-1"
        >
          Create Proposal
        </Button>
      </div>
    </div>
  );
};

export default CompleteStep;