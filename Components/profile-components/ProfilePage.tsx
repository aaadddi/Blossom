"use client"
import React, { useState, useEffect } from 'react';
import { User, Proposal, ProfilePageProps } from '@/types';
import ProfileHeader from './ProfileHeader';
import AboutSection from './AboutSection';
import SocialLinks from './SocialLink'; 
import ProposalsList from './ProposalList';

const ProfilePage: React.FC<ProfilePageProps> = ({ 
  user, 
  proposals, 
  isOwner = true // Default to true for demo purposes
}) => {
  const [currentUser, setCurrentUser] = useState<User>(user);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProposals, setCurrentProposals] = useState<Proposal[]>(proposals);

  useEffect(() => {
    setCurrentProposals(proposals)
  }, [proposals])

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (updatedUser: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updatedUser }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProfileHeader 
        user={currentUser} 
        isOwner={isOwner} 
        onEditProfile={handleEditProfile} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <AboutSection 
            user={currentUser} 
            isEditing={isEditing} 
            onSave={handleSaveProfile} 
            onCancel={handleCancelEdit} 
          />
          
          <SocialLinks 
            user={currentUser} 
            isEditing={isEditing} 
            onSave={handleSaveProfile} 
            onCancel={handleCancelEdit} 
          />
        </div>
        
        <div className="lg:col-span-2">
          <ProposalsList 
            proposals={currentProposals} 
            isOwner={isOwner} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;