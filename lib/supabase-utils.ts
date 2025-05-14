/**
 * Constructs a URL for a file in Supabase Storage
 * @param bucket The storage bucket name
 * @param path The file path within the bucket
 * @param fallbackUrl Optional fallback URL if the path is empty
 * @returns The public URL for the file
 */
export function getSupabaseStorageUrl(bucket: string, path: string | null | undefined, fallbackUrl?: string): string {
  if (!path) {
    return fallbackUrl || "/placeholder.svg"
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    return fallbackUrl || "/placeholder.svg"
  }

  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
}
