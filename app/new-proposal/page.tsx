"use client"
import React, { useState, useEffect } from 'react';
import { FormData, FormErrors, INITIAL_FORM_DATA, FORM_STEPS } from '@/types/newProposalForm';
import ProgressBar from '@/Components/ui/ProgressBar';
import { Button } from '@/Components/ui/button';
import BasicInfoStep from '@/Components/new-proposal-form/BasicInfoStep';
import FundingDetailsStep from '@/Components/new-proposal-form/FundingDetailsStep';
import ProposalInfoStep from '@/Components/new-proposal-form/ProposalInfoStep';
import SupportingDocsStep from '@/Components/new-proposal-form/SupportingDocsStep';
import AgreementsStep from '@/Components/new-proposal-form/AgreementSteps';
import ProposalPreview from '@/Components/ProposalFormPreview';
import { useUser } from '@/Context/UserContext';
import { submitProposal } from '@/supabase/Calls';

const FundMyWorkForm: React.FC = () => {
  const { user } = useUser();
  INITIAL_FORM_DATA.fundingDetails.walletAddress = user?.walletAddress || '';

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState<FormErrors>({} as FormErrors);
  const [showPreview, setShowPreview] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Load any saved draft from localStorage
  useEffect(() => {
    const savedForm = localStorage.getItem('fundMyWorkFormDraft');
    if (savedForm) {
      try {
        const parsedForm = JSON.parse(savedForm);
        setFormData(parsedForm);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
  }, []);
  
  const updateFormData = (section: keyof FormData, field: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };
  
  const validateField = (section: keyof FormData, field: string) => {
    let error = '';
    const value = formData[section][field as keyof typeof formData[typeof section]];
    
    if (field === 'proposalTitle' && !value) {
      error = 'Proposal title is required';
    } else if (field === 'shortDescription' && !value) {
      error = 'Short description is required';
    } else if (field === 'category' && !value) {
      error = 'Category is required';
    } else if (field === 'fundingGoal' && !value) {
      error = 'Funding goal is required';
    } else if (field === 'detailedDescription' && !value) {
      error = 'Detailed description is required';
    } else if (field === 'problemStatement' && !value) {
      error = 'Problem statement is required';
    } else if (field === 'fundUsage' && !value) {
      error = 'Fund usage description is required';
    } else if (field === 'creatorName' && !value) {
      error = 'Creator name is required';
    } else if (field === 'briefBio' && !value) {
      error = 'Brief bio is required';
    } else if (field === 'contactEmail') {
      if (!value) {
        error = 'Contact email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = 'Please enter a valid email address';
      }
    } else if (field === 'communityGuidelines' && !value) {
      error = 'You must agree to the community guidelines';
    } else if (field === 'projectUpdates' && !value) {
      error = 'You must agree to provide project updates';
    } else if ((field === 'githubLink' || field === 'twitterProfile' || field === 'portfolioWebsite' || 
                field === 'linkedIn' || field === 'discordTelegram' || field === 'otherLinks' || 
                field === 'googleDriveLink' || field === 'demoLink') && 
               value && !/^(http|https):\/\/[^ "]+$/.test(value)) {
      error = 'Please enter a valid URL';
    }
    
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [section]: {
        ...prevErrors[section],
        [field]: error,
      },
    }));
    
    return !error;
  };
  
  const validateCurrentStep = () => {
    let isValid = true;
    
    switch (currentStep) {
      case 1: // Basic Information
        isValid = validateField('basicInfo', 'proposalTitle') && 
                 validateField('basicInfo', 'shortDescription') && 
                 validateField('basicInfo', 'category');
        break;
      case 2: // Funding Details
        isValid = validateField('fundingDetails', 'fundingGoal');
        break;
      case 3: // Project Information
        isValid = validateField('proposalInfo', 'detailedDescription') && 
                 validateField('proposalInfo', 'problemStatement') && 
                 validateField('proposalInfo', 'fundUsage');
        break;
      case 4: // Supporting Documentation
        // All fields are optional, but validate URL format if provided
        isValid = validateField('supportingDocs', 'googleDriveLink') && 
                 validateField('supportingDocs', 'demoLink');
        break;
      case 5: // Agreements
        isValid = validateField('agreements', 'communityGuidelines') && 
                 validateField('agreements', 'projectUpdates');
        break;
    }
    
    return isValid;
  };
  
  const handleNext = () => {
    if (validateCurrentStep()) {
      // Save draft
      localStorage.setItem('fundMyWorkFormDraft', JSON.stringify(formData));
      
      if (currentStep < FORM_STEPS.length) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePreview = () => {
    // Validate all steps before showing preview
    let allValid = true;
    
    // Validate required fields across all steps
    // Basic Info
    allValid = validateField('basicInfo', 'projectTitle') && 
              validateField('basicInfo', 'shortDescription') && 
              validateField('basicInfo', 'category') && allValid;
    
    // Funding Details
    allValid = validateField('fundingDetails', 'fundingGoal') && allValid;
    
    // Project Info
    allValid = validateField('proposalInfo', 'detailedDescription') && 
              validateField('proposalInfo', 'problemStatement') && 
              validateField('proposalInfo', 'fundUsage') && allValid;
    
    
    // Agreements
    allValid = validateField('agreements', 'communityGuidelines') && 
              validateField('agreements', 'projectUpdates') && allValid;
    
    allValid = validateField('supportingDocs', 'googleDriveLink') && 
              validateField('supportingDocs', 'demoLink') && allValid;
    
    if (allValid) {
      setShowPreview(true);
    } else {
      // If not valid, go to the first step with errors
      const stepsWithErrors = Object.keys(formErrors).filter(section => 
        Object.values(formErrors[section as keyof FormErrors] || {}).some(error => error)
      );
      
      if (stepsWithErrors.length > 0) {
        const firstErrorSection = stepsWithErrors[0] as keyof FormData;
        // Map section to step number
        const sectionToStepMap: Record<keyof FormData, number> = {
          basicInfo: 1,
          fundingDetails: 2,
          proposalInfo: 3,
          supportingDocs: 4,
          agreements: 5
        };
        
        setCurrentStep(sectionToStepMap[firstErrorSection]);
      }
    }
  };
  
  const handleSaveDraft = () => {
    localStorage.setItem('fundMyWorkFormDraft', JSON.stringify(formData));
    
    // Show a temporary save confirmation
    const saveConfirmation = document.getElementById('save-confirmation');
    if (saveConfirmation) {
      saveConfirmation.classList.remove('opacity-0');
      saveConfirmation.classList.add('opacity-100');
      
      setTimeout(() => {
        saveConfirmation.classList.remove('opacity-100');
        saveConfirmation.classList.add('opacity-0');
      }, 3000);
    }
  };
  
  const handleSubmit = () => {
    // setIsSubmitting(true);
    
    const Submit = async () => {
      try {
        const response = await submitProposal(formData);  
        console.log(response);
        setIsSubmitted(true);
        setShowPreview(false);
      } catch (error) {
        console.error('Error submitting proposal:', error);
      } finally {
        console.log("submit")
        // setIsSubmitting(false);
      }
    };

    Submit();
  };
  
  const checkAllFieldsValid = () => {
    // Check if all required fields are filled
    return (
      formData.basicInfo.proposalTitle && 
      formData.basicInfo.shortDescription && 
      formData.basicInfo.category && 
      formData.fundingDetails.fundingGoal && 
      formData.proposalInfo.detailedDescription && 
      formData.proposalInfo.problemStatement && 
      formData.proposalInfo.fundUsage && 
      formData.agreements.communityGuidelines && 
      formData.agreements.projectUpdates
    );
  };
  
  // Render the appropriate step component
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            formErrors={formErrors}
            updateFormData={updateFormData}
            validateField={validateField}
          />
        );
      case 2:
        return (
          <FundingDetailsStep
            formData={formData}
            formErrors={formErrors}
            updateFormData={updateFormData}
            validateField={validateField}
          />
        );
      case 3:
        return (
          <ProposalInfoStep
            formData={formData}
            formErrors={formErrors}
            updateFormData={updateFormData}
            validateField={validateField}
          />
        );
      case 4:
        return (
          <SupportingDocsStep
            formData={formData}
            formErrors={formErrors}
            updateFormData={updateFormData}
            validateField={validateField}
          />
        );
      case 5:
        return (
          <AgreementsStep
            formData={formData}
            formErrors={formErrors}
            updateFormData={updateFormData}
            validateField={validateField}
          />
        );
      default:
        return null;
    }
  };
  
  // If form is submitted successfully, show success message
  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Proposal Submitted Successfully!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for submitting your funding proposal. Our team will review it shortly.
            You&aposll receive a confirmation email with next steps.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => {
                setFormData(INITIAL_FORM_DATA);
                setCurrentStep(1);
                setIsSubmitted(false);
              }}
            >
              Submit Another Proposal
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/'}>
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fund My Work Proposal</h1>
        <p className="text-lg text-gray-600">
          Submit your project to request funding from our community of supporters.
        </p>
      </div>
      
      <ProgressBar 
        steps={FORM_STEPS} 
        currentStep={currentStep} 
        onStepClick={(step) => setCurrentStep(step)} 
      />
      
      <form onSubmit={(e) => e.preventDefault()}>
        {renderStepContent()}
        
        <div className="mt-8 flex flex-wrap justify-between items-center gap-4">
          <div>
            {currentStep > 1 && (
              <Button variant="secondary" onClick={handlePrevious}>
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Button variant="outline" onClick={handleSaveDraft}>
                Save Draft
              </Button>
              <div 
                id="save-confirmation" 
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md transition-opacity duration-300 opacity-0"
              >
                Draft saved!
              </div>
            </div>
            
            {currentStep === FORM_STEPS.length ? (
              <>
                <Button variant="outline" onClick={handlePreview} disabled={!checkAllFieldsValid()}>
                  Preview
                </Button>
                <Button onClick={handlePreview} disabled={!checkAllFieldsValid()}>
                  Submit Proposal
                </Button>
              </>
            ) : (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </form>
      
      {showPreview && (
        <ProposalPreview
          formData={formData}
          onClose={() => setShowPreview(false)}
          onConfirmSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default FundMyWorkForm;