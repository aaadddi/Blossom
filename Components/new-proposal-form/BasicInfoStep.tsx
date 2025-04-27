import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import FormSection from '../ui/FormSection';
// import { FormData, FormErrors } from '@/types/newProposalForm';
import { BasicInfoStepProps } from '@/types';

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  formData,
  formErrors,
  updateFormData,
  validateField,
}) => {
  const [descriptionLength, setDescriptionLength] = useState(0);
  
  useEffect(() => {
    setDescriptionLength(formData.basicInfo.shortDescription.length);
  }, [formData.basicInfo.shortDescription]);
  
  const categoryOptions = [
    { value: 'Development', label: 'Development' },
    { value: 'Art', label: 'Art' },
    { value: 'Content', label: 'Content' },
    { value: 'Research', label: 'Research' },
    { value: 'Community', label: 'Community' },
    { value: 'Other', label: 'Other' },
  ];
  
  return (
    <FormSection
      title="Basic Information"
      description="Let people know the essentials about your project"
    >
      <Input
        label="Proposal Title"
        placeholder="Enter your proposal title"
        value={formData.basicInfo.proposalTitle}
        onChange={(e) => updateFormData('basicInfo', 'proposalTitle', e.target.value)}
        onBlur={() => validateField('basicInfo', 'proposalTitle')}
        error={formErrors.basicInfo?.proposalTitle}
        required
      />
      
      <Input
        label="Short Description/Tagline"
        placeholder="Briefly describe your project in a catchy way"
        value={formData.basicInfo.shortDescription}
        onChange={(e) => {
          updateFormData('basicInfo', 'shortDescription', e.target.value);
          setDescriptionLength(e.target.value.length);
        }}
        onBlur={() => validateField('basicInfo', 'shortDescription')}
        error={formErrors.basicInfo?.shortDescription}
        helperText="A concise summary of your project"
        counter={descriptionLength}
        maxLength={150}
        required
      />
      
      <Select
        label="Category"
        options={categoryOptions}
        value={formData.basicInfo.category}
        onChange={(value) => updateFormData('basicInfo', 'category', value)}
        onBlur={() => validateField('basicInfo', 'category')}
        error={formErrors.basicInfo?.category}
        required
      />
    </FormSection>
  );
};

export default BasicInfoStep;