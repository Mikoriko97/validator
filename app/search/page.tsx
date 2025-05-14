import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { BlogPostCard } from "@/components/blog-post-card"
import { BlogSidebar } from "@/components/blog-sidebar"
import { searchBlogPosts, fetchBlockchains, fetchPopularPosts } from "@/lib/blog-service"

export const dynamic = "force-dynamic"
export const revalidate = 60 // Revalidate every minute

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.q === "string" ? searchParams.q : ""

  if (!query) {
    notFound()
  }

  const [searchResults, blockchains, popularPosts] = await Promise.all([
    searchBlogPosts(query),
    fetchBlockchains(),
    fetchPopularPosts(),
  ])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-purple-950">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Search Results</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {searchResults.length} results found for "{query}"
            </p>
            <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content - Search results */}
            <div className="lg:col-span-3">
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="h-80 rounded-lg bg-black/40 animate-pulse"></div>
                    ))}
                  </div>
                }
              >
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {searchResults.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 text-center">
                    <p className="text-gray-300 text-lg">No posts found matching your search query.</p>
                    <p className="text-gray-400 mt-2">Try using different keywords or browse our categories.</p>
                  </div>
                )}
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Suspense fallback={<div className="h-96 rounded-lg bg-black/40 animate-pulse"></div>}>
                <BlogSidebar
                  blockchains={blockchains}
                  selectedBlockchain={null}
                  selectedCategory={null}
                  popularPosts={popularPosts}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
