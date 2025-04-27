import React, { useState } from 'react';
import { Github, Twitter, Linkedin, Globe, MessageSquare } from 'lucide-react';
import { SocialLinksProps } from '@/types';


const SocialLinks: React.FC<SocialLinksProps> = ({ user, isEditing, onSave, onCancel }) => {
  const [editedLinks, setEditedLinks] = useState({
    github: user.socialLinks.github,
    twitter: user.socialLinks.twitter,
    linkedin: user.socialLinks.linkedin,
    website: user.socialLinks.website,
    discord: user.socialLinks.discord,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedLinks(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ socialLinks: editedLinks });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-[#E5E7EB]">
      <h2 className="text-xl font-semibold text-[#333333] mb-4">Connect</h2>
      
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div className="flex items-center">
              <Github size={20} className="text-[#6B7280] mr-3" />
              <input
                type="text"
                name="github"
                value={editedLinks.github}
                onChange={handleChange}
                placeholder="GitHub URL"
                className="flex-grow px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9945FF]"
              />
            </div>
            
            <div className="flex items-center">
              <Twitter size={20} className="text-[#6B7280] mr-3" />
              <input
                type="text"
                name="twitter"
                value={editedLinks.twitter}
                onChange={handleChange}
                placeholder="Twitter URL"
                className="flex-grow px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9945FF]"
              />
            </div>
            
            <div className="flex items-center">
              <Linkedin size={20} className="text-[#6B7280] mr-3" />
              <input
                type="text"
                name="linkedin"
                value={editedLinks.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
                className="flex-grow px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9945FF]"
              />
            </div>
            
            <div className="flex items-center">
              <Globe size={20} className="text-[#6B7280] mr-3" />
              <input
                type="text"
                name="website"
                value={editedLinks.website}
                onChange={handleChange}
                placeholder="Website URL"
                className="flex-grow px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9945FF]"
              />
            </div>
            
            <div className="flex items-center">
              <MessageSquare size={20} className="text-[#6B7280] mr-3" />
              <input
                type="text"
                name="discord"
                value={editedLinks.discord}
                onChange={handleChange}
                placeholder="Discord"
                className="flex-grow px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9945FF]"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {user.socialLinks.github && (
            <a
              href={user.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#333333] hover:text-[#9945FF] transition-colors"
            >
              <Github size={20} className="mr-2" />
              <span>GitHub</span>
            </a>
          )}
          
          {user.socialLinks.twitter && (
            <a
              href={user.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#333333] hover:text-[#9945FF] transition-colors"
            >
              <Twitter size={20} className="mr-2" />
              <span>Twitter</span>
            </a>
          )}
          
          {user.socialLinks.linkedin && (
            <a
              href={user.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#333333] hover:text-[#9945FF] transition-colors"
            >
              <Linkedin size={20} className="mr-2" />
              <span>LinkedIn</span>
            </a>
          )}
          
          {user.socialLinks.website && (
            <a
              href={user.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#333333] hover:text-[#9945FF] transition-colors"
            >
              <Globe size={20} className="mr-2" />
              <span>Website</span>
            </a>
          )}
          
          {user.socialLinks.discord && (
            <div className="flex items-center text-[#333333]">
              <MessageSquare size={20} className="mr-2" />
              <span>{user.socialLinks.discord}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SocialLinks;