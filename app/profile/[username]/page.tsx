'use client'
import React, { useEffect, useState } from 'react';
import { User, Proposal } from '@/types';
import ProfileHeader from '@/Components/profile-components/ProfileHeader';
import AboutSection from '@/Components/profile-components/AboutSection';
import SocialLinks from '@/Components/profile-components/SocialLink'; 
import ProposalsList from '@/Components/profile-components/ProposalList';
import { useParams } from 'next/navigation';
import { getUserByUsername } from '@/supabase/Calls';
import { useUser } from '@/Context/UserContext';
import { useSolanaWallet } from '@/Context/SolanaWalletContext';

//TODO: get user and proposals from database
const proposalsfetched: Proposal[] = [] 

export default function ProfilePage() {
  const {isConnected} = useSolanaWallet();
  const [currentUser, setCurrentUser] = useState<User>();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProposals, setCurrentProposals] = useState<Proposal[]>([]);
  const { username } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const {user} = useUser();

  useEffect(() => {

    setCurrentProposals(proposalsfetched)
    if(username === user?.username) {
      setCurrentUser(user as User);
      setIsOwner(true);
      return;
    }

    const fetchUser = async () => {
      const user = await getUserByUsername(username as string);
      setCurrentUser(user as User);
    };
    fetchUser();
  }, [username, user]);
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (updatedUser: Partial<User>) => {
    console.log(updatedUser)
    // setCurrentUser(prev => ({ ...prev, ...updatedUser }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return isConnected ? (
    currentUser && (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProfileHeader 
        user={ currentUser } 
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
    )
  ) : (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center text-gray-500">
        Please connect your wallet to view this page.
      </div>
    </div>
  );
};