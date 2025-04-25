import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ProfileHeaderProps } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { formatMonthYear } from '@/lib/utils';

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isOwner, onEditProfile }) => {
  const [copied, setCopied] = useState(false);

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(user.walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Shorten the wallet address for display
  const shortenAddress = (address: string) => {
    const start = address.substring(0, 4);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-shrink-0">
          <Avatar className="w-28 h-28 rounded-full object-cover border-2 border-gray-100">
            <AvatarImage src={user?.profileImage || "/placeholder.svg"} alt={user?.username || ""} />
            <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-2xl">
              {user?.name?.substring(0, 2).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>


        <div className="flex-grow text-center md:text-left">
          <h1 className="text-2xl font-bold text-[#333333] mb-1">{user.name}</h1>

          <div className="flex items-center justify-center md:justify-start text-[#6B7280] mb-4">
            <span className="font-mono mr-2">{shortenAddress(user.walletAddress)}</span>
            <button
              onClick={copyWalletAddress}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Copy wallet address"
            >
              {copied ? (
                <Check size={16} className="text-[#14F195]" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>

          {isOwner && (
            <button
              onClick={onEditProfile}
              className="px-4 py-2 bg-[#9945FF] text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors mb-4"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-[#E5E7EB]">
        <div className="text-center">
          <p className="text-lg font-bold text-[#333333]">{formatNumber(user.proposalsCreated)}</p>
          <p className="text-sm text-[#6B7280]">Proposals</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-[#333333]">${formatNumber(user.totalFundingReceived)}</p>
          <p className="text-sm text-[#6B7280]">Funding Received</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-[#333333]">{formatMonthYear(user.joinedDate)}</p>
          <p className="text-sm text-[#6B7280]">Joined</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;