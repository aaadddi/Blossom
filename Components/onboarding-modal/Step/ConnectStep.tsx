import React, { useState } from 'react';
import { useOnboarding } from '@/Context/OnboardingContext';
import { Button } from '@/Components/ui/button';
import SocialLinkField from '@/Components/onboarding-modal/SocialLinkField';
import StepIndicator from '@/Components/onboarding-modal/StepIndicator';

export const ConnectStep: React.FC = () => {
  const { nextStep, prevStep, formData, updateFormData } = useOnboarding();
  
  const [socialLinks, setSocialLinks] = useState(formData.socialLinks);
  
  // Handle social link changes
  const handleSocialChange = (platform: keyof typeof socialLinks) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialLinks({
      ...socialLinks,
      [platform]: e.target.value
    });
  };
  
  // Handle complete button click
  const handleComplete = () => {
    // Update form data in context
    updateFormData({
      socialLinks: socialLinks
    });
    
    // Go to next step
    nextStep();
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-[#333333] mb-2 text-center">
        Connect your accounts
      </h2>
      
      <StepIndicator totalSteps={4} />
      
      <p className="text-[#6B7280] text-center mb-6">
        Adding social accounts helps build trust with funders
      </p>
      
      <div className="space-y-2">
        <SocialLinkField 
          platform="GitHub"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          }
          value={socialLinks.github}
          onChange={handleSocialChange('github')}
          placeholder="github.com/username"
        />
        
        <SocialLinkField 
          platform="Twitter"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          }
          value={socialLinks.twitter}
          onChange={handleSocialChange('twitter')}
          placeholder="twitter.com/username"
        />
        
        <SocialLinkField 
          platform="LinkedIn"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          }
          value={socialLinks.linkedin}
          onChange={handleSocialChange('linkedin')}
          placeholder="linkedin.com/in/username"
        />
        
        <SocialLinkField 
          platform="Website"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          }
          value={socialLinks.website}
          onChange={handleSocialChange('website')}
          placeholder="yourwebsite.com"
        />
        
        <SocialLinkField 
          platform="Discord"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 4c-1.3-.1-2.6-.2-3.8-.2-1.5 0-2.9.1-4.4.3-1.5.2-2.9.4-4.3.8"></path>
              <path d="M3 10c0 2 1 4 3 6s4 2 6 2h1c5 0 7-3 7-3"></path>
              <path d="M10 9c-1 1 0 3 1 3"></path>
              <path d="M14 9c1 1 0 3-1 3"></path>
            </svg>
          }
          value={socialLinks.discord}
          onChange={handleSocialChange('discord')}
          placeholder="Discord username"
        />
      </div>
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="secondary"
          onClick={prevStep}
        >
          Back
        </Button>
        
        <Button 
          onClick={handleComplete}
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
};

export default ConnectStep;