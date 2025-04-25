import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: React.ReactNode;
  error?: string;
  helperText?: string;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  helperText,
  onChange,
  checked,
  id,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  
  return (
    <div className="mb-3">
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            id={checkboxId}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            checked={checked}
            onChange={handleChange}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={checkboxId} className="text-gray-700">
            {label} {props.required && <span className="text-red-500">*</span>}
          </label>
          {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Checkbox;