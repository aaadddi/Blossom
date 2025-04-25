import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import FormSection from '../ui/FormSection';
import { CreatorInfoStepProps } from '@/types';

const CreatorInfoStep: React.FC<CreatorInfoStepProps> = ({
  formData,
  formErrors,
  updateFormData,
  validateField,
}) => {
  const [bioLength, setBioLength] = useState(0);
  
  useEffect(() => {
    setBioLength(formData.creatorInfo.briefBio.length);
  }, [formData.creatorInfo.briefBio]);
  
  return (
    <FormSection
      title="Creator Information"
      description="Tell us about yourself"
    >
      <Input
        label="Creator Name/Username"
        placeholder="Your name or username"
        value={formData.creatorInfo.creatorName}
        onChange={(e) => updateFormData('creatorInfo', 'creatorName', e.target.value)}
        onBlur={() => validateField('creatorInfo', 'creatorName')}
        error={formErrors.creatorInfo?.creatorName}
        required
      />
      
      <TextArea
        label="Brief Bio"
        placeholder="Tell us about yourself and your background"
        value={formData.creatorInfo.briefBio}
        onChange={(e) => {
          updateFormData('creatorInfo', 'briefBio', e.target.value);
          setBioLength(e.target.value.length);
        }}
        onBlur={() => validateField('creatorInfo', 'briefBio')}
        error={formErrors.creatorInfo?.briefBio}
        counter={bioLength}
        maxLength={300}
        helperText="A brief introduction about yourself"
        required
      />
      
      <Input
        label="Contact Email"
        placeholder="your.email@example.com"
        type="email"
        value={formData.creatorInfo.contactEmail}
        onChange={(e) => updateFormData('creatorInfo', 'contactEmail', e.target.value)}
        onBlur={() => validateField('creatorInfo', 'contactEmail')}
        error={formErrors.creatorInfo?.contactEmail}
        helperText="Email where funders can contact you"
        required
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        }
      />
    </FormSection>
  );
};

export default CreatorInfoStep;