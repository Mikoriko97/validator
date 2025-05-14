import { categories } from "@/data/blog-posts"

export async function generateStaticParams() {
  return (categories || []).map((category) => ({
    slug: category.slug,
  }))
}
