import Link from "next/link"
import { ArrowLeft, Search, Home, Compass, BookOpen, Mail } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SearchForm } from "@/components/search-form"

export default function NotFound() {
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
              <div className="text-center mb-8">
                <h1 className="text-6xl md:text-8xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  404
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  The page you are looking for might have been removed, had its name changed, or is temporarily
                  unavailable.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Link
                  href="/"
                  className="flex flex-col items-center justify-center p-4 bg-purple-900/30 hover:bg-purple-800/40 border border-purple-500/30 rounded-lg transition-colors group"
                >
                  <Home className="h-6 w-6 mb-2 text-purple-400 group-hover:text-purple-300" />
                  <span>Homepage</span>
                </Link>
                <Link
                  href="/blog"
                  className="flex flex-col items-center justify-center p-4 bg-purple-900/30 hover:bg-purple-800/40 border border-purple-500/30 rounded-lg transition-colors group"
                >
                  <BookOpen className="h-6 w-6 mb-2 text-purple-400 group-hover:text-purple-300" />
                  <span>Blog</span>
                </Link>
                <Link
                  href="/#ecosystems"
                  className="flex flex-col items-center justify-center p-4 bg-purple-900/30 hover:bg-purple-800/40 border border-purple-500/30 rounded-lg transition-colors group"
                >
                  <Compass className="h-6 w-6 mb-2 text-purple-400 group-hover:text-purple-300" />
                  <span>Ecosystems</span>
                </Link>
                <Link
                  href="/#contact"
                  className="flex flex-col items-center justify-center p-4 bg-purple-900/30 hover:bg-purple-800/40 border border-purple-500/30 rounded-lg transition-colors group"
                >
                  <Mail className="h-6 w-6 mb-2 text-purple-400 group-hover:text-purple-300" />
                  <span>Contact</span>
                </Link>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-4 flex items-center justify-center">
                  <Search className="h-5 w-5 mr-2 text-purple-400" />
                  Try searching for what you need
                </h2>
                <SearchForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
