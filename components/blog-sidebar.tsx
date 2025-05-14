"use client"

import { memo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchForm } from "@/components/search-form"
import { BlockchainCategoryAccordion } from "@/components/blockchain-category-accordion"
import Link from "next/link"
import type { Blockchain, PopularPost } from "@/types/blog"

interface BlogSidebarProps {
  blockchains: Blockchain[]
  selectedBlockchain: string | null
  selectedCategory: string | null
  popularPosts: PopularPost[]
}

function BlogSidebarComponent({ blockchains, selectedBlockchain, selectedCategory, popularPosts }: BlogSidebarProps) {
  const router = useRouter()

  const handleSelectBlockchain = (blockchainId: string | null) => {
    if (blockchainId) {
      router.push(`/blockchain/${blockchainId}`)
    } else {
      router.push("/")
    }
  }

  const handleSelectCategory = (category: string | null) => {
    if (category && selectedBlockchain) {
      router.push(`/blockchain/${selectedBlockchain}/category/${category.toLowerCase().replace(/\s+/g, "-")}`)
    } else if (category) {
      // Find the first blockchain that has this category
      const blockchain = blockchains.find((b) => b.categories.includes(category))
      if (blockchain) {
        router.push(`/blockchain/${blockchain.id}/category/${category.toLowerCase().replace(/\s+/g, "-")}`)
      } else {
        router.push(`/category/${category.toLowerCase().replace(/\s+/g, "-")}`)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="border border-purple-500/30 bg-black/40 backdrop-blur-sm">
        <CardContent className="p-4">
          <SearchForm />
        </CardContent>
      </Card>

      {/* Blockchain Category Accordion */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-3 gradient-text">Blockchains & Categories</h3>
        <BlockchainCategoryAccordion
          blockchains={blockchains}
          selectedBlockchain={selectedBlockchain}
          selectedCategory={selectedCategory}
          onSelectBlockchain={handleSelectBlockchain}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* Popular Posts */}
      <Card className="border border-purple-500/30 bg-black/40 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl gradient-text">Popular Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularPosts && popularPosts.length > 0 ? (
              popularPosts.slice(0, 5).map((post) => (
                <Link href={`/blog/${post.id}`} key={post.id} className="block group">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                        {post.title || "Untitled Post"}
                      </h4>
                      <p className="text-sm text-gray-500">{post.date || "No date"}</p>
                    </div>
                    {post.viewCount !== undefined && (
                      <div className="ml-2 px-2 py-1 bg-purple-900/30 rounded-md text-purple-300 text-sm font-medium">
                        {post.viewCount}
                      </div>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-400">No popular posts available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const BlogSidebar = memo(BlogSidebarComponent)
