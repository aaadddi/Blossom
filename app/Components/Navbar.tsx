"use client"
import { useSolanaWallet } from "../Context/SolanaWalletContext";
import { useUserInfo } from '../Context/UserInfoContext';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ConnectWallet = dynamic(
  () => import('./ConnectWallet'),
  { ssr: false }
);

const Navbar = () => {
  const { isConnected } = useSolanaWallet();
  const { username } = useUserInfo();
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-800">
              FundMyWork
            </Link>
            {isConnected && (
              <div className="hidden md:flex space-x-4">
                <Link
                  href="/fund-proposals"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/fund-proposals'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Fund Proposals
                </Link>
                <Link
                  href="/my-proposals"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/my-proposals'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  My Proposals
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {isConnected && username && (
              <span className="text-gray-700 font-medium">
                Welcome, {username}!
              </span>
            )}
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;