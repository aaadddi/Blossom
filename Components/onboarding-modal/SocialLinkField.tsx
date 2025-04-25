import React from 'react';

interface SocialLinkFieldProps {
  platform: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const SocialLinkField: React.FC<SocialLinkFieldProps> = ({
  platform,
  icon,
  value,
  onChange,
  placeholder
}) => {
  return (
    <div className="mb-3">
      <div className="flex items-center border border-[#E5E7EB] rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#9945FF]/20 transition-all duration-200">
        <div className="bg-gray-50 p-3 text-[#6B7280]">
          {icon}
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder || `Your ${platform} URL`}
          className="flex-1 px-3 py-2 border-none focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SocialLinkField;