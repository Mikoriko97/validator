import { createClient } from "@supabase/supabase-js"

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Singleton pattern for Supabase client
let supabaseInstance: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseInstance && supabaseUrl && supabaseAnonKey) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      })
    } catch (error) {
      console.error("Error creating Supabase client:", error)
      return null
    }
  }
  return supabaseInstance
}

// For backward compatibility
export const supabase = getSupabaseClient()

// Test the connection
export async function testSupabaseConnection() {
  try {
    const client = getSupabaseClient()

    if (!client) {
      console.warn("No Supabase client available")
      return false
    }

    // Simple ping test - just check if we can connect
    const { error } = await client.from("blog_posts").select("count").limit(1).single()

    if (error && error.code !== "PGRST116") {
      console.warn("Supabase connection test failed:", error)
      return false
    }

    return true
  } catch (err) {
    console.warn("Supabase connection test error:", err)
    return false
  }
}
