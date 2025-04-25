import React from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => {
  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="mb-4 border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FormSection;