import { getSupabaseClient } from "./supabase"
import type { BlogPost, Blockchain } from "@/types/blog"
import { blogPosts as fallbackPostsData, blockchains as fallbackBlockchainsData } from "@/data/blog-posts"
import { getValidImageUrl } from "@/lib/image-utils"

// Get the Supabase client
const supabase = getSupabaseClient()

// Fallback data in case the database connection fails
const fallbackBlockchains = fallbackBlockchainsData
const fallbackPosts = fallbackPostsData

// Helper function to construct image URL
function getImageUrl(path: string | null | undefined, fallback: string): string {
  return getValidImageUrl(path, fallback, "blog")
}

function getPlaceholderImage(width: number, height: number, text: string): string {
  return `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(text)}`
}

// Helper function to format blog post data
function formatBlogPost(post: any): BlogPost {
  // Перевірка, чи post не є undefined або null
  if (!post) {
    console.error("Post data is undefined or null")
    return {
      id: "not-found",
      title: "Post Not Found",
      excerpt: "The requested post could not be found.",
      content: "<p>The requested post could not be found.</p>",
      coverImage: getPlaceholderImage(1200, 600, "Post not found"),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime: "1 min read",
      author: {
        name: "Unknown Author",
        avatar: getPlaceholderImage(100, 100, "person"),
      },
      blockchain: "general",
      category: "Uncategorized",
      viewCount: 0,
    }
  }

  // Process image URL
  const coverImageUrl = getImageUrl(
    post.image_url,
    `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(post.title || "Blog post")}`,
  )

  // Process author avatar
  const authorAvatarUrl = getImageUrl(post.author_avatar, `/placeholder.svg?height=100&width=100&query=person`)

  // Безпечно обробляємо category, перевіряючи на undefined
  const category = post.category || "general"
  const blockchain = typeof category === "string" ? category.toLowerCase().replace(/\s+/g, "-") : "general"

  // Безпечно обробляємо tags, перевіряючи на undefined
  const tags = Array.isArray(post.tags) ? post.tags : []
  const firstTag = tags.length > 0 ? tags[0] : "Uncategorized"

  return {
    id: post.slug || post.id || "unknown-id",
    title: post.title || "Untitled Post",
    excerpt: post.content ? post.content.substring(0, 150) + "..." : "No content available",
    content: post.content || "No content available",
    coverImage: coverImageUrl,
    date: post.publish_date
      ? new Date(post.publish_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "No date",
    readTime: post.content ? `${Math.ceil(post.content.length / 1000)} min read` : "1 min read",
    author: {
      name: post.author || "Unknown Author",
      avatar: authorAvatarUrl,
    },
    blockchain: blockchain,
    category: firstTag,
    viewCount: post.view_count || 0,
  }
}

// Fetch all blog categories (blockchains)
export async function fetchBlockchains(): Promise<Blockchain[]> {
  if (!supabase) {
    console.warn("No Supabase client available, using fallback data")
    return fallbackBlockchains
  }

  try {
    const { data, error } = await supabase.from("blog_categories").select("*")

    if (error) {
      console.error("Error fetching blockchains:", error)
      return fallbackBlockchains
    }

    if (!data || data.length === 0) {
      console.warn("No blockchains found in database, using fallback data")
      return fallbackBlockchains
    }

    // Fetch tags for each blockchain to use as categories
    try {
      const { data: tags, error: tagsError } = await supabase.from("blog_tags").select("name")

      if (tagsError) {
        console.error("Error fetching tags:", tagsError)
        return data.map((blockchain) => ({
          id: blockchain.name.toLowerCase().replace(/\s+/g, "-"),
          name: blockchain.name,
          image: getImageUrl(
            blockchain.image_url,
            `/placeholder.svg?height=100&width=100&query=${blockchain.name} logo`,
          ),
          categories: ["General"],
        }))
      }

      return data.map((blockchain) => ({
        id: blockchain.name.toLowerCase().replace(/\s+/g, "-"),
        name: blockchain.name,
        image: getImageUrl(blockchain.image_url, `/placeholder.svg?height=100&width=100&query=${blockchain.name} logo`),
        categories: tags?.map((tag) => tag.name) || ["General"],
      }))
    } catch (err) {
      console.error("Error processing blockchain data:", err)
      return fallbackBlockchains
    }
  } catch (err) {
    console.error("Error fetching blockchains:", err)
    return fallbackBlockchains
  }
}

// Fetch all blog posts
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("publish_date", { ascending: false })

    if (error) {
      console.error("Error fetching blog posts:", error)
      return fallbackPosts
    }

    if (!data || data.length === 0) {
      console.warn("No blog posts found in database, using fallback data")
      return fallbackPosts
    }

    return data.map(formatBlogPost)
  } catch (err) {
    console.error("Error fetching blog posts:", err)
    return fallbackPosts
  }
}

