/**
 * Logs image URL information to help debug image loading issues
 * @param url The image URL to debug
 * @param context Additional context about where this image is being used
 */
export function debugImageUrl(url: string, context: string): void {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Image Debug] ${context}:`, {
      url,
      isAbsolute: url.startsWith("http"),
      isSupabase: url.includes("supabase"),
      isPlaceholder: url.includes("placeholder"),
      urlLength: url.length,
    })
  }
}
