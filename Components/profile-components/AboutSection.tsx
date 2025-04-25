import React, { useState } from 'react';
import { AboutSectionProps } from '@/types';


const AboutSection: React.FC<AboutSectionProps> = ({ user, isEditing, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState({
    bio: user.bio,
    location: user.location,
    profession: user.profession,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedUser);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-[#E5E7EB]">
      <h2 className="text-xl font-semibold text-[#333333] mb-4">About</h2>
      
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="profession" className="block text-sm font-medium text-[#6B7280] mb-1">
              Profession
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={editedUser.profession}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9945FF]"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-[#6B7280] mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={editedUser.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9945FF]"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-[#6B7280] mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={editedUser.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9945FF]"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-[#E5E7EB] rounded-md text-[#6B7280] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#9945FF] text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex items-center mb-2">
            <p className="text-[#6B7280] font-medium">{user.profession}</p>
            {user.location && (
              <>
                <span className="mx-2 text-[#E5E7EB]">•</span>
                <p className="text-[#6B7280]">{user.location}</p>
              </>
            )}
          </div>
          
          <p className="text-[#333333] whitespace-pre-line">{user.bio}</p>
        </div>
      )}
    </div>
  );
};

export default AboutSection;