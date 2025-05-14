import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { fetchBlogPostBySlug, fetchBlockchains } from "@/lib/blog-service"
import { getValidImageUrl, getPlaceholderImage } from "@/lib/image-utils"
import { ClientImage } from "@/components/client-image"
import { BlogRealtimeUpdates } from "@/components/blog-realtime-updates"
import { ProcessedContent } from "@/components/processed-content"
import { EnsureStyles } from "./ensure-styles"

// Налаштування для динамічних маршрутів
export const dynamic = "force-dynamic"
export const dynamicParams = true // Дозволяємо динамічні параметри, навіть якщо вони не згенеровані статично
export const revalidate = 0 // Не кешувати

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    // Перевірка, чи params.id не є undefined
    if (!params || !params.id) {
      return {
        title: "Blog Post Not Found - Unity Nodes",
        description: "The requested blog post could not be found.",
      }
    }

    const post = await fetchBlogPostBySlug(params.id)

    if (!post) {
      return {
        title: "Blog Post Not Found - Unity Nodes",
        description: "The requested blog post could not be found.",
      }
    }

    return {
      title: `${post.title} - Unity Nodes Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [
          {
            url: post.coverImage || "/blog-og-image.png",
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        type: "article",
        publishedTime: post.date,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: [post.coverImage || "/blog-og-image.png"],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Blog Post - Unity Nodes",
      description: "Unity Nodes Blog",
    }
  }
}

// Повертаємо порожній масив, але залишаємо функцію для Next.js
export async function generateStaticParams() {
  return []
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  try {
    // Перевірка, чи params.id не є undefined
    if (!params || !params.id) {
      console.error("Blog post ID is undefined")
      notFound()
    }

    const post = await fetchBlogPostBySlug(params.id)

    if (!post) {
      console.error(`Blog post with ID "${params.id}" not found`)
      notFound()
    }

    const blockchains = await fetchBlockchains()
    const blockchain = blockchains.find((b) => b.id === post.blockchain)

    // Then update the image source variables
    const fallbackPostImage = getPlaceholderImage(1200, 600, post.title || "Blog post")
    const fallbackBlockchainImage = blockchain
      ? getPlaceholderImage(32, 32, blockchain.name)
      : getPlaceholderImage(32, 32, "Blockchain")

    // Get valid image sources
    const postImageSrc = getValidImageUrl(post.coverImage, fallbackPostImage)
    const blockchainImageSrc = blockchain
      ? getValidImageUrl(blockchain.image, fallbackBlockchainImage)
      : fallbackBlockchainImage

    // Додаємо посилання на CSS файл у head
    const cssLink = `<link rel="stylesheet" href="/blog-content.css" type="text/css" />`

    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-950 to-purple-950">
        <Navbar />
        {/* Додаємо посилання на CSS файл */}
        <div dangerouslySetInnerHTML={{ __html: cssLink }} />
        <EnsureStyles />

        <div className="relative">
          <div className="absolute inset-0 grid-pattern opacity-20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
            <div className="w-4/5 mx-auto">
              <Link href="/blog" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all posts
              </Link>

              <article className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden">
                {/* Контейнер для зображення з форматом 16:9 */}
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  {" "}
                  {/* 16:9 aspect ratio */}
                  <div className="absolute inset-0 bg-black/50">
                    <ClientImage
                      src={postImageSrc || "/placeholder.svg"}
                      alt={post.title || ""}
                      fill
                      className="object-cover" // Розтягуємо зображення на весь контейнер
                      sizes="(max-width: 768px) 100vw, 80vw"
                      priority
                      fallbackSrc={fallbackPostImage}
                    />
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    {blockchain && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 relative">
                          <ClientImage
                            src={blockchainImageSrc || "/placeholder.svg"}
                            alt={blockchain.name}
                            fill
                            className="object-contain" // Для маленьких іконок залишаємо object-contain
                            sizes="32px"
                            fallbackSrc={fallbackBlockchainImage}
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

                  {/* Використовуємо оновлений компонент ProcessedContent з класом blog-content */}
                  <ProcessedContent html={post.content || ""} className="blog-content" />
                </div>
              </article>
            </div>
          </div>
        </div>
        <Footer />
        <BlogRealtimeUpdates />
      </main>
    )
  } catch (error) {
    console.error("Error rendering blog post:", error)
    notFound()
  }
}
