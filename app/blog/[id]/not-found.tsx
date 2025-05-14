import Link from "next/link"
import { ArrowLeft, Search, RefreshCw, Home, BookOpen } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SearchForm } from "@/components/search-form"
import { fetchLatestPosts } from "@/lib/blog-service"
import { ClientImage } from "@/components/client-image"
import { getPlaceholderImage } from "@/lib/image-utils"

export default async function BlogPostNotFound() {
  // Отримуємо останні пости для рекомендацій
  const latestPosts = await fetchLatestPosts(4)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-purple-950">
      <Navbar />

      <div className="relative">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>

            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center mb-8">
                <div className="w-32 h-32 flex-shrink-0 bg-purple-900/50 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-8">
                  <RefreshCw className="h-16 w-16 text-purple-400 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
                    Oops! Blog Post Not Found
                  </h1>
                  <p className="text-gray-300 mb-4 text-center md:text-left">
                    The blog post you're looking for doesn't exist or has been moved to a different location.
                  </p>
                  <p className="text-purple-300 text-center md:text-left">Error 404 - Page Not Found</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Link
                  href="/blog"
                  className="flex items-center justify-center p-4 bg-purple-900/30 hover:bg-purple-800/40 border border-purple-500/30 rounded-lg transition-colors group"
                >
                  <BookOpen className="h-5 w-5 mr-2 text-purple-400 group-hover:text-purple-300" />
                  <span>Browse All Blog Posts</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center justify-center p-4 bg-purple-900/30 hover:bg-purple-800/40 border border-purple-500/30 rounded-lg transition-colors group"
                >
                  <Home className="h-5 w-5 mr-2 text-purple-400 group-hover:text-purple-300" />
                  <span>Return to Homepage</span>
                </Link>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Search className="h-5 w-5 mr-2 text-purple-400" />
                  Looking for something specific?
                </h2>
                <SearchForm />
              </div>
            </div>

            {/* Рекомендовані пости */}
            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden p-8">
              <h2 className="text-xl font-semibold mb-6">You might be interested in these posts</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`} className="group">
                    <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg overflow-hidden hover:border-purple-500/40 transition-colors">
                      <div className="relative h-40 w-full">
                        <ClientImage
                          src={post.coverImage || getPlaceholderImage(600, 400, post.title)}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          fallbackSrc={getPlaceholderImage(600, 400, post.title)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="flex justify-between items-center mt-2 text-sm">
                          <span className="text-gray-400">{post.date}</span>
                          <span className="text-purple-400">{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link href="/blog" className="inline-flex items-center text-purple-400 hover:text-purple-300">
                  View all blog posts
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
