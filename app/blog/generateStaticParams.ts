import { blogPosts } from "@/data/blog-posts"

export async function generateStaticParams() {
  return (blogPosts || []).map((post) => ({
    id: post.id,
  }))
}
