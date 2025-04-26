import React, { useState, useRef, KeyboardEvent } from 'react';

interface TagInputProps {
  label: string;
  value: string[];
  onChange: (tags: string[]) => void;
  onBlur?: () => void;
  error?: string;
  helperText?: string;
  maxLength?: number;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  maxLength,
  placeholder = 'Enter tags separated by commas',
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      // Remove last tag when backspace is pressed and input is empty
      const newTags = [...value];
      newTags.pop();
      onChange(newTags);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !value.includes(trimmedValue)) {
      onChange([...value, trimmedValue]);
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = value.filter((_, index) => index !== indexToRemove);
    onChange(newTags);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className={`flex flex-wrap gap-2 p-2 border rounded-md ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus-within:ring-2 focus-within:ring-[#9945FF] focus-within:border-[#9945FF] bg-white`}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-[#9945FF]/10 text-[#9945FF] border border-[#9945FF]/20"
          >
            {tag}
            <button
              type="button"
              className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-[#9945FF]/20 transition-colors duration-200"
              onClick={() => removeTag(index)}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (inputValue.trim()) {
              addTag();
            }
            onBlur?.();
          }}
          placeholder={value.length === 0 ? placeholder : ''}
          maxLength={maxLength}
          className="flex-1 min-w-[120px] outline-none bg-transparent text-gray-900 placeholder-gray-400"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default TagInput; 