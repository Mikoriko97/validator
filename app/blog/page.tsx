import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { fetchBlogPosts } from "@/lib/blog-service"
import { BlogPostCard } from "@/components/blog-post-card"

// Налаштування для динамічних маршрутів
export const dynamic = "force-dynamic"
export const revalidate = 0 // Не кешувати

export default async function BlogPage() {
  const posts = await fetchBlogPosts()
  const showLoadMoreButton = posts.length > 6

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-purple-950">
      <Navbar />

      <div className="relative">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          <div className="w-4/5 mx-auto">
            <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold mb-8">All Blog Posts</h1>

            {/* Змінено з grid-cols-3 на grid-cols-2 для відповідності головній сторінці */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No blog posts found.</p>
              </div>
            )}

            {/* Показуємо кнопку "Load More" тільки якщо постів більше 6 */}
            {showLoadMoreButton && (
              <div className="mt-12 flex justify-center">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition-colors duration-300">
                  Load More Posts
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
