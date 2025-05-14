"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      }
    },
    [searchQuery, router],
  )

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full px-4 py-2 pr-10 bg-gray-900/50 border border-purple-500/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  )
}
