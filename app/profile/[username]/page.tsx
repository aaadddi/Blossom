"use client"
import { useParams } from 'next/navigation';
import { useSolanaWallet } from '../../../Context/SolanaWalletContext';
import { useUserInfo } from '../../../Context/UserInfoContext';
import Navbar from '@/Components/Navbar';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserCircle, Twitter, Github, Globe, Edit, Eye, EyeOff } from 'lucide-react';

interface Proposal {
  id: string;
  hex_id: string;
  title: string;
  description: string;
  amount_requested: number;
  amount_received: number;
  fully_funded: boolean;
  category: string;
  image_url: string;
  tags: string[];
}

export default function ProfilePage() {
  const { username } = useParams();
  const { isConnected } = useSolanaWallet();
  const { userInfo, updateUserInfo } = useUserInfo();
  const [isLoading, setIsLoading] = useState(true);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [showWalletAddress, setShowWalletAddress] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    title: '',
    bio: '',
    twitter: '',
    github: '',
    website: ''
  });

  useEffect(() => {
    if (userInfo) {
      setEditForm({
        name: userInfo.name || '',
        title: userInfo.title || '',
        bio: userInfo.bio || '',
        twitter: userInfo.social_handles?.twitter || '',
        github: userInfo.social_handles?.github || '',
        website: userInfo.social_handles?.website || ''
      });
      setIsLoading(false);
    }
  }, [userInfo]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserInfo({
        name: editForm.name,
        title: editForm.title,
        bio: editForm.bio,
        social_handles: {
          twitter: editForm.twitter,
          github: editForm.github,
          website: editForm.website
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">User not found</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <UserCircle className="w-16 h-16" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Blockchain Developer, Designer, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Twitter</label>
                    <input
                      type="text"
                      value={editForm.twitter}
                      onChange={(e) => setEditForm({...editForm, twitter: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">GitHub</label>
                    <input
                      type="text"
                      value={editForm.github}
                      onChange={(e) => setEditForm({...editForm, github: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Website</label>
                    <input
                      type="text"
                      value={editForm.website}
                      onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">{userInfo.name}</h1>
                      <p className="text-gray-600">@{userInfo.username}</p>
                      {userInfo.title && (
                        <p className="text-gray-500 mt-1">{userInfo.title}</p>
                      )}
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="mt-4 text-gray-600">{userInfo.bio}</p>
                  
                  <div className="mt-4 flex space-x-4">
                    {userInfo.social_handles?.twitter && (
                      <a
                        href={`https://twitter.com/${userInfo.social_handles.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                      >
                        <Twitter className="w-4 h-4" />
                        <span>Twitter</span>
                      </a>
                    )}
                    {userInfo.social_handles?.github && (
                      <a
                        href={`https://github.com/${userInfo.social_handles.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {userInfo.social_handles?.website && (
                      <a
                        href={userInfo.social_handles.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800">Previous Fundings</h2>
              <p className="text-2xl font-bold text-blue-600">{userInfo.previous_fundings}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800">Created Proposals</h2>
              <p className="text-2xl font-bold text-blue-600">{userInfo.created_proposals}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Wallet Address</h2>
                <button
                  onClick={() => setShowWalletAddress(!showWalletAddress)}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {showWalletAddress ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {showWalletAddress ? (
                <p className="text-sm font-medium text-gray-800 break-all">{userInfo.wallet_addr}</p>
              ) : (
                <p className="text-sm font-medium text-gray-800">••••••••••••••••</p>
              )}
            </div>
          </div>

          {isConnected && (
            <div className="mt-8">
              <Link
                href={`/my-proposals`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                View My Proposals
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 