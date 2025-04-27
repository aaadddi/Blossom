import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  label: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  counter?: number;
  maxLength?: number;
  icon?: React.ReactNode;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = true,
  counter,
  maxLength,
  icon,
  id,
  value = '',
  ...props
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const hasCounter = counter !== undefined && maxLength !== undefined;
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
        
        <input
          id={inputId}
          className={`
            w-full rounded-lg border p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#9945FF]
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
          `}
          value={value}
          {...props}
          maxLength={maxLength}
        />
      </div>
      
      <div className="mt-1 flex justify-between">
        {(helperText || error) && (
          <span className={`text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>
            {error || helperText}
          </span>
        )}
        
        {hasCounter && (
          <span className={`text-xs ml-auto ${counter > (maxLength - 20) ? 'text-amber-500' : 'text-gray-500'} ${counter >= maxLength ? 'text-red-500' : ''}`}>
            {counter}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;