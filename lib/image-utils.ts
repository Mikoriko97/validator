/**
 * Gets a valid image URL, handling various edge cases
 * @param url The original image URL or path
 * @param bucket The Supabase storage bucket (optional)
 * @param fallback A fallback URL to use if the original is invalid
 * @returns A valid image URL
 */
export function getValidImageUrl(url: string | null | undefined, fallback: string, bucket?: string): string {
  // If URL is empty or null, return fallback
  if (!url || url === "") {
    return fallback
  }

  // If URL already starts with http/https, it's already a full URL
  if (url.startsWith("http")) {
    return url
  }

  // If URL already contains the Supabase URL, it might be malformed
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (supabaseUrl && url.includes(supabaseUrl)) {
    // Extract the actual path from the malformed URL
    const pathMatch = url.match(new RegExp(`${supabaseUrl}/storage/v1/object/public/[^\\s]+`))
    if (pathMatch) {
      return pathMatch[0]
    }
  }

  // If we have a Supabase URL and bucket, construct a proper Supabase storage URL
  if (supabaseUrl && bucket) {
    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${url}`
  }

  // If all else fails, return the fallback
  return fallback
}

/**
 * Creates a placeholder image URL
 * @param width Width of the placeholder
 * @param height Height of the placeholder
 * @param query Text to display on the placeholder
 * @returns A placeholder image URL
 */
export function getPlaceholderImage(width: number, height: number, query: string): string {
  return `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(query)}`
}