// Fetch popular posts (based on view count)
export async function fetchPopularPosts() {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, title, publish_date, image_url, view_count")
      .eq("published", true)
      .order("view_count", { ascending: false })
      .limit(5)

    if (error) {
      console.error("Error fetching popular posts:", error)
      return fallbackPosts.map((post) => ({
        id: post.id,
        title: post.title,
        date: post.date,
        viewCount: 0,
      }))
    }

    if (!data || data.length === 0) {
      console.warn("No popular posts found in database, using fallback data")
      return fallbackPosts.map((post) => ({
        id: post.id,
        title: post.title,
        date: post.date,
        viewCount: 0,
      }))
    }

    return data.map((post) => {
      return {
        id: post.slug || "",
        title: post.title || "Untitled Post",
        date: post.publish_date
          ? new Date(post.publish_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "No date",
        viewCount: post.view_count || 0,
      }
    })
  } catch (err) {
    console.error("Error fetching popular posts:", err)
    return fallbackPosts.map((post) => ({
      id: post.id,
      title: post.title,
      date: post.date,
      viewCount: 0,
    }))
  }
}

// Fetch latest posts
export async function fetchLatestPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("publish_date", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching latest posts:", error)
      return fallbackPosts.slice(0, limit)
    }

    if (!data || data.length === 0) {
      console.warn("No latest posts found in database, using fallback data")
      return fallbackPosts.slice(0, limit)
    }

    return data.map(formatBlogPost)
  } catch (err) {
    console.error("Error fetching latest posts:", err)
    return fallbackPosts.slice(0, limit)
  }
}

// Search blog posts
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  if (!query || query.trim() === "") {
    return []
  }

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order("publish_date", { ascending: false })

    if (error) {
      console.error("Error searching blog posts:", error)
      // Fallback to client-side search
      return fallbackPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (!data || data.length === 0) {
      return []
    }

    return data.map(formatBlogPost)
  } catch (err) {
    console.error("Error searching blog posts:", err)
    // Fallback to client-side search
    return fallbackPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()),
    )
  }
}

// Fetch all categories
export async function fetchCategories() {
  try {
    const { data, error } = await supabase.from("blog_tags").select("*")

    if (error) {
      console.error("Error fetching categories:", error)
      return [
        { name: "Technology", slug: "technology", count: 2 },
        { name: "Ecosystem", slug: "ecosystem", count: 1 },
      ]
    }

    if (!data || data.length === 0) {
      console.warn("No categories found in database, using fallback data")
      return [
        { name: "Technology", slug: "technology", count: 2 },
        { name: "Ecosystem", slug: "ecosystem", count: 1 },
      ]
    }

    // Count posts for each category
    try {
      return await Promise.all(
        data.map(async (category) => {
          try {
            const { count } = await supabase
              .from("blog_posts")
              .select("*", { count: "exact", head: true })
              .contains("tags", [category.name])
              .eq("published", true)

            return {
              name: category.name,
              slug: category.name.toLowerCase().replace(/\s+/g, "-"),
              count: count || 0,
            }
          } catch (err) {
            console.error(`Error counting posts for category ${category.name}:`, err)
            return {
              name: category.name,
              slug: category.name.toLowerCase().replace(/\s+/g, "-"),
              count: 0,
            }
          }
        }),
      )
    } catch (err) {
      console.error("Error processing categories:", err)
      return [
        { name: "Technology", slug: "technology", count: 2 },
        { name: "Ecosystem", slug: "ecosystem", count: 1 },
      ]
    }
  } catch (err) {
    console.error("Error fetching categories:", err)
    return [
      { name: "Technology", slug: "technology", count: 2 },
      { name: "Ecosystem", slug: "ecosystem", count: 1 },
    ]
  }
}

