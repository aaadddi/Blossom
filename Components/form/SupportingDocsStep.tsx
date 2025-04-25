import React from 'react';
import Input from '../ui/Input';
import FormSection from '../ui/FormSection';
import { SupportingDocsStepProps } from '@/types';
const SupportingDocsStep: React.FC<SupportingDocsStepProps> = ({
  formData,
  formErrors,
  updateFormData,
  validateField,
}) => {
  return (
    <FormSection
      title="Supporting Documentation"
      description="Provide additional materials to strengthen your proposal"
    >
      <Input
        label="Google Drive Link"
        placeholder="https://drive.google.com/drive/folders/..."
        value={formData.supportingDocs.googleDriveLink}
        onChange={(e) => updateFormData('supportingDocs', 'googleDriveLink', e.target.value)}
        onBlur={() => validateField('supportingDocs', 'googleDriveLink')}
        error={formErrors.supportingDocs?.googleDriveLink}
        type="url"
        helperText="Share a folder with supporting documents"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>
        }
      />
      
      <Input
        label="Demo Link"
        placeholder="https://yourwebsite.com/demo"
        value={formData.supportingDocs.demoLink}
        onChange={(e) => updateFormData('supportingDocs', 'demoLink', e.target.value)}
        onBlur={() => validateField('supportingDocs', 'demoLink')}
        error={formErrors.supportingDocs?.demoLink}
        type="url"
        helperText="Link to project demo if available"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
          </svg>
        }
      />
      
      <div className="mt-4 rounded-lg border border-dashed border-gray-300 p-6">
        <div className="flex flex-col items-center justify-center text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mb-2 h-10 w-10 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <h3 className="text-sm font-medium text-gray-700">Upload Previews</h3>
          <p className="mt-1 text-xs text-gray-500">
            In the future, you'll be able to directly upload images, PDFs, and other files here.
            <br />
            For now, please use Google Drive links to share your materials.
          </p>
        </div>
      </div>
    </FormSection>
  );
};

export default SupportingDocsStep;