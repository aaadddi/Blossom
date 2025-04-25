import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  counter?: number;
  maxLength?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helperText,
  fullWidth = true,
  counter,
  maxLength,
  id,
  ...props
}) => {
  const textareaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const hasCounter = counter !== undefined && maxLength !== undefined;
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      
      <textarea
        id={textareaId}
        className={`
          w-full rounded-lg border p-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
        `}
        rows={4}
        {...props}
        maxLength={maxLength}
      />
      
      <div className="mt-1 flex justify-between">
        {(helperText || error) && (
          <span className={`text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>
            {error || helperText}
          </span>
        )}
        
        {hasCounter && (
          <span className={`text-xs ml-auto ${counter > (maxLength - 30) ? 'text-amber-500' : 'text-gray-500'} ${counter >= maxLength ? 'text-red-500' : ''}`}>
            {counter}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextArea;