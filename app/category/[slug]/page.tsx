import { categories } from "@/data/blog-posts"
import { notFound } from "next/navigation"
import CategoryPageClient from "./CategoryPageClient"

export const revalidate = 60 // Revalidate every minute

export async function generateStaticParams() {
  return (categories || []).map((category) => ({
    slug: category.slug,
  }))
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((category) => category.slug === params.slug)

  if (!category) {
    notFound()
  }

  return <CategoryPageClient params={params} />
}
