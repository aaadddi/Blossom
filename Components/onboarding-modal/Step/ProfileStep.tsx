import React, { useState, useEffect, useRef } from 'react';
import { useOnboarding } from '@/Context/OnboardingContext';
import { Button } from '@/Components/ui/button';
import FormField from '@/Components/onboarding-modal/FormField';
import AvatarUpload from '@/Components/onboarding-modal/AvatarUpload';
import StepIndicator from '@/Components/onboarding-modal/StepIndicator';

export const ProfileStep: React.FC = () => {
  const { 
    nextStep, 
    prevStep, 
    formData, 
    updateFormData, 
    checkUsernameAvailability,
    isLoading
  } = useOnboarding();
  
  const [username, setUsername] = useState(formData.username);
  const [name, setDisplayName] = useState(formData.name);
  const [profileImage, setProfileImage] = useState(formData.profileImage || '');
  
  // For validation
  const [error, setError] = useState('');
  const [nameError, setDisplayNameError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  
  // Debounce timer
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Handle username validation with debounce
  useEffect(() => {
    // Clear any existing error when user types
    setError('');
    setIsValid(false);
    
    // Cancel previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Basic validation
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }
    
    // Set checking state
    setIsChecking(true);
    
    // Start a new timer for API check
    debounceTimer.current = setTimeout(async () => {
      try {
        const isAvailable = await checkUsernameAvailability(username);
        
        if (isAvailable) {
          setIsValid(true);
        } else {
          setError('This username is already taken');
        }
      } catch (err) {
        setError('Error checking username availability');
      } finally {
        setIsChecking(false);
      }
    }, 500);
    
    // Cleanup
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [username, checkUsernameAvailability]);

  // Handle display name validation
  useEffect(() => {
    if (!name.trim()) {
      setDisplayNameError('Display name is required');
    } else {
      setDisplayNameError('');
    }
  }, [name]);

  // Handle continue button click
  const handleContinue = () => {
    if (!name.trim()) {
      setDisplayNameError('Display name is required');
      return;
    }

    // Update form data in context
    updateFormData({
      username,
      name,
      profileImage
    });
    
    // Go to next step
    nextStep();
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-[#333333] mb-2 text-center">
        Create Your Profile
      </h2>
      
      <StepIndicator totalSteps={4} />
      
      <div className="mt-6">
        <AvatarUpload 
          value={profileImage}
          onChange={setProfileImage}
        />
        
        <FormField
          label="Username"
          id="username"
          placeholder="Choose a unique username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={error}
          isValid={isValid}
          isChecking={isChecking || isLoading}
          maxLength={20}
          required={true}
        />
        
        <p className="text-xs text-[#6B7280] -mt-2 mb-4">
          This will be your unique identifier on the platform
        </p>
        
        <FormField
          label="Display Name"
          id="display-name"
          placeholder="Your preferred display name"
          value={name}
          onChange={(e) => setDisplayName(e.target.value)}
          error={nameError}
          maxLength={50}
          required={true}
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
          disabled={!!error || isChecking || username.length < 3 || !name.trim()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ProfileStep;