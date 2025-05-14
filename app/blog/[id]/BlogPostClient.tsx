"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { blogPosts, blockchains } from "@/data/blog-posts"
import { preserveEmptyParagraphs } from "@/lib/content-processor"
import { ProcessedContent } from "@/components/processed-content"

export default function BlogPostClient({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState<(typeof blogPosts)[0] | undefined>(undefined)
  const [blockchain, setBlockchain] = useState<(typeof blockchains)[0] | undefined>(undefined)

  useEffect(() => {
    // Find the post
    const foundPost = blogPosts.find((p) => p.id === params.id)
    setPost(foundPost)

    // If post exists, find the blockchain
    if (foundPost) {
      const foundBlockchain = blockchains.find((b) => b.id === foundPost.blockchain)
      setBlockchain(foundBlockchain)
    } else {
      // If post doesn't exist, redirect to home
      router.push("/")
    }
  }, [params.id, router])

  if (!post) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-purple-950">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          <div className="w-4/5 mx-auto">
            <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>

            <article className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden">
              <div className="relative h-64 md:h-96 w-full">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  {blockchain && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 relative">
                        <Image
                          src={blockchain.image || "/placeholder.svg"}
                          alt={blockchain.name}
                          fill
                          className="object-contain"
                          sizes="32px"
                        />
                      </div>
                      <span className="text-purple-300">{blockchain.name}</span>
                    </div>
                  )}
                  <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-500/50">
                    {post.category || "Uncategorized"}
                  </Badge>
                </div>

                <h1 className="text-2xl md:text-4xl font-bold mb-4">{post.title || "Untitled Post"}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date || "No date"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime || "Unknown read time"}</span>
                  </div>
                </div>

                {post.content && (
                  <ProcessedContent
                    html={preserveEmptyParagraphs(post.content)}
                    className="prose prose-invert prose-purple max-w-none blog-content"
                  />
                )}
              </div>
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
