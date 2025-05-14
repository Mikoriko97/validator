"use client"

import { memo } from "react"
import Link from "next/link"
import { Calendar } from "lucide-react"
import type { BlogPost } from "@/data/blog-posts"
import { getValidImageUrl, getPlaceholderImage } from "@/lib/image-utils"
import { ClientImage } from "@/components/client-image"

interface BlogPostCardProps {
  post: BlogPost
}

function BlogPostCardComponent({ post }: BlogPostCardProps) {
  // Ensure post exists and has all required properties
  if (!post) {
    return null
  }

  // Create fallback image
  const fallbackImage = getPlaceholderImage(600, 400, post.title || "Blog post")

  // Get valid image source
  const imageSrc = getValidImageUrl(post.coverImage, fallbackImage)

  return (
    <Link href={`/blog/${post.id}`} className="block h-full">
      <div className="relative h-80 w-full overflow-hidden rounded-lg group transition-transform duration-300 hover:scale-[1.02]">
        {/* Фоновий шар для кращого контрасту */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        {/* Зображення, розтягнуте на всю карточку */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <ClientImage
            src={imageSrc || fallbackImage}
            alt={post.title || "Blog post"}
            fill
            className="object-cover w-full h-full" // Змінено на object-cover для розтягування
            sizes="(max-width: 768px) 100vw, 50vw"
            fallbackSrc={fallbackImage}
          />
        </div>

        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 z-10"></div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          {/* Category Badge - small and subtle */}
          <div className="mb-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500/30 text-purple-100 border border-purple-500/20">
              {post.category || "Uncategorized"}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-200 transition-colors duration-300 line-clamp-2">
            {post.title || "Untitled Post"}
          </h3>

          {/* Date only - author removed */}
          <div className="flex items-center justify-end text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{post.date || "No date"}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const BlogPostCard = memo(BlogPostCardComponent)
