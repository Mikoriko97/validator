import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { BlogPostCard } from "@/components/blog-post-card"
import { BlogSidebar } from "@/components/blog-sidebar"
import { fetchBlockchains, fetchBlogPostsByBlockchain, fetchPopularPosts } from "@/lib/blog-service"
import { Suspense } from "react"

export const revalidate = 60 // Revalidate every minute

export async function generateStaticParams() {
  const blockchains = await fetchBlockchains()
  return blockchains.map((blockchain) => ({
    id: blockchain.id,
  }))
}

export default async function BlockchainPage({ params }: { params: { id: string } }) {
  const blockchainId = params.id

  const [blockchains, filteredPosts, popularPosts] = await Promise.all([
    fetchBlockchains(),
    fetchBlogPostsByBlockchain(blockchainId),
    fetchPopularPosts(),
  ])

  const blockchain = blockchains.find((b) => b.id === blockchainId)

  if (!blockchain) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-purple-950">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{blockchain.name} Articles</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Browse all articles related to {blockchain.name}</p>
            <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content - Blog posts */}
            <div className="lg:col-span-3">
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="h-80 rounded-lg bg-black/40 animate-pulse"></div>
                    ))}
                  </div>
                }
              >
                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 text-center">
                    <p className="text-gray-300 text-lg">No posts found for {blockchain.name}.</p>
                  </div>
                )}
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Suspense fallback={<div className="h-96 rounded-lg bg-black/40 animate-pulse"></div>}>
                <BlogSidebar
                  blockchains={blockchains}
                  selectedBlockchain={blockchainId}
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
