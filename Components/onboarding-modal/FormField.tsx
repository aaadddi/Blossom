import React from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  optional?: boolean;
  required?: boolean;
  error?: string;
  isValid?: boolean;
  isChecking?: boolean;
  maxLength?: number;
  as?: 'input' | 'textarea';
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  optional = false,
  required = false,
  error,
  isValid,
  isChecking = false,
  maxLength,
  as = 'input'
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <label htmlFor={id} className="block text-sm font-medium text-[#333333] mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {optional && (
          <span className="text-xs text-[#6B7280]">Optional - can be updated later</span>
        )}
      </div>
      
      <div className="relative">
        {as === 'input' ? (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            required={required}
            className={`
              w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
              ${error ? 'border-red-500 focus:ring-red-200' : 
                isValid ? 'border-[#14F195] focus:ring-[#14F195]/20' : 
                'border-[#E5E7EB] focus:ring-[#9945FF]/20'}
              transition-all duration-200
            `}
          />
        ) : (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            required={required}
            className={`
              w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
              ${error ? 'border-red-500 focus:ring-red-200' : 'border-[#E5E7EB] focus:ring-[#9945FF]/20'}
              transition-all duration-200
              min-h-[100px] resize-y
            `}
          />
        )}
        
        {/* Validation indicators */}
        {isChecking && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="animate-spin h-5 w-5 text-[#6B7280]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        
        {!isChecking && isValid && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="h-5 w-5 text-[#14F195]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      
      {maxLength && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-[#6B7280]">{value.length}/{maxLength}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;