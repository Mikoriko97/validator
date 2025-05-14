export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  readTime: string
  author: {
    name: string
    avatar: string
  }
  blockchain: string
  category: string
  viewCount?: number
}

export interface Blockchain {
  id: string
  name: string
  image: string
  categories: string[]
}

export interface Category {
  name: string
  slug: string
  count: number
}

export interface PopularPost {
  id: string
  title: string
  date: string
  viewCount?: number
}