// Fetch a single blog post by slug
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log(`Fetching blog post with slug: ${slug}`)

    // Перевірка, чи slug не є undefined або null
    if (!slug) {
      console.error("Blog post slug is undefined or null")
      return null
    }

    // Спочатку перевіряємо, чи є пост у fallback даних
    const fallbackPost = fallbackPosts.find((post) => post.id === slug)

    // Якщо Supabase недоступний, повертаємо fallback дані
    if (!supabase) {
      console.warn("No Supabase client available, using fallback data")
      return fallbackPost || null
    }

    // Видаляємо метод headers, який викликає помилку
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()

    if (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error)

      // Якщо помилка пов'язана з відсутністю поста, перевіряємо fallback дані
      if (error.code === "PGRST116") {
        console.log(`Post with slug ${slug} not found in database, checking fallback data`)
        return fallbackPost || null
      }

      // Для інших помилок також повертаємо fallback дані
      return fallbackPost || null
    }

    if (!data) {
      console.warn(`No blog post found with slug ${slug}, checking fallback data`)
      return fallbackPost || null
    }

    // Increment view count
    try {
      await supabase
        .from("blog_posts")
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq("slug", slug)
    } catch (err) {
      console.error("Error incrementing view count:", err)
    }

    return formatBlogPost(data)
  } catch (err) {
    console.error(`Error in fetchBlogPostBySlug for slug ${slug}:`, err)
    const fallbackPost = fallbackPosts.find((post) => post.id === slug)
    return fallbackPost || null
  }
}

// Fetch blog posts by blockchain
export async function fetchBlogPostsByBlockchain(blockchainId: string): Promise<BlogPost[]> {
  try {
    // First get the actual blockchain name from the ID
    const blockchainName = blockchainId.replace(/-/g, " ")

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("category", blockchainName)
      .eq("published", true)
      .order("publish_date", { ascending: false })

    if (error) {
      console.error("Error fetching blog posts by blockchain:", error)
      return fallbackPosts.filter((post) => post.blockchain === blockchainId)
    }

    if (!data || data.length === 0) {
      console.warn(`No blog posts found for blockchain ${blockchainId}, using fallback data`)
      return fallbackPosts.filter((post) => post.blockchain === blockchainId)
    }

    return data.map(formatBlogPost)
  } catch (err) {
    console.error("Error fetching blog posts by blockchain:", err)
    return fallbackPosts.filter((post) => post.blockchain === blockchainId)
  }
}

// Fetch blog posts by category
export async function fetchBlogPostsByCategory(blockchainId: string, category: string): Promise<BlogPost[]> {
  try {
    const categoryName = category.replace(/-/g, " ")

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .contains("tags", [categoryName])
      .order("publish_date", { ascending: false })

    if (error) {
      console.error("Error fetching blog posts by category:", error)
      return fallbackPosts.filter(
        (post) => post.blockchain === blockchainId && post.category.toLowerCase() === category.toLowerCase(),
      )
    }

    if (!data || data.length === 0) {
      console.warn(`No blog posts found for category ${category}, using fallback data`)
      return fallbackPosts.filter(
        (post) => post.blockchain === blockchainId && post.category.toLowerCase() === category.toLowerCase(),
      )
    }

    return data.map(formatBlogPost)
  } catch (err) {
    console.error("Error fetching blog posts by category:", err)
    return fallbackPosts.filter(
      (post) => post.blockchain === blockchainId && post.category.toLowerCase() === category.toLowerCase(),
    )
  }
}
