import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ClientImage } from "@/components/client-image"
import type { BlogPost } from "@/types/blog"
import { getPlaceholderImage } from "@/lib/image-utils"

interface LatestNewsSectionProps {
  latestPosts: BlogPost[]
}

export function LatestNewsSection({ latestPosts }: LatestNewsSectionProps) {
  if (!latestPosts || latestPosts.length === 0) {
    return null
  }

  const mainPost = latestPosts[0]
  const otherPosts = latestPosts.slice(1)

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold gradient-text">Latest News</h2>
        <Link href="/latest" className="text-purple-400 hover:text-purple-300 flex items-center transition-colors">
          View all <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main featured post */}
        <div className="lg:col-span-2">
          <Link href={`/blog/${mainPost.id}`} className="block group">
            <div className="relative h-80 w-full overflow-hidden rounded-lg">
              <ClientImage
                src={mainPost.coverImage || getPlaceholderImage(800, 400, mainPost.title)}
                alt={mainPost.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
                fallbackSrc={getPlaceholderImage(800, 400, mainPost.title)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500/30 text-purple-100 border border-purple-500/20">
                    {mainPost.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">
                  {mainPost.title}
                </h3>
                <p className="text-gray-300 mt-2 line-clamp-2">{mainPost.excerpt}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-400 text-sm">{mainPost.date}</span>
                  <span className="text-purple-400 text-sm">{mainPost.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Other recent posts */}
        <div className="space-y-6">
          {otherPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block group">
              <div className="flex gap-4">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                  <ClientImage
                    src={post.coverImage || getPlaceholderImage(200, 200, post.title)}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="96px"
                    fallbackSrc={getPlaceholderImage(200, 200, post.title)}
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-400 text-xs">{post.date}</span>
                    <span className="text-purple-400 text-xs">{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
