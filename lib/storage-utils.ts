import { getSupabaseClient } from "./supabase"

/**
 * Gets a public URL for a file in Supabase Storage
 * @param bucket The storage bucket name
 * @param path The file path within the bucket
 * @param fallbackUrl Optional fallback URL if the file doesn't exist
 * @returns The public URL for the file
 */
export async function getStorageUrl(bucket: string, path: string, fallbackUrl?: string): Promise<string> {
  try {
    const supabase = getSupabaseClient()

    if (!supabase) {
      console.warn("No Supabase client available")
      return fallbackUrl || `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(path)}`
    }

    // Get the public URL
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)

    return data.publicUrl
  } catch (err) {
    console.error("Error getting storage URL:", err)
    return fallbackUrl || `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(path)}`
  }
}

/**
 * Client-side function to get a public URL for a file in Supabase Storage
 * This doesn't check if the file exists to avoid extra API calls
 */
export function getStorageUrlClient(bucket: string, path: string, fallbackUrl?: string): string {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

    if (!supabaseUrl || !path) {
      return fallbackUrl || `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(path || "image")}`
    }

    // Construct the URL directly
    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
  } catch (err) {
    console.error("Error getting storage URL:", err)
    return fallbackUrl || `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(path || "image")}`
  }
}
