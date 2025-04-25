'use client'
import React, { useState } from 'react';
import { useOnboarding } from '@/Context/OnboardingContext';
import { Button } from '@/Components/ui/button';
import FormField from '@/Components/onboarding-modal/FormField';
import StepIndicator from '@/Components/onboarding-modal/StepIndicator';

export const AdditionalInfoStep: React.FC = () => {
  const { nextStep, prevStep, formData, updateFormData } = useOnboarding();
  
  const [bio, setBio] = useState(formData.bio);
  const [title, setTitle] = useState(formData.professionTitle);
  
  // Handle continue button click
  const handleContinue = () => {
    // Update form data in context
    updateFormData({
      bio,
      professionTitle: title,
    });
    
    // Go to next step
    nextStep();
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-[#333333] mb-2 text-center">
        Tell us more about you
      </h2>
      
      <StepIndicator totalSteps={4} />
      
      <div className="mt-6">
        <FormField
          label="Bio"
          id="bio"
          placeholder="Share a little about yourself, your skills, or what you're working on"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          optional={true}
          maxLength={250}
          as="textarea"
        />
        
        <FormField
          label="Professional Title"
          id="title"
          placeholder="e.g. Frontend Developer, Designer, Content Creator"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          optional={true}
          maxLength={50}
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
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AdditionalInfoStep;