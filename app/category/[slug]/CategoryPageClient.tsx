"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { BlogPostCard } from "@/components/blog-post-card"
import { BlogSidebar } from "@/components/blog-sidebar"
import { blogPosts, categories, blockchains, popularPosts } from "@/data/blog-posts"

export default function CategoryPageClient({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const categorySlug = params.slug

  // Find the category
  const category = categories.find((category) => category.slug === categorySlug)

  // Filter posts by category
  const filteredPosts = blogPosts.filter((post) => post.category?.toLowerCase() === category?.name?.toLowerCase())

  // Handle blockchain selection
  const handleSelectBlockchain = useCallback(
    (id: string | null) => {
      if (id) {
        setIsLoading(true)
        router.push(`/blockchain/${id}`)
      } else {
        setIsLoading(true)
        router.push("/")
      }
    },
    [router],
  )

  // Handle category selection
  const handleSelectCategory = useCallback(
    (cat: string | null) => {
      if (cat && typeof cat === "string") {
        const blockchainId = blockchains.find((b) => b.categories.includes(cat))?.id
        if (blockchainId) {
          setIsLoading(true)
          router.push(`/blockchain/${blockchainId}/category/${cat.toLowerCase()}`)
        } else {
          // If no blockchain is associated with this category, just go to the category page
          setIsLoading(true)
          const categorySlug = categories.find((c) => c.name === cat)?.slug
          if (categorySlug) {
            router.push(`/category/${categorySlug}`)
          }
        }
      }
    },
    [router],
  )

  // If category doesn't exist, redirect to home
  useEffect(() => {
    if (!category) {
      router.push("/")
    }
  }, [category, router])

  // Reset loading state when component mounts
  useEffect(() => {
    setIsLoading(false)
  }, [categorySlug])

  if (!category) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-purple-950">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{category.name}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Browse all articles in the {category.name} category
            </p>
            <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content - Blog posts */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="h-80 rounded-lg bg-black/40 animate-pulse"></div>
                  ))}
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 text-center">
                  <p className="text-gray-300 text-lg">No posts found in this category.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar
                blockchains={blockchains}
                selectedBlockchain={null}
                selectedCategory={category.name}
                onSelectBlockchain={handleSelectBlockchain}
                onSelectCategory={handleSelectCategory}
                popularPosts={popularPosts}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
