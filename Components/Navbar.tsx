"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Sprout } from "lucide-react"
import { useUser } from "@/Context/UserContext"
import { useSolanaWallet } from "@/Context/SolanaWalletContext"
import dynamic from 'next/dynamic'

import { Button } from "@/Components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"

// Dynamically import WalletMultiButton with no SSR
const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isConnected } = useSolanaWallet()
  const { user } = useUser()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-gray-950/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-2 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-6">
          <div className="flex items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-blue-500 p-1.5 text-white">
            <Sprout className="h-5 w-5" />
          </div>
          <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Fund my work
          </span>
        </Link>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {mounted && (
            isConnected ? (
              <div className="flex items-center gap-4">
                <Link href={`/profile/${user?.username}`} className="flex items-center gap-2 border rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.profileImage || "/placeholder.svg"} alt={user?.username || ""} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs">
                      {user?.username?.substring(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user?.username || "User"}</span>
                </Link>
                <div className="wallet-adapter-button-trigger">
                  <WalletMultiButton />
                </div>
              </div>
            ) : (
              <div className="wallet-adapter-button-trigger">
                <WalletMultiButton />
              </div>
            )
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="rounded-full">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px]">
            <div className="flex flex-col gap-6 pt-6">
              <Link
                href="/fund-proposals"
                className="text-lg font-medium transition-colors hover:text-purple-600"
                onClick={() => setIsOpen(false)}
              >
                Fund Proposals
              </Link>
              <Link
                href="/my-proposals"
                className="text-lg font-medium transition-colors hover:text-purple-600"
                onClick={() => setIsOpen(false)}
              >
                My Proposals
              </Link>
              <div className="flex flex-col gap-3 pt-4">
                {mounted && (
                  isConnected ? (
                    <div className="flex flex-col gap-4">
                      <Link
                        href={`/profile/${user?.username}`}
                        className="flex items-center gap-2 border rounded-full px-3 py-2 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user?.profileImage || "/placeholder.svg"} alt={user?.username || ""} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs">
                            {user?.username?.substring(0, 2).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{user?.username || "User"}</span>
                      </Link>
                      <div className="wallet-adapter-button-trigger">
                        <WalletMultiButton />
                      </div>
                    </div>
                  ) : (
                    <div className="wallet-adapter-button-trigger">
                      <WalletMultiButton />
                    </div>
                  )
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}