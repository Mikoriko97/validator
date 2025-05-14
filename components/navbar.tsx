"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-purple-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/unity-nodes-logo.png" alt="Unity Nodes Logo" width={32} height={32} className="w-8 h-8" />
              <span className="text-2xl font-bold text-white">Unity Nodes</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="https://faucet.unitynodes.com/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold transition-colors"
              >
                Faucet
              </Link>
              <Link
                href="https://project.unitynodes.com/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold transition-colors"
              >
                Project
              </Link>
              <Link
                href="https://events.unitynodes.com/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold transition-colors"
              >
                Events
              </Link>
              <Link
                href="https://blog.unitynodes.com/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/90 backdrop-blur-md">
            <Link
              href="#ecosystems"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Faucet
            </Link>
            <Link
              href="#services"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Ambassador
            </Link>
            <Link
              href="#partners"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Ivents and Merch
            </Link>
            <Link
              href="#partners"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Service
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
