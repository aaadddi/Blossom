import React, { useState } from 'react';

interface AvatarUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({ value, onChange }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Simulated upload function
  const handleUpload = () => {
    // In a real app, this would be an actual file upload
    // For this demo, we'll just set a placeholder avatar
    const placeholderAvatar = 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=300';
    onChange(placeholderAvatar);
  };
  
  // Remove the avatar
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };
  
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="relative">
        <div
          onClick={handleUpload}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="w-24 h-24 rounded-full flex items-center justify-center border-2 border-dashed border-[#E5E7EB] hover:border-[#9945FF] transition-colors duration-200 cursor-pointer overflow-hidden"
        >
          {value ? (
            <>
              <img src={value} alt="Profile" className="w-full h-full object-cover" />
              {isHovering && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white transition-opacity duration-200">
                  <span>Change</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-[#6B7280] flex flex-col items-center justify-center p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-xs text-center">Add Profile Photo</span>
            </div>
          )}
        </div>
        
        {value && (
          <button
            onClick={handleRemove}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <p className="text-xs text-[#6B7280] mt-2">
        Optional profile picture
      </p>
    </div>
  );
};

export default AvatarUpload;