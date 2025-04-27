import React, { useState, useEffect } from 'react';
import TextArea from '../ui/TextArea';
import FormSection from '../ui/FormSection';
import { ProjectInfoStepProps } from '@/types';
import Input from '../ui/Input';
import TagInput from '../ui/TagInput';

const ProposalInfoStep: React.FC<ProjectInfoStepProps> = ({
  formData,
  formErrors,
  updateFormData,
  validateField,
}) => {
  // Add basic text formatting toolbar (a simplified version)
  const formatText = (type: string) => {
    const textarea = document.getElementById('textarea-detailed-description') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let formattedText = '';
    let cursorPosition = 0;
    
    switch (type) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        cursorPosition = start + 2;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        cursorPosition = start + 1;
        break;
      case 'heading':
        formattedText = `## ${selectedText}`;
        cursorPosition = start + 3;
        break;
      case 'list':
        formattedText = `\n- ${selectedText}`;
        cursorPosition = start + 3;
        break;
      default:
        return;
    }
    
    const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    updateFormData('proposalInfo', 'detailedDescription', newValue);
    
    // Set cursor position after update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        cursorPosition + (selectedText.length || 0),
        cursorPosition + (selectedText.length || 0)
      );
    }, 0);
  };
  
  return (
    <FormSection
      title="Project Information"
      description="Provide detailed information about your project"
    >
      <div className="mb-1">
        <div className="flex items-center space-x-2 mb-2">
          <button 
            type="button" 
            onClick={() => formatText('bold')}
            className="p-1.5 text-gray-700 hover:text-indigo-700 hover:bg-gray-100 rounded transition-colors duration-200"
            title="Bold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </button>
          <button 
            type="button" 
            onClick={() => formatText('italic')}
            className="p-1.5 text-gray-700 hover:text-indigo-700 hover:bg-gray-100 rounded transition-colors duration-200"
            title="Italic"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </button>
          <button 
            type="button" 
            onClick={() => formatText('heading')}
            className="p-1.5 text-gray-700 hover:text-indigo-700 hover:bg-gray-100 rounded transition-colors duration-200"
            title="Heading"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </button>
          <button 
            type="button" 
            onClick={() => formatText('list')}
            className="p-1.5 text-gray-700 hover:text-indigo-700 hover:bg-gray-100 rounded transition-colors duration-200"
            title="Bullet List"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      <Input
        label="Cover Image URL"
        placeholder="Enter the URL of your proposal's cover image"
        value={formData.proposalInfo.coverImageUrl}
        onChange={(e) => {
          updateFormData('proposalInfo', 'coverImageUrl', e.target.value);
        }}
        onBlur={() => validateField('proposalInfo', 'coverImageUrl')}
        error={formErrors.proposalInfo?.coverImageUrl}
        helperText="A concise summary of your project"
        maxLength={150}
        required
      />

      <TagInput
        label="Tags"
        value={Array.isArray(formData.proposalInfo.tags) ? formData.proposalInfo.tags : []}
        onChange={(tags) => updateFormData('proposalInfo', 'tags', tags)}
        onBlur={() => validateField('proposalInfo', 'tags')}
        error={formErrors.proposalInfo?.tags}
        helperText="Enter tags for your project"
        maxLength={150}
        placeholder="Enter tags separated by commas"
      />

      <TextArea
        label="Detailed Description"
        placeholder="Provide a comprehensive overview of your project"
        value={formData.proposalInfo.detailedDescription}
        onChange={(e) => updateFormData('proposalInfo', 'detailedDescription', e.target.value)}
        onBlur={() => validateField('proposalInfo', 'detailedDescription')}
        error={formErrors.proposalInfo?.detailedDescription}
        helperText="You can use markdown for formatting"
        required
        rows={6}
      />
      
      <TextArea
        label="Problem Statement"
        placeholder="What problem are you solving?"
        value={formData.proposalInfo.problemStatement}
        onChange={(e) => updateFormData('proposalInfo', 'problemStatement', e.target.value)}
        onBlur={() => validateField('proposalInfo', 'problemStatement')}
        error={formErrors.proposalInfo?.problemStatement}
        helperText="Explain the problem your project addresses"
        required
        rows={4}
      />
      
      <TextArea
        label="Fund Usage"
        placeholder="How will you use the funds?"
        value={formData.proposalInfo.fundUsage}
        onChange={(e) => updateFormData('proposalInfo', 'fundUsage', e.target.value)}
        onBlur={() => validateField('proposalInfo', 'fundUsage')}
        error={formErrors.proposalInfo?.fundUsage}
        helperText="Provide a breakdown of how the funds will be allocated"
        required
        rows={4}
      />
    </FormSection>
  );
};

export default ProposalInfoStep;